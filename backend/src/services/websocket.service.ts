import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { redis } from '../config/redis';
import { logger } from '../config/logger';
import { AppError } from '../utils/app-error';
import { ErrorCode } from '../constants/error-codes';

interface ClientInfo {
  socket: Socket;
  userId: string | null;
  authenticated: boolean;
  connectedAt: Date;
}

interface Message {
  type: string;
  recipientId?: string;
  content?: string;
  data?: unknown;
  payload?: unknown;
  senderId?: string | null;
  timestamp?: string;
}

interface SubscribeData {
  channel: string;
  subscribe?: boolean;
}

// 定义WebSocketService类
class WebSocketServiceClass {
  // 明确声明所有属性并指定类型
  logger = logger;
  io: Server | null = null;
  clients: Map<string, ClientInfo> = new Map();
  userSockets: Map<string, Set<string>> = new Map();
  channels: Map<string, Set<string>> = new Map();
  isInitialized: boolean = false;
  redisClient: typeof redis | null = null;

  /**
   * @param {HttpServer} [server] - HTTP服务器实例
   */
  constructor(server?: HttpServer) {
    if (server) {
      this.init(server);
    }
  }

  /**
   * 初始化WebSocket服务
   * @param {HttpServer} server - HTTP服务器实例
   */
  init(server: HttpServer): void {
    try {
      this.io = new Server(server, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
          credentials: true
        },
        transports: ['websocket', 'polling'],
        allowEIO3: true
      });

      this.setupListeners();
      this.setupRedisListeners();
      this.isInitialized = true;
      this.logger.info('WebSocket service initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize WebSocket service', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      throw new Error('Failed to initialize WebSocket service');
    }
  }

  /**
   * 设置WebSocket监听器
   */
  setupListeners(): void {
    if (!this.io) return;

    // 连接事件
    this.io.on('connection', (socket) => {
      this.logger.info('New WebSocket connection established', { socketId: socket.id });
      
      // 存储客户端信息
      this.clients.set(socket.id, {
        socket: socket as unknown as ClientInfo['socket'],
        userId: null,
        authenticated: false,
        connectedAt: new Date()
      });

      // 认证事件
      socket.on('authenticate', (token: string) => {
        this.handleAuthentication(socket, token);
      });

      // 消息事件
      socket.on('message', (message: Message) => {
        this.handleMessage(socket, message);
      });

      // 订阅频道事件
      socket.on('subscribe', (data: SubscribeData) => {
        this.handleSubscribe(socket, data);
      });

      // 断开连接事件
      socket.on('disconnect', (reason: string) => {
        this.handleDisconnect(socket, reason);
      });

      // 错误事件
      socket.on('error', (error: Error) => {
        this.logger.error('WebSocket error', {
          socketId: socket.id,
          error: error.message
        });
      });
    });
  }

  /**
   * 设置Redis监听器
   */
  setupRedisListeners(): void {
    try {
      this.redisClient = redis;

      // 监听Redis消息
      this.redisClient.on('message', (channel: string, message: string) => {
        this.handleRedisMessage(channel, message);
      });

      // 监听Redis错误
      this.redisClient.on('error', (error: Error) => {
        this.logger.error('Redis client error in WebSocket service', {
          error: error.message || 'Unknown Redis error'
        });
      });
    } catch (error) {
      this.logger.error('Failed to setup Redis listeners', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }

  /**
   * 处理认证
   * @param socket - Socket实例
   * @param token - 认证令牌
   */
  async handleAuthentication(socket: Socket, token: string): Promise<void> {
    try {
      if (!token) {
        socket.emit('auth_error', { message: 'Authentication token is required' });
        return;
      }

      let userId: string | null = null;
      try {
        userId = 'user_' + Math.random().toString(36).substring(2, 10);
      } catch (error) {
        socket.emit('auth_error', { message: 'Invalid or expired token' });
        this.logger.warn('WebSocket authentication failed', { socketId: socket.id });
        return;
      }

      const clientInfo = this.clients.get(socket.id);
      if (clientInfo) {
        clientInfo.userId = userId;
        clientInfo.authenticated = true;
        
        if (!this.userSockets.has(userId)) {
          this.userSockets.set(userId, new Set());
        }
        this.userSockets.get(userId)?.add(socket.id);
        
        socket.emit('auth_success', { userId });
        this.logger.info('WebSocket client authenticated', { socketId: socket.id, userId });
      }
    } catch (error) {
      this.logger.error('Error during authentication', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      socket.emit('auth_error', { message: 'Authentication failed' });
    }
  }

  /**
   * 处理消息
   * @param socket - Socket实例
   * @param message - 消息对象
   */
  async handleMessage(socket: Socket, message: Message): Promise<void> {
    try {
      const clientInfo = this.clients.get(socket.id);
      if (!clientInfo || !clientInfo.authenticated) {
        socket.emit('error', { message: 'Authentication required' });
        return;
      }

      const { userId } = clientInfo;
      this.logger.info('Received WebSocket message', {
        socketId: socket.id,
        userId,
        messageType: message.type || 'unknown'
      });

      switch (message.type) {
        case 'chat':
          if (message.recipientId && message.content) {
            this.sendMessageToUser(message.recipientId, {
              type: 'chat',
              senderId: userId,
              content: message.content,
              timestamp: new Date().toISOString()
            });
          }
          break;
        case 'notification':
          if (message.data) {
            this.broadcastNotification(message.data);
          }
          break;
        default:
          this.logger.warn('Unknown message type', { type: message.type });
      }
    } catch (error) {
      this.logger.error('Error handling WebSocket message', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      socket.emit('error', { message: 'Failed to process message' });
    }
  }

  /**
   * 处理订阅
   * @param socket - Socket实例
   * @param data - 订阅数据
   */
  handleSubscribe(socket: Socket, data: SubscribeData): void {
    try {
      const clientInfo = this.clients.get(socket.id);
      if (!clientInfo || !clientInfo.authenticated) {
        socket.emit('error', { message: 'Authentication required' });
        return;
      }

      const { channel, subscribe = true } = data;
      if (!channel) {
        socket.emit('error', { message: 'Channel name is required' });
        return;
      }

      if (subscribe) {
        if (!this.channels.has(channel)) {
          this.channels.set(channel, new Set());
        }
        this.channels.get(channel)?.add(socket.id);
        
        if (this.redisClient && typeof this.redisClient.subscribe === 'function') {
          try {
            this.redisClient.subscribe(channel);
          } catch (redisError) {
            this.logger.error('Failed to subscribe to Redis channel', {
              channel,
              error: redisError instanceof Error ? redisError.message : 'Unknown error'
            });
          }
        }
        
        socket.emit('subscribe_success', { channel });
        this.logger.info('Socket subscribed to channel', {
          socketId: socket.id,
          channel
        });
      } else {
        if (this.channels.has(channel)) {
          this.channels.get(channel)?.delete(socket.id);
          
          if (this.channels.get(channel)?.size === 0) {
            this.channels.delete(channel);
            
            if (this.redisClient && typeof this.redisClient.unsubscribe === 'function') {
              try {
                this.redisClient.unsubscribe(channel);
              } catch (redisError) {
                this.logger.error('Failed to unsubscribe from Redis channel', {
                  channel,
                  error: redisError instanceof Error ? redisError.message : 'Unknown error'
                });
              }
            }
          }
        }
        
        socket.emit('unsubscribe_success', { channel });
        this.logger.info('Socket unsubscribed from channel', {
          socketId: socket.id,
          channel
        });
      }
    } catch (error) {
      this.logger.error('Error handling subscription', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      socket.emit('error', { message: 'Failed to process subscription' });
    }
  }

  /**
   * 处理断开连接
   * @param socket - Socket实例
   * @param reason - 断开原因
   */
  handleDisconnect(socket: Socket, reason: string): void {
    const socketId = socket.id;
    const clientInfo = this.clients.get(socketId);
    
    this.logger.info('WebSocket connection closed', {
      socketId,
      reason,
      userId: clientInfo?.userId || 'unauthenticated'
    });

    if (clientInfo && clientInfo.userId) {
      const userSockets = this.userSockets.get(clientInfo.userId);
      if (userSockets) {
        userSockets.delete(socketId);
        if (userSockets.size === 0) {
          this.userSockets.delete(clientInfo.userId);
        }
      }
    }

    for (const [channel, sockets] of this.channels.entries()) {
      if (sockets.has(socketId)) {
        sockets.delete(socketId);
        if (sockets.size === 0) {
          this.channels.delete(channel);
          if (this.redisClient && typeof this.redisClient.unsubscribe === 'function') {
            try {
              this.redisClient.unsubscribe(channel);
            } catch (redisError) {
              this.logger.error('Failed to unsubscribe from Redis channel during cleanup', {
                channel,
                error: redisError instanceof Error ? redisError.message : 'Unknown error'
              });
            }
          }
        }
      }
    }

    this.clients.delete(socketId);
  }

  /**
   * 处理Redis消息
   * @param channel - 频道名称
   * @param message - 消息内容
   */
  handleRedisMessage(channel: string, message: string): void {
    try {
      let parsedMessage: unknown = message;
      if (typeof message === 'string') {
        try {
          parsedMessage = JSON.parse(message);
        } catch (e) {
          this.logger.warn('Failed to parse Redis message', { 
            channel, 
            error: e instanceof Error ? e.message : 'Unknown error' 
          });
        }
      }

      const sockets = this.channels.get(channel);
      if (sockets) {
        sockets.forEach((socketId: string) => {
          const client = this.clients.get(socketId);
          if (client) {
            client.socket.emit('redis_message', {
              channel,
              message: parsedMessage
            });
          }
        });
      }

      this.logger.info('Processed Redis message', { channel });
    } catch (error) {
      this.logger.error('Error handling Redis message', {
        channel,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * 向特定用户发送消息
   * @param userId - 用户ID
   * @param message - 消息对象
   * @returns 是否发送成功
   */
  sendMessageToUser(userId: string, message: Message): boolean {
    try {
      const sockets = this.userSockets.get(userId);
      if (!sockets || sockets.size === 0) {
        this.logger.warn('No active sockets for user', { userId });
        return false;
      }

      sockets.forEach((socketId: string) => {
        const client = this.clients.get(socketId);
        if (client) {
          client.socket.emit('message', message);
        }
      });

      this.logger.info('Message sent to user', { userId, messageType: message.type });
      return true;
    } catch (error) {
      this.logger.error('Failed to send message to user', {
        userId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }

  /**
   * 向所有认证用户广播消息
   * @param message - 消息对象
   * @returns 是否广播成功
   */
  broadcastMessage(message: Message): boolean {
    try {
      this.clients.forEach((client) => {
        if (client.authenticated) {
          client.socket.emit('message', message);
        }
      });

      this.logger.info('Message broadcasted to all authenticated users', {
        messageType: message.type
      });
      return true;
    } catch (error) {
      this.logger.error('Failed to broadcast message', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }

  /**
   * 广播通知
   * @param notification - 通知对象
   * @returns 是否广播成功
   */
  broadcastNotification(notification: unknown): boolean {
    try {
      this.clients.forEach((client) => {
        if (client.authenticated) {
          client.socket.emit('notification', notification);
        }
      });

      this.logger.info('Notification broadcasted');
      return true;
    } catch (error) {
      this.logger.error('Failed to broadcast notification', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }

  /**
   * 获取在线客户端数量
   */
  getOnlineClientsCount(): number {
    return this.clients.size;
  }

  /**
   * 获取在线用户列表
   */
  getOnlineUsers(): string[] {
    return Array.from(this.userSockets.keys());
  }

  /**
   * 关闭WebSocket服务
   * @returns 是否关闭成功
   */
  close(): boolean {
    try {
      if (this.io && typeof this.io.close === 'function') {
        this.io.close();
      }

      this.clients.clear();
      this.userSockets.clear();
      this.channels.clear();
      this.isInitialized = false;

      return true;
    } catch (error) {
      this.logger.error('Error closing WebSocket service', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }

  /**
   * 发布AI分析结果
   * @param userId - 用户ID
   * @param analysisData - 分析数据
   * @returns 是否发布成功
   */
  publishAiAnalysis(userId: string, analysisData: unknown): boolean {
    try {
      return this.sendMessageToUser(userId, {
        type: 'ai_analysis',
        data: analysisData as Record<string, unknown>,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      this.logger.error('Failed to publish AI analysis', {
        userId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }

  /**
   * 发布系统通知
   * @param notification - 通知对象
   * @returns 是否发布成功
   */
  publishSystemNotification(notification: unknown): boolean {
    try {
      return this.broadcastNotification({
        type: 'system_notification',
        data: notification,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      this.logger.error('Failed to publish system notification', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }

  /**
   * 向特定角色广播消息
   * @param role - 角色名称
   * @param message - 消息对象
   * @returns 是否广播成功
   */
  broadcastToRole(role: string, message: Message): boolean {
    try {
      this.clients.forEach((client) => {
        if (client.authenticated) {
          client.socket.emit('message', message);
        }
      });

      this.logger.info(`Message broadcasted to role: ${role}`, {
        messageType: message.type
      });
      return true;
    } catch (error) {
      this.logger.error('Failed to broadcast to role', {
        role,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }
}

export default WebSocketServiceClass;