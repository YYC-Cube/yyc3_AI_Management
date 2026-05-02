import chalk from "chalk"
import ora from "ora"
import * as fs from "fs"
import * as path from "path"

interface MigrationItem {
  filePath: string
  oldImport: string
  newImport: string
  component: string
}

export async function migrateComponents(options: { dryRun?: boolean }) {
  const spinner = ora("正在分析组件使用情况...").start()

  try {
    const migrationItems: MigrationItem[] = []

    spinner.text = "扫描项目文件..."

    function scanDirectory(dir: string) {
      const files = fs.readdirSync(dir)

      for (const file of files) {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
          if (
            !file.includes("node_modules") &&
            !file.includes(".next") &&
            !file.includes(".git")
          ) {
            scanDirectory(filePath)
          }
        } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
          const content = fs.readFileSync(filePath, "utf-8")

          const patterns = [
            {
              pattern: /from\s+["']@\/components\/ui\/Button["']/g,
              component: "Button",
              oldImport: "@/components/ui/Button",
              newImport: "@yyc3/ui",
            },
            {
              pattern: /from\s+["']@\/components\/ui\/Input["']/g,
              component: "Input",
              oldImport: "@/components/ui/Input",
              newImport: "@yyc3/ui",
            },
            {
              pattern: /from\s+["']@\/components\/ui\/Badge["']/g,
              component: "Badge",
              oldImport: "@/components/ui/Badge",
              newImport: "@yyc3/ui",
            },
          ]

          for (const { pattern, component, oldImport, newImport } of patterns) {
            if (pattern.test(content)) {
              migrationItems.push({
                filePath,
                oldImport,
                newImport,
                component,
              })
            }
          }
        }
      }
    }

    scanDirectory(".")

    spinner.stop()

    if (migrationItems.length === 0) {
      console.log(chalk.green("\n✅ 未发现需要迁移的组件\n"))
      console.log(chalk.gray("所有组件已使用 @yyc3/ui\n"))
      return
    }

    console.log(chalk.cyan("\n📋 组件迁移报告\n"))
    console.log(chalk.gray("─".repeat(60)))
    console.log(
      chalk.white(`发现 ${migrationItems.length} 个文件需要迁移：\n`)
    )

    migrationItems.forEach((item, index) => {
      console.log(chalk.yellow(`${index + 1}. ${item.component}`))
      console.log(chalk.gray(`   文件: ${item.filePath}`))
      console.log(chalk.gray(`   从: ${item.oldImport}`))
      console.log(chalk.gray(`   到: ${item.newImport}\n`))
    })

    console.log(chalk.gray("─".repeat(60)))

    if (options.dryRun) {
      console.log(chalk.yellow("\n🔍 干运行模式 - 不执行实际更改\n"))
      return
    }

    console.log(chalk.cyan("\n🚀 开始迁移...\n"))

    const migrateSpinner = ora("正在迁移组件...").start()

    let successCount = 0
    let failCount = 0

    for (const item of migrationItems) {
      try {
        let content = fs.readFileSync(item.filePath, "utf-8")
        content = content.replace(new RegExp(item.oldImport, "g"), item.newImport)
        fs.writeFileSync(item.filePath, content)
        successCount++
      } catch (error) {
        failCount++
        console.error(chalk.red(`迁移失败: ${item.filePath} - ${error}`))
      }
    }

    migrateSpinner.succeed("迁移完成！")

    console.log(chalk.green("\n✅ 迁移统计："))
    console.log(chalk.white(`   成功: ${successCount}`))
    console.log(chalk.red(`   失败: ${failCount}\n`))

    console.log(chalk.yellow("💡 下一步："))
    console.log(chalk.gray("  1. 运行 npm run type-check 验证类型"))
    console.log(chalk.gray("  2. 运行 npm run lint 检查代码风格"))
    console.log(chalk.gray("  3. 测试应用确保功能正常\n"))
  } catch (error: any) {
    spinner.fail(`迁移失败: ${error.message}`)
    process.exit(1)
  }
}
