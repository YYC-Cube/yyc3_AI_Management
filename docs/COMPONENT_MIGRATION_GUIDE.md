# YYC3 组件迁移指南

## 📋 概述

本指南帮助您将现有组件迁移到 **@yyc3/ui@2.0.0** 组件库。

## 🎯 核心组件映射

### 1. Button 按钮

| 旧组件 | 新组件 (@yyc3/ui) | 变更说明 |
|--------|-------------------|----------|
| `@/components/ui/Button` | `@yyc3/ui` 或 `@yyc3/ui/button` | ✅ 完全兼容 |

**迁移示例：**

```tsx
// ❌ 旧写法
import { Button } from "@/components/ui/Button"

// ✅ 新写法
import { Button } from "@yyc3/ui"
// 或
import { Button } from "@yyc3/ui/button"
```

**新增功能：**
- `loading` 属性 - 显示加载状态
- `leftIcon` / `rightIcon` - 图标支持
- 6 种变体: default, destructive, outline, secondary, ghost, link
- 4 种尺寸: sm, default, lg, icon

### 2. Input 输入框

| 旧组件 | 新组件 (@yyc3/ui) | 变更说明 |
|--------|-------------------|----------|
| `@/components/ui/Input` | `@yyc3/ui` 或 `@yyc3/ui/input` | ✅ 增强功能 |

**迁移示例：**

```tsx
// ❌ 旧写法
import { Input } from "@/components/ui/Input"

// ✅ 新写法
import { Input } from "@yyc3/ui"
```

**新增功能：**
- `label` 属性 - 自动生成标签
- `error` / `helperText` - 错误和提示信息
- `leftIcon` / `rightIcon` - 内置图标
- 3 种变体: default, error, success
- 3 种尺寸: sm, default, lg

### 3. Card 卡片 (新增)

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@yyc3/ui"

// 使用示例
<Card>
  <CardHeader>
    <CardTitle>标题</CardTitle>
    <CardDescription>描述文字</CardDescription>
  </CardHeader>
  <CardContent>内容区域</CardContent>
  <CardFooter>底部操作</CardFooter>
</Card>
```

### 4. Table 表格 (新增)

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@yyc3/ui"

// 使用示例
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>姓名</TableHead>
      <TableHead>状态</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>张三</TableCell>
      <TableCell>活跃</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### 5. Form 表单 (新增)

```tsx
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@yyc3/ui"

// 使用示例
<Form onSubmit={handleSubmit}>
  <FormField name="email">
    <FormItem>
      <FormLabel>邮箱</FormLabel>
      <FormControl>
        <Input type="email" placeholder="请输入邮箱" />
      </FormControl>
      <FormDescription>我们不会分享您的邮箱</FormDescription>
      <FormMessage variant="destructive">请输入有效的邮箱地址</FormMessage>
    </FormItem>
  </FormField>
</Form>
```

### 6. Badge 徽章

| 旧组件 | 新组件 (@yyc3/ui) | 变更说明 |
|--------|-------------------|----------|
| `@/components/ui/Badge` | `@yyc3/ui` 或 `@yyc3/ui/badge` | ✅ 增强功能 |

**新增功能：**
- `removable` / `onRemove` - 可移除徽章
- `leftIcon` / `rightIcon` - 图标支持
- 9 种变体: default, secondary, destructive, outline, success, warning, danger, info, purple
- 3 种尺寸: sm, default, lg

## 🔧 安装配置

### 方法 1: 本地开发链接（推荐）

```bash
# 在主项目根目录执行
npm link ./package-ui
```

### 方法 2: npm 包安装（生产环境）

```bash
npm install @yyc3/ui@2.0.0
```

### 更新 package.json

在主项目的 package.json 中添加：

```json
{
  "dependencies": {
    "@yyc3/ui": "file:./package-ui"
  }
}
```

## 📦 设计令牌系统

```typescript
import { tokens } from "@yyc3/ui/tokens"

// 使用设计令牌
const primaryColor = tokens.colors.brand.primary
const spacing = tokens.spacing[4]
const borderRadius = tokens.borderRadius.DEFAULT
```

## 🚀 快速开始

1. **安装依赖**

   ```bash
   npm install
   ```

2. **导入组件**

   ```tsx
   import { Button, Input, Card } from "@yyc3/ui"
   ```

3. **开始使用**

   ```tsx
   export default function HomePage() {
     return (
       <div className="p-4">
         <Card>
           <CardHeader>
             <CardTitle>欢迎使用 YYC3 UI</CardTitle>
           </CardHeader>
           <CardContent>
             <Button variant="default" size="lg">
               点击开始
             </Button>
           </CardContent>
         </Card>
       </div>
     )
   }
   ```

## ⚠️ 注意事项

1. **TypeScript 支持**: 所有组件都提供完整的类型定义
2. **Tree-shaking**: 支持按需导入，减少打包体积
3. **主题定制**: 通过 CSS 变量实现主题切换
4. **无障碍访问**: 遵循 WAI-ARIA 规范
5. **React 19 兼容**: 完全兼容 React 18/19

## 🔄 迁移检查清单

- [ ] 更新 package.json 添加 @yyc3/ui 依赖
- [ ] 替换所有 Button 导入路径
- [ ] 替换所有 Input 导入路径
- [ ] 替换所有 Badge 导入路径
- [ ] 使用新 Card/Table/Form 组件重构页面
- [ ] 测试所有页面功能和样式
- [ ] 运行 TypeScript 类型检查
- [ ] 执行 ESLint 检查
- [ ] 进行性能测试
- [ ] 更新团队文档

## 📚 相关资源

- [YYC3 UI 文档](../package-ui/README.md)
- [设计令牌规范](../package-ui/src/design-tokens/tokens.ts)
- [组件 API 参考](../package-ui/src/index.ts)

---

**版本**: @yyc3/ui@2.0.0  
**最后更新**: 2026-05-02  
**维护者**: YYC3 团队
