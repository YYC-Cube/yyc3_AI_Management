"use client"

import { useState } from "react"
import {
  Button,
  Input,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@yyc3/ui"
import { Mail, Lock, User, Search } from "lucide-react"

export default function YYC3UIDemoPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [badges, setBadges] = useState([
    { id: 1, label: "React", variant: "default" as const },
    { id: 2, label: "TypeScript", variant: "secondary" as const },
    { id: 3, label: "Next.js", variant: "success" as const },
    { id: 4, label: "YYC3", variant: "purple" as const },
  ])

  const handleRemoveBadge = (id: number) => {
    setBadges(badges.filter((badge) => badge.id !== id))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="container mx-auto p-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">🎉 @yyc3/ui@2.0.0 组件演示</h1>
        <p className="text-lg text-muted-foreground">
          企业级 React 组件库 - 完整类型支持 • 设计令牌系统 • 高度可定制
        </p>
      </div>

      {/* Button 演示 */}
      <Card>
        <CardHeader>
          <CardTitle>Button 按钮</CardTitle>
          <CardDescription>6 种变体 × 4 种尺寸，支持加载状态和图标</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold">变体 (Variants)</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">尺寸 (Sizes)</h3>
            <div className="flex items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🔍</Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">状态 (States)</h3>
            <div className="flex items-center gap-3">
              <Button
                loading={isLoading}
                onClick={() => setIsLoading(!isLoading)}
              >
                {isLoading ? "加载中..." : "点击切换加载"}
              </Button>
              <Button disabled>禁用状态</Button>
              <Button leftIcon={<Mail />}>带图标</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input 演示 */}
      <Card>
        <CardHeader>
          <CardTitle>Input 输入框</CardTitle>
          <CardDescription>支持标签、错误提示、图标、多种变体</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="用户名"
              placeholder="请输入用户名"
              leftIcon={<User />}
            />
            <Input
              label="邮箱"
              type="email"
              placeholder="请输入邮箱"
              leftIcon={<Mail />}
              error="请输入有效的邮箱地址"
            />
            <Input
              label="密码"
              type="password"
              placeholder="请输入密码"
              leftIcon={<Lock />}
              helperText="密码至少8个字符"
            />
            <Input
              label="搜索"
              placeholder="搜索..."
              leftIcon={<Search />}
              variant="success"
            />
          </div>
        </CardContent>
      </Card>

      {/* Badge 演示 */}
      <Card>
        <CardHeader>
          <CardTitle>Badge 徽章</CardTitle>
          <CardDescription>9 种颜色变体，支持移除功能</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold">颜色变体</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="purple">Purple</Badge>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">可移除徽章</h3>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <Badge
                  key={badge.id}
                  variant={badge.variant}
                  removable
                  onRemove={() => handleRemoveBadge(badge.id)}
                >
                  {badge.label}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table 演示 */}
      <Card>
        <CardHeader>
          <CardTitle>Table 表格</CardTitle>
          <CardDescription>企业级数据表格组件</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>名称</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>角色</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>张三</TableCell>
                <TableCell>
                  <Badge variant="success">活跃</Badge>
                </TableCell>
                <TableCell>管理员</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    编辑
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>李四</TableCell>
                <TableCell>
                  <Badge variant="warning">待审核</Badge>
                </TableCell>
                <TableCell>编辑</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    编辑
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>王五</TableCell>
                <TableCell>
                  <Badge variant="destructive">已禁用</Badge>
                </TableCell>
                <TableCell>访客</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    编辑
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Form 演示 */}
      <Card>
        <CardHeader>
          <CardTitle>Form 表单</CardTitle>
          <CardDescription>完整的表单解决方案</CardDescription>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField name="username">
                <FormItem>
                  <FormLabel>用户名</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入用户名" />
                  </FormControl>
                  <FormMessage variant="destructive">
                    用户名不能为空
                  </FormMessage>
                </FormItem>
              </FormField>

              <FormField name="email">
                <FormItem>
                  <FormLabel>邮箱</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="请输入邮箱" />
                  </FormControl>
                  <FormDescription>
                    我们不会分享您的邮箱地址
                  </FormDescription>
                </FormItem>
              </FormField>
            </div>

            <div className="mt-6 flex gap-3">
              <Button type="submit" loading={isLoading}>
                {isLoading ? "提交中..." : "提交表单"}
              </Button>
              <Button type="button" variant="outline">
                重置
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>

      {/* 统计信息 */}
      <Card>
        <CardHeader>
          <CardTitle>📊 组件库统计</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">7</div>
              <div className="text-sm text-muted-foreground">核心组件</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">30+</div>
              <div className="text-sm text-muted-foreground">子组件</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">TypeScript</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">v2.0.0</div>
              <div className="text-sm text-muted-foreground">最新版本</div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground w-full text-center">
            ✅ @yyc3/ui@2.0.0 已成功集成到项目 | 
            🚀 开始使用新组件构建您的应用！
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
