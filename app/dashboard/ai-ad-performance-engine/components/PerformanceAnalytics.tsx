'use client'

import { useQuery } from '@tanstack/react-query'
import { BarChart3, TrendingUp, DollarSign, Target, MousePointer, Activity } from 'lucide-react'
import { API_CONFIG } from '@/app/config/api'

interface PerformanceData {
  platformBreakdown: {
    platform: string
    spend: number
    impressions: number
    clicks: number
    conversions: number
    ctr: number
    cpc: number
    roas: number
  }[]
  dailyPerformance: {
    date: string
    spend: number
    impressions: number
    clicks: number
    conversions: number
  }[]
  topPerformingAds: {
    id: string
    headline: string
    platform: string
    impressions: number
    clicks: number
    ctr: number
    conversions: number
    cost: number
  }[]
}

export default function PerformanceAnalytics() {
  const { data: perfResponse, isLoading } = useQuery({
    queryKey: ['ad-performance-analytics'],
    queryFn: async () => {
      const response = await fetch(`${API_CONFIG.baseUrl}/campaigns/performance`)
      if (!response.ok) throw new Error('Failed to fetch performance data')
      return response.json()
    },
    refetchInterval: 30000,
  })

  const overview = perfResponse?.overview || { totalSpend: 0, totalRevenue: 0, totalConversions: 0, totalImpressions: 0, avgRoas: 0, activeCampaigns: 0 }

  return (
    <div className="bg-[#121212] rounded-[3rem] border border-white/5 shadow-2xl p-10 relative overflow-hidden group/analytics">
      <div className="flex items-center justify-between mb-12 relative z-10">
        <div>
          <h2 className="text-3xl font-black text-[#F9FAFB] tracking-tight">Market Resonance</h2>
          <p className="text-[#8a919c] mt-1 text-sm font-black uppercase tracking-[0.2em] text-[10px]">Macro-Level Yield Analysis</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Main Analytics Strip */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Chart 1: Leads vs Conversions */}
            <div className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group/chart">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"></div>
               <div className="flex items-center justify-between mb-10 relative z-10">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8a919c] flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                    Leads vs Conversions
                  </h3>
                  <Target className="w-5 h-5 text-[#3B82F6]" />
               </div>
               <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl relative z-10 group-hover/chart:border-white/10 transition-all">
                  <Activity className="w-12 h-12 text-[#3B82F6]/20 mb-4 animate-pulse" />
                  <p className="text-lg font-black text-[#F9FAFB] tracking-tight">Rendering Pipeline Analysis</p>
                  <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest mt-2">Correlation Matrix Active</p>
               </div>
               <div className="mt-8 grid grid-cols-2 gap-6 relative z-10">
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                     <p className="text-[8px] font-black text-[#4a4a4a] uppercase tracking-widest mb-1 font-bold">Total Impressions</p>
                     <p className="text-xl font-black text-white">{overview.totalImpressions.toLocaleString()}</p>
                   </div>
                   <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                     <p className="text-[8px] font-black text-[#3B82F6] uppercase tracking-widest mb-1 font-bold">Total Conversions</p>
                     <p className="text-xl font-black text-white">{overview.totalConversions}</p>
                   </div>
                </div>
            </div>

            {/* Chart 2: Spend vs Revenue */}
            <div className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group/chart text-center">
               <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent"></div>
               <div className="flex items-center justify-between mb-10 relative z-10 text-left">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8a919c] flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                    Spend vs Revenue
                  </h3>
                  <DollarSign className="w-5 h-5 text-emerald-400" />
               </div>
               <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl relative z-10 group-hover/chart:border-white/10 transition-all">
                  <TrendingUp className="w-12 h-12 text-emerald-400/20 mb-4 scale-110" />
                  <p className="text-lg font-black text-[#F9FAFB] tracking-tight">Yield Efficiency Curve</p>
                  <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest mt-2">Historical Growth Pattern</p>
               </div>
               <div className="mt-8 grid grid-cols-2 gap-6 relative z-10 text-left">
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                     <p className="text-[8px] font-black text-[#4a4a4a] uppercase tracking-widest mb-1 font-bold">Capital Outlay</p>
                     <p className="text-xl font-black text-white">${overview.totalSpend.toLocaleString()}</p>
                   </div>
                   <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                     <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest mb-1 font-bold">Revenue Yield</p>
                     <p className="text-xl font-black text-white">${Math.round(overview.totalRevenue).toLocaleString()}</p>
                   </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}