/**
 * 环境变量验证配置
 * 确保必要的环境变量在应用启动时已正确设置
 */

import { z } from "zod";

// 环境变量schema定义
const envSchema = z.object({
  // 基础配置
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.preprocess((v) => Number(v), z.number()).default(3001),

  // 数据库配置
  DB_HOST: z.string().min(1, "Database host is required"),
  DB_PORT: z.preprocess((v) => Number(v), z.number()),
  DB_NAME: z.string().min(1, "Database name is required"),
  DB_USER: z.string().min(1, "Database user is required"),
  DB_PASSWORD: z.string().min(1, "Database password is required"),
  DB_POOL_MAX: z.preprocess((v) => Number(v), z.number()).default(20),
  DB_POOL_MIN: z.preprocess((v) => Number(v), z.number()).default(5),
  DB_SSL: z.preprocess(
    (val) => val === "true" || val === true,
    z.boolean()
  ).default(false),

  // Redis配置
  REDIS_HOST: z.string().min(1, "Redis host is required"),
  REDIS_PORT: z.preprocess((v) => Number(v), z.number()),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_DB: z.preprocess((v) => Number(v), z.number()).default(0),
  REDIS_KEY_PREFIX: z.string().default("yyc3:"),

  // OpenAI配置
  OPENAI_API_KEY: z.string().min(1, "OpenAI API key is required"),
  OPENAI_MODEL: z.string().default("gpt-4o"),
  OPENAI_ORGANIZATION: z.string().optional(),
  OPENAI_MAX_TOKENS: z.preprocess((v) => Number(v), z.number()).default(4000),
  OPENAI_TEMPERATURE: z.preprocess((v) => Number(v), z.number()).default(0.7),

  // JWT配置
  JWT_SECRET: z.string().min(32, "JWT secret must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().default("24h"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),

  // 日志配置
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
  LOG_FILE_PATH: z.string().default("./logs"),

  // WebSocket配置
  WS_ENABLED: z.preprocess(
    (val) => val === "true" || val === true,
    z.boolean()
  ).default(true),
  WS_PORT: z.preprocess((v) => Number(v), z.number()).optional(),
  WS_MAX_CONNECTIONS: z.preprocess((v) => Number(v), z.number()).default(1000),

  // 文件上传配置
  UPLOAD_MAX_SIZE: z.preprocess((v) => Number(v), z.number()).default(10485760),
  UPLOAD_PATH: z.string().default("./uploads"),
  UPLOAD_PROVIDER: z.enum(["local", "minio", "s3"]).default("local"),

  // 前端公共变量
  NEXT_PUBLIC_API_BASE_URL: z.string().url("Invalid API base URL"),
  NEXT_PUBLIC_ENV: z.string().default("development"),
  NEXT_PUBLIC_WS_URL: z.string(),
  NEXT_PUBLIC_BRAND_NAME: z.string().default("YanYu Cloud³"),
  NEXT_PUBLIC_VERSION: z.string().default("v1.0.0"),

  // 安全配置
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  RATE_LIMIT_WINDOW: z.preprocess((v) => Number(v), z.number()).default(15),
  RATE_LIMIT_MAX: z.preprocess((v) => Number(v), z.number()).default(100),
  HELMET_ENABLED: z.preprocess(
    (val) => val === "true" || val === true,
    z.boolean()
  ).default(true),
  HTTPS_ONLY: z.preprocess(
    (val) => val === "true" || val === true,
    z.boolean()
  ).default(false),

  // 第三方集成（可选）
  SMTP_HOST: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  DINGTALK_WEBHOOK: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
});

// 环境变量类型
export type EnvConfig = z.infer<typeof envSchema>;

/**
 * 验证并解析环境变量
 */
export function validateEnv(): EnvConfig {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join("\n");

      console.error("❌ Environment validation failed:");
      console.error(errorMessages);
      process.exit(1);
    }
    throw error;
  }
}

/**
 * 检查环境变量配置健康状态
 */
export function checkEnvHealth(env: EnvConfig): {
  healthy: boolean;
  warnings: string[];
  errors: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];

  // 检查生产环境安全配置
  if (env.NODE_ENV === "production") {
    if (env.JWT_SECRET.length < 64) {
      warnings.push(
        "JWT secret should be at least 64 characters in production"
      );
    }

    if (!env.HTTPS_ONLY) {
      warnings.push("HTTPS should be enabled in production");
    }

    if (env.LOG_LEVEL === "debug") {
      warnings.push("Debug logging should be disabled in production");
    }

    if (env.OPENAI_API_KEY.includes("test")) {
      errors.push("Test OpenAI API key detected in production");
    }
  }

  // 检查数据库配置
  if (env.DB_PASSWORD === "password" || env.DB_PASSWORD.length < 8) {
    warnings.push("Database password is weak");
  }

  // 检查Redis配置
  if (!env.REDIS_PASSWORD && env.NODE_ENV === "production") {
    warnings.push("Redis password should be set in production");
  }

  // 检查API密钥
  if (
    env.OPENAI_API_KEY.includes("your-") ||
    env.OPENAI_API_KEY.includes("test")
  ) {
    errors.push("OpenAI API key appears to be placeholder");
  }

  return {
    healthy: errors.length === 0,
    warnings,
    errors,
  };
}

/**
 * 输出环境配置摘要
 */
export function logEnvSummary(env: EnvConfig): void {
  console.log("🌟 Environment Configuration Summary:");
  console.log(`📦 Environment: ${env.NODE_ENV}`);
  console.log(`🚀 Port: ${env.PORT}`);
  console.log(`🗄️  Database: ${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`);
  console.log(`📦 Redis: ${env.REDIS_HOST}:${env.REDIS_PORT}`);
  console.log(`🧠 AI Model: ${env.OPENAI_MODEL}`);
  console.log(`🔄 WebSocket: ${env.WS_ENABLED ? "Enabled" : "Disabled"}`);
  console.log(`📝 Log Level: ${env.LOG_LEVEL}`);

  const health = checkEnvHealth(env);

  if (health.warnings.length > 0) {
    console.log("\n⚠️  Warnings:");
    health.warnings.forEach((warning) => console.log(`   • ${warning}`));
  }

  if (health.errors.length > 0) {
    console.log("\n❌ Errors:");
    health.errors.forEach((error) => console.log(`   • ${error}`));
  }

  if (health.healthy) {
    console.log("\n✅ Environment configuration is healthy!");
  } else {
    console.log("\n❌ Environment configuration has critical issues!");
  }
}
