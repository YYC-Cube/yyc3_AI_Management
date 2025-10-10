"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = rateLimiter;
const logger_1 = require("../config/logger");
const requestCounts = new Map();
function rateLimiter(options) {
    return (req, res, next) => {
        const key = `${req.ip}-${req.path}`;
        const now = Date.now();
        const record = requestCounts.get(key);
        if (!record || now > record.resetTime) {
            requestCounts.set(key, {
                count: 1,
                resetTime: now + options.windowMs,
            });
            return next();
        }
        if (record.count >= options.max) {
            logger_1.logger.warn("Rate limit exceeded", {
                ip: req.ip,
                path: req.path,
                count: record.count,
            });
            return res.status(429).json({
                success: false,
                error: "Too many requests",
                retryAfter: Math.ceil((record.resetTime - now) / 1000),
            });
        }
        record.count++;
        next();
    };
}
// 清理过期记录
setInterval(() => {
    const now = Date.now();
    for (const [key, record] of requestCounts.entries()) {
        if (now > record.resetTime) {
            requestCounts.delete(key);
        }
    }
}, 60000); // 每分钟清理一次
