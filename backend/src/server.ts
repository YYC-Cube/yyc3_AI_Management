// 在文件顶部添加dotenv导入
import dotenv from 'dotenv';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { pool } from './config/database';
import { logger } from './config/logger';
import { checkRedisHealth, closeRedis } from './config/redis';
import authRoutes from './routes/auth.routes';
import ticketsRoutes from './routes/tickets.routes';
import securityRoutes from './routes/security.routes';
import metricsRoutes from './routes/metrics.routes';
import healthRoutes from './routes/health.routes';
import initializeWebSocketRoutes from './routes/websocket.routes';
import WebSocketService from './services/websocket.service';

// 配置dotenv，使用绝对路径加载.env.local文件
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// 创建Express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 创建HTTP服务器
const httpServer = http.createServer(app);

// 初始化WebSocket服务
const wsService = new WebSocketService(httpServer);

// 初始化WebSocket路由
const webSocketRoutes = initializeWebSocketRoutes(wsService as unknown as Parameters<typeof initializeWebSocketRoutes>[0]);

// 安全中间件 - 配置宽松的安全策略以支持开发环境
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      fontSrc: ["'self'", "data:"],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// CORS配置
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 请求体解析
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 速率限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 每个IP最多100个请求
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests, please try again later.',
  },
});

app.use(limiter);

// 请求日志
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  logger.info('Request received', {
    method: req.method,
    url: req.url,
    ip: req.ip,
  });

  // 记录响应时间
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('Request completed', {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
});

// API路由
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/websocket', webSocketRoutes);

// 首页路由 - 返回 HTML 页面
app.get('/', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YanYu Cloud³ Backend API</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
    .container { background: white; border-radius: 20px; padding: 40px; max-width: 800px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
    h1 { color: #667eea; margin-bottom: 10px; font-size: 2.5em; }
    .version { color: #666; font-size: 0.9em; margin-bottom: 30px; }
    h2 { color: #333; margin: 30px 0 15px; font-size: 1.5em; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
    .api-list { list-style: none; }
    .api-item { background: #f8f9fa; margin: 10px 0; padding: 15px; border-radius: 10px; border-left: 4px solid #667eea; transition: all 0.3s; }
    .api-item:hover { transform: translateX(5px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
    .method { display: inline-block; padding: 3px 10px; border-radius: 5px; color: white; font-weight: bold; font-size: 0.85em; margin-right: 10px; }
    .get { background: #28a745; } .post { background: #007bff; } .put { background: #ffc107; color: #000; } .delete { background: #dc3545; }
    .path { color: #333; font-family: 'Monaco', monospace; font-size: 0.95em; }
    .desc { color: #666; font-size: 0.9em; margin-top: 5px; }
    .status { background: #d4edda; color: #155724; padding: 15px; border-radius: 10px; margin-top: 20px; text-align: center; }
    .footer { text-align: center; margin-top: 30px; color: #999; font-size: 0.85em; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 YanYu Cloud³ Backend API</h1>
    <p class="version">Version ${process.env.npm_package_version || '1.0.0'} | Node.js API Server</p>

    <div class="status">
      ✅ Server is running on port ${process.env.PORT || 3003}
    </div>

    <h2>📡 Available API Endpoints</h2>
    <ul class="api-list">
      <li class="api-item">
        <span class="method get">GET</span>
        <span class="path">/api/health</span>
        <div class="desc">Health check endpoint</div>
      </li>
      <li class="api-item">
        <span class="method post">POST</span>
        <span class="path">/api/auth/login</span>
        <div class="desc">User authentication</div>
      </li>
      <li class="api-item">
        <span class="method get">GET</span>
        <span class="path">/api/tickets</span>
        <div class="desc">Get all tickets</div>
      </li>
      <li class="api-item">
        <span class="method post">POST</span>
        <span class="path">/api/tickets</span>
        <div class="desc">Create new ticket</div>
      </li>
      <li class="api-item">
        <span class="method get">GET</span>
        <span class="path">/api/security/logs</span>
        <div class="desc">Security audit logs</div>
      </li>
      <li class="api-item">
        <span class="method get">GET</span>
        <span class="path">/api/metrics</span>
        <div class="desc">System metrics & monitoring</div>
      </li>
      <li class="api-item">
        <span class="method get">WS</span>
        <span class="path">/api/websocket</span>
        <div class="desc">WebSocket real-time connection</div>
      </li>
    </ul>

    <h2>🛠️ Development Information</h2>
    <ul class="api-list">
      <li class="api-item">
        <span class="path">Environment:</span>
        <span class="desc">${process.env.NODE_ENV || 'development'}</span>
      </li>
      <li class="api-item">
        <span class="path">Database:</span>
        <span class="desc">PostgreSQL (127.0.0.1:5434)</span>
      </li>
      <li class="api-item">
        <span class="path">Cache:</span>
        <span class="desc">Redis (localhost:6379) ✅</span>
      </li>
      <li class="api-item">
        <span class="path">WebSocket:</span>
        <span class="desc">Enabled ✅</span>
      </li>
    </ul>

    <div class="footer">
      <p>🎉 YanYu Cloud³ Intelligent Business Management System</p>
      <p>Powered by TypeScript + Express + PostgreSQL + Redis</p>
    </div>
  </div>
</body>
</html>`);
});

// 错误处理中间件
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('API Error', { error: err.message, stack: err.stack });
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    environment: process.env.NODE_ENV || 'development',
  });
});

// 优雅关闭
const gracefulShutdown = async () => {
  logger.info('Gracefully shutting down server...');
  
  try {
    // Close WebSocket connections
    if (wsService && wsService.close) {
      wsService.close();
    }
    logger.info('WebSocket connections closed');
    
    // Close Redis connection
    await closeRedis();
    logger.info('Redis connection closed');
    
    // Close database connection
    if (pool && pool.end) {
      await pool.end();
      logger.info('Database connection closed');
    }
    
    // Close HTTP server
    httpServer.close(() => {
      logger.info('HTTP server closed');
      process.exit(0);
    });
    
    // Force exit after 10 seconds if not closed
    setTimeout(() => {
      logger.error('Forcing shutdown after timeout');
      process.exit(1);
    }, 10000);
  } catch (error) {
    logger.error('Error during shutdown', { error });
    process.exit(1);
  }
};

// Listen for termination signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start server
httpServer.listen(PORT, async () => {
  logger.info(`🚀 YanYu Cloud³ Backend Server started`, {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    pid: process.pid,
  });

  // Health checks
  const redisHealth = await checkRedisHealth();
  logger.info('Redis health check', redisHealth);

  try {
    if (pool && pool.query) {
      await pool.query('SELECT NOW()');
      logger.info('✅ Database connection established');
    }
  } catch (error) {
    logger.error('❌ Database connection failed', { error });
  }
});

// 使用ES模块导出
export { app, httpServer, wsService };
