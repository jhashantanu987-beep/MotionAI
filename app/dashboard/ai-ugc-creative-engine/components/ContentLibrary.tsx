'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BookOpen, Search, Filter, Calendar, Clock, Heart, MessageCircle, Share2, MoreVertical, Edit, Trash2, Copy, Send, Loader2 } from 'lucide-react'
import { API_CONFIG } from '@/app/config/api'

interface ContentItem {
  id: string
  title: string
  content: string
  platform: string
  type: string
  hashtags: string[]
  status: 'draft' | 'published' | 'scheduled'
  createdAt: string
  scheduledFor?: string
  performance?: {
    impressions: number
    engagement: number
    engagementRate: number
  }
}

export default function ContentLibrary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPlatform, setFilterPlatform] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)

  const { data: contentLibrary, isLoading } = useQuery({
    queryKey: ['ai-ugc-content-library'],
    queryFn: async () => {
      const response = await fetch(`${API_CONFIG.baseUrl}/ai/ugc-library`)
      if (!response.ok) throw new Error('Failed to fetch content library')
      return response.json() as Promise<ContentItem[]>
    },
    refetchInterval: 30000,
  })

  const filteredContent = Array.isArray(contentLibrary) ? contentLibrary.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = filterPlatform === 'all' || item.platform === filterPlatform
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus

    return matchesSearch && matchesPlatform && matchesStatus
  }) : []

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return Heart
      case 'tiktok': return MessageCircle
      case 'twitter': return Share2
      case 'facebook': return BookOpen
      default: return BookOpen
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-emerald-400'
      case 'scheduled': return 'text-blue-400'
      case 'draft': return 'text-amber-400'
      default: return 'text-[#8a919c]'
    }
  }

  return (
    <div className="bg-[#121212] rounded-[2.5rem] border border-white/5 shadow-2xl p-6 md:p-10 relative overflow-hidden group/library">
       <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none"></div>
      <div className="flex items-center gap-6 mb-10 relative z-10">
        <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-[2rem] flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.1)]">
          <BookOpen className="w-8 h-8 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-[#F9FAFB] tracking-tighter">Content Repository</h2>
          <p className="text-[#8a919c] mt-1 text-sm font-medium">Manage and deploy synthesized UGC assets across the network</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10 relative z-10">
        <div className="group/search relative">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4a4a4a] group-hover/search:text-indigo-400 transition-colors" />
          <input
            type="text"
            placeholder="Query repository..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-[#0A0A0A] border border-white/5 rounded-2xl text-[#F9FAFB] placeholder-[#4a4a4a] outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="flex-1 bg-[#0A0A0A] px-5 py-4 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#8a919c] outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
          >
            <option value="all">All Channels</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="twitter">X / Twitter</option>
            <option value="facebook">Facebook</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 bg-[#0A0A0A] px-5 py-4 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#8a919c] outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
          >
            <option value="all">All States</option>
            <option value="draft">Drafts</option>
            <option value="scheduled">Queued</option>
            <option value="published">Deployed</option>
          </select>
        </div>
      </div>

      {/* Content List */}
      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar relative z-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-widest text-[#4a4a4a]">Accessing Neural Vault</p>
          </div>
        ) : filteredContent.length === 0 ? (
          <div className="text-center py-20 bg-[#0A0A0A]/50 rounded-[2rem] border border-white/5 border-dashed group/empty">
            <BookOpen className="w-20 h-20 text-white/5 mx-auto mb-6 group-hover/empty:text-indigo-500/10 transition-colors" />
            <p className="text-xl font-black text-[#8a919c] uppercase tracking-widest">No Matches Identified</p>
            <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest mt-2">Adjust query parameters or synthesize new content</p>
          </div>
        ) : (
          filteredContent.map((item) => {
            const PlatformIcon = getPlatformIcon(item.platform)

            return (
              <div key={item.id} className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-4 sm:p-8 hover:border-indigo-500/30 transition-all group/card shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                <div className="flex items-start justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-6 flex-1">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner ${
                      item.platform === 'instagram' ? 'bg-pink-500/10 border-pink-500/20 text-pink-400' :
                      item.platform === 'tiktok' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' :
                      item.platform === 'twitter' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    }`}>
                      <PlatformIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xl font-black text-[#F9FAFB] tracking-tight truncate max-w-[200px]">{item.title}</h4>
                        <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          item.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          item.status === 'scheduled' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {item.status}
                        </div>
                      </div>
                      <p className="text-[#8a919c] text-sm font-medium line-clamp-2 leading-relaxed">&quot;{item.content}&quot;</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/5 relative z-10">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{item.hashtags.length} Tags</span>
                    </div>
                    <div className="h-4 w-[1px] bg-white/5"></div>
                    <span className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Awaiting Deployment'}
                    </span>
                    {item.performance && (
                       <>
                        <div className="h-4 w-[1px] bg-white/5"></div>
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{item.performance.engagement.toLocaleString()} Imp</span>
                       </>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {[
                      { icon: Copy, action: () => copyToClipboard(item.content), title: 'Clone' },
                      { icon: Edit, title: 'Modify' },
                      { icon: Send, title: 'Deploy' }
                    ].map((btn, i) => (
                      <button key={i} onClick={btn.action} className="p-2.5 bg-white/5 hover:bg-white/10 text-[#8a919c] hover:text-[#F9FAFB] rounded-xl border border-white/5 transition-all shadow-lg" title={btn.title}>
                        <btn.icon className="w-4 h-4" />
                      </button>
                    ))}
                    <div className="w-[1px] h-6 bg-white/5 mx-2"></div>
                    <button className="p-2.5 bg-rose-500/5 hover:bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/10 transition-all shadow-lg" title="Purge">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {filteredContent.length > 0 && (
        <div className="mt-8 pt-8 border-t border-white/5 text-center relative z-10">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#4a4a4a]">
            Vault Capacity: {filteredContent.length} / {Array.isArray(contentLibrary) ? contentLibrary.length : 0} Units Accessible
          </p>
        </div>
      )}
    </div>
  )
}