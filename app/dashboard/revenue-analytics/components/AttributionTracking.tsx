'use client'

import { useQuery } from '@tanstack/react-query'
import { Route, DollarSign, TrendingUp, Loader2 } from 'lucide-react'

interface RevenueData {
  attribution: Array<{
    customerId: string
    journey: Array<{
      touchpoint: string
      timestamp: string
      value: number
    }>
    totalRevenue: number
    attributedValue: number
  }>
}

export default function AttributionTracking() {
  const { data: revenueData, isLoading } = useQuery({
    queryKey: ['revenue-analytics'],
    queryFn: async () => {
      const response = await fetch('/api/revenue-analytics')
      if (!response.ok) throw new Error('Failed to fetch revenue data')
      return response.json() as Promise<RevenueData>
    },
    refetchInterval: 30000,
  })

  const attribution = revenueData?.attribution

  const getTouchpointColor = (touchpoint: string) => {
    switch (touchpoint.toLowerCase()) {
      case 'meta ad': return 'bg-blue-500'
      case 'google search': return 'bg-green-500'
      case 'tiktok ads': return 'bg-pink-500'
      case 'website visit': return 'bg-purple-500'
      case 'email click': return 'bg-orange-500'
      case 'demo call': return 'bg-indigo-500'
      case 'purchase': return 'bg-emerald-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0a] rounded-2xl shadow-2xl shadow-[#b537f2]/20 p-6 border border-[#b537f2]/50 hover:border-[#b537f2] transition-all">
      <div className="flex items-center gap-3 mb-6">
        <Route className="w-6 h-6 text-slate-900" />
        <h2 className="text-xl font-semibold text-slate-900">Attribution Tracking</h2>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          <span className="ml-2 text-slate-600">Loading attribution data...</span>
        </div>
      ) : (
        <div className="space-y-6">
          {attribution?.map((customer) => (
            <div key={customer.customerId} className="border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{customer.customerId}</h3>
                  <p className="text-sm text-slate-600">Customer Journey</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600">${customer.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-slate-600">Revenue</p>
                </div>
              </div>

              {/* Journey Timeline */}
              <div className="relative">
                <div className="flex items-center justify-between">
                  {customer.journey.map((touchpoint, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      {/* Touchpoint Circle */}
                      <div className={`w-12 h-12 rounded-full ${getTouchpointColor(touchpoint.touchpoint)} flex items-center justify-center mb-2 shadow-lg`}>
                        <span className="text-xs font-bold text-white">
                          {touchpoint.touchpoint.split(' ')[0].slice(0, 2).toUpperCase()}
                        </span>
                      </div>

                      {/* Touchpoint Info */}
                      <div className="text-center max-w-24">
                        <p className="text-xs font-medium text-slate-900 truncate" title={touchpoint.touchpoint}>
                          {touchpoint.touchpoint}
                        </p>
                        <p className="text-xs text-slate-500">
                          {new Date(touchpoint.timestamp).toLocaleDateString()}
                        </p>
                        {touchpoint.value > 0 && (
                          <p className="text-xs font-semibold text-green-600">
                            ${touchpoint.value}
                          </p>
                        )}
                      </div>

                      {/* Connection Line */}
                      {index < customer.journey.length - 1 && (
                        <div className="absolute top-6 left-1/2 w-full h-0.5 bg-slate-300 -z-10" style={{ width: 'calc(100% - 3rem)' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Attribution Summary */}
              <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Attribution Value</p>
                    <p className="text-xs text-slate-600">Total attributed revenue</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-600">${customer.attributedValue.toLocaleString()}</p>
                    <p className="text-xs text-slate-600">
                      {((customer.attributedValue / customer.totalRevenue) * 100).toFixed(1)}% attribution rate
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Attribution Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-blue-900">4.2x</p>
                  <p className="text-sm text-blue-700">Avg ROAS</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-green-900">$125</p>
                  <p className="text-sm text-green-700">Avg CPA</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Route className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-purple-900">2.8</p>
                  <p className="text-sm text-purple-700">Avg Touchpoints</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}