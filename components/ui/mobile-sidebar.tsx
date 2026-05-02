"use client"

import { useState, useEffect } from "react"
import { X, Menu, Sparkles, Zap, TrendingUp, Shield, Activity, ChevronRight, Star, ArrowUpRight, Globe, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  activeTab: string
  onTabChange: (tabId: string) => void
}

const navigationItems = [
  {
    id: "dashboard",
    label: "仪表盘",
    description: "数据概览与洞察",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "tickets",
    label: "客服工单",
    description: "工单管理与追踪",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "contracts",
    label: "合同审批",
    description: "流程审批中心",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "reconciliation",
    label: "财务对账",
    description: "账务核对分析",
    color: "from-green-500 to-emerald-500",
  },
]

const secondaryItems = [
  { id: "analytics", label: "数据分析", icon: Globe },
  { id: "users", label: "用户管理", icon: Cpu },
  { id: "settings", label: "系统设置", icon: Shield },
]

export function MobileSidebar({ isOpen, onClose, activeTab, onTabChange }: MobileSidebarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = "hidden"
    } else {
      setTimeout(() => setIsVisible(false), 300)
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <>
      {/* 遮罩层 */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* 侧边栏抽屉 */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-[85%] max-w-sm glass-enhanced shadow-2xl z-50 transform transition-all duration-300 ease-out md:hidden overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* 头部 */}
        <div className="sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-white/10 p-4 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">Y³</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">YanYu Cloud³</h1>
              <p className="text-xs text-slate-500">v2.0</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* 状态指示器 */}
        <div className="p-4 border-b border-white/10">
          <div className="px-4 py-3 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-teal-950/30 rounded-xl border border-green-200/50 dark:border-green-800/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-green-600 animate-pulse" />
                <span className="text-xs font-bold text-green-800 dark:text-green-300">系统正常</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Zap className="w-3 h-3 text-yellow-500" />
                <TrendingUp className="w-3 h-3 text-blue-500" />
                <Shield className="w-3 h-3 text-purple-500" />
                <Activity className="w-3 h-3 text-emerald-500" />
              </div>
            </div>
          </div>
        </div>

        {/* 主导航 */}
        <nav className="p-4 space-y-2">
          <div className="flex items-center justify-between px-1 mb-3">
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">主要功能</p>
            <ThemeToggle />
          </div>

          {navigationItems.map((item) => {
            const isActive = activeTab === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id)
                  onClose()
                }}
                className={cn(
                  "group w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden",
                  isActive
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-[1.02]`
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                )}
              >
                {isActive && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 animate-pulse" />
                  </div>
                )}

                <div className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center mr-3",
                  isActive ? "bg-white/20" : `bg-gradient-to-br ${item.color} opacity-10`
                )}>
                  <Star className={cn("w-4 h-4", item.id === "dashboard" && !isActive && "text-yellow-500")} />
                </div>
                
                <div className="flex-1 text-left">
                  <div className={cn(
                    "font-bold text-sm",
                    isActive && "text-white"
                  )}>
                    {item.label}
                  </div>
                  {!isActive && (
                    <div className="text-xs text-slate-400 mt-0.5">{item.description}</div>
                  )}
                </div>

                {item.id === "dashboard" && (
                  <Star className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 drop-shadow-lg animate-pulse" />
                )}
              </button>
            )
          })}
        </nav>

        {/* 底部导航 */}
        <div className="p-4 border-t border-white/10 mt-4">
          <p className="px-1 mb-3 text-xs font-black text-slate-400 uppercase tracking-wider">系统工具</p>
          
          {secondaryItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id)
                  onClose()
                }}
                className="group w-full flex items-center px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
              >
                <Icon className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm">{item.label}</span>
                <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            )
          })}

          {/* 版本信息 */}
          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">v2.0.0</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-black bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full">
                Stable
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 group"
      aria-label="打开菜单"
    >
      <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:rotate-90 transition-transform duration-200" />
      
      {/* 触摸反馈 */}
      <div className="absolute inset-0 bg-blue-500/10 rounded-xl opacity-0 group-active:opacity-100 transition-opacity" />
    </button>
  )
}
