import { Request, Response, NextFunction } from 'express';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    hasMore?: boolean;
    timestamp: string;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    statusCode: number;
  };
  timestamp: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    roles: string[];
  };
}

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>;

export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export interface QueryFilters {
  [key: string]: string | string[] | number | undefined;
}

export interface DateRange {
  startDate?: string;
  endDate?: string;
}

export interface IdParam {
  id: string;
}

export interface SuccessResponse {
  success: true;
  message: string;
  data?: Record<string, unknown>;
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  version: string;
  uptime: number;
  services: {
    database: 'up' | 'down';
    redis: 'up' | 'down';
    websocket: 'up' | 'down';
  };
  metrics: {
    memoryUsage: number;
    cpuUsage: number;
    activeConnections: number;
  };
}

export interface MetricsResponse {
  success: boolean;
  data: string;
  contentType: string;
}

export interface UserInfo {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
  ipAddress?: string;
}

export interface LoginResponse extends ApiResponse<{
  user: Omit<UserInfo, 'status' | 'createdAt' | 'lastLoginAt'>;
  accessToken: string;
  refreshToken: string;
}> {}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  roles: string[];
  iat?: number;
  exp?: number;
}

export interface SecurityLogEntry {
  id: string;
  userId?: string;
  action: string;
  resource: string;
  ipAddress: string;
  userAgent?: string;
  details?: Record<string, unknown>;
  severity: 'info' | 'warning' | 'error' | 'critical';
  timestamp: Date;
}

export interface SecurityLogFilters extends PaginationParams, DateRange {
  userId?: string;
  action?: string;
  severity?: string;
  ipAddress?: string;
}

export interface CacheOptions {
  ttl?: number;
  key?: string;
  tags?: string[];
}

export interface CacheEntry<T = unknown> {
  key: string;
  value: T;
  expiresAt: Date;
  createdAt: Date;
  hits: number;
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipFailedRequests?: boolean;
  keyGenerator?: (req: Request) => string;
}

export interface CircuitBreakerConfig {
  failureThreshold: number;
  resetTimeout: number;
  halfOpenMaxAttempts: number;
}

export interface ServiceHealthStatus {
  name: string;
  status: 'up' | 'down' | 'degraded';
  responseTime?: number;
  lastChecked: Date;
  errorMessage?: string;
}

export interface NotificationMessage {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  userId?: string;
  actionUrl?: string;
  actionLabel?: string;
  data?: Record<string, unknown>;
  readAt?: Date;
  createdAt: Date;
}

export interface WebSocketConnectionInfo {
  socketId: string;
  userId?: string;
  authenticated: boolean;
  connectedAt: Date;
  subscriptions: string[];
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  changes?: {
    before?: Record<string, unknown>;
    after?: Record<string, unknown>;
  };
  ipAddress: string;
  timestamp: Date;
}

export interface ExportOptions {
  format: 'csv' | 'json' | 'excel';
  includeHeaders?: boolean;
  dateRange?: DateRange;
  filters?: QueryFields;
}

export interface ImportResult {
  success: boolean;
  totalRows: number;
  processedRows: number;
  failedRows: number;
  errors?: Array<{
    row: number;
    message: string;
  }>;
}

export interface BatchOperationResult<T = unknown> {
  success: boolean;
  processed: number;
  succeeded: number;
  failed: number;
  results?: T[];
  errors?: Array<{ item: T; error: string }>;
}

export interface SearchQuery {
  query: string;
  fields?: string[];
  filters?: QueryFields;
  pagination?: PaginationParams;
  sort?: SortParams;
}

export interface QueryFields {
  [key: string]:
    | string
    | string[]
    | number
    | boolean
    | DateRange
    | undefined;
}

export interface ApiVersionInfo {
  version: string;
  buildDate: string;
  gitCommit?: string;
  environment: 'development' | 'staging' | 'production';
  features: string[];
}