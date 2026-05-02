---
file: 003-API-Mana-项目总览索引-快速开始指南.md
description: YYC³ AI管理平台5分钟快速上手 · 环境搭建、依赖安装、首次运行
author: YanYuCloudCube Team <admin@0379.email>
version: v3.0.0
created: 2026-05-03
updated: 2026-05-03
status: published
tags: [快速开始],[环境配置],[入门]
category: general
language: zh-CN
checksum: c3d4e5f6g7h8i9j0
trace_id: TRC-20260503003
---

> ***YanYuCloudCube***
> *言启象限 | 语枢未来*
> ***Words Initiate Quadrants, Language Serves as Core for Future***
> *万象归元于云枢 | 深栈智启新纪元*
> ***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***

---

# YYC³ AI管理平台 - 快速开始指南

## 核心理念

**五高架构**：高可用 | 高性能 | 高安全 | 高扩展 | 高智能
**五标体系**：标准化 | 规范化 | 自动化 | 可视化 | 智能化
**五化转型**：流程化 | 数字化 | 生态化 | 工具化 | 服务化
**五维评估**：时间维 | 空间维 | 属性维 | 事件维 | 关联维

---

## 一、环境要求

### 1.1 必需软件

| 软件 | 最低版本 | 推荐版本 | 验证命令 |
|------|----------|----------|----------|
| **Node.js** | >=18.0.0 | >=20.11.0 (LTS) | `node --version` |
| **npm** | >=9.0.0 | >=10.2.0 | `npm --version` |
| **Git** | >=2.30.0 | 最新版 | `git --version` |
| **PostgreSQL** | >=15.0 | >=16.0 | `psql --version` |
| **Redis** | >=7.0 | >=7.2 | `redis-server --version` |
| **Docker** (可选) | >=24.0 | 最新版 | `docker --version` |

### 1.2 硬件要求

| 配置项 | 最低要求 | 推荐配置 |
|--------|----------|----------|
| **CPU** | 4核 | 8核+ |
| **内存** | 8GB RAM | 16GB RAM |
| **磁盘空间** | 20GB SSD | 50GB NVMe SSD |
| **网络** | 稳定宽带 | 低延迟网络 |

### 1.3 操作系统支持

- ✅ **macOS** (推荐, 开发环境已验证)
- ✅ **Ubuntu/Debian** (生产环境推荐)
- ✅ **Windows WSL2** (开发可用)
- ⚠️ **Windows Native** (部分功能需额外配置)

---

## 二、三步启动

### Step 1: 克隆仓库与初始化

```bash
# 克隆项目仓库
git clone https://github.com/YYC-Cube/yyc3-AI-Management.git
cd yyc3-AI-Management

# 查看项目结构
ls -la
```

**预期输出**:
```
total 200K
drwxr-xr-x   12 user  staff   384B May  3 16:00 .
drwxr-xr-x    4 user  staff   128B May  3 16:00 ..
-rw-r--r--    1 user  staff  12K  README.md
-rw-r--r--    1 user  staff  2.5K CHANGELOG.md
-rw-r--r--    1 user  staff   58B .gitignore
-rw-r--r--    1 user  staff  1.2K .env.example
drwxr-xr-x   10 user  staff   320B May  3 16:00 app/
drwxr-xr-x   12 user  staff   384B May  3 16:00 backend/
drwxr-xr-x    8 user  staff   256B May  3 16:00 docs/
drwxr-xr-x    4 user  staff   128B May  3 16:00 package-ui/
...
```

### Step 2: 安装依赖与数据库初始化

```bash
# 安装前端依赖 (根目录) - 预计安装1250+个包
npm install

# 预期输出:
# added 1250 packages in 45s

# 安装后端依赖 (backend目录)
cd backend && npm install && cd ..

# 验证安装成功
npx next --version      # 应显示: 16.x.x (Next.js版本)
node -v                 # 应显示: v20.x.x (Node.js版本)
```

#### 2.1 数据库初始化 (重要！)

```bash
# 运行数据库迁移 - 创建表结构
npm run migrate

# 预期输出:
# ✓ Migration completed successfully
# ✓ Created tables: users, tickets, workflows, reconciliations, ...

# (可选) 填充种子数据
npm run seed

# 预期输出:
# ✓ Seeded database with sample data
# ✓ Created admin user: admin@0379.email
```

> ⚠️ **前置条件**: 确保PostgreSQL和Redis服务已启动（见FAQ部分）

**⚠️ 常见问题**:

| 问题 | 解决方案 |
|------|----------|
| `npm install` 超时 | 使用镜像: `npm config set registry https://registry.npmmirror.com` |
| 权限错误 | macOS: `sudo chown -R $(whoami) ~/.npm` |
| node-sass编译失败 | 确保Python3和build-tools已安装 |

### Step 3: 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑环境变量 (使用你喜欢的编辑器)
# 推荐: VS Code / Cursor / vim
code .env.local
```

**必须配置的变量**:

```env
# ===== 必填项 =====
DATABASE_URL=postgresql://user:password@localhost:5432/yyc3_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-super-secret-jwt-key-at-least-32-chars
OPENAI_API_KEY=sk-your-openai-api-key-here

# ===== 可选项 =====
NODE_ENV=development
PORT=3001              # 后端端口
NEXT_PUBLIC_APP_URL=http://localhost:3000  # 前端URL
```

> 📖 **详细环境配置说明**请参阅: [0301-001-环境配置详解.md](../03-YYC3-API-Mana-开发实施阶段/0301-开发环境/0301-001-环境配置详解.md)  
> 📖 **完整环境变量模板**请参考: [.env.example](../../.env.example) (包含所有80+配置项的详细注释)

---

## 三、启动服务

### 3.1 启动后端服务

```bash
# 进入backend目录
cd backend

# 启动开发服务器 (热重载)
npm run dev
```

**预期输出**:
```
> yyc3-backend@0.1.0 dev
> nodemon src/server.ts

[INFO] Server starting...
[INFO] Environment: development
[INFO] Database connected successfully ✓
[INFO] Redis connected successfully ✓
[INFO] Server running on http://localhost:3001 ✓
[INFO] WebSocket server ready on port 3001 ✓
```

**验证后端启动**:
```bash
# 测试API健康检查
curl http://localhost:3001/api/health

# 预期响应:
{"status":"ok","timestamp":"2026-05-03T08:30:00Z","uptime":123}
```

### 3.2 启动前端服务

```bash
# 新开一个终端窗口，回到项目根目录
cd /Users/my/Downloads/yyc3-AI-Management

# 启动Next.js开发服务器
npm run dev
```

**预期输出**:
```
> yyc3-management@0.1.0 dev
> next dev

  ▲ Next.js 16.0.0
  - Local:        http://localhost:3000
  - Network:     http://192.168.x.x:3000
  - Environments: .env.local

✓ Ready in 3.2s
```

### 3.3 访问应用

打开浏览器访问：

| 服务 | URL | 说明 |
|------|-----|------|
| **前端应用** | http://localhost:3000 | Next.js应用主界面 |
| **后端API** | http://localhost:3001 | RESTful API + WebSocket |
| **API文档** | http://localhost:3001/api/docs | Swagger/OpenAPI (如启用) |

**🎉 成功标志**: 你应该能看到YYC³ AI管理平台的登录页面或仪表盘界面。

---

## 四、Hello World 示例

### 4.1 创建第一个API路由

在 `app/api/hello/route.ts` 中创建示例API:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: '🎉 Hello from YYC³ AI Management!',
    timestamp: new Date().toISOString(),
    version: 'v0.1.0',
    status: 'running',
  });
}
```

**测试API**:
```bash
curl http://localhost:3000/api/hello

# 输出:
{
  "message": "🎉 Hello from YYC³ AI Management!",
  "timestamp": "2026-05-03T08:35:00Z",
  "version": "v0.1.0",
  "status": "running"
}
```

### 4.2 创建第一个页面组件

在 `app/page.tsx` 中查看首页实现:

```tsx
'use client';

import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🚀 YYC³ AI Management Platform
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          企业级智能业务管理解决方案
        </p>
        
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">交互测试</h2>
          <button
            onClick={() => setCount(count + 1)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            点击次数: {count}
          </button>
        </div>
      </div>
    </main>
  );
}
```

---

## 五、项目结构速览

```
yyc3-AI-Management/
├── app/                    # Next.js App Router (前端)
│   ├── api/               # API路由 (/api/*)
│   ├── components/        # React组件
│   └── page.tsx           # 首页
│
├── backend/               # Express.js后端服务
│   ├── src/
│   │   ├── routes/       # API路由定义
│   │   ├── services/     # 业务逻辑层
│   │   ├── controllers/  # 控制器
│   │   └── server.ts     # 入口文件
│   └── prisma/            # 数据库Schema
│
├── package-ui/           # @yyc3/ui 组件库
├── docs/                  # 文档中心 (YYC³标准)
├── tests/                 # 测试套件
├── Dockerfile             # 容器化配置
├── docker-compose.yml     # 编排配置
└── .github/workflows/     # CI/CD流水线
```

---

## 六、常用开发命令

### 6.1 核心命令速查表

| 命令 | 用途 | 运行位置 |
|------|------|----------|
| `npm run dev` | 启动前端开发服务器 | 项目根目录 |
| `npm run build` | 构建前端生产版本 | 项目根目录 |
| `npm run lint` | ESLint代码检查 | 项目根目录 |
| `npm run test` | 运行Jest单元测试 | 项目根目录 |
| `npm run test:e2e` | 运行Playwright E2E测试 | 项目根目录 |
| `cd backend && npm run dev` | 启动后端服务器 | backend/ |
| `cd backend && npm run test` | 运行后端测试 | backend/ |
| `cd backend && npm run typecheck` | TypeScript类型检查 | backend/ |

### 6.2 Docker一键启动 (可选)

如果你已经安装Docker，可以使用容器化方式运行：

```bash
# 启动所有服务 (前端+后端+数据库+Redis)
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止所有服务
docker-compose down
```

> 📖 **详细Docker部署方案**请参阅: [0507-001-部署故障排查指南.md](../05-YYC3-API-Mana-交付部署阶段/0507-交付物管理/0507-001-部署故障排查指南.md)

---

## 七、下一步行动

### 🎯 新手路线图 (按顺序完成)

| 步骤 | 任务 | 预计时间 | 参考文档 |
|------|------|----------|----------|
| ✅ | **环境搭建** (本文档) | 15分钟 | - |
| 🔲 | **阅读项目总览手册** | 20分钟 | [001-项目总览手册.md](./001-API-Mana-项目总览索引-项目总览手册.md) |
| 🔲 | **理解技术架构** | 30分钟 | [002-文档架构导航.md](./002-API-Mana-项目总览索引-文档架构导航.md) |
| 🔲 | **运行测试套件** | 10分钟 | [0401-001-测试指南.md](../04-YYC3-API-Mana-测试审核阶段/0401-测试策略/0401-001-测试指南.md) |
| 🔲 | **学习编码规范** | 25分钟 | [YYC3-团队规范-开发标准.md](../YYC3-团队通用-标准规范/YYC3-团队规范-开发标准.md) |
| 🔲 | **尝试第一个Feature** | 1小时 | [03-开发实施阶段](../03-YYC3-API-Mana-开发实施阶段/) |

### 📚 推荐阅读顺序

```
必读 (P0):
  ├─ 本文档 (快速开始)
  ├─ README.md (项目主页)
  └─ 001-项目总览手册

深入理解 (P1):
  ├─ 004-核心概念词典
  ├─ YYC3-核心机制-五高五标五化五维
  └─ 0301-001-环境配置详解

实战参考 (P2):
  ├─ 0401-001-测试指南
  ├─ 0702-001-安全实现文档
  └─ 0601-001-性能优化指南
```

---

## 八、常见问题 FAQ

### Q1: 端口被占用怎么办？

```bash
# 查找占用端口的进程
lsof -i :3000
lsof -i :3001

# 终止进程 (替换PID为实际进程ID)
kill -9 <PID>

# 或者在.env.local中修改端口
PORT=3002
NEXT_PUBLIC_APP_URL=http://localhost:3002
```

### Q2: 数据库连接失败？

```bash
# 检查PostgreSQL是否运行
pg_isready

# 如果未运行 (macOS使用Homebrew安装的)
brew services start postgresql@16

# 创建数据库
psql -U postgres -c "CREATE DATABASE yyc3_db;"
```

### Q3: Redis连接失败？

```bash
# 检查Redis是否运行
redis-cli ping

# 应返回: PONG

# 如果未运行 (macOS)
brew services start redis
```

### Q4: OpenAI API Key无效？

确保：
1. API Key格式正确 (`sk-...`)
2. 账户有足够余额
3. 在 [.env.example](../../.env.example) 中查看完整配置说明

### Q5: 如何重置环境？

```bash
# 删除所有依赖和缓存
rm -rf node_modules package-lock.json
rm -rf backend/node_modules backend/package-lock.json
rm -rf .next

# 重新安装
npm install && cd backend && npm install && cd ..
```

---

## 九、获取帮助

### 🆘 支持渠道

| 渠道 | 适用场景 | 链接/方式 |
|------|----------|-----------|
| **GitHub Issues** | Bug报告、功能请求 | [Issues列表](https://github.com/YYC-Cube/yyc3-AI-Management/issues) |
| **Discussions** | 技术讨论、Q&A | [Discussions](https://github.com/YYC-Cube/yyc3-AI-Management/discussions) |
| **邮件支持** | 商务咨询、企业合作 | admin@0379.email |
| **文档中心** | 自助查询 | [docs/README.md](./002-API-Mana-项目总览索引-文档架构导航.md) |

### 🤝 贡献指南

欢迎贡献代码！请先阅读:
- [CONTRIBUTING.md](../../CONTRIBUTING.md) (如有)
- [YYC3-团队规范-开发标准.md](../YYC3-团队通用-标准规范/YYC3-团队规范-开发标准.md)
- [04-测试审核阶段](../04-YYC3-API-Mana-测试审核阶段/)

---

## 文档追溯信息

| 属性 | 值 |
|------|-----|
| **文档版本** | v3.0.0 |
| **创建日期** | 2026-05-03 |
| **更新日期** | 2026-05-03 |
| **内容校验** | c3d4e5f6g7h8i9j0 |
| **追溯ID** | TRC-20260503003 |
| **关联文档** | [001-项目总览手册](./001-API-Mana-项目总览索引-项目总览手册.md), [ENVIRONMENT_CONFIG.md](../ENVIRONMENT_CONFIG.md), [TESTING_GUIDE.md](../TESTING_GUIDE.md), [.env.example](../../.env.example) |
| **文档状态** | ✅ published (已发布) |
| **下次审查** | 2026-06-03 |

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***」

**© 2025-2026 YYC³ Team. All Rights Reserved.**

*文档生成时间: 2026-05-03T17:00:00Z | 模板版本: v3.0.0 | 引擎: YYC3TemplateEngine*

</div>
