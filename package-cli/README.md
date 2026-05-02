# @yyc3/cli - YYC3 Development CLI

> **版本**: 1.0.0 | **许可证**: MIT

## 🚀 简介

**@yyc3/cli** 是 YYC3 生态系统的官方命令行工具，提供项目初始化、组件添加、代码生成、健康检查等一站式开发体验。

## ✨ 核心功能

### 📦 项目初始化
```bash
yyc3 init my-project -t dashboard
```

### 🧩 组件管理
```bash
yyc3 add button
yyc3 add card -p ./src/components/ui
```

### 🔧 代码生成
```bash
yyc3 generate page -n HomePage
yyc3 generate component -n DataTable
yyc3 generate hook -n useAuth
yyc3 generate util -n formatDate
```

### 🏥 健康检查
```bash
yyc3 check
yyc3 check --fix
```

### 🔄 组件迁移
```bash
yyc3 migrate
yyc3 migrate --dry-run
```

### 🎨 主题管理
```bash
yyc3 theme --list
yyc3 theme --set blue
```

## 📋 命令详解

### `yyc3 init`

初始化新的 YYC3 项目。

**选项：**
- `-p, --project <name>`: 项目名称（默认：my-yyc3-app）
- `-t, --template <type>`: 项目模板（默认：dashboard）

**示例：**
```bash
# 创建基础项目
yyc3 init

# 使用指定模板创建项目
yyc3 init admin-panel -t dashboard

# 创建电商项目
yyc3 init shop -t ecommerce
```

---

### `yyc3 add <component>`

添加 YYC3 组件到项目。

**可用组件：**
- `button` - 按钮组件
- `input` - 输入框组件
- `badge` - 徽章组件
- `card` - 卡片组件
- `table` - 表格组件
- `form` - 表单组件

**选项：**
- `-p, --path <path>`: 目标路径（默认：./src/components）

**示例：**
```bash
# 添加按钮组件
yyc3 add button

# 添加卡片组件到指定路径
yyc3 add card -p ./src/components/ui

# 批量添加多个组件
yyc3 add button && yyc3 add input && yyc3 add card
```

---

### `yyc3 generate <type>`

生成代码模板。

**类型：**
- `page` - 页面组件
- `component` - 通用组件
- `hook` - React Hook
- `util` - 工具函数

**选项：**
- `-n, --name <name>`: 名称（可选，自动生成）
- `-p, --path <path>`: 目标路径（默认：当前目录）

**示例：**
```bash
# 生成页面
yyc3 generate page -n Dashboard

# 生成组件
yyc3 generate component -n UserCard

# 生成 Hook
yyc3 generate hook -n useApi

# 生成工具函数
yyc3 generate util -n formatCurrency
```

---

### `yyc3 check`

运行项目健康检查。

**检查项：**
- ✓ package.json 存在性
- ✓ @yyc3/ui 依赖安装状态
- ✓ TypeScript 配置
- ✓ ESLint 配置
- ✓ Git 初始化状态
- ✓ TypeScript 类型检查

**选项：**
- `--fix`: 自动修复问题（实验性）

**示例：**
```bash
# 运行完整检查
yyc3 check

# 运行检查并尝试自动修复
yyc3 check --fix
```

---

### `yyc3 migrate`

迁移旧组件到 @yyc3/ui。

**功能：**
- 自动扫描项目中的旧组件导入
- 替换为 @yyc3/ui 导入
- 支持干运行模式预览更改

**选项：**
- `--dry-run`: 仅显示将要执行的更改

**示例：**
```bash
# 预览迁移计划
yyc3 migrate --dry-run

# 执行实际迁移
yyc3 migrate
```

---

### `yyc3 theme`

管理应用主题配置。

**可用主题：**
1. `yyc3-light` - YYC3 默认浅色主题
2. `yyc3-dark` - YYC3 默认深色主题
3. `blue` - 蓝色商务主题
4. `green` - 绿色自然主题
5. `purple` - 紫色科技主题

**选项：**
- `--list`: 列出所有可用主题
- `--set <theme>`: 设置指定主题

**示例：**
```bash
# 列出所有主题
yyc3 theme --list

# 应用蓝色主题
yyc3 theme --set blue

# 应用深色主题
yyc3 theme --set yyc3-dark
```

## 🔧 安装

### 全局安装（推荐）

```bash
npm install -g @yyc3/cli
```

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/yyc3/cli.git
cd cli

# 安装依赖
npm install

# 构建项目
npm run build

# 链接到全局
npm link
```

### 在项目中使用

```bash
# 在项目中添加为开发依赖
npm install --save-dev @yyc3/cli

# 使用 npx 运行
npx yyc3 init my-project
```

## 🛠️ 开发指南

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 本地开发

```bash
# 安装依赖
npm install

# 开发模式（热重载）
npm run dev

# 构建
npm run build

# 代码检查
npm run lint

# 运行测试
npm test
```

### 添加新命令

1. 在 `src/commands/` 目录下创建新文件：

```typescript
// src/commands/my-command.ts
import chalk from "chalk"
import ora from "ora"

export async function myCommand(options: any) {
  const spinner = ora("执行中...").start()
  
  // 你的逻辑
  
  spinner.succeed("完成！")
}
```

2. 在 `src/index.ts` 中注册命令：

```typescript
program
  .command("my-command")
  .description("我的命令")
  .action(async (options) => {
    const { myCommand } = await import("./commands/my-command.js")
    await myCommand(options)
  })
```

## 📦 与其他工具集成

### Next.js 集成

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "generate": "yyc3 generate",
    "check": "yyc3 check"
  }
}
```

### CI/CD 集成

```yaml
# GitHub Actions
- name: YYC3 Health Check
  run: |
    npm install -g @yyc3/cli
    yyc3 check
    
- name: Migrate Components
  run: |
    yyc3 migrate --dry-run
```

## 🤝 贡献指南

我们欢迎社区贡献！请查看 [贡献指南](CONTRIBUTING.md) 了解详细信息。

### 贡献流程

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。

## 🙏 致谢

感谢以下开源项目：
- [Commander.js](https://github.com/tj/commander.js/) - 命令行框架
- [Chalk](https://github.com/chalk/chalk) - 终端样式
- [Ora](https://github.com/sindresorhus/ora) - 终端加载动画
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) - 交互式命令行界面

---

**维护者**: YYC3 团队  
**最后更新**: 2026-05-02  
**官网**: https://yyc3.dev
