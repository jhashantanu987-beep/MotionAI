'use client'

import { useQuery } from '@tanstack/react-query'
import { Filter, Users, Target, CheckCircle, Loader2 } from 'lucide-react'

interface RevenueData {
  funnel: {
    traffic: { count: number; conversion: number }
    leads: { count: number; conversion: number }
    qualified: { count: number; conversion: number }
    meetings: { count: number; conversion: number }
    proposals: { count: number; conversion: number }
    closed: { count: number; conversion: number }
  }
}

export default function FunnelAnalytics() {
  const { data: revenueData, isLoading } = useQuery({
    queryKey: ['revenue-analytics'],
    queryFn: async () => {
      const response = await fetch('/api/revenue-analytics')
      if (!response.ok) throw new Error('Failed to fetch revenue data')
      return response.json() as Promise<RevenueData>
    },
    refetchInterval: 30000,
  })

  const funnel = revenueData?.funnel

  const funnelSteps = [
    { name: 'Traffic', data: funnel?.traffic, icon: Users, color: 'from-blue-400 to-blue-600' },
    { name: 'Leads', data: funnel?.leads, icon: Target, color: 'from-orange-400 to-orange-600' },
    { name: 'Qualified', data: funnel?.qualified, icon: CheckCircle, color: 'from-yellow-400 to-yellow-600' },
    { name: 'Meetings', data: funnel?.meetings, icon: CheckCircle, color: 'from-purple-400 to-purple-600' },
    { name: 'Proposals', data: funnel?.proposals, icon: CheckCircle, color: 'from-indigo-400 to-indigo-600' },
    { name: 'Closed', data: funnel?.closed, icon: CheckCircle, color: 'from-green-400 to-green-600' }
  ]

  const maxCount = Math.max(...(funnelSteps.map(step => step.data?.count || 0)))

  return (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0a] rounded-2xl shadow-2xl shadow-[#39ff14]/20 p-6 border border-[#39ff14]/50 hover:border-[#39ff14] transition-all">
      <div className="flex items-center gap-3 mb-6">
        <Filter className="w-6 h-6 text-slate-900" />
        <h2 className="text-xl font-semibold text-slate-900">Conversion Funnel</h2>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          <span className="ml-2 text-slate-600">Loading funnel data...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {funnelSteps.map((step, index) => {
            const Icon = step.icon
            const width = step.data ? (step.data.count / maxCount) * 100 : 0

            return (
              <div key={step.name} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{step.name}</p>
                      <p className="text-sm text-slate-600">{step.data?.count.toLocaleString() || 0} people</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-slate-900">{step.data?.conversion || 0}%</p>
                    <p className="text-xs text-slate-500">conversion</p>
                  </div>
                </div>

                {/* Funnel Bar */}
                <div className="relative h-6 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${step.color} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${width}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-white drop-shadow-sm">
                      {step.data?.count.toLocaleString() || 0}
                    </span>
                  </div>
                </div>

                {/* Conversion Arrow */}
                {index < funnelSteps.length - 1 && (
                  <div className="flex justify-center my-2">
                    <div className="text-slate-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Funnel Summary */}
      <div className="mt-8 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-slate-900">{funnel?.traffic.count.toLocaleString() || 0}</p>
            <p className="text-sm text-slate-600">Total Traffic</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{funnel?.closed.count || 0}</p>
            <p className="text-sm text-slate-600">Conversions</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {funnel ? ((funnel.closed.count / funnel.traffic.count) * 100).toFixed(1) : 0}%
            </p>
            <p className="text-sm text-slate-600">Overall Rate</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">
              ${funnel ? Math.round(125000 / (funnel.closed.count || 1)).toLocaleString() : 0}
            </p>
            <p className="text-sm text-slate-600">Cost per Conversion</p>
          </div>
        </div>
      </div>
    </div>
  )
}