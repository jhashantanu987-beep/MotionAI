'use client'

import { useQuery } from '@tanstack/react-query'
import { TrendingUp, DollarSign, Target, Eye, MousePointer, Zap, BarChart3, Settings } from 'lucide-react'

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
  const { data: adMetrics, isLoading } = useQuery({
    queryKey: ['ad-performance-metrics'],
    queryFn: async () => {
      const response = await fetch('/api/ai-ad-performance-engine/metrics')
      if (!response.ok) throw new Error('Failed to fetch ad metrics')
      return response.json() as Promise<AdMetrics>
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  })

  const metrics = [
    {
      label: 'Total Spend',
      value: adMetrics ? `$${adMetrics.totalSpend.toLocaleString()}` : '$0',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      label: 'Impressions',
      value: adMetrics ? adMetrics.totalImpressions.toLocaleString() : '0',
      change: '+8.2%',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      label: 'Clicks',
      value: adMetrics ? adMetrics.totalClicks.toLocaleString() : '0',
      change: '+15.3%',
      icon: MousePointer,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      label: 'Avg CTR',
      value: adMetrics ? `${adMetrics.avgCTR}%` : '0%',
      change: '+5.1%',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      label: 'Avg CPC',
      value: adMetrics ? `$${adMetrics.avgCPC.toFixed(2)}` : '$0.00',
      change: '-3.2%',
      icon: DollarSign,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      label: 'Conversions',
      value: adMetrics ? adMetrics.totalConversions.toLocaleString() : '0',
      change: '+22.1%',
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    }
  ]

  return (
    <div className="relative bg-gradient-to-br from-[#111827] to-[#0f172a] border-b border-[#1f2937] shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#e5e7eb]">AI Ad Performance Engine</h1>
          <p className="text-[#9ca3af] mt-1">Optimize your advertising campaigns with AI-powered insights</p>
        </div>

        <div className="flex items-center gap-3">
          {/* AI Status */}
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">AI Optimizing</span>
          </div>

          {/* Settings */}
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className={`p-4 rounded-xl border ${metric.bgColor} ${metric.borderColor} transition-all hover:shadow-md`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${metric.color}`} />
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{metric.value}</p>
                  <p className="text-xs text-gray-500">{metric.label}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Campaign Status */}
      {adMetrics && (
        <div className="mt-6 flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">
                {adMetrics.activeCampaigns} Active Campaigns
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-900">
                {adMetrics.aiOptimizations} AI Optimizations Applied
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              Avg ROAS: {adMetrics.avgROAS}x
            </p>
            <p className="text-xs text-gray-600">Return on Ad Spend</p>
          </div>
        </div>
      )}
    </div>
  )
}