'use client'

import { useQuery } from '@tanstack/react-query'
import { BarChart3, TrendingUp, TrendingDown, Calendar, Target, Eye, MousePointer, DollarSign } from 'lucide-react'

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
  const { data: performanceData, isLoading } = useQuery({
    queryKey: ['ad-performance-analytics'],
    queryFn: async () => {
      const response = await fetch('/api/ai-ad-performance-engine/performance')
      if (!response.ok) throw new Error('Failed to fetch performance data')
      return response.json() as Promise<PerformanceData>
    },
    refetchInterval: 30000,
  })

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'google': return '🔍'
      case 'facebook': return '📘'
      case 'linkedin': return '💼'
      case 'tiktok': return '🎵'
      default: return '📊'
    }
  }

  return (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0a] rounded-2xl shadow-2xl shadow-[#00d9ff]/20 border border-[#00d9ff]/50 hover:border-[#00d9ff] transition-all p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Performance Analytics</h2>
          <p className="text-gray-600 mt-1">Detailed insights into your ad performance</p>
        </div>

        <div className="flex items-center gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Custom range</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Platform Breakdown */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {performanceData?.platformBreakdown.map((platform, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{getPlatformIcon(platform.platform)}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 capitalize">{platform.platform}</h4>
                      <p className="text-sm text-gray-600">ROAS: {platform.roas}x</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Spend</p>
                      <p className="font-semibold text-gray-900">${platform.spend.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Impressions</p>
                      <p className="font-semibold text-gray-900">{platform.impressions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Clicks</p>
                      <p className="font-semibold text-gray-900">{platform.clicks.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">CTR</p>
                      <p className="font-semibold text-gray-900">{platform.ctr}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Performance Chart Placeholder */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Performance Trend</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Performance chart visualization</p>
              <p className="text-sm text-gray-500 mt-2">Interactive charts will be implemented here</p>
            </div>
          </div>

          {/* Top Performing Ads */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Ads</h3>
            <div className="space-y-3">
              {performanceData?.topPerformingAds.slice(0, 5).map((ad, index) => (
                <div key={ad.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{ad.headline}</h4>
                      <p className="text-sm text-gray-600 capitalize">{ad.platform}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-6 text-sm">
                    <div className="text-center">
                      <p className="text-gray-600">Impressions</p>
                      <p className="font-semibold text-gray-900">{ad.impressions.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Clicks</p>
                      <p className="font-semibold text-gray-900">{ad.clicks.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">CTR</p>
                      <p className="font-semibold text-gray-900">{ad.ctr}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Cost</p>
                      <p className="font-semibold text-gray-900">${ad.cost.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Insights</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Google Ads</span> showing 23% higher CTR than average
                </p>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-600" />
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Facebook Ads</span> CPC increased by 15% this week
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                <p className="text-sm text-gray-700">
                  Consider increasing budget for high-performing campaigns by 20%
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}