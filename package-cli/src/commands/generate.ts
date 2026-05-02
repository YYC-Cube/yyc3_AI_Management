import chalk from "chalk"
import ora from "ora"
import * as fs from "fs"
import * as path from "path"

const templates: Record<string, (name: string) => string> = {
  page: (name) => `"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@yyc3/ui"

export default function ${name}Page() {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>${name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>${name} 页面内容</p>
        </CardContent>
      </Card>
    </div>
  )
}
`,

  component: (name) => `"use client"

interface ${name}Props {
  // 定义组件属性
}

export function ${name}(props: ${name}Props) {
  return (
    <div className="${name.toLowerCase()}">
      {/* 组件实现 */}
    </div>
  )
}
`,

  hook: (name) => `import { useState, useEffect } from "react"

export function use${name}() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Hook 逻辑
    setLoading(false)
  }, [])

  return { data, loading, error }
}
`,

  util: (name) => `/**
 * ${name} 工具函数
 * @description 工具函数描述
 */

export function ${name}(param: any): any {
  // 实现逻辑
  return param
}
`,
}

const typePaths: Record<string, string> = {
  page: "app",
  component: "components",
  hook: "hooks",
  util: "lib",
}

export async function generateCode(
  type: string,
  options: { name?: string; path: string }
) {
  const spinner = ora(`正在生成 ${type}...`).start()

  try {
    if (!templates[type]) {
      spinner.fail(`不支持的类型: ${type}`)
      console.log(chalk.yellow("\n可用的类型："))
      Object.keys(templates).forEach((t) => {
        console.log(chalk.gray(`  - ${t}`))
      })
      process.exit(1)
    }

    const name =
      options.name ||
      `${type.charAt(0).toUpperCase() + type.slice(1)}${Date.now()}`

    const template = templates[type](name)

    const basePath = options.path || "."
    const subPath = typePaths[type]
    const fullPath = path.join(basePath, subPath)

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true })
    }

    let fileName: string
    let fileContent: string

    switch (type) {
      case "page":
        fileName = "page.tsx"
        fileContent = template
        break
      case "component":
        fileName = `${name}.tsx`
        fileContent = template
        break
      case "hook":
        fileName = `use${name}.ts`
        fileContent = template
        break
      case "util":
        fileName = `${name}.ts`
        fileContent = template
        break
      default:
        fileName = `${name}.ts`
        fileContent = template
    }

    const filePath = path.join(fullPath, fileName)
    fs.writeFileSync(filePath, fileContent)

    spinner.succeed(`${type} "${name}" 已生成！`)

    console.log(chalk.green("\n✅ 代码生成成功\n"))
    console.log(chalk.cyan("📄 文件路径："))
    console.log(chalk.white(`  ${filePath}\n`))

    console.log(chalk.yellow("💡 提示："))
    console.log(chalk.gray("  请根据需要修改生成的代码模板\n"))
  } catch (error: any) {
    spinner.fail(`代码生成失败: ${error.message}`)
    process.exit(1)
  }
}
