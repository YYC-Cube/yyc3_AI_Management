# 🌐 环境配置指南

> **最后更新**: 2026-05-01 | **文档版本**: v2.1

---

## 📋 概述

本文档详细说明 YanYu Cloud³ 智能业务管理平台的环境变量配置，包括**本地开发环境**、测试环境和生产环境的设置要求。

## ⚡ 快速开始

### 1. 复制配置文件

```bash
cp .env.example .env.local
```

> ✅ **提示**: `.env.local` 已预置本地开发默认配置（PostgreSQL 5432端口, postgres用户, yyc3_management数据库）

### 2. 启动服务

```bash
# 后端 (端口 3139)
cd backend && npm run dev

# 前端 (端口 3000)
npm run dev
```

### 3. 验证配置

```bash
# 测试数据库连接
npm run env:test-db

# 测试 Redis 连接
npm run env:test-redis

# 完整环境检查
npm run env:test-all
```

---

## 📚 配置分类详解

### 🌐 前端公共变量

这些变量会暴露给客户端浏览器，**请勿包含敏感信息**。

| 变量名 | 描述 | 示例值 | 必需 |
|--------|------|--------|------|
| `NEXT_PUBLIC_API_BASE_URL` | API 基础 URL | `http://localhost:3139` | ✅ |
| `NEXT_PUBLIC_ENV` | 环境标识 | `development` | ✅ |
| `NEXT_PUBLIC_WS_URL` | WebSocket URL | `ws://localhost:3139` | ✅ |
| `NEXT_PUBLIC_BRAND_NAME` | 品牌名称 | `YanYu Cloud³` | ✅ |
| `NEXT_PUBLIC_VERSION` | 应用版本 | `v1.0.0` | ❌ |

---

### 🗄️ 数据库配置 (PostgreSQL 15)

**本地开发默认配置**：

| 变量名 | 描述 | 默认值 | 必需 |
|--------|------|--------|------|
| `DB_HOST` | 数据库主机 | `127.0.0.1` | ✅ |
| `DB_PORT` | 数据库端口 | `5432` | ✅ |
| `DB_NAME` | 数据库名称 | `yyc3_management` | ✅ |
| `DB_USER` | 数据库用户 | `postgres` | ✅ |
| `DB_PASSWORD` | 数据库密码 | `postgres` | ❌ |
| `DB_POOL_MAX` | 最大连接数 | `20` | ❌ |
| `DB_POOL_MIN` | 最小连接数 | `5` | ❌ |
| `DB_SSL` | 启用 SSL | `false` | ❌ |

#### 🔧 本地开发配置示例

```env
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=yyc3_management
DB_USER=postgres
DB_PASSWORD=postgres
```

> ⚠️ **注意**:
> - 使用 `127.0.0.1` 而非 `localhost` 避免 IPv6 解析问题
> - 默认 PostgreSQL 端口为 **5432**（标准端口）
> - 用户名为 `postgres`（标准超级用户）
> - 本地开发密码为 `postgres`（生产环境必须修改）

---

### 📦 Redis 配置

缓存、会话存储和实时通信支持。

| 变量名 | 描述 | 默认值 | 必需 |
|--------|------|--------|------|
| `REDIS_HOST` | Redis 主机 | `localhost` | ✅ |
| `REDIS_PORT` | Redis 端口 | `6379` | ✅ |
| `REDIS_PASSWORD` | Redis 密码 | （空） | ❌ |
| `REDIS_DB` | 数据库索引 | `0` | ❌ |
| `REDIS_KEY_PREFIX` | 键前缀 | `yyc3:` | ❌ |

---

### 🔐 认证与安全配置

JWT Token 和安全相关设置。

| 变量名 | 描述 | 示例值 | 必需 |
|--------|------|--------|------|
| `JWT_SECRET` | JWT 签名密钥 | `9e3416178f96...` | ✅ |
| `JWT_REFRESH_SECRET` | Refresh Token 密钥 | `a1b2c3d4e5f6...` | ✅ |
| `JWT_EXPIRES_IN` | Access Token 有效期 | `24h` | ❌ |
| `JWT_REFRESH_EXPIRES_IN` | Refresh Token 有效期 | `7d` | ❌ |
| `BCRYPT_ROUNDS` | bcrypt 加密轮次 | `12` | ❌ |

#### 🔑 安全建议

```bash
# 生成安全的 JWT 密钥
openssl rand -base64 32
# 输出示例: 9e3416178f9677b1eadb7cc320b4d3e507f943d5be9c9f03d36eceedfad5dedf

# 生产环境必须使用强密钥
# ⚠️ 不要在代码中硬编码密钥！
```

---

### 🤖 OpenAI 配置

AI 功能相关配置（可选）。

| 变量名 | 描述 | 示例值 | 必需 |
|--------|------|--------|------|
| `OPENAI_API_KEY` | OpenAI API 密钥 | `sk-proj-...` | ❌ |
| `OPENAI_MODEL` | 默认模型 | `gpt-4o` | ❌ |
| `OPENAI_MAX_TOKENS` | 最大令牌数 | `4000` | ❌ |
| `OPENAI_TEMPERATURE` | 温度参数 | `0.7` | ❌ |

---

### 🌍 CORS 配置

跨域资源共享设置。

| 变量名 | 描述 | 示例值 | 必需 |
|--------|------|--------|------|
| `CORS_ORIGIN` | 允许的源 | `http://localhost:3000` | ❌ |

---

### ⚙️ 服务器配置

应用服务器运行参数。

| 变量名 | 描述 | 默认值 | 必需 |
|--------|------|--------|------|
| `PORT` | 后端服务端口 | `3003` | ❌ |
| `NODE_ENV` | 运行环境 | `development` | ❌ |
| `RATE_LIMIT_WINDOW` | 限流窗口(ms) | `900000` | ❌ |
| `RATE_LIMIT_MAX` | 最大请求数 | `100` | ❌ |

---

## 🔧 环境特定配置

### 开发环境 (.env.local)

```env
# 服务器
NODE_ENV=development
PORT=3003

# 数据库 (本地 PostgreSQL 15)
DB_HOST=127.0.0.1
DB_PORT=5434
DB_NAME=Management
DB_USER=yyc3-admin
DB_PASSWORD=

# Redis (本地)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT (开发用固定密钥)
JWT_SECRET=dev-secret-key-do-not-use-in-production
JWT_REFRESH_SECRET=dev-refresh-secret-key

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 生产环境 (.env.production)

```env
# 服务器
NODE_ENV=production
PORT=3001

# 数据库 (生产集群)
DB_HOST=prod-db-cluster.example.com
DB_PORT=5432
DB_NAME=yyc3_production
DB_USER=yyc3_app_user
DB_PASSWORD=${DB_PASSWORD_FROM_VAULT}

# Redis (生产集群)
REDIS_HOST=prod-redis-cluster.example.com
REDIS_PORT=6379
REDIS_PASSWORD=${REDIS_PASSWORD_FROM_VAULT}

# JWT (生产环境必须使用强密钥)
JWT_SECRET=${JWT_SECRET_FROM_SECRETS_MANAGER}
JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET_FROM_SECRETS_MANAGER}

# 安全配置
CORS_ORIGIN=https://app.yanyucloud.com
RATE_LIMIT_MAX=1000
```

---

## ✅ 配置验证脚本

项目提供多个验证命令：

```bash
# 验证单个服务连接
npm run env:test-db       # 数据库
npm run env:test-redis     # Redis
npm run env:test-ai        # OpenAI API

# 全部验证
npm run env:test-all

# 生成配置报告
npm run env:report

# 初始化环境配置
npm run env:init
```

---

## 🛡️ 安全最佳实践

### ✅ 推荐做法

1. **使用环境变量管理敏感信息**
   ```typescript
   // ✅ 正确
   const dbPassword = process.env.DB_PASSWORD;
   
   // ❌ 错误 - 永远不要硬编码
   const dbPassword = 'my-password';
   ```

2. **区分开发和生产配置**
   - 使用 `.env.local` 用于本地开发
   - 使用 `.env.production` 用于部署
   - 将 `.env*.local` 加入 `.gitignore`

3. **定期轮换密钥**
   - JWT 密钥每90天更换一次
   - 数据库密码每180天更换一次
   - API Key 泄露时立即更换

4. **最小权限原则**
   - 数据库用户仅授予必要权限
   - Redis 不使用 root 账户
   - API Key 限制 IP 和使用范围

### ❌ 常见错误

1. **将 `.env` 文件提交到版本控制**
2. **在客户端代码中使用服务端密钥**
3. **使用弱密码或默认密码**
4. **忽略日志中的敏感信息泄露**

---

## 📊 故障排查

### 常见问题

| 问题 | 可能原因 | 解决方案 |
|------|---------|---------|
| `ECONNREFUSED` | 数据库未启动 | 检查 PostgreSQL 服务状态 |
| `password authentication failed` | 密码错误 | 验证 DB_PASSWORD 配置 |
| `role "xxx" does not exist` | 用户不存在 | 创建数据库用户 |
| `Redis connection failed` | Redis 未运行 | 启动 Redis 服务 |
| `Missing JWT secrets` | 缺少密钥配置 | 设置 JWT_SECRET 环境变量 |

### 调试命令

```bash
# 检查数据库连接
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "SELECT 1"

# 检查 Redis 连接
redis-cli -h $REDIS_HOST -p $REDIS_PORT ping

# 检查环境变量是否加载
node -e "console.log('DB_HOST:', process.env.DB_HOST)"
```

---

## 📝 配置文件清单

| 文件 | 用途 | 是否提交 Git |
|------|------|-------------|
| `.env.example` | 配置模板 | ✅ 是 |
| `.env.local` | 本地开发配置 | ❌ 否 |
| `.env.test` | 测试环境配置 | ❌ 否 |
| `.env.production` | 生产环境配置 | ❌ 否 |

---

**维护者**: YYC3 DevOps 团队  
**联系方式**: devops@yanyucloud.com  
**相关文档**: [README.md](../README.md) | [部署指南](DEPLOYMENT_TROUBLESHOOTING.md)