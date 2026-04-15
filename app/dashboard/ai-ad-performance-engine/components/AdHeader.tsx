'use client'

import { useQuery } from '@tanstack/react-query'
import { TrendingUp, DollarSign, Target, Zap, Settings, ArrowUpRight, BarChart3 } from 'lucide-react'
import { API_CONFIG } from '@/app/config/api'

interface AdMetrics {
  totalSpend: number
  totalImpressions: number
  totalClicks: number
  avgCTR: number
  avgCPC: number
  avgCPA: number
  totalConversions: number
  avgROAS: number
  activeCampaigns: number
  aiOptimizations: number
}

export default function AdHeader() {
  const { data: perfResponse, isLoading } = useQuery({
    queryKey: ['ad-performance-metrics'],
    queryFn: async () => {
      const response = await fetch(`${API_CONFIG.baseUrl}/campaigns/performance`)
      if (!response.ok) throw new Error('Failed to fetch ad metrics')
      return response.json()
    },
    refetchInterval: 30000,
  })

  const overview = perfResponse?.overview || {}
  // Map to AdMetrics shape
  const adMetrics: AdMetrics | null = perfResponse ? {
    totalSpend: overview.totalSpend || 0,
    totalImpressions: overview.totalImpressions || 0,
    totalClicks: 0,
    avgCTR: overview.totalImpressions > 0 ? 3.8 : 0,
    avgCPC: 0.75,
    avgCPA: 0,
    totalConversions: overview.totalConversions || 0,
    avgROAS: overview.avgRoas || 0,
    activeCampaigns: overview.activeCampaigns || 0,
    aiOptimizations: 3
  } : null

  // Derived Metrics
  const revenue = adMetrics ? adMetrics.totalSpend * adMetrics.avgROAS : 0
  const cpl = adMetrics && adMetrics.totalConversions > 0 ? adMetrics.totalSpend / adMetrics.totalConversions : 0

  const kpis = [
    {
      label: 'Revenue Generated',
      value: `$${revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      subValue: `From $${adMetrics?.totalSpend.toLocaleString()} spend`,
      icon: DollarSign,
      color: 'text-emerald-400',
      glow: 'shadow-[0_0_30px_rgba(52,211,153,0.15)]'
    },
    {
      label: 'Return on Ad Spend',
      value: `${adMetrics?.avgROAS || 0}x`,
      subValue: 'Efficiency Multiplier',
      icon: TrendingUp,
      color: 'text-[#3B82F6]',
      glow: 'shadow-[0_0_30px_rgba(59,130,246,0.15)]'
    },
    {
      label: 'Cost Per Lead (CPL)',
      value: `$${cpl.toFixed(2)}`,
      subValue: 'Acquisition Unit Cost',
      icon: Target,
      color: 'text-amber-400',
      glow: 'shadow-[0_0_30px_rgba(251,191,36,0.15)]'
    },
    {
      label: 'Active Campaigns',
      value: adMetrics?.activeCampaigns || 0,
      subValue: 'Live Marketing Vectors',
      icon: Zap,
      color: 'text-purple-400',
      glow: 'shadow-[0_0_30px_rgba(192,132,252,0.15)]'
    }
  ]

  return (
    <div className="relative bg-[#050505] px-8 py-12 lg:px-12 space-y-12">
      {/* Primary KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <div key={index} className={`bg-[#121212] border border-white/5 rounded-[3rem] p-10 transition-all hover:scale-[1.02] hover:border-white/10 relative overflow-hidden group ${kpi.glow}`}>
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] -rotate-45 translate-x-16 -translate-y-16 group-hover:bg-white/[0.04] transition-all"></div>
              
              <div className="flex flex-col gap-8 relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 bg-[#0A0A0A] rounded-[1.5rem] border border-white/5 flex items-center justify-center shadow-inner group-hover:border-white/10 transition-all`}>
                    <Icon className={`w-7 h-7 ${kpi.color}`} />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#4a4a4a] group-hover:text-white transition-colors" />
                </div>
                
                <div>
                  <p className="text-4xl lg:text-5xl font-black text-[#F9FAFB] tracking-tighter mb-2">
                    {isLoading ? '---' : kpi.value}
                  </p>
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-black text-[#8a919c] uppercase tracking-[0.2em]">{kpi.label}</p>
                    <p className="text-[10px] font-bold text-[#4a4a4a] italic uppercase tracking-widest">{kpi.subValue}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}