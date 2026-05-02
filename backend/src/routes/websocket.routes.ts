import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { logger } from '../config/logger';

const router = Router();

interface WebSocketServiceType {
  getOnlineClientsCount(): number;
  getOnlineUsers(): string[];
  sendNotificationToUser(userId: string, notification: unknown): void;
}

let wsService: WebSocketServiceType | null = null;

function initializeWebSocketRoutes(service: WebSocketServiceType): Router {
  wsService = service;

  // 获取在线状态
  router.get("/status", authenticate, (req: Request, res: Response) => {
    if (!wsService) {
      return res.status(503).json({ error: "WebSocket service not initialized" });
    }

    res.json({
      online: wsService.getOnlineClientsCount(),
      users: wsService.getOnlineUsers(),
      timestamp: new Date().toISOString(),
    });
  });

  // 发送测试通知
  router.post("/test-notification", authenticate, (req: Request, res: Response) => {
    if (!wsService) {
      return res.status(503).json({ error: "WebSocket service not initialized" });
    }

    const body = req.body || {};
    const userId = body.userId || '';
    const title = body.title || "Test Notification";
    const message = body.message || "This is a test notification";
    const type = body.type || "info";
    const priority = body.priority || "medium";

    wsService.sendNotificationToUser(userId, {
      id: `test-${Date.now()}`,
      title: title,
      message: message,
      type: type,
      priority: priority,
    });

    if (req.user) {
      logger.debug("Notification sent by user", { userId: req.user.userId, recipientId: userId });
    }

    res.json({ success: true, message: "Notification sent" });
  });

  return router;
}

export default initializeWebSocketRoutes;