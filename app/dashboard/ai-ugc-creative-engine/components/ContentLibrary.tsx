'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BookOpen, Search, Filter, Calendar, Clock, Heart, MessageCircle, Share2, MoreVertical, Edit, Trash2, Copy, Send } from 'lucide-react'

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
      const response = await fetch('/api/ai-ugc-creative-engine/library')
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700'
      case 'scheduled': return 'bg-blue-100 text-blue-700'
      case 'draft': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

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
    // Could add toast notification
  }

  return (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0a] rounded-3xl shadow-2xl shadow-[#ff006e]/20 border border-[#ff006e]/50 hover:border-[#ff006e] transition-all p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Content Library</h2>
          <p className="text-sm text-gray-600">Manage and reuse your generated content</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Platforms</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      {/* Content List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
          </div>
        ) : filteredContent.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No content found</p>
            <p className="text-sm text-gray-400">Generate some content to get started</p>
          </div>
        ) : (
          filteredContent.map((item) => {
            const PlatformIcon = getPlatformIcon(item.platform)

            return (
              <div key={item.id} className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6 shadow-lg hover:border-purple-500/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.platform === 'instagram' ? 'bg-pink-500/20' :
                      item.platform === 'tiktok' ? 'bg-red-500/20' :
                      item.platform === 'twitter' ? 'bg-blue-500/20' : 'bg-green-500/20'
                    }`}>
                      <PlatformIcon className={`w-5 h-5 ${
                        item.platform === 'instagram' ? 'text-pink-500' :
                        item.platform === 'tiktok' ? 'text-red-500' :
                        item.platform === 'twitter' ? 'text-blue-500' : 'text-green-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white truncate">{item.title}</h4>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'published' ? 'bg-green-500/20 text-green-400' :
                          item.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {item.status}
                        </div>
                      </div>
                      <p className="text-sm text-[#94a3b8] line-clamp-2 mb-3">{item.content}</p>
                      <div className="flex items-center gap-4 text-xs text-[#64748b]">
                        <span>{item.hashtags.length} hashtags</span>
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                        {item.performance && (
                          <span>{item.performance.engagement.toLocaleString()} engagement</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#1f2937]">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-[#1a1f2e] rounded-lg transition-colors">
                      <Copy className="w-4 h-4 text-[#94a3b8]" />
                    </button>
                    <button className="p-2 hover:bg-[#1a1f2e] rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-[#94a3b8]" />
                    </button>
                    <button className="p-2 hover:bg-[#1a1f2e] rounded-lg transition-colors">
                      <Send className="w-4 h-4 text-[#94a3b8]" />
                    </button>
                  </div>
                  <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            )
          })




        )}
      </div>

      {filteredContent.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Showing {filteredContent.length} of {Array.isArray(contentLibrary) ? contentLibrary.length : 0} items
          </p>
        </div>
      )}
    </div>
  )
}