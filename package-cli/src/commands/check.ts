import chalk from "chalk"
import ora from "ora"
import { execSync } from "child_process"
import * as fs from "fs"

interface CheckResult {
  name: string
  status: "pass" | "warn" | "fail"
  message: string
}

export async function runCheck(options: { fix?: boolean }) {
  const spinner = ora("正在运行项目健康检查...").start()
  const results: CheckResult[] = []

  try {
    spinner.text = "检查 package.json..."

    if (fs.existsSync("package.json")) {
      results.push({
        name: "package.json",
        status: "pass",
        message: "✓ 文件存在",
      })

      const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"))

      if (pkg.dependencies?.["@yyc3/ui"]) {
        results.push({
          name: "@yyc3/ui 依赖",
          status: "pass",
          message: `✓ 已安装 ${pkg.dependencies["@yyc3/ui"]}`,
        })
      } else {
        results.push({
          name: "@yyc3/ui 依赖",
          status: "warn",
          message: "⚠ 未安装 @yyc3/ui，建议添加",
        })
      }
    } else {
      results.push({
        name: "package.json",
        status: "fail",
        message: "✗ 文件不存在",
      })
    }

    spinner.text = "检查 TypeScript 配置..."

    if (fs.existsSync("tsconfig.json")) {
      results.push({
        name: "tsconfig.json",
        status: "pass",
        message: "✓ TypeScript 配置存在",
      })
    } else {
      results.push({
        name: "tsconfig.json",
        status: "warn",
        message: "⚠ 未找到 tsconfig.json",
      })
    }

    spinner.text = "检查 ESLint 配置..."

    if (
      fs.existsSync(".eslintrc.js") ||
      fs.existsSync(".eslintrc.json") ||
      fs.existsSync("eslint.config.js")
    ) {
      results.push({
        name: "ESLint 配置",
        status: "pass",
        message: "✓ ESLint 已配置",
      })
    } else {
      results.push({
        name: "ESLint 配置",
        status: "warn",
        message: "⚠ 未找到 ESLint 配置",
      })
    }

    spinner.text = "检查 Git 初始化..."

    if (fs.existsSync(".git")) {
      results.push({
        name: "Git 仓库",
        status: "pass",
        message: "✓ Git 已初始化",
      })
    } else {
      results.push({
        name: "Git 仓库",
        status: "warn",
        message: "⚠ 未初始化 Git 仓库",
      })
    }

    spinner.text = "运行类型检查..."

    try {
      execSync("npx tsc --noEmit", {
        stdio: "pipe",
        timeout: 30000,
      })
      results.push({
        name: "TypeScript 类型检查",
        status: "pass",
        message: "✓ 类型检查通过",
      })
    } catch {
      results.push({
        name: "TypeScript 类型检查",
        status: "fail",
        message: "✗ 类型检查失败，请修复错误",
      })
    }

    spinner.stop()

    console.log(chalk.cyan("\n📋 项目健康检查报告\n"))
    console.log(chalk.gray("─".repeat(60)))

    const passed = results.filter((r) => r.status === "pass").length
    const warned = results.filter((r) => r.status === "warn").length
    const failed = results.filter((r) => r.status === "fail").length

    results.forEach((result) => {
      let icon: string
      let color: typeof chalk.white

      switch (result.status) {
        case "pass":
          icon = "✅"
          color = chalk.green
          break
        case "warn":
          icon = "⚠️ "
          color = chalk.yellow
          break
        case "fail":
          icon = "❌"
          color = chalk.red
          break
      }

      console.log(`${color(icon)} ${chalk.white(result.name)}`)
      console.log(`   ${chalk.gray(result.message)}\n`)
    })

    console.log(chalk.gray("─".repeat(60)))
    console.log(chalk.cyan("\n📊 统计信息："))
    console.log(chalk.green(`   通过: ${passed}`))
    console.log(chalk.yellow(`   警告: ${warned}`))
    console.log(chalk.red(`   失败: ${failed}\n`))

    if (options.fix && failed > 0) {
      console.log(chalk.yellow("🔧 正在尝试自动修复...\n"))
      // 这里可以添加自动修复逻辑
    }

    if (failed > 0) {
      console.log(chalk.red("❌ 检查未通过，请修复上述问题\n"))
      process.exit(1)
    } else {
      console.log(chalk.green("✅ 检查全部通过！\n"))
    }
  } catch (error: any) {
    spinner.fail(`检查过程出错: ${error.message}`)
    process.exit(1)
  }
}
