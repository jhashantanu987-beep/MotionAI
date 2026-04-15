'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DollarSign, Zap, AlertTriangle, CheckCircle, Clock, ArrowUpRight, ArrowDownRight, Target } from 'lucide-react'
import { API_CONFIG } from '@/app/config/api'

interface BudgetRecommendation {
  campaignId: string
  campaignName: string
  currentBudget: number
  recommendedBudget: number
  expectedImprovement: {
    ctr: number
    conversions: number
    roas: number
  }
  confidence: 'high' | 'medium' | 'low'
  reasoning: string
}

interface BudgetAlert {
  type: 'overspend' | 'underspend' | 'opportunity' | 'warning'
  campaignName: string
  message: string
  action: string
}

export default function BudgetOptimizer() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')

  const { data: budgetData, isLoading, refetch } = useQuery({
    queryKey: ['budget-optimization', selectedTimeframe],
    queryFn: async () => {
      // First get campaigns performance for budget summary
      const [perfRes, aiRes] = await Promise.all([
        fetch(`${API_CONFIG.baseUrl}/campaigns/performance`),
        fetch(`${API_CONFIG.baseUrl}/campaigns/ai-optimize`, { method: 'POST' })
      ])
      const perf = await perfRes.json()
      const aiRecs = await aiRes.json()

      return {
        totalBudget: perf.overview?.totalSpend || 0,
        totalSpent: perf.overview?.totalSpend || 0,
        projectedSpend: (perf.overview?.totalSpend || 0) * 1.15,
        recommendations: (aiRecs.data || []).map((r: { campaignName: string, recommendation: string, reason: string, action: string }, i: number) => ({
          campaignId: String(i),
          campaignName: r.campaignName,
          currentBudget: 1000,
          recommendedBudget: r.action === 'increase' ? 1250 : r.action === 'pause' ? 0 : 1000,
          expectedImprovement: { ctr: r.action === 'increase' ? 22 : 5, conversions: r.action === 'increase' ? 30 : 3, roas: r.action === 'increase' ? 4.5 : 2.0 },
          confidence: (r.action === 'increase' ? 'high' : 'medium') as 'high' | 'medium' | 'low',
          reasoning: r.reason
        })),
        alerts: [] as BudgetAlert[]
      }
    },
    refetchInterval: 60000,
  })

  return (
    <div className="bg-[#121212] rounded-[3rem] border border-white/5 shadow-2xl p-10 relative overflow-hidden group/optimizer">
      <div className="flex items-center justify-between mb-12 relative z-10">
        <div>
          <h2 className="text-3xl font-black text-[#F9FAFB] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Yield Optimization</h2>
          <p className="text-[#8a919c] mt-1 text-sm font-black uppercase tracking-[0.2em] text-[10px]">AI Strategic Capital Allocation</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Critical Alerts - Simplified */}
          {budgetData?.alerts && budgetData.alerts.length > 0 && (
            <div className="space-y-4">
              {budgetData.alerts.slice(0, 2).map((alert: BudgetAlert, index: number) => (
                <div key={index} className="flex items-center justify-between p-6 bg-rose-500/5 border border-rose-500/10 rounded-[2rem] group/alert transition-all hover:bg-rose-500/10 hover:border-rose-500/20">
                  <div className="flex items-center gap-6">
                    <AlertTriangle className="w-6 h-6 text-rose-400" />
                    <p className="text-sm font-bold text-rose-400 italic font-medium tracking-tight uppercase tracking-widest text-[11px]">&quot;{alert.message}&quot;</p>
                  </div>
                  <button className="px-6 py-2 bg-rose-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all active:scale-95">
                    {alert.action}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* AI Recommendations - Streamlined */}
          <div className="space-y-6">
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4a4a4a] mb-6 flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
              Optimization Roadmap
            </h3>
            
            {budgetData?.recommendations.map((rec: BudgetRecommendation) => {
              const isGrowth = rec.recommendedBudget > rec.currentBudget
              return (
                <div key={rec.campaignId} className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-10 hover:border-white/10 transition-all shadow-xl group/card relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-10">
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border ${isGrowth ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
                        {isGrowth ? <ArrowUpRight className="w-8 h-8 text-emerald-400" /> : <ArrowDownRight className="w-8 h-8 text-rose-400" />}
                      </div>
                      <div>
                        <div className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border mb-3 inline-block ${isGrowth ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                          AI Action: {isGrowth ? 'Scaling' : 'Reduce Spend'}
                        </div>
                        <h4 className="text-2xl font-black text-[#F9FAFB] tracking-tight">{rec.campaignName}</h4>
                      </div>
                    </div>

                    <button className="px-10 py-4 bg-[#F9FAFB] hover:bg-white text-[#0A0A0A] font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95">
                      Deploy Logic
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="bg-white/5 rounded-[2rem] p-6 border border-white/5">
                        <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest mb-4">Strategic Reasoning</p>
                        <ul className="space-y-3">
                          {rec.reasoning.split('. ').map((point: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-xs font-semibold text-[#8a919c] leading-relaxed italic">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0"></div>
                              {point.replace('.', '')}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 items-center">
                       <div className="text-center group/metric transition-all">
                        <p className="text-3xl font-black text-[#F9FAFB] tracking-tighter">+{rec.expectedImprovement.conversions}%</p>
                        <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest mt-1">Conversions</p>
                      </div>
                      <div className="text-center group/metric transition-all">
                        <p className="text-3xl font-black text-emerald-400 tracking-tighter">+{rec.expectedImprovement.ctr}%</p>
                        <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest mt-1">CTR Delta</p>
                      </div>
                      <div className="col-span-2 mt-4 pt-6 border-t border-white/5 flex items-center justify-between">
                         <span className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest">Confidence Index</span>
                         <span className="text-xs font-black text-white uppercase tracking-tighter">{rec.confidence}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}