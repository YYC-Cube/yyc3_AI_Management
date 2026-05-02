import { Router, Request, Response, NextFunction } from 'express';
import { ReconciliationService } from '../services/reconciliation.service';
import { authenticate as authMiddleware, authorize as checkPermission } from '../middleware/auth.middleware';
import { rateLimiter } from '../middleware/rate-limiter.middleware';
import { httpRequestsTotal, httpRequestDuration } from '../config/metrics';
import { logger } from '../config/logger';
import Joi from 'joi';

const router = Router();
const reconciliationService = new ReconciliationService();

interface ReconciliationQueryParams {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  status?: string;
  type?: string;
}

const validateRequest = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.validate(req.body || {}, { abortEarly: false });
      if (validated.error) {
        const errors = validated.error.details.map((detail) => detail.message);
        return res.status(400).json({ errors });
      }
      req.body = validated.value;
      next();
    } catch (error) {
      next(error);
    }
  };
};

router.get('/records', 
  authMiddleware,
  checkPermission(['reconciliation:read']),
  rateLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    const end = httpRequestDuration.startTimer();
    try {
      const { page = '1', limit = '10', startDate, endDate, status, type } = req.query;
      
      const params: ReconciliationQueryParams = {
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
        startDate: startDate as string | undefined,
        endDate: endDate as string | undefined,
        status: status as string | undefined,
        type: type as string | undefined
      };
      
      const records = await reconciliationService.getRecords(params);
      
      httpRequestsTotal.inc({ method: 'GET', route: '/reconciliation/records', status_code: 200 });
      end({ method: 'GET', route: '/reconciliation/records', status_code: 200 });
      
      res.json(records);
    } catch (error) {
      logger.error('Failed to get reconciliation records', { error });
      httpRequestsTotal.inc({ method: 'GET', route: '/reconciliation/records', status_code: 500 });
      end({ method: 'GET', route: '/reconciliation/records', status_code: 500 });
      next(error);
    }
  }
);

router.post('/auto-reconcile',
  authMiddleware,
  checkPermission(['reconciliation:write']),
  rateLimiter,
  validateRequest(Joi.object({
    date: Joi.date().required(),
    type: Joi.string().valid('daily', 'weekly', 'monthly').required()
  })),
  async (req: Request, res: Response, _next: NextFunction) => {
    const end = httpRequestDuration.startTimer();
    try {
      const userId = (req.user as { userId: string })?.userId || 'system';
      
      const result = await reconciliationService.autoReconcile(userId);
      
      httpRequestsTotal.inc({ method: 'POST', route: '/reconciliation/auto-reconcile', status_code: 200 });
      end({ method: 'POST', route: '/reconciliation/auto-reconcile', status_code: 200 });
      
      res.status(200).json(result);
    } catch (error) {
      logger.error('Auto reconciliation failed', { error });
      httpRequestsTotal.inc({ method: 'POST', route: '/reconciliation/auto-reconcile', status_code: 500 });
      end({ method: 'POST', route: '/reconciliation/auto-reconcile', status_code: 500 });
      _next(error);
    }
  }
);

router.get('/stats',
  authMiddleware,
  checkPermission(['reconciliation:read']),
  rateLimiter,
  async (_req: Request, res: Response, next: NextFunction) => {
    const end = httpRequestDuration.startTimer();
    try {
      const stats = await reconciliationService.getStats();
      
      httpRequestsTotal.inc({ method: 'GET', route: '/reconciliation/stats', status_code: 200 });
      end({ method: 'GET', route: '/reconciliation/stats', status_code: 200 });
      
      res.json(stats);
    } catch (error) {
      logger.error('Failed to get reconciliation stats', { error });
      httpRequestsTotal.inc({ method: 'GET', route: '/reconciliation/stats', status_code: 500 });
      end({ method: 'GET', route: '/reconciliation/stats', status_code: 500 });
      next(error);
    }
  }
);

router.get('/exceptions',
  authMiddleware,
  checkPermission(['reconciliation:read']),
  rateLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    const end = httpRequestDuration.startTimer();
    try {
      const { page = '1', limit = '10', startDate, endDate, status } = req.query;
      
      const exceptions = await reconciliationService.getExceptions({
        offset: (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10),
        limit: parseInt(limit as string, 10),
        startDate: startDate as string | undefined,
        endDate: endDate as string | undefined,
        status: status as string | undefined
      });
      
      httpRequestsTotal.inc({ method: 'GET', route: '/reconciliation/exceptions', status_code: 200 });
      end({ method: 'GET', route: '/reconciliation/exceptions', status_code: 200 });
      
      res.json(exceptions);
    } catch (error) {
      logger.error('Failed to get reconciliation exceptions', { error });
      httpRequestsTotal.inc({ method: 'GET', route: '/reconciliation/exceptions', status_code: 500 });
      end({ method: 'GET', route: '/reconciliation/exceptions', status_code: 500 });
      next(error);
    }
  }
);

router.patch('/exceptions/:id/resolve',
  authMiddleware,
  checkPermission(['reconciliation:write']),
  rateLimiter,
  validateRequest(Joi.object({
    resolution: Joi.string().required(),
    notes: Joi.string().optional()
  })),
  async (req: Request, res: Response, next: NextFunction) => {
    const end = httpRequestDuration.startTimer();
    try {
      const { id } = req.params;
      const { resolution, notes } = req.body || {};
      const userId = (req.user as { userId: string })?.userId || 'system';
      
      const result = await reconciliationService.resolveException(id, resolution, userId);
      
      httpRequestsTotal.inc({ method: 'PATCH', route: '/reconciliation/exceptions/:id/resolve', status_code: 200 });
      end({ method: 'PATCH', route: '/reconciliation/exceptions/:id/resolve', status_code: 200 });
      
      res.json(result);
    } catch (error) {
      logger.error('Failed to resolve reconciliation exception', { error });
      httpRequestsTotal.inc({ method: 'PATCH', route: '/reconciliation/exceptions/:id/resolve', status_code: 500 });
      end({ method: 'PATCH', route: '/reconciliation/exceptions/:id/resolve', status_code: 500 });
      next(error);
    }
  }
);

export default router;