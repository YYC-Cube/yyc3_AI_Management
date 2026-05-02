import type { Request, Response, NextFunction } from 'express';
import { pool } from '../config/database';
import { securityLogService } from '../services/security-log.service';
import { AppError } from '../utils/app-error';
import { logger } from '../config/logger';
import type { AuthenticatedRequest, SecurityLogEntry } from '../types/api.types';

interface LoginHistoryEntry {
  id: string;
  user_id: string;
  username: string;
  ip_address: string;
  user_agent?: string;
  success: boolean;
  reason?: string;
  timestamp: Date;
}

interface ActivityLogEntry {
  id: string;
  user_id: string;
  username: string;
  event_type: string;
  details: Record<string, unknown>;
  ip_address: string;
  timestamp: Date;
}

interface SecurityAlert {
  id: string;
  severity: string;
  event_type: string;
  description: string;
  is_resolved: boolean;
  created_at: Date;
  user_id?: string;
  details?: unknown;
}

// 安全日志控制器
class SecurityLogController {
  // 查询登录历史记录
  static getLoginHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, username } = req.query;
      const { limit = '20', offset = '0' } = req.query;
      
      // 获取用户登录历史
      let loginHistory: LoginHistoryEntry[] = [];
      if (userId) {
        loginHistory = await securityLogService.getUserLoginHistory(userId as string, parseInt(limit as string));
      } else {
        // 查询所有用户的登录记录
        const queryText = `SELECT id, user_id, username, ip_address, user_agent, success, reason, timestamp
                     FROM user_login_history
                     ORDER BY timestamp DESC
                     LIMIT $1 OFFSET $2`;
        const result = await pool.query(queryText, [parseInt(limit as string), parseInt(offset as string)]);
        loginHistory = result.rows;
      }

      logger.info('Retrieved login history', {
        userId,
        username,
        count: loginHistory.length
      });

      res.status(200).json({
        success: true,
        data: loginHistory,
        meta: {
          total: loginHistory.length, // 简化处理
          limit: parseInt(limit as string),
          offset: parseInt(offset as string)
        }
      });
    } catch (error) {
      logger.error('Failed to retrieve login history', { error });
      next(error);
    }
  };

  // 查询用户活动日志
  static getUserActivityLogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, username, eventType, ipAddress } = req.query;
      const { limit = '20', offset = '0' } = req.query;
      
      // 获取用户活动日志
      let queryText = `SELECT id, user_id, username, event_type, details, ip_address, timestamp
                     FROM user_activity_logs WHERE 1=1`;
      const params: (string | number)[] = [];
      let paramIndex = 1;
      
      if (userId) {
        queryText += ` AND user_id = $${paramIndex++}`;
        params.push(userId as string);
      }

      if (eventType) {
        queryText += ` AND event_type = $${paramIndex++}`;
        params.push(eventType as string);
      }

      if (ipAddress) {
        queryText += ` AND ip_address = $${paramIndex++}`;
        params.push(ipAddress as string);
      }
      
      queryText += ` ORDER BY timestamp DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
      params.push(parseInt(limit as string), parseInt(offset as string));
      
      const result = await pool.query(queryText, params);
      
      // 解析details为对象
      const activityLogs = result.rows.map((row: Record<string, unknown>) => ({
        ...row,
        details: JSON.parse(row.details as string)
      }));

      logger.info('Retrieved user activity logs', {
        userId,
        username,
        eventType,
        count: activityLogs.length
      });

      res.status(200).json({
        success: true,
        data: activityLogs,
        meta: {
          total: activityLogs.length, // 简化处理
          limit: parseInt(limit as string),
          offset: parseInt(offset as string)
        }
      });
    } catch (error) {
      logger.error('Failed to retrieve user activity logs', { error });
      next(error);
    }
  };

  // 查询安全警报
  static getSecurityAlerts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { severity, eventType, isResolved } = req.query;
      const { limit = '20', offset = '0' } = req.query;
      
      // 获取安全警报
      let alerts: SecurityAlert[];
      if (severity && typeof severity === 'string') {
        alerts = await securityLogService.getUnresolvedAlerts(severity, parseInt(limit as string));
      } else {
        alerts = await securityLogService.getUnresolvedAlerts('', parseInt(limit as string));
      }

      logger.info('Retrieved security alerts', {
        severity,
        eventType,
        isResolved,
        count: alerts.length
      });

      res.status(200).json({
        success: true,
        data: alerts,
        meta: {
          total: alerts.length, // 简化处理
          limit: parseInt(limit as string),
          offset: parseInt(offset as string)
        }
      });
    } catch (error) {
      logger.error('Failed to retrieve security alerts', { error });
      next(error);
    }
  };

  // 解决安全警报
  static resolveSecurityAlert = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { alertId } = req.params;
      const { resolutionNotes } = req.body || {};
      // 安全地获取用户ID，使用类型断言
      const currentUserId = (req as AuthenticatedRequest).user?.userId;

      if (!currentUserId) {
        throw AppError.unauthorized('User not authenticated');
      }

      // 解决安全警报
      const alert = await securityLogService.resolveSecurityAlert(alertId, resolutionNotes);

      logger.info('Security alert resolved', {
        alertId,
        resolvedBy: currentUserId
      });

      res.status(200).json({
        success: true,
        data: alert
      });
    } catch (error) {
      logger.error('Failed to resolve security alert', {
        error,
        alertId: req.params.alertId
      });
      next(error);
    }
  };

  // 获取安全统计信息
  static getSecurityStatistics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { timeRange = '7d' } = req.query;
      // 获取安全统计信息
      let days = 7;
      if (timeRange === '24h') days = 1;
      if (timeRange === '30d') days = 30;
      
      const statistics = await securityLogService.getSecurityStats(days);

      logger.info('Retrieved security statistics', { timeRange });

      res.status(200).json({
        success: true,
        data: statistics
      });
    } catch (error) {
      logger.error('Failed to retrieve security statistics', { error });
      next(error);
    }
  };

  // 获取用户安全报告
  static getUserSecurityReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      // 获取用户安全报告
      const loginHistory = await securityLogService.getUserLoginHistory(userId);
      const unresolvedAlerts = await securityLogService.getUnresolvedAlerts('');
      
      // 筛选用户相关的警报
      const userAlerts = unresolvedAlerts.filter((alert: SecurityAlert) => alert.user_id === userId);
      
      // 构建报告
      const report = {
        userId,
        loginHistory: loginHistory.slice(0, 10), // 最近10次登录
        unresolvedAlerts: userAlerts,
        hasSuspiciousActivity: await securityLogService.detectSuspiciousLogins(userId)
      };

      logger.info('Retrieved user security report', { userId });

      res.status(200).json({
        success: true,
        data: report
      });
    } catch (error) {
      logger.error('Failed to retrieve user security report', {
        error,
        userId: req.params.userId
      });
      next(error);
    }
  };

  // 获取异常登录尝试
  static getSuspiciousLogins = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit = '20', offset = '0' } = req.query;
      // 获取异常登录尝试
      const queryText = `SELECT id, user_id, username, ip_address, user_agent, success, reason, timestamp
                     FROM user_login_history
                     WHERE success = false
                     ORDER BY timestamp DESC
                     LIMIT $1 OFFSET $2`;
      const result = await pool.query(queryText, [parseInt(limit as string), parseInt(offset as string)]);
      
      const suspiciousLogins = result.rows;

      logger.info('Retrieved suspicious logins', { count: suspiciousLogins.length });

      res.status(200).json({
        success: true,
        data: suspiciousLogins,
        meta: {
          total: suspiciousLogins.length, // 简化处理
          limit: parseInt(limit as string),
          offset: parseInt(offset as string)
        }
      });
    } catch (error) {
      logger.error('Failed to retrieve suspicious logins', { error });
      next(error);
    }
  };
}

export default SecurityLogController;