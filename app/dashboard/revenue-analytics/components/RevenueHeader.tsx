'use client'

import { useQuery } from '@tanstack/react-query'
import { DollarSign, TrendingUp, Users, Target, Loader2 } from 'lucide-react'

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
}

export default function RevenueHeader() {
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

  return (
    <div className="relative bg-gradient-to-br from-[#111827] to-[#0f172a] rounded-2xl shadow-lg p-6 m-6 border border-[#1f2937]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#e5e7eb]">REVENUE ANALYTICS</h1>
          <p className="text-[#9ca3af] mt-1">Full business visibility and revenue intelligence</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-[#6b7280]">Last updated</div>
          <div className="text-lg font-semibold text-slate-900">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            <span className="ml-2 text-slate-600">Loading revenue data...</span>
          </div>
        ) : overview ? (
          <>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-900">
                    ${overview.totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-700">Total Revenue</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-600">+{overview.monthlyGrowth}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-900">{overview.totalCustomers}</p>
                  <p className="text-sm text-blue-700">Total Customers</p>
                  <p className="text-xs text-blue-600 mt-1">{overview.activeCustomers} active</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-900">${overview.averageOrderValue}</p>
                  <p className="text-sm text-purple-700">Avg Order Value</p>
                  <p className="text-xs text-purple-600 mt-1">${overview.customerLifetimeValue} LTV</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 border border-orange-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-900">{overview.netRevenueRetention}%</p>
                  <p className="text-sm text-orange-700">Revenue Retention</p>
                  <p className="text-xs text-orange-600 mt-1">{overview.churnRate}% churn</p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}