'use client'

import {
  BarChart3,
  Calendar,
  FileText,
  Home,
  Settings,
  Users,
  Briefcase,
  MessageSquare,
  Bell,
  Building,
  Zap,
  Target,
  TrendingUp,
  Sparkles,
  Menu,
  ChevronDown,
  X
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

interface MenuBarProps {
  activeTab: string
  onTabChange?: (tab: string) => void
}

const menuItems = [
  { id: 'home', icon: Home, label: 'Home', category: 'main' },
  { id: 'crm', icon: Users, label: 'CRM', isRoute: true, category: 'main' },
  { id: 'workspace', icon: Building, label: 'Workspace', category: 'main' },
  { id: 'calendar', icon: Calendar, label: 'Calendar', category: 'main' },
  { id: 'reports', icon: BarChart3, label: 'Reports', category: 'main' },
  { id: 'documents', icon: FileText, label: 'Documents', category: 'main' },
  { id: 'messages', icon: MessageSquare, label: 'Messages', category: 'main' },
  { id: 'notifications', icon: Bell, label: 'Notifications', category: 'main' },
  { id: 'revenue', icon: TrendingUp, label: 'Revenue Analytics', isRoute: true, category: 'ai' },
  { id: 'ads', icon: Target, label: 'Ad Performance', isRoute: true, category: 'ai' },
  { id: 'ugc', icon: Sparkles, label: 'UGC Creative', isRoute: true, category: 'ai' },
  { id: 'settings', icon: Settings, label: 'Settings', category: 'main' },
]

export default function MenuBar({ activeTab }: MenuBarProps) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const routeMap: Record<string, string> = {
    home: '/dashboard',
    crm: '/dashboard?view=crm',
    workspace: '/dashboard?view=workspace',
    calendar: '/dashboard?view=calendar',
    reports: '/dashboard?view=reports',
    documents: '/dashboard?view=documents',
    messages: '/dashboard?view=messages',
    notifications: '/dashboard?view=notifications',
    revenue: '/dashboard/revenue-analytics',
    ads: '/dashboard/ai-ad-performance-engine',
    ugc: '/dashboard/ai-ugc-creative-engine',
    settings: '/dashboard?view=settings'
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleItemClick = (item: typeof menuItems[0]) => {
    const route = routeMap[item.id] || '/dashboard'
    router.push(route)
    setIsMenuOpen(false)
  }

  const mainItems = menuItems.filter(item => item.category === 'main')
  const aiItems = menuItems.filter(item => item.category === 'ai')
  const currentLabel = menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'

  return (
    <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-2xl border-b border-cyan-500/20 px-4 md:px-8 py-4 relative backdrop-blur-sm" ref={menuRef}>
      <div className="flex items-center justify-between">
        {/* Left: Logo/Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="hidden sm:block font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Klara AI
          </span>
        </div>

        {/* Center: Current Page Indicator */}
        <div className="hidden md:flex items-center space-x-2">
          <div className="text-sm text-cyan-300/70">Dashboard /</div>
          <div className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30">
            <span className="text-sm font-semibold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              {currentLabel}
            </span>
          </div>
        </div>

        {/* Right: Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="group flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-blue-500/20 hover:bg-cyan-500/30 text-cyan-100 transition-all duration-200 border border-cyan-500/30 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <Menu className="w-5 h-5 group-hover:text-cyan-300 transition-colors" />
          <span className="font-semibold text-sm hidden sm:inline">Menu</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 group-hover:text-cyan-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 mx-4 bg-gradient-to-br from-slate-900 to-blue-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 z-50 max-h-96 overflow-y-auto backdrop-blur-xl">
          <div className="py-3">
            {/* Header */}
            <div className="px-4 py-2 flex items-center justify-between border-b border-cyan-500/20">
              <h2 className="text-xs font-bold text-cyan-300 uppercase tracking-widest">Navigation</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-cyan-400/60 hover:text-cyan-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Items */}
            <div className="py-2 space-y-1">
              {mainItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id

                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-600/40 to-blue-600/40 text-white border-r-2 border-cyan-400'
                        : 'text-cyan-200/70 hover:bg-blue-500/30 hover:text-cyan-100'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400'}`} />
                    <span className="font-medium text-sm">{item.label}</span>
                    {isActive && <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full"></div>}
                  </button>
                )
              })}
            </div>

            {/* AI Services Section */}
            <div className="border-t border-cyan-500/20 mt-2 pt-2">
              <div className="px-4 py-2">
                <h3 className="text-xs font-bold text-cyan-400/80 uppercase tracking-widest flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>AI Services</span>
                </h3>
              </div>
              <div className="py-2 space-y-1">
                {aiItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeTab === item.id

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 group ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600/40 to-purple-600/40 text-white border-r-2 border-cyan-400'
                          : 'text-cyan-200/70 hover:bg-purple-500/30 hover:text-cyan-100'
                      }`}
                    >
                      <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400'}`} />
                      <span className="font-medium text-sm">{item.label}</span>
                      {isActive && <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full"></div>}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}