"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const metrics_service_1 = require("../services/metrics.service");
const logger_1 = require("../config/logger");
const router = (0, express_1.Router)();
/**
 * @route GET /api/metrics
 * @desc 暴露系统性能指标（Prometheus格式）
 * @access Public (通常应限制访问)
 */
router.get('/', async (req, res, next) => {
    try {
        // 获取指标数据
        const metrics = await metrics_service_1.metricsService.getMetrics();
        // 设置正确的内容类型
        res.set('Content-Type', 'text/plain');
        res.status(200).send(metrics);
        logger_1.logger.info('Metrics endpoint accessed');
    }
    catch (error) {
        logger_1.logger.error('Failed to collect metrics', { error });
        next(error);
    }
});
/**
 * @route GET /api/metrics/health
 * @desc 健康指标摘要
 * @access Private
 */
router.get('/health', async (req, res, next) => {
    try {
        // 获取基本健康指标
        const registry = metrics_service_1.metricsService.getRegistry();
        const metricsData = await registry.getMetricsAsJSON();
        // 提取关键健康指标
        const healthSummary = {
            uptime: null,
            memoryUsage: null,
            activeUsers: null,
            activeTickets: null,
            databaseConnections: null,
            cacheHitRate: null,
        };
        // 解析指标数据
        metricsData.forEach(metric => {
            if (metric.name === 'application_uptime_seconds') {
                healthSummary.uptime = metric.values[0]?.value || null;
            }
            else if (metric.name === 'memory_usage_bytes') {
                healthSummary.memoryUsage = metric.values[0]?.value || null;
            }
            else if (metric.name === 'active_users') {
                healthSummary.activeUsers = metric.values[0]?.value || null;
            }
            else if (metric.name === 'active_tickets') {
                healthSummary.activeTickets = metric.values[0]?.value || null;
            }
            else if (metric.name === 'database_connections') {
                healthSummary.databaseConnections = metric.values[0]?.value || null;
            }
            else if (metric.name === 'cache_hit_rate') {
                healthSummary.cacheHitRate = metric.values[0]?.value || null;
            }
        });
        res.status(200).json({
            success: true,
            data: healthSummary,
        });
        logger_1.logger.info('Health metrics summary accessed');
    }
    catch (error) {
        logger_1.logger.error('Failed to get health metrics', { error });
        next(error);
    }
});
/**
 * @route GET /api/metrics/http
 * @desc HTTP请求指标摘要
 * @access Private
 */
router.get('/http', async (req, res, next) => {
    try {
        // 这里可以根据需要提取和返回特定的HTTP指标
        res.status(200).json({
            success: true,
            message: 'HTTP metrics endpoint',
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * @route GET /api/metrics/database
 * @desc 数据库性能指标摘要
 * @access Private
 */
router.get('/database', async (req, res, next) => {
    try {
        // 这里可以根据需要提取和返回特定的数据库指标
        res.status(200).json({
            success: true,
            message: 'Database metrics endpoint',
        });
    }
    catch (error) {
        next(error);
    }
});
module.exports = router;
