> ***YanYuCloudCube***
> *言启象限 | 语枢未来*
> ***Words Initiate Quadrants, Language Serves as Core for Future***
> *万象归元于云枢 | 深栈智启新纪元*
> ***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 🌟 YanYu Cloud³ AI管理平台

<p align="center">
  <strong>万象归元于云枢 · 深栈智启新纪元</strong><br>
  <em>Words Initiate Quadrants, Language Serves as Core for Future</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.3-3178C6" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js->=18.0.0-339933" alt="Node.js" />
  <img src="https://img.shields.io/badge/PostgreSQL-15-4169E1" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Redis-ioredis-DC382D" alt="Redis" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
</p>

---

## 📖 目录

- [项目简介](#项目简介)
- [✨ 核心特性](#-核心特性)
- [🛠️ 技术栈](#️-技术栈)
- [🚀 快速开始](#-快速开始)
- [📁 项目结构](#-项目结构)
- [🔌 API概览](#-api概览)
- [🧪 测试](#-测试)
- [🐳 Docker部署](#-docker部署)
- [📚 文档中心](#-文档中心)
- [🤝 贡献指南](#-贡献指南)
- [📄 许可证](#-许可证)

---

## 项目简介

**YanYu Cloud³ (YYC³)** 是一个企业级 **AI驱动的智能业务管理平台**，采用前后端分离架构，集成工作流引擎、AI智能分析、实时通信等核心能力，为企业提供数字化转型的一站式解决方案。

### 设计理念

- **五维驱动**: 以技术、业务、数据、体验、安全五个维度驱动产品演进
- **五高标准**: 高可用、高性能、高安全、高扩展、高易用
- **五标规范**: 标准化代码、标准化流程、标准化文档、标准化测试、标准化部署
- **五化落地**: 自动化、智能化、可视化、平台化、生态化

---

## ✨ 核心特性

### 🔄 智能工作流引擎
- 可视化流程设计器
- 多级审批流程
- 实例管理与监控
- 任务分配与跟踪
- 统计分析与报表

### 🤖 AI智能分析
- OpenAI GPT-4o 集成
- 工单智能分类与优先级判断
- 异常检测与趋势预测
- 批量数据分析
- 自然语言交互

### 💰 财务对账系统
- 自动化对账引擎
- 异常识别与标记
- AI辅助异常分析
- 多维度报表
- CSV导入导出

### 📡 实时通信
- WebSocket双向通信
- 实时通知推送
- 频道订阅机制
- 连接状态管理

### 📊 数据可视化
- 多维度图表展示
- 实时数据监控
- KPI指标卡片
- 数据预警系统
- 响应式图表适配

### 🌍 国际化支持
- 多语言切换 (i18n)
- RTL布局支持
- 本地化日期/数字格式
- 动态语言包加载

### 📱 移动端优化
- 响应式设计
- 触摸友好交互
- PWA支持
- 安全区域适配
- 手势操作优化

### 🔐 企业级安全
- JWT身份认证
- RBAC权限控制
- 请求速率限制
- Helmet安全头
- SQL注入防护
- XSS防护

---

## 🛠️ 技术栈

### 前端技术

| 技术 | 版本 | 用途 |
|------|------|------|
| [Next.js](https://nextjs.org/) | 16 | React全栈框架 (App Router) |
| [React](https://react.dev/) | 19 | UI组件库 |
| [TypeScript](https://www.typescriptlang.org/) | 5.3 | 类型安全 |
| [Tailwind CSS](https://tailwindcss.com/) | latest | 原子化CSS框架 |
| [@yyc3/ui](./package-ui/) | 2.0.0 | 自定义企业级组件库 |
| [Radix UI](https://www.radix-ui.com/) | latest | 无障碍UI原语 |
| [TanStack Table](https://tanstack.com/table) | 8.x | 表格组件 |
| [Storybook](https://storybook.js.org/) | latest | 组件开发环境 |

### 后端技术

| 技术 | 版本 | 用途 |
|------|------|------|
| [Express.js](https://expressjs.com/) | 4.18 | HTTP服务器框架 |
| [TypeScript](https://www.typescriptlang.org/) | 5.3 | 类型安全 |
| [PostgreSQL](https://www.postgresql.org/) | 15 | 关系型数据库 |
| [Redis](https://redis.io/) | - | 缓存/会话存储 |
| [Socket.io](https://socket.io/) | 4.7 | WebSocket实时通信 |
| [OpenAI API](https://openai.com/api) | GPT-4o | AI智能分析 |
| [JWT](https://jwt.io/) | - | 身份认证 |
| [Winston](https://github.com/winstonjs/winston) | 3.x | 日志系统 |
| [Prometheus](https://prometheus.io/) | - | 监控指标 |

### 开发工具

| 工具 | 用途 |
|------|------|
| Jest | 单元/集成测试框架 |
| Playwright | E2E测试框架 |
| ESLint | 代码检查 |
| TypeScript Compiler | 类型检查 |
| Docker | 容器化部署 |
| GitHub Actions | CI/CD流水线 |

---

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 18.0.0 (推荐 LTS 版本)
- **npm**: >= 9.0.0 或 pnpm >= 8.0.0
- **PostgreSQL**: >= 15.0
- **Redis**: >= 7.0
- **Git**: 最新版本

### 1. 克隆仓库

```bash
git clone https://github.com/YYC-Cube/yyc3-AI-Management.git
cd yyc3-AI-Management
```

### 2. 安装依赖

```bash
# 安装根依赖（包含前端）
npm install

# 安装后端依赖
cd backend && npm install && cd ..

# 安装UI组件库依赖（如需开发）
cd package-ui && npm install && cd ..
```

### 3. 环境配置

```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑配置文件，填入实际值
# 必须修改的配置项：
# - DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
# - REDIS_HOST, REDIS_PORT, REDIS_PASSWORD
# - JWT_SECRET (必须使用强密钥!)
# - OPENAI_API_KEY (如需AI功能)
```

**重要提示**: `.env.example` 中的所有示例值（特别是 `JWT_SECRET`）**必须替换为真实值**才能用于生产环境！

### 4. 数据库初始化

```bash
# 运行数据库迁移
npm run migrate

# 填充种子数据（可选）
npm run seed
```

### 5. 启动开发服务

```bash
# 终端1: 启动后端服务 (端口 3001)
cd backend && npm run dev

# 终端2: 启动前端服务 (端口 3000)
npm run dev
```

访问 http://localhost:3000 查看应用

### 6. 环境验证

```bash
# 测试数据库连接
npm run env:test-db

# 测试 Redis 连接
npm run env:test-redis

# 完整环境检查
npm run env:test-all

# 生成环境配置报告
npm run env:report
```

---

## 📁 项目结构

```
yyc3-AI-Management/
├── app/                          # Next.js App Router 页面
│   ├── workflow/                # 工作流模块
│   │   ├── approval/            # 审批流程
│   │   ├── designer/            # 流程设计器
│   │   ├── instances/           # 实例管理
│   │   ├── overview/            # 总览面板
│   │   ├── statistics/          # 统计分析
│   │   └── tasks/               # 任务管理
│   ├── globals.css              # 全局样式
│   ├── layout.tsx               # 根布局
│   └── page.tsx                 # 首页
│
├── backend/src/                 # Express 后端服务
│   ├── config/                  # 配置模块
│   │   ├── database.ts          # 数据库连接池
│   │   ├── logger.ts            # Winston日志
│   │   ├── metrics.ts           # Prometheus指标
│   │   ├── redis.ts             # Redis配置
│   │   └── security.ts          # 安全配置
│   ├── routes/                  # API路由 (11个)
│   │   ├── auth.routes.ts       # 认证接口
│   │   ├── tickets.routes.ts    # 工单接口
│   │   ├── reconciliation.routes.ts  # 对账接口
│   │   ├── ai-analysis.routes.ts     # AI分析接口
│   │   └── ...
│   ├── services/                # 业务服务层 (20+)
│   │   ├── ticket.service.ts    # 工单服务
│   │   ├── ai-analysis.service.ts    # AI分析服务
│   │   ├── openai.service.ts    # OpenAI集成
│   │   ├── websocket.service.ts # WebSocket服务
│   │   └── ...
│   ├── middleware/              # 中间件 (12个)
│   │   ├── auth.middleware.ts   # JWT认证
│   │   ├── rate-limit.middleware.ts  # 速率限制
│   │   └── ...
│   ├── types/                   # TypeScript类型定义
│   │   ├── api.types.ts         # API类型 (40+接口)
│   │   ├── ticket.ts            # 工单类型
│   │   └── ...
│   └── server.ts               # 服务器入口
│
├── components/                  # React组件库
│   ├── atoms/                   # 基础原子组件
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Badge/
│   ├── business/                # 业务组件
│   ├── workflow/                # 工作流组件
│   ├── data-analysis/           # 数据分析组件
│   ├── design-system/           # 设计系统组件
│   └── mobile/                  # 移动端组件
│
├── package-ui/                  # @yyc3/ui 组件库包
│   ├── src/                     # 组件源码
│   ├── dist/                    # 构建输出
│   └── package.json             # 包配置
│
├── docs/                        # 项目文档
│   ├── README.md                # 文档导航
│   ├── ENVIRONMENT_CONFIG.md    # 环境配置详解
│   ├── TESTING_GUIDE.md         # 测试指南
│   ├── SECURITY_IMPLEMENTATION.md # 安全实现
│   └── YYC3-团队通用-标准规范/  # 团队规范文档
│
├── .github/workflows/           # CI/CD配置
│   ├── ci-cd.yml                # 主流水线
│   ├── test-gate.yml            # 测试门禁
│   └── chromatic.yml            # 视觉回归测试
│
├── docker-compose.yml          # Docker编排 (生产)
├── Dockerfile                  # Docker镜像构建
├── jest.config.js              # Jest测试配置
├── tsconfig.json               # TypeScript配置
├── package.json                # 项目配置
├── CHANGELOG.md                # 更新日志
└── README.md                   # 本文件
```

---

## 🔌 API概览

### 基础信息

- **Base URL**: `http://localhost:3001/api` (开发环境)
- **认证方式**: Bearer Token (JWT)
- **响应格式**: JSON

### 核心API端点

#### 认证模块 `/api/auth`
| 方法 | 端点 | 描述 |
|------|------|------|
| POST | `/auth/register` | 用户注册 |
| POST | `/auth/login` | 用户登录 |
| POST | `/auth/refresh` | 刷新Token |
| GET | `/auth/profile` | 获取用户信息 |

#### 工单模块 `/api/tickets`
| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/tickets` | 获取工单列表 |
| POST | `/tickets` | 创建工单 |
| GET | `/tickets/:id` | 获取工单详情 |
| PUT | `/tickets/:id` | 更新工单 |
| DELETE | `/tickets/:id` | 删除工单 |

#### 对账模块 `/api/reconciliation`
| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/reconciliation` | 获取对账记录 |
| POST | `/reconciliation/import` | CSV导入 |
| GET | `/reconciliation/exceptions` | 异常列表 |
| POST | `/reconciliation/:id/analyze` | AI异常分析 |

#### AI分析模块 `/api/ai-analysis`
| 方法 | 端点 | 描述 |
|------|------|------|
| POST | `/ai-analysis/analyze` | 执行AI分析 |
| GET | `/ai-analysis/history` | 分析历史 |
| GET | `/ai-analysis/trends` | 趋势预测 |

#### 其他端点
| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/health` | 健康检查 |
| GET | `/metrics` | Prometheus指标 |
| WS | `/websocket` | WebSocket连接 |

**完整API文档**: 启动后端服务后访问 `http://localhost:3001` 查看自动生成的HTML文档

---

## 🧪 测试

### 测试策略

本项目采用 **三层测试策略**:

1. **单元测试** - 服务层逻辑测试 (Jest)
2. **集成测试** - API端到端测试 (Jest + Supertest)
3. **E2E测试** - 用户流程测试 (Playwright)

### 运行测试

```bash
# 运行所有测试
npm test

# 运行单元测试
npm run test:unit

# 运行集成测试
npm run test:integration

# 运行E2E测试
npm run test:e2e

# 生成覆盖率报告
npm run test:coverage

# 监听模式（开发时使用）
npm run test:watch

# UI模式运行E2E
npm run test:e2e:ui
```

### 覆盖率目标

| 指标 | 当前值 | 目标值 | 状态 |
|------|--------|--------|------|
| Statements | 59.3% | 80%+ | ⚠️ 待提升 |
| Branches | 42.11% | 80%+ | ⚠️ 待提升 |
| Lines | 60.52% | 80%+ | ⚠️ 待提升 |
| Functions | 41.13% | 80%+ | ⚠️ 待提升 |

### 测试文件位置

```
backend/src/
├── __tests__/
│   ├── integration/             # 集成测试
│   │   ├── ai-analysis.integration.test.ts
│   │   ├── tickets.integration.test.ts
│   │   └── reconciliation.integration.test.ts
│   └── ...
└── services/
    └── __tests__/              # 单元测试
        ├── ticket.service.test.ts
        ├── ai-analysis.service.test.ts
        └── ...
```

---

## 🐳 Docker部署

### 快速启动 (开发环境)

```bash
# 使用开发环境配置启动
docker-compose -f scripts/docker-compose.dev.yml up -d
```

### 生产部署

```bash
# 构建生产镜像
docker build -t yyc3-management .

# 使用生产配置启动
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f app
```

### 环境变量

生产环境通过以下方式配置环境变量：

1. **Docker Compose**: 在 `docker-compose.yml` 中使用 `${VAR}` 语法
2. **环境文件**: 创建 `.env.production` 文件
3. **Kubernetes**: 使用 ConfigMap 和 Secret

**必须配置的生产变量**:
- `DATABASE_URL`
- `REDIS_URL`
- `JWT_SECRET` (强随机密钥)
- `OPENAI_API_KEY` (可选)

### 健康检查

```bash
# 检查应用健康状态
curl http://localhost:3000/api/ping

# 检查后端健康状态
curl http://localhost:3001/api/health
```

---

## 📚 文档中心

### 📖 核心文档

| 文档 | 描述 | 适用场景 |
|------|------|----------|
| [**文档导航**](docs/README.md) | 所有文档的索引入口 | 👈 首次访问必读 |
| [**环境配置**](docs/ENVIRONMENT_CONFIG.md) | 环境变量详解、本地/生产配置 | 🚀 环境搭建 |
| [**测试指南**](docs/TESTING_GUIDE.md) | 测试策略、运行命令、覆盖率目标 | 🧪 编写测试 |
| [**安全实现**](docs/SECURITY_IMPLEMENTATION.md) | 认证授权、安全最佳实践 | 🔒 安全审计 |

### 🔧 技术集成文档

| 文档 | 相关模块 |
|------|----------|
| [**AI分析集成**](backend/AI_ANALYSIS_INTEGRATION.md) | 🤖 GPT-4o异常分析 |
| [**Redis缓存**](backend/REDIS_INTEGRATION.md) | ⚡ 缓存架构与性能优化 |
| [**WebSocket通信**](backend/WEBSOCKET_INTEGRATION.md) | 📡 实时通知推送 |

### 📋 团队规范 (YYC³标准)

位于 `docs/YYC3-团队通用-标准规范/`:

| 文档 | 用途 |
|------|------|
| [**开发标准**](docs/YYC3-团队通用-标准规范/YYC3-团队规范-开发标准.md) | 代码规范、提交规范 |
| [**文档闭环**](docs/YYC3-团队通用-标准规范/YYC3-团队规范-文档闭环.md) | 文档维护、版本管理 |
| [**五高五标五化**](docs/YYC3-团队通用-标准规范/YYC3-核心机制-五高五标五化五维.md) | 核心质量保障体系 |
| [**全局审核报告**](docs/YYC3-团队通用-标准规范/YYC3-代码审核-全局审核报告.md) | Code Review规范 |

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！无论是新功能、Bug修复、文档改进还是问题报告。

### 开发流程

1. **Fork** 本仓库
2. **Clone** 到本地: `git clone https://github.com/<your-username>/yyc3-AI-Management.git`
3. **创建分支**: `git checkout -b feature/amazing-feature`
4. **编写代码** 并确保通过所有测试:
   ```bash
   npm run type-check
   npm run lint
   npm test
   ```
5. **Commit** 并遵循[提交规范](docs/YYC3-团队通用-标准规范/YYC3-团队规范-开发标准.md):
   ```bash
   git commit -m "feat(workflow): add approval flow designer"
   ```
6. **Push** 到你的fork: `git push origin feature/amazing-feature`
7. **创建Pull Request** 到 `main` 分支

### 代码规范

- ✅ TypeScript严格模式
- ✅ ESLint检查通过 (`npm run lint`)
- ✅ 类型检查通过 (`npm run type-check`)
- ✅ 新功能需要配套测试
- ✅ 遵循现有代码风格和命名约定

### Commit Message格式

遵循 [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型**:
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具链
- `perf`: 性能优化

**作用域** (示例): `workflow`, `auth`, `api`, `ui`, `docs`

---

## 📊 项目状态

### 最近更新 (2026-05-01)

### 🎉 代码质量大幅提升

- **TypeScript类型系统增强**: 40+ API接口定义，消除165+ `any` 类型
- **ESLint错误清零**: 从17个错误降至0
- **开发体验优化**: 
  - 配置PostgreSQL 15本地开发环境 (端口5434)
  - 修复macOS ARM64兼容性
  - 生成HTML API文档页面

### 📈 测试统计

- **测试套件**: 13个 (8通过, 5待修复)
- **测试用例**: 173个 (155通过, 89.6%通过率)
- **覆盖率**: 59.3% (目标: 80%)

### 🎯 下一步计划

- [ ] 提升测试覆盖率至80%+
- [ ] 修复5个失败测试套件
- [ ] 增加E2E测试覆盖
- [ ] 性能基准测试与优化
- [ ] 监控告警系统集成

---

## 🙏 致谢

感谢以下开源项目和社区：

- [Next.js Team](https://nextjs.org/) - 优秀的React框架
- [React Community](https://react.dev/) - 强大的UI库生态
- [Express.js](https://expressjs.com/) - 简洁的后端框架
- [Radix UI](https://www.radix-ui.com/) - 无障碍UI组件
- [OpenAI](https://openai.com/) - 强大的AI能力

特别感谢 **YanYu Cloud Cube Team** 的持续投入和贡献！

---

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。

```
MIT License

Copyright (c) 2025 YanYu Cloud Cube Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 联系我们

- **邮箱**: admin@0379.email
- **项目地址**: https://github.com/YYC-Cube/yyc3-AI-Management
- **文档中心**: [docs/README.md](docs/README.md)
- **问题反馈**: [GitHub Issues](https://github.com/YYC-Cube/yyc3-AI-Management/issues)

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给一个Star！⭐**

<p align="center">
  <strong>Made with ❤️ by YanYu Cloud³ Team</strong><br>
  <em>言启象限 | 语枢未来</em>
</p>

</div>
