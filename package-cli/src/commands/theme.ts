import chalk from "chalk"
import ora from "ora"
import * as fs from "fs"

const availableThemes = [
  { name: "yyc3-light", description: "YYC3 默认浅色主题" },
  { name: "yyc3-dark", description: "YYC3 默认深色主题" },
  { name: "blue", description: "蓝色商务主题" },
  { name: "green", description: "绿色自然主题" },
  { name: "purple", description: "紫色科技主题" },
]

const themeConfigs: Record<string, Record<string, string>> = {
  "yyc3-light": {
    "--background": "0 0% 100%",
    "--foreground": "222.2 84% 4.9%",
    "--card": "0 0% 100%",
    "--card-foreground": "222.2 84% 4.9%",
    "--primary": "222.2 47.4% 11.2%",
    "--primary-foreground": "210 40% 98%",
    "--secondary": "210 40% 96.1%",
    "--secondary-foreground": "222.2 47.4% 11.2%",
    "--muted": "210 40% 96.1%",
    "--muted-foreground": "215.4 16.3% 46.9%",
    "--accent": "210 40% 96.1%",
    "--accent-foreground": "222.2 47.4% 11.2%",
    "--destructive": "0 84.2% 60.2%",
    "--destructive-foreground": "210 40% 98%",
    "--border": "214.3 31.8% 91.4%",
    "--input": "214.3 31.8% 91.4%",
    "--ring": "222.2 84% 4.9%",
    "--radius": "0.5rem",
  },

  "yyc3-dark": {
    "--background": "222.2 84% 4.9%",
    "--foreground": "210 40% 98%",
    "--card": "222.2 84% 4.9%",
    "--card-foreground": "210 40% 98%",
    "--primary": "210 40% 98%",
    "--primary-foreground": "222.2 47.4% 11.2%",
    "--secondary": "217.2 32.6% 17.5%",
    "--secondary-foreground": "210 40% 98%",
    "--muted": "217.2 32.6% 17.5%",
    "--muted-foreground": "215 20.2% 65.1%",
    "--accent": "217.2 32.6% 17.5%",
    "--accent-foreground": "210 40% 98%",
    "--destructive": "0 62.8% 30.6%",
    "--destructive-foreground": "210 40% 98%",
    "--border": "217.2 32.6% 17.5%",
    "--input": "217.2 32.6% 17.5%",
    "--ring": "212.7 26.8% 83.9%",
    "--radius": "0.5rem",
  },

  blue: {
    "--background": "210 20% 98%",
    "--foreground": "215 27% 17%",
    "--card": "210 20% 98%",
    "--card-foreground": "215 27% 17%",
    "--primary": "217 91% 60%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "214 32% 91%",
    "--secondary-foreground": "215 27% 17%",
    "--muted": "214 32% 91%",
    "--muted-foreground": "216 12% 47%",
    "--accent": "214 32% 91%",
    "--accent-foreground": "215 27% 17%",
    "--destructive": "0 84% 60%",
    "--destructive-foreground": "0 0% 100%",
    "--border": "214 32% 91%",
    "--input": "214 32% 91%",
    "--ring": "217 91% 60%",
    "--radius": "0.5rem",
  },

  green: {
    "--background": "142 30% 97%",
    "--foreground": "145 20% 10%",
    "--card": "142 30% 97%",
    "--card-foreground": "145 20% 10%",
    "--primary": "142 70% 45%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "140 20% 93%",
    "--secondary-foreground": "145 20% 10%",
    "--muted": "140 20% 93%",
    "--muted-foreground": "143 10% 45%",
    "--accent": "140 20% 93%",
    "--accent-foreground": "145 20% 10%",
    "--destructive": "0 84% 60%",
    "--destructive-foreground": "0 0% 100%",
    "--border": "140 20% 90%",
    "--input": "140 20% 90%",
    "--ring": "142 70% 45%",
    "--radius": "0.5rem",
  },

  purple: {
    "--background": "270 20% 98%",
    "--foreground": "275 20% 15%",
    "--card": "270 20% 98%",
    "--card-foreground": "275 20% 15%",
    "--primary": "270 70% 55%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "268 25% 93%",
    "--secondary-foreground": "275 20% 15%",
    "--muted": "268 25% 93%",
    "--muted-foreground": "270 10% 48%",
    "--accent": "268 25% 93%",
    "--accent-foreground": "275 20% 15%",
    "--destructive": "0 84% 60%",
    "--destructive-foreground": "0 0% 100%",
    "--border": "268 25% 90%",
    "--input": "268 25% 90%",
    "--ring": "270 70% 55%",
    "--radius": "0.5rem",
  },
}

export async function manageTheme(options: {
  list?: boolean
  set?: string
}) {
  const spinner = ora("正在处理主题配置...").start()

  try {
    if (options.list) {
      spinner.stop()
      console.log(chalk.cyan("\n🎨 可用主题列表\n"))
      console.log(chalk.gray("─".repeat(60)))

      availableThemes.forEach((theme) => {
        console.log(chalk.white(`  • ${theme.name}`))
        console.log(chalk.gray(`    ${theme.description}\n`))
      })

      console.log(chalk.gray("─".repeat(60)))
      return
    }

    if (options.set) {
      const themeName = options.set.toLowerCase()
      const theme = themeConfigs[themeName]

      if (!theme) {
        spinner.fail(`主题 "${options.set}" 不存在`)
        console.log(chalk.yellow("\n可用的主题："))
        availableThemes.forEach((t) => {
          console.log(chalk.gray(`  - ${t.name}`))
        })
        process.exit(1)
      }

      spinner.text = `正在应用 ${themeName} 主题...`

      const cssContent = generateThemeCSS(theme)

      let globalsCssPath = "src/styles/globals.css"
      if (!fs.existsSync(globalsCssPath)) {
        globalsCssPath = "src/app/globals.css"
      }

      fs.writeFileSync(globalsCssPath, cssContent)

      spinner.succeed(`${themeName} 主题已应用！`)

      console.log(chalk.green("\n✅ 主题设置成功\n"))
      console.log(chalk.cyan("📄 更新的文件："))
      console.log(chalk.white(`  ${globalsCssPath}\n`))

      console.log(chalk.yellow("💡 提示："))
      console.log(chalk.gray("  重启开发服务器以查看更改\n"))
      return
    }

    spinner.stop()

    console.log(chalk.cyan("\n🎨 YYC3 主题管理器\n"))
    console.log(chalk.yellow("使用方法："))
    console.log(chalk.gray("  yyc3 theme --list          列出可用主题"))
    console.log(chalk.gray('  yyc3 theme --set <name>    设置主题\n'))

    console.log(chalk.cyan("示例："))
    console.log(chalk.gray("  yyc3 theme --set blue"))
    console.log(chalk.gray("  yyc3 theme --set yyc3-dark\n"))
  } catch (error: any) {
    spinner.fail(`主题管理失败: ${error.message}`)
    process.exit(1)
  }
}

function generateThemeCSS(theme: Record<string, string>): string {
  let css = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n`
  css += `@layer base {\n`
  css += `  :root {\n`

  Object.entries(theme).forEach(([key, value]) => {
    css += `    ${key}: hsl(${value});\n`
  })

  css += `  }\n`
  css += `}\n`

  return css
}
