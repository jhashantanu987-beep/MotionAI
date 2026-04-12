'use client'

import { useQuery } from '@tanstack/react-query'
import { TrendingUp, DollarSign, Users, Target, Activity, Loader2, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface RevenueData {
  overview: {
    totalRevenue: number
    monthlyGrowth: number
    averageOrderValue: number
    customerLifetimeValue: number
    totalCustomers: number
    activeCustomers: number
    churnRate: number
    netRevenueRetention: number
  }
  performance: {
    roas: { overall: number }
    cpa: { overall: number }
    ltv: { ratio: number }
  }
}

export default function RevenueFloatingPanel() {
  const [isOpen, setIsOpen] = useState(true)
  const { data: revenueData, isLoading } = useQuery({
    queryKey: ['revenue-analytics'],
    queryFn: async () => {
      const response = await fetch('/api/revenue-analytics')
      if (!response.ok) throw new Error('Failed to fetch revenue data')
      return response.json() as Promise<RevenueData>
    },
    refetchInterval: 30000,
  })

  const overview = revenueData?.overview
  const performance = revenueData?.performance

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-full shadow-lg border border-slate-700 flex items-center justify-center hover:from-slate-800 hover:to-slate-700 transition-all hover:shadow-xl"
        title="Show Revenue Insights"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
    )
  }

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 w-80 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-6 max-h-[90vh] overflow-y-auto">
      {/* Header with Close Button */}
      <div className="flex items-center justify-between -mx-6 -mt-6 px-6 pt-6 pb-4 border-b border-slate-200">
        <h3 className="font-bold text-slate-900 text-lg">Revenue Insights</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
          title="Close Revenue Insights"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Revenue Insights */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            <span className="ml-2 text-sm text-slate-600">Loading...</span>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold text-green-900">${overview?.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-700">Total Revenue</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-600">+{overview?.monthlyGrowth}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold text-blue-900">{overview?.activeCustomers}</p>
                  <p className="text-xs text-blue-700">Active Customers</p>
                  <p className="text-xs text-blue-600 mt-1">{overview?.totalCustomers} total</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold text-purple-900">{performance?.roas.overall}x</p>
                  <p className="text-xs text-purple-700">ROAS</p>
                  <p className="text-xs text-purple-600 mt-1">${performance?.cpa.overall} CPA</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Key Performance Indicators */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-700">Key Metrics</h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-green-500" />
              <span className="text-sm text-slate-900">Revenue Retention</span>
            </div>
            <span className="font-semibold text-green-600">{overview?.netRevenueRetention}%</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-slate-900">LTV:CAC Ratio</span>
            </div>
            <span className="font-semibold text-blue-600">{performance?.ltv.ratio}:1</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <DollarSign className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-slate-900">Avg Order Value</span>
            </div>
            <span className="font-semibold text-purple-600">${overview?.averageOrderValue}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-slate-900">Monthly Growth</span>
            </div>
            <span className="font-semibold text-orange-600">+{overview?.monthlyGrowth}%</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-700">Quick Actions</h4>

        <div className="space-y-2">
          <button className="w-full p-3 bg-slate-950 text-white rounded-2xl font-medium hover:bg-slate-800 transition-colors">
            Export Report
          </button>
          <button className="w-full p-3 bg-white text-slate-900 border border-slate-200 rounded-2xl font-medium hover:bg-slate-50 transition-colors">
            Schedule Meeting
          </button>
          <button className="w-full p-3 bg-lime-500 text-white rounded-2xl font-medium hover:bg-lime-600 transition-colors">
            Optimize Campaigns
          </button>
        </div>
      </div>

      {/* AI Insights */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-700">AI Insights</h4>

        <div className="bg-gradient-to-br from-lime-50 to-lime-100 border border-lime-200 rounded-2xl p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-lime-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-sm font-medium text-slate-900">Meta Ads performing 28% better</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-lime-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-sm font-medium text-slate-900">TikTok growth accelerating</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-slate-300 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-sm text-slate-600">Consider increasing ad spend</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}