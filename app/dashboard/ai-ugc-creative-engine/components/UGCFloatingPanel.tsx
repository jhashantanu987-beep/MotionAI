'use client'

import { useQuery } from '@tanstack/react-query'
import { Zap, TrendingUp, Target, Clock, Users, Heart, Share2, BarChart3, Lightbulb, AlertTriangle, X, ChevronLeft, Loader2 } from 'lucide-react'
import { useState } from 'react'

interface UGCInsights {
  trendingTopics: string[]
  bestPostingTimes: { day: string; hour: string; engagement: number }[]
  contentSuggestions: string[]
  performanceAlerts: string[]
  aiRecommendations: {
    title: string
    description: string
    impact: 'high' | 'medium' | 'low'
  }[]
}

export default function UGCFloatingPanel() {
  const [isOpen, setIsOpen] = useState(true)
  const { data: insights, isLoading } = useQuery({
    queryKey: ['ai-ugc-insights'],
    queryFn: async () => {
      const response = await fetch('/api/ai-ugc-creative-engine/insights')
      if (!response.ok) throw new Error('Failed to fetch UGC insights')
      return response.json() as Promise<UGCInsights>
    },
    refetchInterval: 60000,
  })

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-8 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-[#0A0A0A] border border-white/10 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-center hover:bg-[#121212] transition-all hover:scale-110 active:scale-95 group z-[60]"
        title="Open Intelligence Panel"
      >
        <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all"></div>
        <ChevronLeft className="w-6 h-6 text-[#efb0ff] relative z-10" />
      </button>
    )
  }

  return (
    <div className="fixed right-8 top-[10%] bottom-[10%] w-[24rem] bg-[#0A0A0A]/95 backdrop-blur-3xl rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10 p-10 space-y-8 overflow-y-auto custom-scrollbar z-[60] animate-in slide-in-from-right-10 duration-500">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-2 relative z-10">
        <div>
          <h3 className="text-2xl font-black text-[#F9FAFB] tracking-tighter">Neural Intelligence</h3>
          <p className="text-[10px] font-black text-[#8a919c] uppercase tracking-widest mt-1">UGC Optimization Core</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-3 hover:bg-white/5 rounded-2xl transition-all text-[#8a919c] hover:text-[#efb0ff]"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="h-[1px] w-full bg-white/5 relative z-10"></div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 relative z-10">
          <Loader2 className="w-10 h-10 text-[#efb0ff] animate-spin" />
        </div>
      ) : (
        <div className="space-y-10 relative z-10">
          {/* Viral Resonance Topics */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#8a919c] flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
              Viral Resonance
            </h4>
            <div className="space-y-3">
              {insights?.trendingTopics.slice(0, 3).map((topic, index) => (
                <div key={topic} className="bg-white/5 border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-all group/topic">
                  <p className="text-sm font-black text-[#F9FAFB] tracking-tight group-hover:text-emerald-400 transition-colors uppercase">{topic}</p>
                  <p className="text-[10px] font-bold text-[#4a4a4a] mt-1 tracking-widest uppercase">Apex Potential Detected</p>
                </div>
              ))}
            </div>
          </div>

          {/* Temporal Windows */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#8a919c] flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
              Temporal Windows
            </h4>
            <div className="space-y-3">
              {insights?.bestPostingTimes.slice(0, 2).map((time, index) => (
                <div key={index} className="bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black text-[#F9FAFB] tracking-tight uppercase">{time.day}</p>
                    <p className="text-[10px] font-bold text-[#4a4a4a] tracking-widest uppercase mt-1">@ {time.hour}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-blue-400 tracking-tighter">+{time.engagement}%</p>
                    <p className="text-[8px] font-black text-[#4a4a4a] uppercase tracking-widest">Velocity</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Neural Synthesis Recommendations */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#8a919c] flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#efb0ff] shadow-[0_0_8px_rgba(239,176,255,0.5)]"></div>
              Neural Synthesis
            </h4>
            <div className="space-y-3">
              {insights?.aiRecommendations.slice(0, 2).map((rec, index) => (
                <div key={rec.title} className="bg-white/5 border border-white/5 rounded-[2rem] p-6 hover:border-[#efb0ff]/30 transition-all group/rec">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="w-4 h-4 text-[#efb0ff]" />
                    <p className="text-sm font-black text-[#F9FAFB] tracking-tight uppercase group-hover/rec:text-[#efb0ff] transition-colors">{rec.title}</p>
                  </div>
                  <p className="text-xs font-medium text-[#8a919c] leading-relaxed mb-4 italic">&quot;{rec.description}&quot;</p>
                  <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#efb0ff]/5 text-[#efb0ff] border border-[#efb0ff]/10">
                    {rec.impact} Priority Target
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Alerts (Dark Theme) */}
          {insights?.performanceAlerts && insights.performanceAlerts.length > 0 && (
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-400 flex items-center gap-3">
                <AlertTriangle className="w-4 h-4" />
                System Alerts
              </h4>
              <div className="space-y-3">
                {insights.performanceAlerts.slice(0, 2).map((alert, index) => (
                  <div key={index} className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-4">
                    <p className="text-xs font-bold text-rose-400 leading-relaxed italic">&quot;{alert}&quot;</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content Ideas (Dark Theme) */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#8a919c] flex items-center gap-3">
              <Target className="w-4 h-4 text-[#3B82F6]" />
              Latent Concepts
            </h4>
            <div className="space-y-3">
              {insights?.contentSuggestions.slice(0, 2).map((suggestion, index) => (
                <div key={index} className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all">
                  <p className="text-sm font-bold text-[#F9FAFB] leading-relaxed italic">&quot;{suggestion}&quot;</p>
                  <button className="text-[10px] font-black text-[#3B82F6] uppercase tracking-widest mt-4 hover:text-[#F9FAFB] transition-colors flex items-center gap-2 group/btn">
                    Execute Synthesis <ChevronLeft className="w-3 h-3 rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Resonance Pulse Stats */}
          <div className="bg-[#050505] border border-white/5 rounded-3xl p-8 relative overflow-hidden group/stats">
            <div className="absolute inset-0 bg-gradient-to-br from-[#efb0ff]/5 to-transparent"></div>
            <h4 className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest mb-6 relative z-10">Resonance Pulse</h4>
            <div className="grid grid-cols-2 gap-8 relative z-10">
              <div className="text-center">
                <p className="text-4xl font-black text-[#efb0ff] tracking-tighter">2.4k</p>
                <p className="text-[8px] font-black text-[#8a919c] uppercase tracking-widest mt-1">Affinity Units</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-blue-400 tracking-tighter">847</p>
                <p className="text-[8px] font-black text-[#8a919c] uppercase tracking-widest mt-1">Viral Splinters</p>
              </div>
            </div>
          </div>

          {/* Rapid Interaction Layer */}
          <div className="space-y-3 relative z-10 pt-4">
            <button className="w-full py-5 bg-[#efb0ff] hover:bg-[#f4d4ff] text-black font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-[0_0_30px_rgba(239,176,255,0.2)] hover:scale-[1.02] active:scale-95">
              Synthesize Viral Unit
            </button>
            <button className="w-full py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all hover:scale-[1.02] active:scale-95">
              Network Deep Scan
            </button>
          </div>
        </div>
      )}
    </div>
  )
}