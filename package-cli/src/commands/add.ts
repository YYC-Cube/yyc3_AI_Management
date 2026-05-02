import chalk from "chalk"
import ora from "ora"
import * as fs from "fs"
import * as path from "path"

const availableComponents = [
  "button",
  "input",
  "badge",
  "card",
  "table",
  "form",
]

const componentTemplates: Record<string, string> = {
  button: `import { Button } from "@yyc3/ui"

export function MyButton() {
  return (
    <Button variant="default" size="default">
      Click me
    </Button>
  )
}
`,

  input: `import { Input } from "@yyc3/ui"

export function MyInput() {
  return (
    <Input
      label="Email"
      type="email"
      placeholder="Enter your email"
    />
  )
}
`,

  badge: `import { Badge } from "@yyc3/ui"

export function MyBadge() {
  return (
    <Badge variant="default">New</Badge>
  )
}
`,

  card: `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@yyc3/ui"

export function MyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
    </Card>
  )
}
`,

  table: `import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@yyc3/ui"

export function MyTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Item 1</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
`,

  form: `import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@yyc3/ui"
import { Input } from "@yyc3/ui"

export function MyForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormField name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="Enter email" />
          </FormControl>
          <FormMessage>Please enter a valid email</FormMessage>
        </FormItem>
      </FormField>
    </Form>
  )
}
`,
}

export async function addComponent(
  component: string,
  options: { path: string }
) {
  const spinner = ora(`正在添加 ${component} 组件...`).start()

  try {
    const normalizedComponent = component.toLowerCase()

    if (!availableComponents.includes(normalizedComponent)) {
      spinner.fail(`组件 "${component}" 不存在`)
      console.log(chalk.yellow("\n可用的组件："))
      availableComponents.forEach((c) => {
        console.log(chalk.gray(`  - ${c}`))
      })
      process.exit(1)
    }

    const targetPath = options.path
    const componentDir = path.join(targetPath, `${normalizedComponent}`)

    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true })
    }

    const componentName =
      normalizedComponent.charAt(0).toUpperCase() + normalizedComponent.slice(1)
    const fileName = `${componentName}.tsx`
    const filePath = path.join(componentDir, fileName)

    const template = componentTemplates[normalizedComponent]
    fs.writeFileSync(filePath, template)

    spinner.succeed(`${componentName} 组件已添加！`)

    console.log(chalk.green("\n✅ 组件创建成功\n"))
    console.log(chalk.cyan("📄 文件路径："))
    console.log(chalk.white(`  ${filePath}\n`))

    console.log(chalk.yellow("📝 使用示例："))
    console.log(chalk.gray(template))
  } catch (error: any) {
    spinner.fail(`添加组件失败: ${error.message}`)
    process.exit(1)
  }
}
