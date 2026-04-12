'use client'

import { useQuery } from '@tanstack/react-query'
import { TrendingUp, TrendingDown, Users, Heart, MessageCircle, Share2, Eye, BarChart3 } from 'lucide-react'

interface PerformanceData {
  overview: {
    totalReach: number
    totalEngagement: number
    engagementRate: number
    viralCoefficient: number
    avgShares: number
    avgComments: number
    avgLikes: number
  }
  platformBreakdown: {
    platform: string
    reach: number
    engagement: number
    engagementRate: number
    viralPosts: number
    topContent: string
    growth: number
  }[]
  contentPerformance: {
    id: string
    title: string
    platform: string
    impressions: number
    engagement: number
    engagementRate: number
    postedAt: string
  }[]
}

export default function PerformanceAnalytics() {
  const { data: performanceData, isLoading } = useQuery({
    queryKey: ['ai-ugc-performance'],
    queryFn: async () => {
      const response = await fetch('/api/ai-ugc-creative-engine/performance')
      if (!response.ok) throw new Error('Failed to fetch performance data')
      return response.json() as Promise<PerformanceData>
    },
    refetchInterval: 30000,
  })

  const overview = performanceData?.overview
  const platformStats = performanceData?.platformBreakdown || []
  const contentPerformance = performanceData?.contentPerformance || []

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return Heart
      case 'tiktok': return Users
      case 'twitter': return MessageCircle
      case 'facebook': return Share2
      default: return BarChart3
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return 'from-pink-500 to-purple-500'
      case 'tiktok': return 'from-black to-gray-800'
      case 'twitter': return 'from-blue-400 to-blue-600'
      case 'facebook': return 'from-blue-600 to-blue-800'
      default: return 'from-gray-500 to-gray-700'
    }
  }

  const topPerforming = platformStats.reduce((prev, current) => prev.engagement > current.engagement ? prev : current, {engagement: -Infinity, platform: 'N/A'})
  const topPerformingPlatform = topPerforming.platform

  return (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0a] rounded-3xl shadow-2xl shadow-[#39ff14]/20 border border-[#39ff14]/50 hover:border-[#39ff14] transition-all p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Performance Analytics</h2>
          <p className="text-sm text-[#94a3b8]">Track your UGC content performance across platforms</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0f172a] rounded-2xl p-4 border border-[#2a2f3e]">
              <div className="flex items-center justify-between mb-3">
                <Eye className="w-6 h-6 text-[#3b82f6]" />
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  platformStats[0]?.growth && platformStats[0].growth > 0
                    ? 'bg-[#22c55e]/20 text-[#22c55e]'
                    : 'bg-[#ef4444]/20 text-[#ef4444]'
                }`}>
                  {platformStats[0]?.growth && platformStats[0].growth > 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {Math.abs(platformStats[0]?.growth || 0)}%
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{overview?.totalReach.toLocaleString()}</p>
              <p className="text-sm text-[#94a3b8]">Total Reach</p>
            </div>

            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0f172a] rounded-2xl p-4 border border-[#2a2f3e]">
              <div className="flex items-center justify-between mb-3">
                <Heart className="w-6 h-6 text-[#ec4899]" />
                <span className="text-xs font-medium text-[#ec4899] bg-[#ec4899]/20 px-2 py-1 rounded-full">
                  {overview?.engagementRate}%
                </span>
              </div>
              <p className="text-2xl font-bold text-white">{overview?.totalEngagement.toLocaleString()}</p>
              <p className="text-sm text-[#94a3b8]">Total Engagement</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <BarChart3 className="w-6 h-6 text-purple-600" />
                <span className="text-xs font-medium text-purple-700 bg-purple-200 px-2 py-1 rounded-full">
                  Top: {topPerformingPlatform}
                </span>
              </div>
              <p className="text-2xl font-bold text-purple-900">{platformStats.length}</p>
              <p className="text-sm text-purple-700">Active Platforms</p>
            </div>

            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0f172a] rounded-2xl p-4 border border-[#2a2f3e]">
              <div className="flex items-center justify-between mb-3">
                <BarChart3 className="w-6 h-6 text-[#22c55e]" />
                <span className="text-xs font-medium text-[#22c55e] bg-[#22c55e]/20 px-2 py-1 rounded-full">
                  {overview?.viralCoefficient}x
                </span>
              </div>
              <p className="text-2xl font-bold text-white">{overview?.viralCoefficient}</p>
              <p className="text-sm text-[#94a3b8]">Viral Coefficient</p>
            </div>
          </div>

          {/* Platform Performance */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Platform Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platformStats.map((platform) => {
                const Icon = getPlatformIcon(platform.platform)
                const colorClass = getPlatformColor(platform.platform)

                return (
                  <div key={platform.platform} className="bg-[#1a1f2e] rounded-2xl p-4 border border-[#2a2f3e]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-white capitalize">{platform.platform}</p>
                          <p className="text-sm text-[#94a3b8]">{platform.viralPosts} viral posts</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        platform.growth > 0
                          ? 'bg-[#22c55e]/20 text-[#22c55e]'
                          : 'bg-[#ef4444]/20 text-[#ef4444]'
                      }`}>
                        {platform.growth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {platform.growth}%
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-[#94a3b8]">Reach</p>
                        <p className="text-lg font-semibold text-white">{platform.reach.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#94a3b8]">Engagement</p>
                        <p className="text-lg font-semibold text-white">{platform.engagement.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#2a2f3e]">
                      <p className="text-sm text-[#94a3b8]">Top content: {platform.topContent}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Top Performing Content */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Top Performing Content</h3>
            <div className="space-y-3">
              {contentPerformance.slice(0, 5).map((content) => (
                <div key={content.id} className="bg-[#1a1f2e] rounded-2xl p-4 border border-[#2a2f3e]">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-white truncate flex-1">{content.title}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      content.platform === 'instagram' ? 'bg-[#ec4899]/20 text-[#ec4899]' :
                      content.platform === 'tiktok' ? 'bg-black text-white' :
                      content.platform === 'twitter' ? 'bg-[#3b82f6]/20 text-[#3b82f6]' :
                      'bg-[#3b82f6]/20 text-[#3b82f6]'
                    }`}>
                      {content.platform}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-[#94a3b8]">
                    <span>{(content.impressions || 0).toLocaleString()} impressions</span>
                    <span>{(content.engagement || 0).toLocaleString()} engagement</span>
                    <span className="font-medium text-[#22c55e]">{content.engagementRate || 0}% rate</span>
                  </div>

                  <p className="text-xs text-[#64748b] mt-2">
                    Posted {new Date(content.postedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}