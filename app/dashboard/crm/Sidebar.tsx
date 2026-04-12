'use client'

import Image from 'next/image'
import { Home, Users, BarChart3, Settings, Briefcase, FileText, Zap, Layers, Building } from 'lucide-react'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const sidebarItems = [
  { icon: Home, label: 'Home', id: 'home' },
  { icon: Building, label: 'Workspace', id: 'workspace', isRoute: true },
  { icon: Users, label: 'Clients', id: 'clients' },
  { icon: Layers, label: 'Management', id: 'management' },
  { icon: Briefcase, label: 'Leads', id: 'leads' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  { icon: FileText, label: 'Reports', id: 'reports' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const router = useRouter()

  const handleLogoClick = useCallback(() => {
    onTabChange('home')
  }, [onTabChange])

  const handleItemClick = (item: typeof sidebarItems[0]) => {
    if (item.isRoute) {
      router.push(`/dashboard?view=${item.id}`)
    } else {
      onTabChange(item.id)
    }
  }

  return (
    <aside className="w-20 bg-[#111827] border-r border-[#1f2937] flex flex-col items-center py-8 gap-4">
      {/* Logo */}
      <button
        onClick={handleLogoClick}
        className="p-2 rounded-2xl cursor-pointer hover:shadow-lg transition-shadow"
      >
        <Image
          src="/images/IMG_2224.png"
          alt="KLARA Logo"
          width={56}
          height={56}
          className="rounded-xl object-cover"
          priority
        />
      </button>

      {/* Divider */}
      <div className="w-12 h-px bg-[#1f2937]" />

      {/* Navigation Items */}
      {sidebarItems.map((item) => {
        const Icon = item.icon
        const isActive = activeTab === item.id
        return (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`p-3 rounded-2xl transition-colors tooltip cursor-pointer ${
              isActive
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
            }`}
            title={item.label}
          >
            <Icon className="w-6 h-6" />
          </button>
        )
      })}

      {/* Divider */}
      <div className="w-12 h-px bg-gray-200 mt-auto" />

      {/* User Avatar */}
      <div className="p-3 rounded-2xl bg-gray-200 cursor-pointer hover:bg-gray-300 transition-colors">
        <div className="w-6 h-6 text-sm font-bold text-gray-700 flex items-center justify-center">
          U
        </div>
      </div>
    </aside>
  )
}
