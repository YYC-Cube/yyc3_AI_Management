"use client"

import { useState, useEffect } from "react"
import { MainDashboard } from "@/components/dashboard/main-dashboard"
import { TicketSystem } from "@/components/support/ticket-system"
import { ContractApproval } from "@/components/workflow/contract-approval"
import { FinancialReconciliation } from "@/components/finance/financial-reconciliation"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { MobileSidebar, MobileMenuButton } from "@/components/ui/mobile-sidebar"
import { useResponsive } from "@/hooks/use-responsive"
import { LayoutDashboard, Ticket, FileText, DollarSign, Users, Settings, BarChart3, Sparkles, Zap, TrendingUp, Shield, Bell, Search, ChevronRight, Star, ArrowUpRight, Activity, Globe, Cpu, Home as HomeIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const responsive = useResponsive()

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsLoaded(true)
    })
    return () => cancelAnimationFrame(timer)
  }, [])

  const navigationItems = [
    {
      id: "dashboard",
      label: "仪表盘",
      icon: LayoutDashboard,
      description: "数据概览与洞察",
      color: "from-blue-500 to-cyan-500",
      component: <MainDashboard />,
    },
    {
      id: "tickets",
      label: "客服工单",
      icon: Ticket,
      description: "工单管理与追踪",
      color: "from-purple-500 to-pink-500",
      component: <TicketSystem />,
    },
    {
      id: "contracts",
      label: "合同审批",
      icon: FileText,
      description: "流程审批中心",
      color: "from-orange-500 to-red-500",
      component: <ContractApproval />,
    },
    {
      id: "reconciliation",
      label: "财务对账",
      icon: DollarSign,
      description: "账务核对分析",
      color: "from-green-500 to-emerald-500",
      component: <FinancialReconciliation />,
    },
  ]

  const secondaryItems = [
    { id: "analytics", label: "数据分析", icon: BarChart3, badge: "NEW" },
    { id: "users", label: "用户管理", icon: Users },
    { id: "settings", label: "系统设置", icon: Settings },
  ]

  return (
    <div className={cn(
      "flex h-screen overflow-hidden transition-all duration-1000",
      isLoaded ? "opacity-100" : "opacity-0"
    )}>
      {/* 动态背景 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-gradient-to-tr from-cyan-400/25 to-blue-500/15 rounded-full blur-3xl animate-float delay-500" />
        <div className="absolute -bottom-20 right-1/3 w-72 h-72 bg-gradient-to-tl from-purple-400/20 to-pink-500/15 rounded-full blur-3xl animate-float delay-1000" />
        
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* ==================== 桌面端侧边栏 (≥md) ==================== */}
      <aside className={cn(
        "hidden md:flex flex-col z-10 border-r border-white/20 shadow-2xl transition-all duration-300",
        responsive.isDesktop 
          ? "w-80 glass-enhanced" 
          : responsive.isTablet 
            ? "w-64 glass-enhanced" 
            : ""
      )}>
        {/* Logo 区域 */}
        <div className={cn(
          "p-6 pb-4 border-b border-white/10",
          responsive.isTablet && "p-4 pb-3"
        )}>
          <div className={cn(
            "flex items-center mb-4",
            responsive.isTablet && "mb-3"
          )}>
            <div className={cn(
              "group flex items-center space-x-3",
              responsive.isTablet && "space-x-2"
            )}>
              <div className={cn(
                "relative bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/30 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 animate-gradient",
                responsive.isTablet ? "w-11 h-11" : "w-14 h-14"
              )}>
                <span className={cn(
                  "text-white font-bold tracking-tight drop-shadow-lg",
                  responsive.isTablet ? "text-xl" : "text-2xl"
                )}>Y³</span>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-3 border-white animate-pulse shadow-lg shadow-green-500/50" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              </div>
              
              {!responsive.isTablet && (
                <div className="flex-1 relative z-10">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    YanYu Cloud³
                  </h1>
                  <p className="text-xs text-slate-500 font-semibold tracking-wide">企业管理系统 v2.0</p>
                </div>
              )}
            </div>
          </div>

          {/* 搜索栏 (隐藏于平板) */}
          {!responsive.isTablet && (
            <div className="relative mb-4">
              <button className="w-full flex items-center px-4 py-2.5 bg-white/50 hover:bg-white/70 border border-slate-200/50 rounded-xl transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                <Search className="w-4 h-4 text-slate-400 mr-3 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm text-slate-400 group-hover:text-slate-600 transition-colors">搜索功能、页面、设置...</span>
                <kbd className="ml-auto px-2 py-0.5 text-xs font-mono bg-slate-100 text-slate-500 rounded-md border border-slate-200 hidden lg:inline-block">⌘K</kbd>
              </button>
            </div>
          )}

          {/* 状态指示器 */}
          <div className={cn(
            "relative overflow-hidden px-4 py-3 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-teal-950/30 rounded-xl border border-green-200/50 dark:border-green-800/30 shadow-sm",
            responsive.isTablet && "px-3 py-2.5"
          )}>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-transparent animate-shimmer" />
            
            <div className="relative flex items-center justify-between">
              <div className={cn(
                "flex items-center space-x-2",
                responsive.isTablet && "space-x-1.5"
              )}>
                <div className="relative">
                  <Sparkles className={cn(
                    "text-green-600 animate-pulse",
                    responsive.isTablet ? "w-3.5 h-3.5" : "w-4 h-4"
                  )} />
                  <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-50 animate-pulse-glow" />
                </div>
                <span className={cn(
                  "font-bold text-green-800 dark:text-green-300 tracking-wide",
                  responsive.isTablet ? "text-[10px]" : "text-xs"
                )}>系统正常</span>
              </div>
              
              <div className={cn(
                "flex items-center",
                responsive.isTablet ? "space-x-1" : "space-x-1.5"
              )}>
                <Zap className={cn("text-yellow-500", responsive.isTablet ? "w-3 h-3" : "w-3.5 h-3.5")} />
                <TrendingUp className={cn("text-blue-500", responsive.isTablet ? "w-3 h-3" : "w-3.5 h-3.5")} />
                <Shield className={cn("text-purple-500", responsive.isTablet ? "w-3 h-3" : "w-3.5 h-3.5")} />
                <Activity className={cn("text-emerald-500 animate-pulse", responsive.isTablet ? "w-3 h-3" : "w-3.5 h-3.5")} />
              </div>
            </div>
          </div>
        </div>

        {/* 主导航 */}
        <nav className={cn(
          "flex-1 overflow-y-auto scrollbar-thin",
          responsive.isTablet ? "p-3 space-y-1.5" : "p-4 space-y-2"
        )}>
          <div className={cn(
            "flex items-center justify-between mb-4 px-1",
            responsive.isTablet && "mb-3"
          )}>
            <p className={cn(
              "font-black text-slate-400 uppercase",
              responsive.isTablet ? "text-[10px] tracking-wider" : "text-xs tracking-widest"
            )}>主要功能</p>
            <ThemeToggle />
          </div>
          
          {navigationItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "group relative w-full flex items-center rounded-2xl transition-all duration-300 overflow-hidden",
                  isLoaded && "animate-fade-in-up",
                  responsive.isTablet ? "px-3 py-2.5" : "px-4 py-3.5",
                  isActive
                    ? `bg-gradient-to-r ${item.color} text-white shadow-xl scale-[1.02]`
                    : "hover:bg-white/60 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:scale-[1.01] hover:shadow-lg"
                )}
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                {!isActive && (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    <div className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-b rounded-r-full transition-all duration-300",
                      item.color,
                      responsive.isTablet ? "w-0.5 h-0 group-hover:h-6" : "w-1 h-0 group-hover:h-8"
                    )} />
                  </>
                )}

                {isActive && (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className={cn(
                      "absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 rounded-full flex items-center justify-center",
                      responsive.isTablet ? "w-5 h-5" : "w-6 h-6"
                    )}>
                      <ChevronRight className={cn("animate-pulse", responsive.isTablet ? "w-3 h-3" : "w-4 h-4")} />
                    </div>
                  </>
                )}
                
                <div className="relative z-10 flex items-center w-full">
                  <div className={cn(
                    "rounded-xl flex items-center justify-center mr-3 transition-all duration-300",
                    responsive.isTablet ? "w-8 h-8" : "w-10 h-10",
                    isActive 
                      ? "bg-white/20 backdrop-blur-sm shadow-inner" 
                      : `bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20`
                  )}>
                    <Icon className={cn(
                      "transition-all duration-300",
                      responsive.isTablet ? "w-4 h-4" : "w-5 h-5",
                      isActive && "drop-shadow-md"
                    )} />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className={cn(
                      "font-bold tracking-wide",
                      responsive.isTablet ? "text-xs" : "text-sm",
                      isActive && "text-white"
                    )}>
                      {item.label}
                    </div>
                    {!responsive.isTablet && !isActive && (
                      <div className="text-xs text-slate-400 mt-0.5 font-medium">{item.description}</div>
                    )}
                  </div>

                  {item.id === "dashboard" && !responsive.isTablet && (
                    <Star className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 drop-shadow-lg animate-pulse" />
                  )}
                </div>
              </button>
            )
          })}
        </nav>

        {/* 底部导航 */}
        <div className={cn(
          "border-t border-white/10 space-y-1",
          responsive.isTablet ? "p-3" : "p-4"
        )}>
          <div className={cn(
            "flex items-center justify-between mb-3 px-1",
            responsive.isTablet && "mb-2"
          )}>
            <p className={cn(
              "font-black text-slate-400 uppercase",
              responsive.isTablet ? "text-[10px] tracking-wider" : "text-xs tracking-widest"
            )}>系统工具</p>
            <div className="flex items-center space-x-1">
              <Globe className={cn("text-green-500", responsive.isTablet ? "w-2.5 h-2.5" : "w-3 h-3")} />
              <Cpu className={cn("text-blue-500", responsive.isTablet ? "w-2.5 h-2.5" : "w-3 h-3")} />
            </div>
          </div>
          
          {secondaryItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "group w-full flex items-center rounded-xl hover:bg-white/60 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-200 relative overflow-hidden",
                  responsive.isTablet ? "px-3 py-2" : "px-4 py-2.5"
                )}
              >
                <Icon className={cn(
                  "mr-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-200",
                  responsive.isTablet ? "w-3.5 h-3.5" : "w-4 h-4"
                )} />
                <span className={cn(
                  "font-semibold flex-1 text-left",
                  responsive.isTablet ? "text-xs" : "text-sm"
                )}>{item.label}</span>
                
                {item.badge && !responsive.isTablet && (
                  <span className="px-2 py-0.5 text-[10px] font-black bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-md animate-pulse">
                    {item.badge}
                  </span>
                )}
                
                {!responsive.isTablet && (
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                )}
              </button>
            )
          })}
          
          {/* 版本信息卡片 */}
          <div className={cn(
            "mt-4 p-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-inner",
            responsive.isTablet && "p-2.5 mt-3"
          )}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center space-x-2">
                <div className={cn(
                  "bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50",
                  responsive.isTablet ? "w-1.5 h-1.5" : "w-2 h-2"
                )} />
                <span className={cn(
                  "font-bold text-slate-600 dark:text-slate-400",
                  responsive.isTablet ? "text-[10px]" : "text-xs"
                )}>v2.0.0</span>
              </div>
              <span className={cn(
                "font-black bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-md uppercase tracking-wider",
                responsive.isTablet ? "px-1.5 py-0.5 text-[8px]" : "px-2 py-0.5 text-[10px]"
              )}>Stable</span>
            </div>
            {!responsive.isTablet && (
              <div className="text-[10px] text-slate-500 font-medium">© 2024 YanYu Cloud³ Team</div>
            )}
          </div>
        </div>
      </aside>

      {/* ==================== 移动端侧边栏 (<md) ==================== */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* ==================== 主内容区 ==================== */}
      <main className="relative flex-1 overflow-hidden min-w-0">
        {/* 顶部导航栏 */}
        <header className={cn(
          "absolute top-0 left-0 right-0 glass-enhanced border-b border-white/20 z-20 flex items-center",
          responsive.isMobile ? "h-14 px-4" : "h-16 px-8",
          responsive.isTablet && "h-15 px-6"
        )}>
          <div className="flex items-center flex-1 min-w-0">
            {/* 移动端菜单按钮 */}
            <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)} />

            <div className={cn(
              "flex items-center ml-3 min-w-0",
              responsive.isMobile && "ml-3"
            )}>
              <HomeIcon className={cn(
                "text-blue-500 flex-shrink-0",
                responsive.isMobile ? "w-4 h-4 mr-2" : "w-5 h-5 mr-3"
              )} />
              <h2 className={cn(
                "font-bold text-slate-800 dark:text-slate-200 truncate capitalize",
                responsive.isMobile ? "text-base" : "text-lg"
              )}>
                {navigationItems.find(item => item.id === activeTab)?.label}
              </h2>
            </div>
            
            {/* 状态徽章 (隐藏于手机) */}
            {!responsive.isMobile && (
              <div className={cn(
                "ml-4 px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold rounded-full border border-blue-200 dark:border-blue-800 flex-shrink-0",
                responsive.isTablet ? "text-[10px]" : "text-xs"
              )}>
                实时同步
              </div>
            )}
          </div>
          
          <div className={cn(
            "flex items-center",
            responsive.isMobile ? "space-x-2" : "space-x-3"
          )}>
            {/* 通知铃铛 */}
            <button className={cn(
              "relative hover:bg-white/50 dark:hover:bg-white/10 rounded-xl transition-colors group flex-shrink-0",
              responsive.isMobile ? "p-1.5" : "p-2"
            )}>
              <Bell className={cn(
                "text-slate-600 dark:text-slate-400 group-hover:text-blue-500 transition-colors",
                responsive.isMobile ? "w-4 h-4" : "w-5 h-5"
              )} />
              <div className={cn(
                "absolute bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse",
                responsive.isMobile ? "top-0.5 right-0.5 w-2 h-2" : "top-1 right-1 w-2.5 h-2.5"
              )} />
            </button>
            
            {/* 用户头像 */}
            <div className={cn(
              "bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 cursor-pointer hover:scale-110 hover:rotate-6 transition-transform duration-300 flex-shrink-0",
              responsive.isMobile ? "w-8 h-8" : "w-9 h-9"
            )}>
              <span className={cn(
                "text-white font-bold",
                responsive.isMobile ? "text-xs" : "text-sm"
              )}>A</span>
            </div>
          </div>
        </header>

        {/* 内容容器 */}
        <div className="relative h-full pt-[3.5rem] md:pt-16 lg:pt-16 overflow-auto">
          <div className={cn(
            "transition-all duration-700",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            responsive.isMobile ? "p-4" : responsive.isTablet ? "p-6" : "p-8"
          )}>
            <div className="max-w-7xl mx-auto w-full">
              {navigationItems.find((item) => item.id === activeTab)?.component}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
