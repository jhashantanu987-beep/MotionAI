'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Building, Users, TrendingUp, Target, Sparkles, Settings, Bell, Menu, X } from 'lucide-react'
import Image from 'next/image'
import DashboardDrawer from './DashboardDrawer'
import SettingsPanel from './SettingsPanel'
import NotificationsPanel from './NotificationsPanel'

const navItems = [
  { id: 'workspace', label: 'Workspace', icon: Building, href: '/dashboard/workspace' },
  { id: 'crm', label: 'CRM', icon: Users, href: '/dashboard?view=crm' },
  { id: 'revenue', label: 'Revenue', icon: TrendingUp, href: '/dashboard/revenue-analytics' },
  { id: 'ads', label: 'Ads', icon: Target, href: '/dashboard/ai-ad-performance-engine' },
  { id: 'ugc', label: 'UGC', icon: Sparkles, href: '/dashboard/ai-ugc-creative-engine' },
]

export default function GlobalHeader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const isActive = (href: string) => {
    if (href.includes('?view=')) {
      const url = new URL(href, 'http://localhost')
      const view = url.searchParams.get('view')
      return pathname === '/dashboard' && searchParams.get('view') === view
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-20 bg-[#050505]/60 backdrop-blur-2xl border-b border-white/5 z-[100] flex items-center justify-between px-4 md:px-8">
        {/* Logo Section */}
        <div className="flex items-center gap-3 w-auto md:w-48 shrink-0">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-white/5">
            <Image
              src="/images/IMG_2224.png"
              alt="KLARA Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xl font-black bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent tracking-tighter">
            KLARA
          </span>
        </div>

        {/* Desktop Navigation Pill Menu */}
        <nav className="hidden md:flex flex-1 justify-center">
          <div className="bg-[#121212]/50 border border-white/5 p-1 rounded-2xl flex items-center gap-1 shadow-2xl backdrop-blur-md">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl transition-all duration-300 group relative ${
                    active 
                      ? 'bg-[#1a1a1a] text-white shadow-[0_0_15px_rgba(59,130,246,0.1)] border border-white/10' 
                      : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon 
                    className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                      active ? 'text-[#3B82F6]' : 'text-gray-500 group-hover:text-white'
                    }`}
                  />
                  <span className="font-bold text-[11px] uppercase tracking-widest leading-none hidden md:inline-block">
                    {item.label}
                  </span>
                  {active && (
                     <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#3B82F6] rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Action Icons & Mobile Toggle */}
        <div className="flex items-center justify-end gap-3 w-auto md:w-48 shrink-0">
          <button 
            onClick={() => setIsNotificationsOpen(true)}
            className="hidden sm:flex w-10 h-10 bg-[#121212] items-center justify-center rounded-xl border border-white/5 text-gray-500 hover:text-white hover:border-white/10 transition-all group"
          >
            <Bell className="w-4 h-4 transition-transform group-hover:scale-110" />
          </button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="hidden sm:flex w-10 h-10 bg-[#121212] items-center justify-center rounded-xl border border-white/5 text-gray-500 hover:text-white hover:border-white/10 transition-all group"
          >
            <Settings className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </button>
          
          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex w-10 h-10 bg-[#121212] items-center justify-center rounded-xl border border-white/5 text-gray-500 hover:text-white hover:border-white/10 transition-all active:scale-95"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 transition-transform" />
            ) : (
              <Menu className="w-5 h-5 transition-transform" />
            )}
          </button>
        </div>
      </header>

      {/* DRAWERS */}
      <DashboardDrawer 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        title="Account Settings"
      >
        <SettingsPanel />
      </DashboardDrawer>

      <DashboardDrawer 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
        title="Live Notifications"
      >
        <NotificationsPanel />
      </DashboardDrawer>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-3xl border-b border-white/10 p-4 shadow-2xl z-[90] animate-in slide-in-from-top-2 duration-300">
           <nav className="flex flex-col gap-2">
             {navItems.map((item) => {
               const Icon = item.icon
               const active = isActive(item.href)

               return (
                 <Link
                   key={item.id}
                   href={item.href}
                   onClick={() => setIsMobileMenuOpen(false)}
                   className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${
                     active 
                       ? 'bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20' 
                       : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                   }`}
                 >
                   <Icon className={`w-5 h-5 ${active ? 'text-[#3B82F6]' : 'text-gray-500'}`} />
                   <span className="font-bold text-xs uppercase tracking-widest leading-none">
                     {item.label}
                   </span>
                 </Link>
               )
             })}
             
             <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-2">
                <button 
                  onClick={() => { setIsNotificationsOpen(true); setIsMobileMenuOpen(false); }}
                  className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white/5 text-gray-400 hover:text-white"
                >
                   <Bell className="w-4 h-4" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Alerts</span>
                </button>
                <button 
                  onClick={() => { setIsSettingsOpen(true); setIsMobileMenuOpen(false); }}
                  className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white/5 text-gray-400 hover:text-white"
                >
                   <Settings className="w-4 h-4" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Settings</span>
                </button>
             </div>
           </nav>
        </div>
      )}
    </>
  )
}
