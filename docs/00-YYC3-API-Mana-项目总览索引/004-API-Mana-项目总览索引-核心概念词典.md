---
file: 004-API-Mana-项目总览索引-核心概念词典.md
description: YYC³项目核心术语表 · 概念定义、缩写说明、技术词汇解释
author: YanYuCloudCube Team <admin@0379.email>
version: v3.0.0
created: 2026-05-03
updated: 2026-05-03
status: published
tags: [术语表],[概念词典],[Glossary]
category: general
language: zh-CN
checksum: d4e5f6g7h8i9j0k1
trace_id: TRC-20260503004
---

> ***YanYuCloudCube***
> *言启象限 | 语枢未来*
> ***Words Initiate Quadrants, Language Serves as Core for Future***
> *万象归元于云枢 | 深栈智启新纪元*
> ***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***

---

# YYC³ 核心概念词典

## 核心理念

**五高架构**：高可用 | 高性能 | 高安全 | 高扩展 | 高智能
**五标体系**：标准化 | 规范化 | 自动化 | 可视化 | 智能化
**五化转型**：流程化 | 数字化 | 生态化 | 工具化 | 服务化
**五维评估**：时间维 | 空间维 | 属性维 | 事件维 | 关联维

---

## 一、YYC³ 核心术语 (Core Concepts)

### 1.1 YYC³ 定义与理念

| 术语 | 英文全称 | 定义 | 示例/备注 |
|------|----------|------|-----------|
| **YYC³** | **YanYu Cloud Cube³** | 言云立方体 - 本项目的品牌标识，代表"言启象限·语枢未来"的理念 | 品牌名，发音: /waɪ-waɪ-siː/ |
| **YanYuCloudCube** | - | 言启象限 - 项目正式名称，寓意语言开启四象限空间 | 文档头部品牌标识 |
| **五高架构** | Five-High Architecture | 高可用、高性能、高安全、高扩展、高智能 | 项目技术目标 |
| **五标体系** | Five-Standard System | 标准化、规范化、自动化、可视化、智能化 | 项目管理标准 |
| **五化转型** | Five-Transformation | 流程化、数字化、生态化、工具化、服务化 | 业务转型方向 |
| **五维评估** | Five-Dimension Assessment | 时间维、空间维、属性维、事件维、关联维 | 评估方法论 |

### 1.2 核心理念详解

#### 🏗️ 五高架构 (Five-High Architecture)

```
┌─────────────────────────────────────────────┐
│              五高架构全景图                    │
├──────────┬──────────┬──────────┬──────────┬───┤
│  高可用   │  高性能   │  高安全   │  高扩展   │ 高智能│
│ HA       │ HP       │ HS       │ HE       │ HI  │
├──────────┼──────────┼──────────┼──────────┼───┤
│ 99.9%+   │ P95<2s   │ 企业级    │ 水平扩展  │ AI  │
│ 在线率    │ 响应时间  │ 安全防护  │ 弹性伸缩  │ 赋能 │
│ 容灾备份  │ 缓存优化  │ 数据加密  │ 微服务   │ 预测 │
│ 自动恢复  │ CDN加速  │ 权限控制  │ 消息队列  │ 推荐 │
└──────────┴──────────┴──────────┴──────────┴───┘
```

| 高度 | 英文缩写 | 目标指标 | 实现方式 |
|------|----------|----------|----------|
| **高可用 (HA)** | High Availability | 99.9%+ SLA | Docker容器化 + 健康检查 |
| **高性能 (HP)** | High Performance | P95 < 2s | Redis缓存 + 连接池 |
| **高安全 (HS)** | High Security | 企业级防护 | JWT + RBAC + 加密 |
| **高扩展 (HE)** | High Extensibility | 支持水平扩展 | 微服务 + 负载均衡 |
| **高智能 (HI)** | High Intelligence | AI辅助决策 | GPT-4o + 智能推荐 |

#### 📋 五标体系 (Five-Standard System)

| 标准 | 定义 | 工具/实践 |
|------|------|-----------|
| **标准化** | 统一代码和文档格式 | ESLint, Prettier, YYC³模板 |
| **规范化** | 遵循行业最佳实践 | Conventional Commits, SemVer |
| **自动化** | 减少人工干预 | CI/CD, 自动测试 |
| **可视化** | 直观的状态展示 | 监控仪表盘, 日志平台 |
| **智能化** | AI赋能提效 | AI代码审查, 智能文档生成 |

#### 🔄 五化转型 (Five-Transformation)

| 转型 | 目标 | 当前状态 |
|------|------|----------|
| **流程化** | 业务流程数字化 | ✅ 工作流引擎已实现 |
| **数字化** | 数据资产化管理 | ✅ 数据模型完善 |
| **生态化** | 构建插件生态 | 🔄 组件库开发中 |
| **工具化** | 提供CLI工具链 | ✅ yyc3 CLI已集成 |
| **服务化** | 文档即服务 | ✅ 本文档体系已建立 |

#### 📊 五维评估 (Five-Dimension Assessment)

| 维度 | 评估内容 | 应用场景 |
|------|----------|----------|
| **时间维** | 版本迭代时间线 | CHANGELOG.md |
| **空间维** | 文档存储分布 | 十阶段目录结构 |
| **属性维** | 文档质量属性 | 元数据标签系统 |
| **事件维** | 变更事件追踪 | Git History |
| **关联维** | 文档依赖关系 | 关联引用链 |

---

## 二、技术栈术语 (Technology Stack)

### 2.1 前端技术

| 术语 | 全称 | 说明 | 版本要求 |
|------|------|------|----------|
| **Next.js** | Next.js Framework | React全栈框架，支持SSR/SSG/App Router | >=16.x |
| **React** | React Library | Facebook开发的UI组件库 | >=19.x |
| **TypeScript** | TypeScript Language | JavaScript超集，提供类型系统 | >=5.3 |
| **Tailwind CSS** | Tailwind CSS | 原子化CSS框架 | latest |
| **App Router** | Application Router | Next.js的新路由系统 (基于文件) | Next.js 13+ |
| **Server Components** | React Server Components | 服务端渲染组件 (零JS) | React 19+ |
| **Client Components** | 'use client' | 客户端交互组件 | React 19+ |

### 2.2 后端技术

| 术语 | 全称 | 说明 | 版本要求 |
|------|------|------|----------|
| **Express.js** | Express Web Framework | Node.js HTTP服务器框架 | >=4.18 |
| **PostgreSQL** | PostgreSQL RDBMS | 开源关系型数据库 | >=15.0 |
| **Redis** | Redis In-Memory DB | 内存数据库，用于缓存/消息队列 | >=7.0 |
| **Socket.io** | Socket.io Library | WebSocket实时通信库 | >=4.7 |
| **Prisma** | Prisma ORM | 现代化Node.js ORM | >=5.x |
| **JWT** | JSON Web Token | 无状态认证令牌标准 | - |
| **bcrypt** | bcrypt hashing | 密码哈希算法 | - |

### 2.3 AI与DevOps

| 术语 | 全称 | 说明 | 备注 |
|------|------|------|------|
| **OpenAI API** | OpenAI Application Interface | GPT-4o等AI模型的API接口 | 需要API Key |
| **GPT-4o** | Generative Pre-trained Transformer 4 Omni | 多模态AI模型 | 支持文本/图像/音频 |
| **Docker** | Docker Container Platform | 容器化部署平台 | >=24.0 |
| **GitHub Actions** | GitHub CI/CD Service | GitHub内置CI/CD流水线 | - |
| **Nginx** | Nginx Web Server | 反向代理/负载均衡 | 生产环境 |
| **Winston** | Winston Logger | Node.js日志库 | 后端使用 |

---

## 三、项目结构术语 (Project Structure)

### 3.1 目录结构

| 路径 | 用途 | 类型 |
|------|------|------|
| `app/` | Next.js App Router前端代码 | 前端源码 |
| `backend/` | Express.js后端服务代码 | 后端源码 |
| `package-ui/` | @yyc3/ui组件库包 | 组件库 |
| `docs/` | 文档中心 (YYC³十阶段) | 文档 |
| `tests/` | 测试套件 (Jest + Playwright) | 测试 |
| `.github/workflows/` | CI/CD配置文件 | DevOps |
| `public/` | 静态资源文件 | 静态资源 |

### 3.2 文件命名规范

| 格式 | 示例 | 适用场景 |
|------|------|----------|
| `{编号}-{阶段}-{模块}-{名称}.md` | `001-API-Mana-项目总览索引-项目总览手册.md` | 文档文件 |
| `{name}.tsx` | `DashboardPage.tsx` | React组件 |
| `{name}.route.ts` | `api/users/route.ts` | API路由 |
| `{name}.service.ts` | `userService.ts` | 服务层 |
| `{name}.controller.ts` | `userController.ts` | 控制器层 |

### 3.3 配置文件

| 文件 | 用途 | 位置 |
|------|------|------|
| `.env.local` | 本地环境变量 | 项目根目录 |
| `.env.example` | 环境变量模板 | 项目根目录 |
| `package.json` | 前端依赖与脚本 | 项目根目录 |
| `backend/package.json` | 后端依赖与脚本 | backend/ |
| `tsconfig.json` | TypeScript配置 | 项目根目录 |
| `tailwind.config.ts` | Tailwind CSS配置 | 项目根目录 |
| `Dockerfile` | Docker镜像构建 | 项目根目录 |
| `docker-compose.yml` | Docker编排配置 | 项目根目录 |

---

## 四、开发流程术语 (Development Workflow)

### 4.1 Git工作流

| 术语 | 说明 | 使用场景 |
|------|------|----------|
| **main/master** | 主分支，生产环境代码 | 正式发布 |
| **develop** | 开发分支，开发环境代码 | 功能合并 |
| **feature/** | 功能分支 | 新功能开发 |
| **hotfix/** | 热修复分支 | 紧急Bug修复 |
| **release/** | 发布分支 | 版本发布准备 |

### 4.2 Commit规范 (Conventional Commits)

| 类型 | 格式 | 用途 |
|------|------|------|
| `feat:` | feat: add user login feature | 新功能 |
| `fix:` | fix: resolve database connection error | Bug修复 |
| `docs:` | docs: update README installation guide | 文档更新 |
| `style:` | style: format code with prettier | 代码格式调整 |
| `refactor:` | refactor: simplify auth middleware | 重构(不改变功能) |
| `test:` | test: add unit tests for userService | 测试相关 |
| `chore:` | chore: update dependencies | 构建/工具变更 |

**示例完整Commit**:
```bash
git commit -m "feat(auth): implement JWT token refresh mechanism

- Add refresh token endpoint POST /api/auth/refresh
- Implement token rotation logic
- Add unit tests for refresh flow

Closes #123"
```

### 4.3 分支策略示例

```
main (生产)
 └── develop (开发)
      ├── feature/user-auth (功能分支)
      ├── feature/dashboard-chart (功能分支)
      ├── hotfix/security-patch (热修复)
      └── release/v0.1.0 (发布分支)
```

---

## 五、质量保证术语 (Quality Assurance)

### 5.1 测试类型

| 类型 | 工具 | 覆盖范围 | 运行命令 |
|------|------|----------|----------|
| **单元测试** | Jest | 函数/组件级别 | `npm run test` |
| **E2E测试** | Playwright | 用户流程级 | `npm run test:e2e` |
| **集成测试** | Jest + Supertest | API接口级 | `npm run test:integration` |
| **组件测试** | Jest + Testing Library | UI组件级 | `npm run test:components` |

### 5.2 代码质量指标

| 指标 | 定义 | 目标值 | 当前值 |
|------|------|--------|--------|
| **Test Coverage** | 测试覆盖率 | ≥80% | 59.3% |
| **Code Quality Score** | 代码质量评分 | ≥85 | 83.7 |
| **Type Coverage** | TypeScript类型覆盖 | ≥90% | ~95% |
| **ESLint Errors** | Lint错误数 | 0 | 少量警告 |

### 5.3 CI/CD流水线

| 阶段 | 名称 | 执行内容 | 触发条件 |
|------|------|----------|----------|
| **Lint** | 代码检查 | ESLint + Prettier | 每次Push |
| **TypeCheck** | 类型检查 | tsc --noEmit | 每次Push |
| **Test** | 单元测试 | Jest --coverage | 每次Push |
| **Build** | 构建 | next build | PR/Merge |
| **Deploy** | 部署 | Docker push + Deploy | main merge |

---

## 六、安全术语 (Security)

### 6.1 认证授权

| 术语 | 说明 | 实现 |
|------|------|------|
| **JWT** | JSON Web Token - 无状态认证令牌 | jsonwebtoken库 |
| **Access Token** | 访问令牌 - 短期有效 (15min) | 登录时颁发 |
| **Refresh Token** | 刷新令牌 - 长期有效 (7天) | 用于获取新Access Token |
| **RBAC** | Role-Based Access Control - 基于角色的访问控制 | 中间件实现 |
| **bcrypt** | 密码哈希算法 - 单向加密 | 密码存储 |

### 6.2 安全最佳实践

| 实践 | 说明 | 优先级 |
|------|------|--------|
| **输入验证** | 所有用户输入必须校验和清理 | 🔴 P0 |
| **SQL注入防护** | 使用参数化查询/ORM | 🔴 P0 |
| **XSS防护** | 输出编码、CSP头 | 🔴 P0 |
| **CSRF防护** | SameSite Cookie、Token验证 | 🟡 P1 |
| **速率限制** | API调用频率限制 | 🟡 P1 |
| **HTTPS强制** | 生产环境必须TLS | 🔴 P0 |

---

## 七、运维术语 (Operations)

### 7.1 部署模式

| 模式 | 说明 | 适用场景 |
|------|------|----------|
| **Development** | 开发环境 | 本地开发调试 |
| **Staging** | 预发布环境 | 测试验证 |
| **Production** | 生产环境 | 正式上线 |

### 7.2 监控指标

| 指标 | 说明 | 告警阈值 |
|------|------|----------|
| **Uptime** | 服务在线率 | <99% |
| **Response Time** | API响应时间 (P95) | >2000ms |
| **Error Rate** | 错误率 | >1% |
| **CPU Usage** | CPU使用率 | >80% |
| **Memory Usage** | 内存使用率 | >85% |
| **Disk Usage** | 磁盘使用率 | >80% |

### 7.3 日志级别

| 级别 | 用途 | 示例 |
|------|------|------|
| **ERROR** | 错误信息 | 数据库连接失败 |
| **WARN** | 警告信息 | API响应慢 |
| **INFO** | 一般信息 | 请求处理完成 |
| **DEBUG** | 调试信息 | 变量值输出 |
| **HTTP** | HTTP访问日志 | GET /api/users 200 |

---

## 八、文档规范术语 (Documentation)

### 8.1 文档状态

| 状态 | 含义 | 图标 |
|------|------|------|
| **draft** | 草稿，内容待完善 | 🔄 |
| **review** | 待审核 | 👁️ |
| **published** | 已发布，可公开阅读 | ✅ |
| **archived** | 已归档，仅供参考 | 📦 |
| **deprecated** | 已废弃，不建议使用 | ⚠️ |

### 8.2 文档优先级

| 优先级 | 含义 | 标记 |
|--------|------|------|
| **P0** | 必读/最高优先级 | 🔴 |
| **P1** | 高优先级/推荐 | 🟡 |
| **P2** | 一般优先级/按需 | 🟢 |
| **P3** | 低优先级/可选 | ⚪ |

### 8.3 文档元数据字段

| 字段 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `file` | ✅ | 文件名 | `001-xxx.md` |
| `description` | ✅ | 描述 (≤50字) | "项目总览手册" |
| `author` | ✅ | 作者及邮箱 | `Team <admin@0379.email>` |
| `version` | ✅ | 语义化版本 | `v3.0.0` |
| `created` | ✅ | 创建日期 | `2026-05-03` |
| `updated` | ✅ | 更新日期 | `2026-05-03` |
| `status` | ✅ | 文档状态 | `published` |
| `tags` | ✅ | 标签列表 | `[标签1],[标签2]` |
| `category` | ✅ | 分类 | `general/technical/api/project` |
| `language` | ✅ | 语言 | `zh-CN` |
| `checksum` | ✅ | 内容校验和 (16位) | `a1b2c3d4e5f6g7h8` |
| `trace_id` | ✅ | 追溯ID | `TRC-20260503001` |

---

## 九、常用缩写速查表 (Abbreviations)

| 缩写 | 全称 | 中文含义 |
|------|------|----------|
| **API** | Application Programming Interface | 应用程序接口 |
| **CLI** | Command Line Interface | 命令行界面 |
| **CRUD** | Create Read Update Delete | 增删改查 |
| **CRON** | Cron Job | 定时任务 |
| **CSS** | Cascading Style Sheets | 层叠样式表 |
| **DOM** | Document Object Model | 文档对象模型 |
| **DTO** | Data Transfer Object | 数据传输对象 |
| **E2E** | End-to-End | 端到端 |
| **FAQ** | Frequently Asked Questions | 常见问题 |
| **GUI** | Graphical User Interface | 图形用户界面 |
| **HTML** | HyperText Markup Language | 超文本标记语言 |
| **HTTP** | Hypertext Transfer Protocol | 超文本传输协议 |
| **IDE** | Integrated Development Environment | 集成开发环境 |
| **JSON** | JavaScript Object Notation | JavaScript对象表示法 |
| **ORM** | Object-Relational Mapping | 对象关系映射 |
| **PR** | Pull Request | 合并请求 |
| **REST** | Representational State Transfer | 表述性状态转移 |
| **SDK** | Software Development Kit | 软件开发工具包 |
| **SLA** | Service Level Agreement | 服务等级协议 |
| **SQL** | Structured Query Language | 结构化查询语言 |
| **SSL/TLS** | Secure Socket Layer / Transport Layer Security | 安全传输层协议 |
| **UI** | User Interface | 用户界面 |
| **UX** | User Experience | 用户体验 |
| **URL** | Uniform Resource Locator | 统一资源定位符 |
| **UUID** | Universally Unique Identifier | 通用唯一识别码 |
| **VM** | Virtual Machine | 虚拟机 |
| **WSL** | Windows Subsystem for Linux | Windows子系统Linux |
| **YAML** | YAML Ain't Markup Language | YAML数据序列化格式 |

---

## 十、快速参考卡片

### 🎯 最常使用的10个命令

```bash
# 开发相关
npm run dev              # 启动前端开发服务器
cd backend && npm run dev # 启动后端服务器
npm run test             # 运行单元测试
npm run lint              # 代码检查

# Git相关
git status               # 查看状态
git add . && git commit -m "type: description"
git push origin branch-name
git checkout -b feature/new-feature

# Docker相关
docker-compose up -d     # 启动所有服务
docker-compose logs -f   # 查看日志
docker-compose down      # 停止所有服务
```

### 📝 最常用的10个文件路径

| 文件 | 用途 |
|------|------|
| `.env.local` | 环境变量配置 |
| `app/page.tsx` | 首页组件 |
| `backend/src/server.ts` | 后端入口 |
| `package.json` | 前端依赖 |
| `backend/package.json` | 后端依赖 |
| `tsconfig.json` | TS配置 |
| `tailwind.config.ts` | Tailwind配置 |
| `Dockerfile` | Docker构建 |
| `docker-compose.yml` | 编排配置 |
| `README.md` | 项目主页 |

---

## 文档追溯信息

| 属性 | 值 |
|------|-----|
| **文档版本** | v3.0.0 |
| **创建日期** | 2026-05-03 |
| **更新日期** | 2026-05-03 |
| **内容校验** | d4e5f6g7h8i9j0k1 |
| **追溯ID** | TRC-20260503004 |
| **关联文档** | [001-项目总览手册](./001-API-Mana-项目总览索引-项目总览手册.md), [002-文档架构导航](./002-API-Mana-项目总览索引-文档架构导航.md), [YYC3-核心机制-五高五标五化五维](../YYC3-团队通用-标准规范/YYC3-核心机制-五高五标五化五维.md) |
| **文档状态** | ✅ published (已发布) |
| **下次审查** | 2026-06-03 |

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***」

**© 2025-2026 YYC³ Team. All Rights Reserved.**

*文档生成时间: 2026-05-03T17:15:00Z | 模板版本: v3.0.0 | 引擎: YYC3TemplateEngine*

</div>
