import chalk from "chalk"
import ora from "ora"
import { execSync } from "child_process"
import * as fs from "fs"
import * as path from "path"

export async function initProject(options: {
  project: string
  template: string
}) {
  const spinner = ora("正在初始化 YYC3 项目...").start()

  try {
    const { project, template } = options

    console.log(chalk.blue(`\n📦 项目名称: ${project}`))
    console.log(chalk.blue(`📋 项目模板: ${template}\n`))

    spinner.text = "创建项目目录..."

    if (!fs.existsSync(project)) {
      fs.mkdirSync(project, { recursive: true })
    }

    spinner.text = "生成 package.json..."

    const packageJson = {
      name: project,
      version: "0.1.0",
      private: true,
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
        lint: "next lint",
      },
      dependencies: {
        next: "^14.1.0",
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        "@yyc3/ui": "latest",
      },
      devDependencies: {
        typescript: "^5.3.3",
        "@types/node": "^20.11.0",
        "@types/react": "^18.2.48",
        "@types/react-dom": "^18.2.18",
        tailwindcss: "^3.4.1",
        autoprefixer: "^10.4.17",
        postcss: "^8.4.33",
      },
    }

    fs.writeFileSync(
      path.join(project, "package.json"),
      JSON.stringify(packageJson, null, 2)
    )

    spinner.text = "创建基础文件结构..."

    const dirs = [
      "src/app",
      "src/components",
      "src/lib",
      "src/styles",
      "public",
    ]

    dirs.forEach((dir) => {
      fs.mkdirSync(path.join(project, dir), { recursive: true })
    })

    spinner.text = "生成配置文件..."

    const tsConfig = {
      compilerOptions: {
        target: "es5",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "preserve",
        incremental: true,
        plugins: [{ name: "next" }],
        paths: { "@/*": ["./src/*"] },
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      exclude: ["node_modules"],
    }

    fs.writeFileSync(
      path.join(project, "tsconfig.json"),
      JSON.stringify(tsConfig, null, 2)
    )

    const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
`

    fs.writeFileSync(path.join(project, "next.config.mjs"), nextConfig)

    spinner.text = "安装依赖..."

    process.chdir(project)
    execSync("npm install", { stdio: "pipe" })

    spinner.succeed("项目初始化完成！")

    console.log(chalk.green("\n✅ 项目创建成功！\n"))
    console.log(chalk.cyan("📁 项目结构："))
    console.log(chalk.gray(`${project}/`))
    console.log(chalk.gray("├── src/"))
    console.log(chalk.gray("│   ├── app/"))
    console.log(chalk.gray("│   ├── components/"))
    console.log(chalk.gray("│   └── lib/"))
    console.log(chalk.gray("├── public/"))
    console.log(chalk.gray("├── package.json"))
    console.log(chalk.gray("├── tsconfig.json"))
    console.log(chalk.gray("└── next.config.mjs\n"))

    console.log(chalk.yellow("🚀 下一步操作："))
    console.log(chalk.white(`  cd ${project}`))
    console.log(chalk.white("  npm run dev\n"))
  } catch (error: any) {
    spinner.fail(`初始化失败: ${error.message}`)
    process.exit(1)
  }
}
