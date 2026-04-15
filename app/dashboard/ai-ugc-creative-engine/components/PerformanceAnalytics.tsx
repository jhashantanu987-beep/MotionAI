'use client'

import { useQuery } from '@tanstack/react-query'
import { TrendingUp, TrendingDown, Users, Heart, MessageCircle, Share2, Eye, BarChart3, Zap } from 'lucide-react'
import { API_CONFIG } from '@/app/config/api'

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
      const response = await fetch(`${API_CONFIG.baseUrl}/ai/ugc-performance`)
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
    <div className="bg-[#121212] rounded-[2.5rem] border border-white/5 shadow-2xl p-10 relative overflow-hidden group/analytics">
       <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none"></div>
      <div className="flex items-center gap-6 mb-10 relative z-10">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.1)]">
          <BarChart3 className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-[#F9FAFB] tracking-tighter">Performance Engine</h2>
          <p className="text-[#8a919c] mt-1 text-sm font-medium">Track your UGC resonance and viral coefficients across global networks</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Network Reach', value: overview?.totalReach, icon: Eye, color: '#3B82F6', growth: platformStats[0]?.growth },
              { label: 'Organic Pulse', value: overview?.totalEngagement, icon: Heart, color: '#efb0ff', rate: overview?.engagementRate },
              { label: 'Active Channels', value: platformStats.length, icon: Users, color: '#indigo-400', subtitle: `Dominant: ${topPerformingPlatform}` },
              { label: 'Viral Coefficient', value: overview?.viralCoefficient, icon: Zap, color: '#FCD34D', suffix: 'x Velocity' }
            ].map((card, i) => (
              <div key={i} className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 shadow-xl hover:border-white/10 transition-all relative group/card">
                <div className="flex items-center justify-between mb-6">
                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/card:border-white/20 transition-all">
                    <card.icon className="w-6 h-6" style={{ color: card.color }} />
                  </div>
                  {card.growth !== undefined && (
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      card.growth > 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {card.growth > 0 ? '+' : ''}{card.growth}%
                    </div>
                  )}
                  {card.rate !== undefined && (
                    <div className="px-3 py-1 rounded-full bg-[#efb0ff]/10 text-[#efb0ff] text-[10px] font-black uppercase tracking-widest border border-[#efb0ff]/20">
                      {card.rate}% Rate
                    </div>
                  )}
                </div>
                <p className="text-3xl font-black text-[#F9FAFB] tracking-tighter mb-1">
                  {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                  {card.suffix && <span className="text-xs ml-2 text-[#4a4a4a] tracking-widest">{card.suffix}</span>}
                </p>
                <p className="text-[10px] font-black text-[#8a919c] uppercase tracking-widest">{card.label}</p>
                {card.subtitle && <p className="text-[10px] font-bold text-[#4a4a4a] mt-2 italic">{card.subtitle}</p>}
              </div>
            ))}
          </div>

          {/* Platform Performance */}
          <div className="mb-12">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#4a4a4a] mb-6 flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
               Channel Resonance Matrix
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {platformStats.map((platform) => {
                const Icon = getPlatformIcon(platform.platform)

                return (
                  <div key={platform.platform} className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-8 shadow-xl relative group/card overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] -rotate-45 translate-x-16 -translate-y-16"></div>
                    <div className="flex items-center justify-between mb-8 relative z-10">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/card:border-white/20 transition-all">
                          <Icon className="w-6 h-6 text-[#efb0ff]" />
                        </div>
                        <div>
                          <p className="text-xl font-black text-[#F9FAFB] tracking-tight capitalize">{platform.platform}</p>
                          <p className="text-[10px] font-black text-[#525252] uppercase tracking-widest mt-1">{platform.viralPosts} High-Impact Units</p>
                        </div>
                      </div>
                      <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                        platform.growth > 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}>
                        {platform.growth > 0 ? <TrendingUp className="w-4 h-4 inline mr-2" /> : <TrendingDown className="w-4 h-4 inline mr-2" />}
                        {Math.abs(platform.growth)}% Orbit
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 relative z-10">
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/5 shadow-inner">
                        <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest mb-2">Network Reach</p>
                        <p className="text-2xl font-black text-[#F9FAFB] tracking-tighter">{platform.reach.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/5 shadow-inner">
                        <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest mb-2">Engagement Pulse</p>
                        <p className="text-2xl font-black text-[#efb0ff] tracking-tighter">{platform.engagement.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 relative z-10 flex items-center justify-between">
                       <p className="text-[10px] font-bold text-[#4a4a4a] uppercase tracking-widest italic">Apex Content: <span className="text-[#8a919c] ml-1">&quot;{platform.topContent}&quot;</span></p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Top Performing Content */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#4a4a4a] mb-6 flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
               Peak Engagement Archetypes
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {contentPerformance.slice(0, 4).map((content) => (
                <div key={content.id} className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 hover:border-white/10 transition-all group/unit shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-lg font-black text-[#F9FAFB] tracking-tight truncate flex-1 mr-4">{content.title}</p>
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      content.platform === 'instagram' ? 'bg-[#efb0ff]/10 text-[#efb0ff] border-[#efb0ff]/20' :
                      content.platform === 'tiktok' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                      'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20'
                    }`}>
                      {content.platform}
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-white/[0.02] p-5 rounded-2xl border border-white/5">
                    <div className="text-center flex-1">
                       <p className="text-xl font-black text-[#F9FAFB] tracking-tight">{(content.impressions || 0).toLocaleString()}</p>
                       <p className="text-[8px] font-black text-[#4a4a4a] uppercase tracking-widest">Units</p>
                    </div>
                    <div className="w-[1px] h-8 bg-white/5"></div>
                    <div className="text-center flex-1">
                       <p className="text-xl font-black text-[#efb0ff] tracking-tight">{(content.engagement || 0).toLocaleString()}</p>
                       <p className="text-[8px] font-black text-[#4a4a4a] uppercase tracking-widest">Pulse</p>
                    </div>
                    <div className="w-[1px] h-8 bg-white/5"></div>
                    <div className="text-center flex-1">
                       <p className="text-xl font-black text-emerald-400 tracking-tight">{content.engagementRate || 0}%</p>
                       <p className="text-[8px] font-black text-[#4a4a4a] uppercase tracking-widest">Resonance</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                     <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest">
                        {content.postedAt ? `Deployed ${new Date(content.postedAt).toLocaleDateString()}` : 'Neural Engine Standby'}
                     </p>
                     <div className="flex -space-x-2">
                        {[1,2,3].map(j => <div key={j} className="w-6 h-6 rounded-full bg-white/5 border border-white/10"></div>)}
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}