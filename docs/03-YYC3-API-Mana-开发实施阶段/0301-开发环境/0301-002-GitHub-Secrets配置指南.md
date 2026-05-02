---
file: 0301-002-GitHub-Secrets配置指南.md
description: YYC3 CI/CD Secrets完整配置清单 · 生产部署/Vercel/数据库/通知服务/Docker Registry
author: YanYuCloudCube Team <admin@0379.email>
version: v3.0.0
created: 2026-05-02
updated: 2026-05-03
status: published
tags: [CI/CD],[Secrets配置],[GitHub Actions]
category: technical
language: zh-CN
checksum: sec002b4c5d6e7f8g9
trace_id: TRC-20260503102
---

> ***YanYuCloudCube***
> *言启象限 | 语枢未来*
> ***Words Initiate Quadrants, Language Serves as Core for Future***
> *万象归元于云枢 | 深栈智启新纪元*
> ***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 🔐 GitHub Secrets 配置指南

## 核心理念

**五高架构**：高可用 | 高性能 | 高安全 | 高扩展 | 高智能
**五标体系**：标准化 | 规范化 | 自动化 | 可视化 | 智能化
**五化转型**：流程化 | 数字化 | 生态化 | 工具化 | 服务化
**五维评估**：时间维 | 空间维 | 属性维 | 事件维 | 关联维

---

> **重要**: 在首次运行 CI/CD Pipeline 前，必须完成以下 Secrets 配置！

## 📍 配置位置

1. 访问: **https://github.com/YYC-Cube/yyc3_AI_Management/settings/secrets/actions**
2. 点击 **"New repository secret"**
3. 按照下方列表逐一添加

---

## 📋 必需 Secrets 清单

### **1️⃣ 生产环境部署 (Production Deployment)**

| Secret 名称 | 说明 | 获取方式 | 示例值 |
|-------------|------|----------|--------|
| `PRODUCTION_SSH_KEY` | SSH 私钥 (用于服务器部署) | 本地生成或从服务器导出 | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `PRODUCTION_USER` | SSH 登录用户名 | 服务器管理员提供 | `root` 或 `deploy` |
| `PRODUCTION_HOST` | 生产服务器 IP 或域名 | DNS 解析或云服务商控制台 | `123.456.789.012` 或 `api.yyc3.top` |

### **2️⃣ Vercel 部署 (Staging 预发布)**

| Secret 名称 | 说明 | 获取方式 | 示例值 |
|-------------|------|----------|--------|
| `VERCEL_TOKEN` | Vercel API Token | [Vercel Dashboard → Settings → Tokens](https://vercel.com/account/tokens) | `xxxxxxxxxxxx` |
| `VERCEL_ORG_ID` | Vercel 组织 ID | Vercel 项目设置中查看 | `team_xxxxxxxx` |
| `VERCEL_PROJECT_ID` | Vercel 项目 ID | Vercel 项目 URL 中提取 | `prj_xxxxxxxx` |

### **3️⃣ 数据库连接 (Database)**

| Secret 名称 | 说明 | 示例值 |
|-------------|------|--------|
| `STAGING_DATABASE_URL` | Staging 环境数据库连接串 | `postgresql://yyc3_admin:Management@staging-db:5432/yyc3_management_staging` |
| `PRODUCTION_DATABASE_URL` | 生产环境数据库连接串 | `postgresql://yyc3_admin:Management@prod-db:5432/yyc3_management` |

### **4️⃣ 应用密钥 (Application Keys)**

| Secret 名称 | 说明 | 生成方式 | 示例值 |
|-------------|------|----------|--------|
| `JWT_SECRET` | JWT 签名密钥 | `openssl rand -base64 32` | `xK9mP2vL7qR4wN8yT3...` |
| `REDIS_URL` | Redis 连接地址 | Redis 服务商提供 | `redis://:password@redis:6379/0` |
| `ENCRYPTION_KEY` | 数据加密密钥 | `openssl rand -hex 32` | `a1b2c3d4e5f6...` |

### **5️⃣ 通知服务 (Notifications)**

| Secret 名称 | 说明 | 获取方式 |
|-------------|------|----------|
| `SLACK_WEBHOOK_PRODUCTION` | Production Slack Webhook | [Slack App → Incoming Webhooks](https://api.slack.com/apps) |
| `SLACK_WEBHOOK_STAGING` | Staging Slack Webhook | 同上 (不同频道) |

### **6️⃣ Docker Registry (可选)**

| Secret 名称 | 说明 | 获取方式 |
|-------------|------|----------|
| `DOCKER_USERNAME` | Docker Hub/GHCR 用户名 | Docker Hub 或 GitHub 用户名 |
| `DOCKER_PASSWORD` | Docker Hub/GHCR 密码/Token | Docker Hub Access Token 或 GitHub PAT |

---

## 🛠️ 详细配置步骤

### **步骤 1: 生成 SSH 密钥对 (用于生产部署)**

```bash
# 在本地机器执行
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/yyc3_deploy_key

# 查看公钥 (需要添加到生产服务器的 authorized_keys)
cat ~/.ssh/yyc3_deploy_key.pub

# 查看私钥 (需要添加到 GitHub Secrets)
cat ~/.ssh/yyc3_deploy_key
```

**将公钥添加到生产服务器**:
```bash
# 复制公钥内容到服务器
ssh user@production-server "echo 'YOUR_PUBLIC_KEY' >> ~/.ssh/authorized_keys"
```

**将私钥添加到 GitHub Secrets**:
- Name: `PRODUCTION_SSH_KEY`
- Value: 完整的私钥内容 (包括 -----BEGIN 和 -----END 行)

---

### **步骤 2: 获取 Vercel Token**

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击右上角头像 → **Settings**
3. 左侧菜单选择 **Tokens**
4. 点击 **Create Token**
5. 输入名称: `GitHub Actions CI/CD`
6. 选择 Scope: **Full Account**
7. 复制生成的 Token

**添加到 GitHub Secrets**:
- Name: `VERCEL_TOKEN`
- Value: 复制的 Token 值

---

### **步骤 3: 配置数据库 Secrets**

根据你的部署环境，准备数据库连接字符串：

```bash
# PostgreSQL 连接串格式
postgresql://[user]:[password]@[host]:[port]/[database]

# 示例:
# Staging: postgresql://yyc3_admin:Management@staging-postgres:5432/yyc3_management_staging
# Production: postgresql://yyc3_admin:Management@prod-postgres:5432/yyc3_management
```

---

### **步骤 4: 生成应用密钥**

```bash
# JWT Secret (至少 32 字符)
openssl rand -base64 32

# Encryption Key (64 位十六进制)
openssl rand -hex 32
```

---

### **步骤 5: 配置 Slack 通知 (可选)**

1. 创建 [Slack App](https://api.slack.com/apps)
2. 启用 **Incoming Webhooks**
3. 创建新的 Webhook URL
4. 选择目标频道 (#deployments 或 #notifications)
5. 复制 Webhook URL

**添加到 GitHub Secrets**:
- Name: `SLACK_WEBHOOK_PRODUCTION`
- Value: `https://hooks.slack.com/services/T00XXXXXXX/B00XXXXXXXX/XXXXXXXXXXXXXXXXXXXX`

---

## ✅ 配置验证清单

在运行 CI/CD Pipeline 前，请确认：

- [ ] `PRODUCTION_SSH_KEY` 已配置 ✓
- [ ] `PRODUCTION_USER` 已配置 ✓
- [ ] `PRODUCTION_HOST` 已配置 ✓
- [ ] `VERCEL_TOKEN` 已配置 (如使用 Vercel) ✓
- [ ] `JWT_SECRET` 已配置 ✓
- [ ] `STAGING_DATABASE_URL` 已配置 ✓
- [ ] `SLACK_WEBHOOK_*` 已配置 (可选) ✓

---

## 🚀 首次运行 CI/CD

### **方式 1: 自动触发 (推荐)**

推送代码到 main 分支后，CI/CD 将自动运行：
```bash
git push origin main
# 访问: https://github.com/YYC-Cube/yyc3_AI_Management/actions
```

### **方式 2: 手动触发**

1. 访问: **https://github.com/YYC-Cube/yyc3_AI_Management/actions**
2. 左侧选择 **"YYC3 CI/CD Pipeline"**
3. 点击 **"Run workflow"**
4. 选择分支: `main`
5. Environment: `staging` (测试) 或 `production` (正式)
6. 勾选 Skip Tests: ❌ (不勾选)
7. 点击 **"Run workflow"**

---

## ⚠️ 常见问题排查

### **Q1: PRODUCTION_SSH_KEY 格式错误**
```
Error: Invalid SSH key format
```
**解决**: 确保密钥包含完整的头部和尾部：
```
-----BEGIN OPENSSH PRIVATE KEY-----
base64_encoded_content_here...
-----END OPENSSH PRIVATE KEY-----
```

### **Q2: VERCEL_TOKEN 无效**
```
Error: Invalid or expired token
```
**解决**: 
- 重新生成 Vercel Token
- 确认 Token 权限为 "Full Account"

### **Q3: 数据库连接失败**
``Error: Could not connect to database``
**解决**: 
- 检查 DATABASE_URL 格式是否正确
- 确认数据库服务器允许来自 GitHub Actions IP 的连接
- 检查防火墙规则

### **Q4: Slack 通知未发送**
```
Slack webhook returned 403``
**解决**: 
- 确认 Webhook URL 正确
- 检查 Slack App 是否已安装到工作区
- 确认频道权限

---

## 📞 技术支持

如果遇到其他问题：
1. 查看 CI/CD 运行日志: **Actions → 具体运行 → 各 Job 日志**
2. 检查此文档中的常见问题
3. 联系 DevOps 团队

---

## 相关文档

| 文档 | 说明 |
|------|------|
| [0301-001-环境配置详解](./0301-001-环境配置详解.md) | 环境变量配置 |
| [0601-002-CICD工作流配置](../../06-YYC3-API-Mana-运维保障阶段/0601-运维策略/0601-002-CICD工作流配置.md) | CI/CD工作流说明 |
| [003-快速开始指南](../../00-YYC3-API-Mana-项目总览索引/003-API-Mana-项目总览索引-快速开始指南.md) | 5分钟上手 |

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***」

**© 2025-2026 YYC³ Team. All Rights Reserved.**

*文档生成时间: 2026-05-03T18:12:00Z | 模板版本: v3.0.0 | 引擎: YYC3TemplateEngine*

</div>
