'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Sparkles, Loader2, Copy, Download, Share, Zap, MessageSquare, Target, Atom } from 'lucide-react'
import { ugcApi } from '../services/ugcApi'

interface ContentRequest {
  topic: string
  platform: string
  type: string
  tone: string
  targetAudience: string
}

interface GeneratedContent {
  id: string
  platform: string
  type: string
  content: string
  hooks: string[]
  hashtags: string[]
  engagement: number
  createdAt: string
}

export default function ContentGenerator() {
  const [contentRequest, setContentRequest] = useState<ContentRequest>({
    topic: '',
    platform: 'instagram',
    type: 'post',
    tone: 'persuasive',
    targetAudience: 'general'
  })
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  
  const mutation = useMutation({
    mutationFn: (data: any) => ugcApi.generateContent(data),
    onSuccess: (response) => {
      setGeneratedContent({
        id: Math.random().toString(),
        platform: contentRequest.platform,
        type: contentRequest.type,
        content: response.data.content,
        hooks: response.data.hooks || [],
        hashtags: response.data.hashtags || [],
        engagement: response.data.engagementPotential || 94,
        createdAt: new Date().toISOString()
      })
    }
  })

  const handleGenerate = () => {
    mutation.mutate(contentRequest)
  }

  const isGenerating = mutation.isPending

  const copyToClipboard = (text: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(text)
    }
  }

  return (
    <div className="relative p-6 md:p-10 min-h-screen bg-[#0a0c10] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#efb0ff]/10 blur-[180px] rounded-full pointer-events-none opacity-40"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-black bg-gradient-to-r from-white via-white to-cyan-400 text-transparent bg-clip-text tracking-tight mb-4 leading-tight">
            UGC Creative Engine
          </h1>
          <p className="text-[#8a919c] text-lg font-medium max-w-2xl">
            Synthesize viral neural hooks and high-conversion scripts using psychological pattern interrupts.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Module */}
          <div className="bg-[#121212] rounded-[2.5rem] border border-white/5 shadow-2xl p-6 md:p-12 relative overflow-hidden group/input">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#efb0ff]/5 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="flex items-center gap-6 mb-10 relative z-10">
              <div className="w-16 h-16 bg-[#efb0ff]/10 border border-[#efb0ff]/20 rounded-[2rem] flex items-center justify-center shadow-[0_0_20px_rgba(239,176,255,0.1)]">
                <Atom className="w-8 h-8 text-[#efb0ff]" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-[#F9FAFB] tracking-tighter">Asset Synthesis</h2>
                <p className="text-[#8a919c] mt-1 text-sm font-medium">Formulate high-resonance UGC units via neural optimization</p>
              </div>
            </div>

            <div className="space-y-8 relative z-10">
              <div className="group/field">
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#4a4a4a] mb-4 ml-2">Concept Vector</label>
                <textarea
                  value={contentRequest.topic}
                  onChange={(e) => setContentRequest({ ...contentRequest, topic: e.target.value })}
                  placeholder="Inject topic or creative spark..."
                  rows={3}
                  className="w-full bg-[#0A0A0A] px-6 py-5 border border-white/5 rounded-3xl text-[#F9FAFB] placeholder-[#4a4a4a] outline-none focus:ring-2 focus:ring-[#efb0ff]/50 transition-all resize-none font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group/field">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#4a4a4a] mb-4 ml-2">Target Channel</label>
                  <select
                    value={contentRequest.platform}
                    onChange={(e) => setContentRequest({ ...contentRequest, platform: e.target.value })}
                    className="w-full bg-[#0A0A0A] px-6 py-4 border border-white/5 rounded-2xl text-[#8a919c] outline-none focus:ring-2 focus:ring-[#efb0ff]/50 cursor-pointer appearance-none font-bold"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="twitter">X / Twitter</option>
                    <option value="facebook">Facebook</option>
                  </select>
                </div>
                <div className="group/field">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#4a4a4a] mb-4 ml-2">Content Archetype</label>
                  <select
                    value={contentRequest.type}
                    onChange={(e) => setContentRequest({ ...contentRequest, type: e.target.value })}
                    className="w-full bg-[#0A0A0A] px-6 py-4 border border-white/5 rounded-2xl text-[#8a919c] outline-none focus:ring-2 focus:ring-[#efb0ff]/50 cursor-pointer appearance-none font-bold"
                  >
                    <option value="post">Feed Post</option>
                    <option value="reel">Reel / Video</option>
                    <option value="story">Story</option>
                    <option value="thread">Thread</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group/field">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#4a4a4a] mb-4 ml-2">Tonal Frequency</label>
                  <select
                    value={contentRequest.tone}
                    onChange={(e) => setContentRequest({ ...contentRequest, tone: e.target.value })}
                    className="w-full bg-[#0A0A0A] px-6 py-4 border border-white/5 rounded-2xl text-[#8a919c] outline-none focus:ring-2 focus:ring-[#efb0ff]/50 cursor-pointer appearance-none font-bold"
                  >
                    <option value="persuasive">High Conversion</option>
                    <option value="humorous">Viral Engagement</option>
                    <option value="educational">Authority Drive</option>
                    <option value="emotional">Community Trust</option>
                  </select>
                </div>
                <div className="group/field">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#4a4a4a] mb-4 ml-2">Audience Matrix</label>
                  <select
                    value={contentRequest.targetAudience}
                    onChange={(e) => setContentRequest({ ...contentRequest, targetAudience: e.target.value })}
                    className="w-full bg-[#0A0A0A] px-6 py-4 border border-white/5 rounded-2xl text-[#8a919c] outline-none focus:ring-2 focus:ring-[#efb0ff]/50 cursor-pointer appearance-none font-bold"
                  >
                    <option value="genz">Gen-Z (High Vol)</option>
                    <option value="millennial">Millennial (Conversion)</option>
                    <option value="pro">B2B Professional</option>
                    <option value="general">Global Average</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!contentRequest.topic.trim() || isGenerating}
                className="w-full py-5 bg-[#efb0ff] hover:bg-[#efb0ff]/90 text-black rounded-3xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(239,176,255,0.2)] disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Processing Vector...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 fill-black" />
                    Synthesize Unit
                  </>
                )}
              </button>

              {mutation.isError && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                  <p className="text-xs font-bold text-rose-500 text-center uppercase tracking-widest">
                    Neural Link Failed: {mutation.error?.message || 'Check Server Connectivity'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Output Module */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#efb0ff]/5 to-[#3B82F6]/5 blur-3xl rounded-[3rem] -z-10"></div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#4a4a4a] mb-6 flex items-center gap-3 ml-4">
               <div className="w-1.5 h-1.5 rounded-full bg-[#efb0ff] shadow-[0_0_10px_rgba(239,176,255,0.5)]"></div>
               Neural Output Preview
            </h3>

            {generatedContent ? (
              <div className="bg-[#0A0A0A] rounded-[2.5rem] p-6 md:p-10 border border-white/5 shadow-2xl relative group/preview overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#efb0ff]/5 blur-3xl rounded-full"></div>
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-1.5 bg-[#efb0ff]/10 text-[#efb0ff] rounded-full text-[10px] font-black uppercase tracking-widest border border-[#efb0ff]/20">
                      {generatedContent.platform}
                    </span>
                    <span className="px-4 py-1.5 bg-[#3B82F6]/10 text-[#3B82F6] rounded-full text-[10px] font-black uppercase tracking-widest border border-[#3B82F6]/20">
                      {generatedContent.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => copyToClipboard(generatedContent.content)}
                      className="p-3 bg-white/5 hover:bg-white/10 text-[#8a919c] hover:text-[#F9FAFB] rounded-2xl border border-white/5 transition-all"
                      title="Clone"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                    <button
                      className="p-3 bg-white/5 hover:bg-white/10 text-[#8a919c] hover:text-[#F9FAFB] rounded-2xl border border-white/5 transition-all"
                      title="Export"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="relative z-10 bg-white/[0.02] p-8 rounded-3xl border border-white/5 mb-8 shadow-inner">
                  <p className="text-xl font-medium text-[#F9FAFB] leading-relaxed italic">&quot;{generatedContent.content}&quot;</p>
                </div>

                {generatedContent.hooks.length > 0 && (
                  <div className="mb-10 relative z-10">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#4a4a4a] mb-4 ml-2">Viral Neural Hooks</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {generatedContent.hooks.map((hook, idx) => (
                        <button
                          key={idx}
                          onClick={() => copyToClipboard(hook)}
                          className="group/hook flex items-center justify-between p-4 bg-[#efb0ff]/5 hover:bg-[#efb0ff]/10 border border-[#efb0ff]/10 rounded-2xl transition-all text-left"
                        >
                          <span className="text-sm font-bold text-[#F9FAFB] line-clamp-1">{hook}</span>
                          <Copy className="w-4 h-4 text-[#efb0ff]/40 group-hover/hook:text-[#efb0ff] transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-1 bg-[#efb0ff]/20 rounded-full overflow-hidden">
                        <div className="h-full bg-[#efb0ff] shadow-[0_0_8px_rgba(239,176,255,0.6)]" style={{ width: `${generatedContent.engagement}%` }}></div>
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-[#8a919c]">Velocity: <span className="text-[#F9FAFB]">{generatedContent.engagement}%</span></span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#4a4a4a]">{new Date(generatedContent.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>
            ) : (
              <div className="bg-[#0A0A0A] rounded-[2.5rem] p-12 md:p-24 border border-white/5 border-dashed relative overflow-hidden group/empty">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,176,255,0.02)_0%,transparent_70%)]"></div>
                <Sparkles className="w-20 h-20 text-white/5 mx-auto mb-8 group-hover/empty:text-[#efb0ff]/10 group-hover/empty:scale-110 transition-all duration-700" />
                <p className="text-lg font-black text-[#8a919c] uppercase tracking-widest text-center">Awaiting Synthesis</p>
                <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest mt-2 text-center">Formulate neural prompt to begin</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}