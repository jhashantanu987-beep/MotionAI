'use client'

import UGCHeader from './components/UGCHeader'
import ContentGenerator from './components/ContentGenerator'
import ContentLibrary from './components/ContentLibrary'
import PerformanceAnalytics from './components/PerformanceAnalytics'
import SocialScheduler from './components/SocialScheduler'
import UGCFloatingPanel from './components/UGCFloatingPanel'
import { Settings, Bell, LogOut } from 'lucide-react'

export default function AIUGCCreativeEngineDashboard() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col relative overflow-x-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <UGCHeader />

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-8 space-y-8">
          {/* Content Generator */}
          <ContentGenerator />

          {/* Performance Analytics */}
          <PerformanceAnalytics />

          {/* Content Library & Social Scheduler */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
            <ContentLibrary />
            <SocialScheduler />
          </div>

          {/* Footer Utility & Global Actions */}
          <div className="pt-20 pb-16 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 border-t border-white/5 relative z-20">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-[0.5em]">Antigravity Creative Layer // v4.0.2</p>
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Documentation</span>
                <span className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Neural Log</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#121212] p-2 rounded-[2rem] border border-white/5 shadow-2xl">
              <button className="flex items-center gap-3 px-6 py-3 rounded-2xl text-[#8a919c] hover:text-white hover:bg-white/5 transition-all group">
                <Settings className="w-4 h-4 transition-transform group-hover:rotate-45" />
                <span className="text-[10px] font-black uppercase tracking-widest">Settings</span>
              </button>
              <button className="flex items-center gap-3 px-6 py-3 rounded-2xl text-[#8a919c] hover:text-white hover:bg-white/5 transition-all group">
                <Bell className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="text-[10px] font-black uppercase tracking-widest">Notifications</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <UGCFloatingPanel />
    </div>
  )
}