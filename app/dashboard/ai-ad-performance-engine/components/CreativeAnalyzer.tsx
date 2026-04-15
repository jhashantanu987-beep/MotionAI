'use client'

import { useQuery } from '@tanstack/react-query'
import { Image as ImageIcon, Video, Star, BarChart3, Target, MousePointer, Loader2 } from 'lucide-react'
import { API_CONFIG } from '@/app/config/api'

interface Creative {
  id: string
  name: string
  thumbnailUrl: string
  type: 'image' | 'video'
  performance: {
    score: number
    ctr: number
    conversions: number
    spend: number
  }
}

export default function CreativeAnalyzer() {
  const { data: rawCreatives, isLoading } = useQuery({
    queryKey: ['ad-creatives'],
    queryFn: async () => {
      // Use our real UGC library as the creative assets
      const response = await fetch(`${API_CONFIG.baseUrl}/ai/ugc-library`)
      if (!response.ok) throw new Error('Failed to fetch creatives')
      const items = await response.json()
      // Map UGC items to creative format
      return (Array.isArray(items) ? items : []).map((item: { id: string, title: string, platform: string, type: string, hashtags: string[], performance?: { engagementRate?: number, engagement?: number } }, i: number) => ({
        id: item.id || String(i),
        name: item.title || 'Untitled Asset',
        thumbnailUrl: '',
        type: item.type === 'video' ? 'video' : 'image' as 'image' | 'video',
        platform: item.platform,
        hashtags: item.hashtags || [],
        performance: {
          score: Math.min(10, Math.round((item.performance?.engagementRate || 7.5))),
          ctr: item.performance?.engagementRate || 4.2,
          conversions: item.performance?.engagement || 0,
          spend: 0
        }
      }))
    },
    refetchInterval: 60000,
  })

  const creatives = rawCreatives || []

  return (
    <div className="bg-[#121212] rounded-[3rem] border border-white/5 shadow-2xl p-10 relative overflow-hidden group/analyzer">
      <div className="flex items-center justify-between mb-12 relative z-10">
        <div>
          <h2 className="text-3xl font-black text-[#F9FAFB] tracking-tight">Creative Analytics</h2>
          <p className="text-[#8a919c] mt-1 text-sm font-black uppercase tracking-[0.2em] text-[10px]">High-Impact Visual Assets</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.isArray(creatives) && creatives.slice(0, 4).map((creative) => (
            <div key={creative.id} className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-6 hover:border-white/10 transition-all group/card relative overflow-hidden flex flex-col">
              <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6 border border-white/5 shadow-inner bg-[#0A0A0A] flex items-center justify-center">
                {creative.thumbnailUrl ? (
                  <img
                    src={creative.thumbnailUrl}
                    alt={creative.name}
                    className="w-full h-full object-cover transition-transform group-hover/card:scale-110 duration-700"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 opacity-30">
                    <ImageIcon className="w-10 h-10 text-white" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-white">{creative.platform}</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 text-[8px] font-black uppercase tracking-widest text-emerald-400">
                  {creative.performance.score}/10
                </div>
              </div>

              <div className="flex flex-col flex-1 gap-6 relative z-10">
                <div className="flex items-center justify-between">
                   <h3 className="text-lg font-black text-[#F9FAFB] tracking-tight truncate flex-1 mr-4">{creative.name}</h3>
                   {creative.type === 'video' ? <Video className="w-5 h-5 text-gray-500" /> : <ImageIcon className="w-5 h-5 text-gray-500" />}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group-hover/card:border-white/10 transition-all text-center">
                    <p className="text-2xl font-black text-[#F9FAFB] tracking-tighter">{creative.performance.ctr}%</p>
                    <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest mt-1">CTR</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group-hover/card:border-white/10 transition-all text-center">
                    <p className="text-2xl font-black text-blue-400 tracking-tighter">{creative.performance.conversions}</p>
                    <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest mt-1">Outcome</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}