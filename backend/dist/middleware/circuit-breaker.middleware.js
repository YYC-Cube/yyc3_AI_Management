"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.circuitBreaker = circuitBreaker;
const logger_1 = require("../config/logger");
const circuits = new Map();
function circuitBreaker(options) {
    return async (req, res, next) => {
        const key = req.path;
        let circuit = circuits.get(key);
        if (!circuit) {
            circuit = {
                failures: 0,
                successes: 0,
                lastFailureTime: 0,
                state: "closed",
            };
            circuits.set(key, circuit);
        }
        // 检查断路器状态
        if (circuit.state === "open") {
            const now = Date.now();
            if (now - circuit.lastFailureTime > options.resetTimeout) {
                circuit.state = "half-open";
                logger_1.logger.info("Circuit breaker half-open", { path: key });
            }
            else {
                logger_1.logger.warn("Circuit breaker open", { path: key });
                return res.status(503).json({
                    success: false,
                    error: "Service temporarily unavailable",
                });
            }
        }
        // 记录响应
        const originalSend = res.send;
        res.send = function (data) {
            if (res.statusCode >= 500) {
                circuit.failures++;
                circuit.lastFailureTime = Date.now();
                const total = circuit.failures + circuit.successes;
                const failureRate = circuit.failures / total;
                if (failureRate > options.threshold) {
                    circuit.state = "open";
                    logger_1.logger.error("Circuit breaker opened", {
                        path: key,
                        failureRate,
                        failures: circuit.failures,
                        successes: circuit.successes,
                    });
                }
            }
            else {
                circuit.successes++;
                if (circuit.state === "half-open") {
                    circuit.state = "closed";
                    circuit.failures = 0;
                    logger_1.logger.info("Circuit breaker closed", { path: key });
                }
            }
            return originalSend.call(this, data);
        };
        next();
    };
}
