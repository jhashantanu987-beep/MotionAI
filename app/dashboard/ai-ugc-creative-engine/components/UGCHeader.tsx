'use client'

import { useQuery } from '@tanstack/react-query'
import { Sparkles, TrendingUp, Users, Heart, Share2, Eye, Zap } from 'lucide-react'

interface UGCMetrics {
  totalContent: number
  totalEngagement: number
  viralPosts: number
  avgEngagementRate: number
  aiGeneratedToday: number
  topPerformingContent: {
    id: string
    title: string
    platform: string
    engagement: number
    engagementRate: number
    createdAt: string
  }[]
  platformPerformance: {
    platform: string
    posts: number
    totalEngagement: number
    avgEngagementRate: number
    viralRate: number
  }[]
}

export default function UGCHeader() {
  const { data: ugcMetrics, isLoading } = useQuery({
    queryKey: ['ai-ugc-creative-engine'],
    queryFn: async () => {
      const response = await fetch('/api/ai-ugc-creative-engine')
      if (!response.ok) throw new Error('Failed to fetch UGC metrics')
      return response.json() as Promise<UGCMetrics>
    },
    refetchInterval: 30000,
  })

  const metrics = [
    {
      label: 'Total Content',
      value: ugcMetrics?.totalContent || 0,
      icon: Sparkles,
      color: 'text-[#8b5cf6]',
      bgColor: 'bg-[#8b5cf6]/20',
    },
    {
      label: 'Engagement Rate',
      value: `${ugcMetrics?.avgEngagementRate || 0}%`,
      icon: Heart,
      color: 'text-[#ec4899]',
      bgColor: 'bg-[#ec4899]/20',
    },
    {
      label: 'Total Reach',
      value: `${(ugcMetrics?.totalEngagement || 0).toLocaleString()}`,
      icon: Eye,
      color: 'text-[#3b82f6]',
      bgColor: 'bg-[#3b82f6]/20',
    },
    {
      label: 'Conversions',
      value: ugcMetrics?.viralPosts || 0,
      icon: TrendingUp,
      color: 'text-[#22c55e]',
      bgColor: 'bg-[#22c55e]/20',
    },
  ]

  return (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0a] border-b border-[#39ff14]/50 shadow-lg shadow-[#39ff14]/20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI UGC Creative Engine</h1>
            <p className="text-sm text-[#94a3b8]">Generate viral user-generated content for social media</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-6">
            {metrics.map((metric) => {
              const Icon = metric.icon
              return (
                <div key={metric.label} className="bg-[#111827] border border-[#1f2937] rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${metric.color}`} />
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      metric.label === 'Total Content' ? 'bg-green-500/20 text-green-400' :
                      metric.label === 'Engagement Rate' ? 'bg-purple-500/20 text-purple-400' :
                      metric.label === 'Total Reach' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {metric.label === 'Total Content' ? 'Active' :
                       metric.label === 'Engagement Rate' ? 'High' :
                       metric.label === 'Total Reach' ? 'Growing' : 'Viral'}
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <p className="text-sm text-[#94a3b8]">{metric.label}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* AI Status */}
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">AI Active</span>
          </div>

          {/* Generate Button */}
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Generate Content
          </button>
        </div>
      </div>

      {/* Top Performing Content */}
      {ugcMetrics?.topPerformingContent && (
        <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Top Performing: {ugcMetrics.topPerformingContent[0]?.title}</p>
                <p className="text-xs text-gray-600">{ugcMetrics.topPerformingContent[0]?.engagementRate}% engagement on {ugcMetrics.topPerformingContent[0]?.platform}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-purple-600">+{ugcMetrics.aiGeneratedToday} AI generated today</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}