import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { pool } from '../config/database';
import { redis } from '../config/redis';
import { logger } from '../config/logger';
import { AppError } from '../utils/app-error';
import { ErrorCode } from '../constants/error-codes';

interface UserInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

interface AuthResult {
  user: UserInfo;
  accessToken: string;
  refreshToken: string;
}

dotenv.config({ path: '/Users/my/Downloads/yyc3-AI-Management/.env.local' });

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.JWT_EXPIRES_IN || '15m';
const REFRESH_TOKEN_EXPIRY = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
const SALT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '10');

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  console.error('Critical error: Missing JWT secrets in environment variables');
  throw new Error('JWT secrets are not configured in environment variables');
}

export interface TokenPayload {
  userId: string;
  email: string;
  roles: string[];
}

class AuthService {
  async register(email: string, password: string, firstName: string, lastName: string): Promise<AuthResult> {
    try {
      const existingUser = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [email.toLowerCase()]
      );

      if (existingUser.rows.length > 0) {
        throw AppError.conflict('Email already exists', ErrorCode.CONFLICT);
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const userId = crypto.randomUUID();
      const result = await pool.query(
        `INSERT INTO users (
          id, email, password_hash, first_name, last_name, 
          status, created_at, updated_at
        )
        VALUES ($1, $2, $3, $4, $5, 'active', NOW(), NOW())
        RETURNING id, email, first_name, last_name, status, created_at`,
        [userId, email.toLowerCase(), hashedPassword, firstName, lastName]
      );

      const user = result.rows[0];

      await pool.query(
        `INSERT INTO user_roles (user_id, role_id)
        SELECT $1, id FROM roles WHERE role_name = 'user'`,
        [userId]
      );

      const accessToken = this.generateAccessToken({
        userId: user.id,
        email: user.email,
        roles: ['user']
      });
      const refreshToken = this.generateRefreshToken(user.id);

      await this.storeRefreshToken(user.id, refreshToken);

      logger.info('User registered successfully', { userId: user.id, email: user.email });

      return { user, accessToken, refreshToken };
    } catch (error) {
      logger.error('Registration failed', { email, error: error instanceof Error ? error.message : error });
      throw error;
    }
  }

  generateAccessToken(payload: TokenPayload): string {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }
    return jwt.sign(payload, JWT_SECRET as string, {
      expiresIn: ACCESS_TOKEN_EXPIRY
    } as jwt.SignOptions);
  }

  generateRefreshToken(userId: string): string {
    if (!JWT_REFRESH_SECRET) {
      throw new Error('JWT_REFRESH_SECRET is not configured');
    }
    return jwt.sign({ userId }, JWT_REFRESH_SECRET as string, {
      expiresIn: REFRESH_TOKEN_EXPIRY
    } as jwt.SignOptions);
  }

  verifyAccessToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, JWT_SECRET!);
      return decoded as unknown as TokenPayload;
    } catch (error: unknown) {
      const err = error as Error & { name?: string };
      if (err.name === 'TokenExpiredError') {
        throw AppError.unauthorized('Token expired', ErrorCode.TOKEN_EXPIRED);
      } else if (err.name === 'JsonWebTokenError') {
        throw AppError.unauthorized('Invalid token', ErrorCode.INVALID_TOKEN);
      }
      throw AppError.unauthorized('Authentication failed', ErrorCode.UNAUTHORIZED);
    }
  }

  verifyRefreshToken(token: string): {userId: string} {
    try {
      const decoded = jwt.verify(token, JWT_REFRESH_SECRET!);
      return decoded as unknown as {userId: string};
    } catch (error: unknown) {
      const err = error as Error & { name?: string };
      if (err.name === 'TokenExpiredError') {
        throw AppError.unauthorized('Refresh token expired', ErrorCode.TOKEN_EXPIRED);
      } else if (err.name === 'JsonWebTokenError') {
        throw AppError.unauthorized('Invalid refresh token', ErrorCode.INVALID_TOKEN);
      }
      throw AppError.unauthorized('Authentication failed', ErrorCode.UNAUTHORIZED);
    }
  }

  async storeRefreshToken(userId: string, token: string): Promise<void> {
    const key = `refresh_token:${userId}`;
    await redis.set(key, token, 'EX', 7 * 24 * 60 * 60);
  }

  async getStoredRefreshToken(userId: string): Promise<string|null> {
    const key = `refresh_token:${userId}`;
    return await redis.get(key);
  }

  async deleteRefreshToken(userId: string, _refreshToken?: string): Promise<void> {
    const key = `refresh_token:${userId}`;
    await redis.del(key);
  }

  async login(email: string, password: string, ipAddress: string): Promise<AuthResult> {
    try {
      const attemptsKey = `login_attempts:${email}:${ipAddress}`;
      const attempts = await redis.get(attemptsKey);
      
      if (attempts && parseInt(attempts) >= 5) {
        throw AppError.tooManyRequests('Too many login attempts. Please try again later.', ErrorCode.TOO_MANY_REQUESTS);
      }

      const result = await pool.query(
        `SELECT u.id, u.email, u.password_hash, u.status, 
                ARRAY_AGG(r.role_name) as roles 
         FROM users u 
         LEFT JOIN user_roles ur ON u.id = ur.user_id 
         LEFT JOIN roles r ON ur.role_id = r.id 
         WHERE u.email = $1 
         GROUP BY u.id`,
        [email.toLowerCase()]
      );

      if (result.rows.length === 0) {
        await this.recordFailedLogin(email, ipAddress);
        throw AppError.unauthorized('Invalid credentials', ErrorCode.UNAUTHORIZED);
      }

      const user = result.rows[0];

      if (user.status !== 'active') {
        await this.recordFailedLogin(email, ipAddress);
        throw AppError.unauthorized('Account is not active', ErrorCode.ACCOUNT_INACTIVE);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      
      if (!isPasswordValid) {
        await this.recordFailedLogin(email, ipAddress);
        throw AppError.unauthorized('Invalid credentials', ErrorCode.UNAUTHORIZED);
      }

      await this.clearLoginAttempts(email, ipAddress);

      const accessToken = this.generateAccessToken({
        userId: user.id,
        email: user.email,
        roles: user.roles || []
      });
      
      const refreshToken = this.generateRefreshToken(user.id);
      
      await this.storeRefreshToken(user.id, refreshToken);

      delete user.password_hash;

      logger.info('User logged in successfully', { userId: user.id, email: user.email });

      return { user, accessToken, refreshToken };
    } catch (error) {
      logger.warn('Login failed', { email, ipAddress, error: error instanceof Error ? error.message : error });
      throw error;
    }
  }

  async logout(userId: string, refreshToken?: string): Promise<void> {
    try {
      await this.deleteRefreshToken(userId, refreshToken);
      logger.info('User logged out successfully', { userId });
    } catch (error) {
      logger.error('Logout failed', { userId, error: error instanceof Error ? error.message : error });
      throw error;
    }
  }

  async refreshToken(refreshTokenParam: string): Promise<{accessToken: string, refreshToken: string}> {
    return this.refreshAccessToken(refreshTokenParam);
  }

  async refreshAccessToken(refreshToken: string): Promise<{accessToken: string, refreshToken: string}> {
    try {
      const decoded = this.verifyRefreshToken(refreshToken);
      const userId = decoded.userId;

      const storedToken = await this.getStoredRefreshToken(userId);
      
      if (!storedToken || storedToken !== refreshToken) {
        throw AppError.unauthorized('Invalid refresh token', ErrorCode.INVALID_TOKEN);
      }

      const result = await pool.query(
        `SELECT u.id, u.email, ARRAY_AGG(r.role_name) as roles 
         FROM users u 
         LEFT JOIN user_roles ur ON u.id = ur.user_id 
         LEFT JOIN roles r ON ur.role_id = r.id 
         WHERE u.id = $1 
         GROUP BY u.id`,
        [userId]
      );

      if (result.rows.length === 0) {
        throw AppError.unauthorized('User not found', ErrorCode.USER_NOT_FOUND);
      }

      const user = result.rows[0];

      const newAccessToken = this.generateAccessToken({
        userId: user.id,
        email: user.email,
        roles: user.roles || []
      });
      
      const newRefreshToken = this.generateRefreshToken(user.id);

      await this.storeRefreshToken(userId, newRefreshToken);

      logger.info('Access token refreshed', { userId });

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      logger.warn('Token refresh failed', { error: error instanceof Error ? error.message : error });
      throw error;
    }
  }

  async recordFailedLogin(email: string, ipAddress: string): Promise<void> {
    const key = `login_attempts:${email}:${ipAddress}`;
    const attempts = await redis.get(key);

    if (attempts) {
      await redis.incr(key);
    } else {
      await redis.set(key, '1', 'EX', 60 * 60);
    }
  }

  async clearLoginAttempts(email: string, ipAddress: string): Promise<void> {
    const key = `login_attempts:${email}:${ipAddress}`;
    await redis.del(key);
  }

  async requestPasswordReset(email: string): Promise<void> {
    try {
      logger.info('Password reset request received', { email });
    } catch (error) {
      logger.error('Password reset request failed', { email, error: error instanceof Error ? error.message : error });
      throw error;
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      logger.info('Password reset attempt with token');
    } catch (error) {
      logger.error('Password reset failed', { error: error instanceof Error ? error.message : error });
      throw error;
    }
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    try {
      logger.info('Password change attempt', { userId });
    } catch (error) {
      logger.error('Password change failed', { userId, error: error instanceof Error ? error.message : error });
      throw error;
    }
  }
}

export default AuthService;

export const authService = new AuthService();