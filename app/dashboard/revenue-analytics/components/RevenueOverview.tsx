'use client'

import { useQuery } from '@tanstack/react-query'
import { BarChart3, TrendingUp, TrendingDown, Loader2 } from 'lucide-react'

interface RevenueData {
  revenueByChannel: Array<{
    channel: string
    revenue: number
    percentage: number
    growth: number
  }>
  monthlyTrends: Array<{
    month: string
    revenue: number
    customers: number
    growth: number
  }>
}

export default function RevenueOverview() {
  const { data: revenueData, isLoading } = useQuery({
    queryKey: ['revenue-analytics'],
    queryFn: async () => {
      const response = await fetch('/api/revenue-analytics')
      if (!response.ok) throw new Error('Failed to fetch revenue data')
      return response.json() as Promise<RevenueData>
    },
    refetchInterval: 30000,
  })

  const revenueByChannel = revenueData?.revenueByChannel
  const monthlyTrends = revenueData?.monthlyTrends

  return (
    <div className="relative bg-gradient-to-br from-[#111827] to-[#0f172a] rounded-2xl shadow-lg p-6 border border-[#1f2937]">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-6 h-6 text-[#3b82f6]" />
        <h2 className="text-xl font-semibold text-[#e5e7eb]">Revenue Overview</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Channel */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-900">Revenue by Channel</h3>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
              <span className="ml-2 text-slate-600">Loading channel data...</span>
            </div>
          ) : (
            <div className="space-y-6">
              {revenueByChannel?.map((channel, index) => (
                <div key={channel.channel} className="bg-[#111827] border border-[#1f2937] rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        index === 0 ? 'bg-blue-500/20' :
                        index === 1 ? 'bg-green-500/20' :
                        index === 2 ? 'bg-purple-500/20' :
                        index === 3 ? 'bg-orange-500/20' :
                        'bg-gray-500/20'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-blue-500' :
                          index === 1 ? 'bg-green-500' :
                          index === 2 ? 'bg-purple-500' :
                          index === 3 ? 'bg-orange-500' :
                          'bg-gray-500'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-white">{channel.channel}</p>
                        <p className="text-sm text-[#94a3b8]">${channel.revenue.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        channel.growth > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {channel.growth > 0 ? 'Growing' : 'Declining'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-[#94a3b8]">Revenue Share</div>
                    <div className="text-right">
                      <p className="font-semibold text-white">{channel.percentage}%</p>
                      <div className={`flex items-center gap-1 text-sm ${
                        channel.growth > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {channel.growth > 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{channel.growth > 0 ? '+' : ''}{channel.growth}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Monthly Trends */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-900">Monthly Trends</h3>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
              <span className="ml-2 text-slate-600">Loading trends...</span>
            </div>
          ) : (
            <div className="space-y-2">
              {monthlyTrends?.slice(-6).map((month, index) => (
                <div key={month.month} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                      <span className="text-xs font-semibold text-white">
                        {month.month.split(' ')[0].slice(0, 3)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{month.month}</p>
                      <p className="text-xs text-slate-600">{month.customers} customers</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-slate-900">${month.revenue.toLocaleString()}</p>
                    <div className={`flex items-center gap-1 text-sm ${
                      month.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {month.growth > 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>{month.growth > 0 ? '+' : ''}{month.growth}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}