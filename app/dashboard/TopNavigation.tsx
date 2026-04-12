'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Bell, Settings, User, Building, Users, BarChart3, Calendar, FileText, MessageSquare, TrendingUp, Target, Sparkles } from 'lucide-react'

export default function TopNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState('workspace')

  const navigationItems = [
    { id: 'workspace', label: 'Workspace', icon: Building, route: '/dashboard/workspace' },
    { id: 'crm', label: 'CRM', icon: Users, route: '/dashboard?view=crm' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, route: '/dashboard?view=calendar' },
    { id: 'reports', label: 'Reports', icon: BarChart3, route: '/dashboard?view=reports' },
    { id: 'documents', label: 'Documents', icon: FileText, route: '/dashboard?view=documents' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, route: '/dashboard?view=messages' },
    { id: 'revenue', label: 'Revenue', icon: TrendingUp, route: '/dashboard/revenue-analytics' },
    { id: 'ads', label: 'Ad Performance', icon: Target, route: '/dashboard/ai-ad-performance-engine' },
    { id: 'ugc', label: 'UGC Creative', icon: Sparkles, route: '/dashboard/ai-ugc-creative-engine' },
  ]

  const isActive = (route: string) => {
    return pathname.includes(route.split('?')[0]) || pathname === route
  }

  const handleNavigation = (item: typeof navigationItems[0]) => {
    setActiveItem(item.id)
    router.push(item.route)
  }

  return (
    <div className="bg-[#0f172a] border-b border-[#1e293b] px-2 py-2 shadow-lg sticky top-0 z-40">
      <div className="flex items-center justify-between h-14">
        
        {/* LEFT: Logo & KLARA */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/IMG_2224.png"
            alt="KLARA Logo"
            width={72}
            height={72}
            className="rounded-full shadow-md object-cover"
            priority
          />
          <span className="text-sm font-semibold text-[#e5e7eb] whitespace-nowrap">KLARA</span>
          
          {/* CENTER: Menu Items Inline */}
          <div className="flex items-center gap-2 ml-3">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              const active = isActive(item.route)
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded transition-all whitespace-nowrap text-xs ${
                    active
                      ? 'bg-[#111827] text-[#e5e7eb]'
                      : 'text-[#9ca3af] hover:text-[#e5e7eb]'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* RIGHT: Icons */}
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-full hover:bg-[#1e293b] text-[#9ca3af] hover:text-[#e5e7eb] transition-all">
            <Bell className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-[#1e293b] text-[#9ca3af] hover:text-[#e5e7eb] transition-all">
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-[#1e293b] text-[#9ca3af] hover:text-[#e5e7eb] transition-all">
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
