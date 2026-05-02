"use client"

import { Button, Card, CardHeader, CardTitle, CardContent } from "@yyc3/ui"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            🚀 YanYu Cloud³ 智能业务管理系统
          </h1>
          <p className="text-xl text-gray-600">
            基于 @yyc3/ui@2.0.0 组件库构建 | 企业级解决方案
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              ✅ 系统状态：运行正常
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="text-3xl mb-2">🎨</div>
                <h3 className="font-bold text-green-800">UI 组件库</h3>
                <p className="text-sm text-green-600">@yyc3/ui@2.0.0</p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-bold text-blue-800">开发框架</h3>
                <p className="text-sm text-blue-600">Next.js 16 + React 19</p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <div className="text-3xl mb-2">🔧</div>
                <h3 className="font-bold text-purple-800">类型安全</h3>
                <p className="text-sm text-purple-600">TypeScript 100%</p>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => window.location.href = "/dashboard"}
                className="px-8"
              >
                进入系统 →
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => alert("YYC3 CLI 开发中...")}
              >
                开发工具
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "核心组件", count: "7+", icon: "📦", color: "blue" },
            { title: "设计令牌", count: "100+", icon: "🎨", color: "purple" },
            { title: "类型定义", count: "100%", icon: "✅", color: "green" },
            { title: "文档覆盖", count: "完整", icon: "📚", color: "orange" },
          ].map((item) => (
            <Card key={item.title} className={`border-l-4 border-l-${item.color}-500`}>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl">{item.icon}</div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-2xl font-bold text-primary">{item.count}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
