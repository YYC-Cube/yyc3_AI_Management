# YanYu Cloud³ 智能业务管理系统

![YanYu Cloud³](public/logo.png)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-7.x-red?logo=redis)](https://redis.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[![CI/CD Pipeline](https://github.com/YYC-Cube/yyc3_AI_Management/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/YYC-Cube/yyc3_AI_Management/actions/workflows/ci-cd.yml)
[![Test Gate](https://github.com/YYC-Cube/yyc3_AI_Management/actions/workflows/test-gate.yml/badge.svg)](https://github.com/YYC-Cube/yyc3_AI_Management/actions/workflows/test-gate.yml)
[![Chromatic](https://github.com/YYC-Cube/yyc3_AI_Management/actions/workflows/chromatic.yml/badge.svg)](https://github.com/YYC-Cube/yyc3_AI_Management/actions/workflows/chromatic.yml)

新一代企业级智能业务管理平台 — 集成财务对账、工单管理、实时监控与 AI 智能分析，面向高并发、高可用与可扩展的企业场景。

[功能特性](#-功能特性) • [快速开始](#-快速开始) • [技术栈](#-技术栈) • [API 文档](#-api-接口文档) • [部署指南](#-部署指南) • [安全策略](#-安全策略) • [CI/CD 工作流](docs/WORKFLOWS.md)

---

## 目录

- [项目简介](#-项目简介)  
- [功能特性](#-功能特性)  
- [技术栈](#-技术栈)  
- [完整文件树（概览）](#-完整文件树)  
- [快速开始](#-快速开始)  
- [环境配置](#-环境配置)  
- [API 接口文档（概览）](#-api-接口文档)  
- [模块说明](#-模块说明)  
- [测试指南](#-测试指南)  
- [部署指南](#-部署指南)  
- [监控与运维](#-监控与运维)  
- [贡献指南](#-贡献指南)  
- [许可证](#-许可证)  
- [联系与致谢](#-联系与致谢)

---

## 🎯 项目简介

YanYu Cloud³（简称 Yanyu）是一个面向企业的智能业务管理系统，提供：
- 高性能的数据处理（Redis 缓存、优化查询）
- AI 驱动的异常分析与建议（OpenAI 集成）
- 实时通信（Socket.IO）
- 完整的可观测性（Prometheus + Grafana）
- 多租户、RBAC 及企业级安全策略

---

## ✨ 功能特性

主要功能模块包括：

- 财务对账：CSV 导入/导出、自动对账、异常管理、对账报告（Excel/PDF）、AI 根因分析  
- 工单系统：工单生命周期、SLA 监控、审批流程、实时推送、统计分析  
- 数据中心：实时监控大屏、多维分析、自定义报表、趋势预测、KPI 追踪  
- AI 智能引擎：异常模式识别、自然语言查询、知识库、模型训练与推荐  
- 系统管理：用户/角色/权限、审计日志、系统配置、多租户支持

---

## 🛠 技术栈

前端：Next.js 14、React 18、TypeScript、Tailwind CSS、shadcn/ui、Storybook  
后端：Node.js 20、Express、TypeScript、PostgreSQL 16、Redis 7、Socket.IO、OpenAI SDK  
基础设施：Docker / Docker Compose、Prometheus、Grafana、GitHub Actions、Vercel、Nginx

---

## 📁 完整文件树（概览）

主要模块与目录（已简化）：

- app/ — Next.js App Router（前端入口）  
- backend/ — 后端服务（src/config, services, routes, middleware, tests）  
- components/ — 可复用 React 组件（ui、finance、ai-engine 等）  
- package-ui/, design-system/ — 组件包与设计系统  
- scripts/ — Dockerfile、docker-compose、部署与测试脚本  
- docs/ — 技术文档与部署/集成说明  
- database/ — migrations & seeds  
- .github/ — CI/CD workflow

（仓库内还包含 env 示例、README、LICENSE 等支持文件）

---

## 🚀 快速开始

先决条件：Node.js >= 20、PostgreSQL >= 16、Redis >= 7、pnpm/npm、Docker（可选）、OpenAI API Key

本地开发步骤（示例）：

1. 克隆仓库
   git clone https://github.com/YYC-Cube/yyc3_AI_Management.git
   cd YYC-AI-management

2. 安装依赖（前端/根）
   npm install

3. 后端依赖
   cd backend && npm install && cd ..

4. 配置环境变量
   cp .env.example .env
   cp backend/.env.example backend/.env
   填写必要变量（数据库、Redis、JWT、OPENAI_API_KEY 等）

5. 启动数据库（Docker）
   docker-compose -f scripts/docker-compose.dev.yml up -d postgres redis

6. 运行数据库迁移与种子
   cd backend
   npm run migrate
   npm run seed
   cd ..

7. 启动后端
   cd backend && npm run dev

8. 启动前端（新终端）
   npm run dev

9. 启动 Storybook（可选）
   npm run storybook

---

## ⚙️ 环境配置（示例）

前端 (.env)
- NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
- NEXT_PUBLIC_ENV=development
- NEXT_PUBLIC_WS_URL=ws://localhost:3001

后端 (backend/.env)
- PORT=3001
- NODE_ENV=development
- DB_HOST=localhost
- DB_PORT=5432
- DB_NAME=yanyu_cloud
- DB_USER=postgres
- DB_PASSWORD=your_secure_password
- REDIS_HOST=localhost
- REDIS_PORT=6379
- JWT_SECRET=your_jwt_secret_key_min_32_characters
- OPENAI_API_KEY=sk-xxxx
- FRONTEND_BASE_URL=http://localhost:3000

请勿把真实密钥提交到仓库，生产环境使用 CI/Secrets 管理。

---

## 📡 API 接口文档（概览）

基础 URL：
- 开发：http://localhost:3001/api
- 生产：https://api.yanyu-cloud.com/api

认证：所有请求在 Header 携带 JWT
Authorization: Bearer <token>

常见接口（部分示例）：
- GET /api/reconciliation/records — 获取对账记录列表
- POST /api/reconciliation/records — 创建对账记录
- POST /api/reconciliation/auto-reconcile — 执行自动对账
- POST /api/csv-import/upload — 上传 CSV（multipart/form-data）
- POST /api/ai-analysis/analyze/:recordId — AI 分析单条异常
- GET /api/tickets — 获取工单列表
- POST /api/tickets — 创建工单
- WebSocket：通过 Socket.IO 连接并监听 notification、ticket:update、reconciliation:update 等事件

错误响应统一格式：
{
  "success": false,
  "error": { "code": "...", "message": "...", "details": [...] }
}

常见错误码：UNAUTHORIZED(401), FORBIDDEN(403), NOT_FOUND(404), VALIDATION_ERROR(400), RATE_LIMIT_EXCEEDED(429), INTERNAL_ERROR(500)

（完整接口与示例在 docs/ 或后台 routes 文件夹中）

---

## 🗄️ 数据库设计（重点表）

示例表：
- reconciliation_records（对账记录）
- reconciliation_exceptions（异常记录）
- tickets（工单）
- users（用户）

推荐索引：transaction_date、status、customer_name、record_id、assigned_to、created_at 等。

---

## 🧪 测试指南

单元测试（后端）：
cd backend
npm test
生成 coverage：npm test -- --coverage

集成测试：
npm run test:integration

性能测试：
k6 run backend/performance/k6-load-test.js

E2E（Playwright）：
npm run test:e2e

测试覆盖率目标：总体 >= 90%

---

## 🚀 部署指南

开发部署（Docker Compose）：
docker-compose -f scripts/docker-compose.dev.yml up -d

生产部署（示例）：
- Docker 镜像构建：docker build -t yanyu-cloud3-backend -f scripts/Dockerfile .
- 使用 docker-compose.prod.yml 启动
- 或构建静态前端并在传统主机上运行后端（pm2 管理）

Nginx 反向代理示例（提供 WebSocket 支持）见 docs.

生产环境务必使用强密码、密钥管理与 HTTPS。

---

## 📊 监控与运维

Prometheus 指标示例：
- http_requests_total, http_request_duration_seconds
- db_pool_size, redis_memory_usage_bytes
- cache_hit_rate, websocket_connections_total
- ai_analysis_requests_total

Grafana：导入 scripts/grafana-dashboard.json 作为监控面板。

告警规则示例（Prometheus）包括高错误率、连接池耗尽、缓存命中率低等。

日志管理：Winston（后端），日志等级 INFO/WARN/ERROR/DEBUG。容器日志通过 docker-compose logs 查看或集中式日志系统收集。

---

## 🤝 贡献指南

开发流程：
- Fork → 新分支（feature/xxx）→ 提交 → PR  
- 提交信息遵循 Conventional Commits（feat/fix/docs/...）  
- 所有新功能需包含单元测试与文档更新

代码规范：
- TypeScript、ESLint、Prettier（仓库内配置）  
- 命名与风格：文件 kebab-case、类 PascalCase、函数 camelCase

---

## 🔒 安全策略

安全措施包括 RBAC、JWT 认证、敏感数据加密、HTTPS、审计日志与安全事件响应流程（请参见 SECURITY.md）。漏洞报告：admin@0379.email（24小时确认，72小时提供初步评估）。

---

## 📄 许可证

本项目采用 MIT 许可证，详见 LICENSE 文件。

---

## 📞 联系与致谢

- 仓库：[https://github.com/YYC-Cube/yyc3_AI_Management.git]
- 反馈：Issues / Discussions（仓库页面）  
- 邮箱：admin@0379.email

感谢 Next.js、Express、PostgreSQL、Redis、OpenAI、shadcn/ui、Socket.IO、Tailwind CSS 等开源项目。

Built with ❤️ by YYC-Cube Team
