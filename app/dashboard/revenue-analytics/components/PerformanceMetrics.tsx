'use client'

import { useQuery } from '@tanstack/react-query'
import { Target, DollarSign, Users, TrendingUp, Loader2 } from 'lucide-react'

interface RevenueData {
  performance: {
    roas: {
      overall: number
      byChannel: {
        meta: number
        google: number
        tiktok: number
        organic: number
      }
    }
    cpa: {
      overall: number
      byChannel: {
        meta: number
        google: number
        tiktok: number
        organic: number
      }
    }
    cac: {
      overall: number
      paybackPeriod: number
    }
    ltv: {
      overall: number
      ratio: number
    }
  }
}

export default function PerformanceMetrics() {
  const { data: revenueData, isLoading } = useQuery({
    queryKey: ['revenue-analytics'],
    queryFn: async () => {
      const response = await fetch('/api/revenue-analytics')
      if (!response.ok) throw new Error('Failed to fetch revenue data')
      return response.json() as Promise<RevenueData>
    },
    refetchInterval: 30000,
  })

  const performance = revenueData?.performance

  return (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0a] rounded-2xl shadow-2xl shadow-[#ff006e]/20 p-6 border border-[#ff006e]/50 hover:border-[#ff006e] transition-all">
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-6 h-6 text-slate-900" />
        <h2 className="text-xl font-semibold text-slate-900">Performance Metrics</h2>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          <span className="ml-2 text-slate-600">Loading performance data...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ROAS Metrics */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-900">Return on Ad Spend (ROAS)</h3>

            <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="text-center flex-1">
                  <p className="text-4xl font-bold text-white">{performance?.roas.overall}x</p>
                  <p className="text-lg text-[#94a3b8]">Overall ROAS</p>
                  <p className="text-sm text-[#64748b] mt-2">Every $1 spent returns ${performance?.roas.overall}</p>
                </div>
                <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                  Excellent
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {Object.entries(performance?.roas.byChannel || {}).map(([channel, value]) => (
                <div key={channel} className="bg-[#111827] border border-[#1f2937] rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-center flex-1">
                      <p className="text-2xl font-bold text-white">{value}x</p>
                      <p className="text-sm text-[#94a3b8] capitalize">{channel}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      value >= 3 ? 'bg-green-500/20 text-green-400' :
                      value >= 2 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {value >= 3 ? 'High' : value >= 2 ? 'Medium' : 'Low'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CPA Metrics */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-900">Cost Per Acquisition (CPA)</h3>

            <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="text-center flex-1">
                  <p className="text-4xl font-bold text-white">${performance?.cpa.overall}</p>
                  <p className="text-lg text-[#94a3b8]">Average CPA</p>
                  <p className="text-sm text-[#64748b] mt-2">Cost to acquire one customer</p>
                </div>
                <div className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                  Optimal
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {Object.entries(performance?.cpa.byChannel || {}).map(([channel, value]) => (
                <div key={channel} className="bg-[#111827] border border-[#1f2937] rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-center flex-1">
                      <p className="text-2xl font-bold text-white">${value}</p>
                      <p className="text-sm text-[#94a3b8] capitalize">{channel}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      value <= 50 ? 'bg-green-500/20 text-green-400' :
                      value <= 100 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {value <= 50 ? 'Low' : value <= 100 ? 'Medium' : 'High'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CAC & LTV */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-900">Customer Acquisition Cost (CAC)</h3>

            <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="text-center flex-1">
                  <p className="text-4xl font-bold text-white">${performance?.cac.overall}</p>
                  <p className="text-lg text-[#94a3b8]">Customer CAC</p>
                  <p className="text-sm text-[#64748b] mt-2">Payback in {performance?.cac?.paybackPeriod ?? 'N/A'} days</p>
                </div>
                <div className="px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400">
                  {performance?.cac?.paybackPeriod ? (performance.cac.paybackPeriod <= 30 ? 'Fast' : performance.cac.paybackPeriod <= 90 ? 'Normal' : 'Slow') : 'Unknown'}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-900">Customer Lifetime Value (LTV)</h3>

            <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="text-center flex-1">
                  <p className="text-4xl font-bold text-white">${performance?.ltv.overall}</p>
                  <p className="text-lg text-[#94a3b8]">Customer LTV</p>
                  <p className="text-sm text-[#64748b] mt-2">LTV:CAC Ratio: {performance?.ltv?.ratio ?? 'N/A'}:1</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  performance?.ltv?.ratio ? (
                    performance.ltv.ratio >= 3 ? 'bg-green-500/20 text-green-400' :
                    performance.ltv.ratio >= 2 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  ) : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {performance?.ltv?.ratio ? (
                    performance.ltv.ratio >= 3 ? 'Excellent' : performance.ltv.ratio >= 2 ? 'Good' : 'Poor'
                  ) : 'Unknown'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl p-4 border border-emerald-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-emerald-900">Excellent ROAS</p>
              <p className="text-sm text-emerald-700">4.2x return indicates strong campaign performance</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-blue-900">Healthy LTV Ratio</p>
              <p className="text-sm text-blue-700">10:1 ratio shows sustainable growth</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-4 border border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-amber-900">Optimize Meta Ads</p>
              <p className="text-sm text-amber-700">Highest ROAS at 5.1x - scale investment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}