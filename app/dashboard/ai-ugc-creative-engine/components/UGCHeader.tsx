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
      label: 'Produced Units',
      value: ugcMetrics?.totalContent || 0,
      icon: Sparkles,
      color: 'text-[#efb0ff]',
      bgColor: 'bg-[#efb0ff]/10',
    },
    {
      label: 'Engagement Rate',
      value: `${ugcMetrics?.avgEngagementRate || 0}%`,
      icon: Heart,
      color: 'text-rose-400',
      bgColor: 'bg-rose-400/10',
    },
    {
      label: 'Viral Reach',
      value: `${(ugcMetrics?.totalEngagement || 0).toLocaleString()}`,
      icon: Eye,
      color: 'text-[#3B82F6]',
      bgColor: 'bg-[#3B82F6]/10',
    },
    {
      label: 'Conversions',
      value: ugcMetrics?.viralPosts || 0,
      icon: TrendingUp,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
    },
  ]

  return (
    <div className="bg-[#0A0A0A] border-b border-white/5 px-8 pt-8 pb-12 relative overflow-hidden">
       <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#efb0ff]/30 to-transparent"></div>
      
      <div className="flex items-center justify-between relative z-10 mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#F9FAFB] tracking-tighter">Creative Engine</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8a919c] mt-1">UGC Generation Protocol</p>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex items-center gap-3 px-5 py-2.5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Neural Link Active</span>
            </div>

            <button className="px-8 py-3 bg-[#efb0ff] hover:bg-[#efb0ff]/90 text-black rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(239,176,255,0.3)] hover:scale-[1.02] flex items-center gap-2">
              <Zap className="w-4 h-4 fill-black" />
              Generate Unit
            </button>
        </div>
      </div>

      {/* Top Performing Content Bar */}
      {ugcMetrics?.topPerformingContent && (
        <div className="mt-10 p-6 bg-[#121212] rounded-3xl border border-white/5 relative group cursor-pointer hover:border-[#efb0ff]/20 transition-all">
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#efb0ff]/5 to-transparent rounded-r-3xl group-hover:from-[#efb0ff]/10 transition-all"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-[#efb0ff]/10 rounded-2xl flex items-center justify-center border border-[#efb0ff]/20">
                <TrendingUp className="w-5 h-5 text-[#efb0ff]" />
              </div>
              <div>
                <p className="text-[10px] font-black text-[#8a919c] uppercase tracking-widest mb-1">Peak Momentum Content</p>
                <div className="flex items-center gap-3">
                   <h3 className="text-lg font-black text-[#F9FAFB] tracking-tight truncate max-w-[300px]">{ugcMetrics.topPerformingContent[0]?.title}</h3>
                   <span className="px-3 py-0.5 rounded-full bg-[#efb0ff]/10 text-[#efb0ff] text-[10px] font-black tracking-widest uppercase border border-[#efb0ff]/20">
                    {ugcMetrics.topPerformingContent[0]?.engagementRate}% Velocity
                   </span>
                </div>
              </div>
            </div>
            <div className="text-right flex items-center gap-6">
               <div className="h-8 w-[1px] bg-white/5"></div>
               <div>
                  <p className="text-[10px] font-black text-[#8a919c] uppercase tracking-widest mb-1">AI Output Today</p>
                  <p className="text-lg font-black text-[#efb0ff] tracking-tight">+{ugcMetrics.aiGeneratedToday} Units</p>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}