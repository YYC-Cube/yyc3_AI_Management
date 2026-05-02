import { Router, Request, Response, NextFunction } from 'express';
import { AiAnalysisService } from '../services/ai-analysis.service';
import { OpenAIService } from '../services/openai.service';
import { PromptTemplatesService } from '../services/prompt-templates.service';
import { ReconciliationService } from '../services/reconciliation.service';
import { ticketIntelligenceService } from '../services/ai/ticket-intelligence.service';
import { authenticate as authMiddleware, authorize as checkPermission } from '../middleware/auth.middleware';
import { rateLimiter } from '../middleware/rate-limiter.middleware';
import { logger } from '../config/logger';
import Joi from 'joi';

const router = Router();

// 临时的validateRequest中间件实现
const validateRequest = (schema: Joi.Schema, source: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataToValidate = (req as unknown as Record<string, unknown>)[source] || {};
      const validated = schema.validate(dataToValidate, { abortEarly: false });
      if (validated.error) {
        const errors = validated.error.details.map((detail) => detail.message);
        return res.status(400).json({ errors });
      }
      if (source === 'body') {
        req.body = validated.value;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

// 初始化服务
const openaiConfig = {
  apiKey: process.env.OPENAI_API_KEY || "",
  model: process.env.OPENAI_MODEL || "gpt-4o",
  maxRetries: 3,
  timeout: 30000,
  organization: process.env.OPENAI_ORGANIZATION,
};

const openaiService = new OpenAIService(openaiConfig);
const promptService = new PromptTemplatesService();
const reconciliationService = new ReconciliationService();
const aiAnalysisService = new AiAnalysisService(openaiService, promptService, reconciliationService);

// 请求验证 schemas
const analyzeRecordSchema = Joi.object({
  recordId: Joi.string().uuid().required(),
});

const analyzeBatchSchema = Joi.object({
  recordIds: Joi.array().items(Joi.string().uuid()).min(1).max(20).required(),
});

const analyzeTrendsSchema = Joi.object({
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required(),
});

// 应用中间件
router.use(authMiddleware);

/**
 * @route   POST /api/ai-analysis/analyze/:recordId
 * @desc    分析单条异常记录
 * @access  Private (需要 ai:analyze 权限)
 */
router.post(
  "/analyze/:recordId",
  checkPermission(["ai:analyze"]),
  rateLimiter({ windowMs: 60000, max: 20 }),
  validateRequest(analyzeRecordSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { recordId } = req.params;
      const userId = (req.user as { userId: string }).userId;

      logger.info("AI analysis requested", { recordId, userId });

      // 生成分析请求
      const analysisRequest = await aiAnalysisService.generateAnalysisRequestForRecord(recordId);

      // 执行分析
      const result = await aiAnalysisService.analyzeException(analysisRequest);

      res.json({
        success: true,
        data: result,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      logger.error("AI analysis failed", { error: message });
      next(error);
    }
  }
);

/**
 * @route   POST /api/ai-analysis/analyze-batch
 * @desc    批量分析异常记录
 * @access  Private (需要 ai:analyze 权限)
 */
router.post(
  "/analyze-batch",
  checkPermission(["ai:analyze"]),
  rateLimiter({ windowMs: 300000, max: 5 }),
  validateRequest(analyzeBatchSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { recordIds } = req.body || {};
      const userId = (req.user as { userId: string }).userId;

      logger.info("Batch AI analysis requested", {
        count: Array.isArray(recordIds) ? recordIds.length : 0,
        userId,
      });

      // 批量分析实现
      const results = [];
      for (const recordId of recordIds || []) {
        try {
          const analysisRequest = await aiAnalysisService.generateAnalysisRequestForRecord(recordId);
          const result = await aiAnalysisService.analyzeException(analysisRequest);
          results.push({
            recordId,
            result,
            success: true,
          });
        } catch (error) {
          results.push({
            recordId,
            error: error instanceof Error ? error.message : 'Unknown error',
            success: false,
          });
        }
      }

      res.json({
        success: true,
        data: results,
      });
    } catch (error) {
      logger.error("Batch AI analysis failed", { error });
      next(error);
    }
  }
);

// 趋势分析路由
router.post(
  "/analyze-trends",
  checkPermission(["ai:analyze"]),
  rateLimiter({ windowMs: 60000, max: 10 }),
  validateRequest(analyzeTrendsSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, endDate } = req.body || {};
      const userId = (req.user as { userId: string }).userId;

      logger.info("AI trend analysis requested", {
        startDate,
        endDate,
        userId,
      });

      // 趋势分析实现
      const trends = await aiAnalysisService.analyzeTrends({
        start: new Date(startDate),
        end: new Date(endDate)
      });

      res.json({
        success: true,
        data: trends,
      });
    } catch (error) {
      logger.error("AI trend analysis failed", { error });
      next(error);
    }
  }
);

export default router;