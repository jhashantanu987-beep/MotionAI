'use client'

import AdHeader from './components/AdHeader'
import CampaignManager from './components/CampaignManager'
import PerformanceAnalytics from './components/PerformanceAnalytics'
import BudgetOptimizer from './components/BudgetOptimizer'
import CreativeAnalyzer from './components/CreativeAnalyzer'
import { Settings, Bell, LogOut } from 'lucide-react'

export default function AIAdPerformanceEngineDashboard() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col relative overflow-x-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#3B82F6]/5 blur-[200px] rounded-full"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[200px] rounded-full"></div>
      </div>

      {/* Main Content Scrollable Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Focused Section: Branding & Core KPIs */}
        <section className="relative z-10 w-full">
          <AdHeader />
        </section>

        {/* Content Area with High Visual Hierarchy */}
        <div className="max-w-[1800px] mx-auto w-full px-4 md:px-8 py-8 md:py-16 space-y-12 md:space-y-24 relative z-10">
          
          {/* Primary Action Section: Campaign Orchestration */}
          <section className="space-y-10">
            <div className="flex items-center gap-6 px-4">
               <div className="h-[1px] flex-1 bg-white/5"></div>
               <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#4a4a4a] whitespace-nowrap">Active Orchestration</h3>
               <div className="h-[1px] flex-1 bg-white/5"></div>
            </div>
            <CampaignManager />
          </section>

          {/* Strategic Section: Optimization & Predictive Yield */}
          <section className="grid grid-cols-1 xl:grid-cols-1 gap-12 items-start">
             <BudgetOptimizer />
          </section>

          {/* Intelligence Section: Deep Resonance & Creative Yield */}
          <section className="space-y-16">
             <div className="grid grid-cols-1 gap-12 items-start">
                <PerformanceAnalytics />
                <CreativeAnalyzer />
             </div>
          </section>

          {/* Footer Utility & Global Actions */}
          <div className="pt-20 pb-16 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 border-t border-white/5 relative z-20">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-[0.5em]">Antigravity Performance Layer // v4.0.2</p>
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
    </div>
  )
}