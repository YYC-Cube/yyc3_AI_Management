#!/usr/bin/env node

import { Command } from "commander"
import figlet from "figlet"
import chalk from "chalk"

const program = new Command()

console.log(
  chalk.cyan(
    figlet.textSync("YYC3 CLI", {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
  )
)

console.log(chalk.yellow("\n🚀 YYC3 Development CLI v1.0.0"))
console.log(chalk.gray("企业级 React 开发工具链\n"))

program
  .name("yyc3")
  .description("YYC3 Development CLI - 快速开发工具链")
  .version("1.0.0")

program
  .command("init")
  .description("初始化 YYC3 项目")
  .option("-p, --project <name>", "项目名称", "my-yyc3-app")
  .option("-t, --template <type>", "项目模板", "dashboard")
  .action(async (options) => {
    const { initProject } = await import("./commands/init.js")
    await initProject(options)
  })

program
  .command("add <component>")
  .description("添加 YYC3 组件到项目")
  .option("-p, --path <path>", "目标路径", "./src/components")
  .action(async (component, options) => {
    const { addComponent } = await import("./commands/add.js")
    await addComponent(component, options)
  })

program
  .command("generate <type>")
  .description("生成代码（page, component, hook, util）")
  .option("-n, --name <name>", "名称")
  .option("-p, --path <path>", "目标路径", ".")
  .action(async (type, options) => {
    const { generateCode } = await import("./commands/generate.js")
    await generateCode(type, options)
  })

program
  .command("check")
  .description("运行项目健康检查")
  .option("--fix", "自动修复问题")
  .action(async (options) => {
    const { runCheck } = await import("./commands/check.js")
    await runCheck(options)
  })

program
  .command("migrate")
  .description("迁移旧组件到 @yyc3/ui")
  .option("--dry-run", "仅显示将要执行的更改")
  .action(async (options) => {
    const { migrateComponents } = await import("./commands/migrate.js")
    await migrateComponents(options)
  })

program
  .command("theme")
  .description("管理主题配置")
  .option("-l, --list", "列出可用主题")
  .option("-s, --set <theme>", "设置主题")
  .action(async (options) => {
    const { manageTheme } = await import("./commands/theme.js")
    await manageTheme(options)
  })

program.parse()
