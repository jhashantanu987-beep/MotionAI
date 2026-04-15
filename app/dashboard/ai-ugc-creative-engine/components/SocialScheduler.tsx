'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Calendar, Clock, Plus, CheckCircle, AlertCircle, Instagram, Twitter, Facebook, Video, Send, Trash2 } from 'lucide-react'

interface ScheduledPost {
  id: string
  content: string
  platform: string
  scheduledFor: string
  status: 'scheduled' | 'posted' | 'failed'
  createdAt: string
}

export default function SocialScheduler() {
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('instagram')
  const [postContent, setPostContent] = useState('')

  const queryClient = useQueryClient()

  const { data: scheduledPosts = [], isLoading } = useQuery({
    queryKey: ['ai-ugc-scheduled-posts'],
    queryFn: async () => {
      const response = await fetch('/api/ai-ugc-creative-engine/scheduler')
      if (!response.ok) throw new Error('Failed to fetch scheduled posts')
      const result = await response.json()
      return Array.isArray(result) ? result : result.data || []
    },
    refetchInterval: 30000,
  })

  const schedulePostMutation = useMutation({
    mutationFn: async (postData: { content: string; platform: string; scheduledFor: string }) => {
      const response = await fetch('/api/ai-ugc-creative-engine/scheduler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      })
      if (!response.ok) throw new Error('Failed to schedule post')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-ugc-scheduled-posts'] })
      setShowScheduleModal(false)
      setPostContent('')
      setSelectedDate('')
      setSelectedTime('')
    }
  })

  const deleteScheduledPostMutation = useMutation({
    mutationFn: async (postId: string) => {
      const response = await fetch('/api/ai-ugc-creative-engine/scheduler', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: postId, action: 'cancel' })
      })
      if (!response.ok) throw new Error('Failed to delete scheduled post')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-ugc-scheduled-posts'] })
    }
  })

  const handleSchedulePost = () => {
    if (!postContent.trim() || !selectedDate || !selectedTime) return

    const scheduledFor = new Date(`${selectedDate}T${selectedTime}`).toISOString()
    schedulePostMutation.mutate({
      content: postContent,
      platform: selectedPlatform,
      scheduledFor
    })
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return Instagram
      case 'twitter': return Twitter
      case 'facebook': return Facebook
      case 'tiktok': return Video
      default: return Send
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return 'from-pink-500 to-purple-500'
      case 'twitter': return 'from-blue-400 to-blue-600'
      case 'facebook': return 'from-blue-600 to-blue-800'
      case 'tiktok': return 'from-black to-gray-800'
      default: return 'from-gray-500 to-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'posted': return CheckCircle
      case 'failed': return AlertCircle
      default: return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'posted': return 'text-green-600'
      case 'failed': return 'text-red-600'
      default: return 'text-blue-600'
    }
  }

  const upcomingPosts = Array.isArray(scheduledPosts) ? scheduledPosts.filter(post =>
    new Date(post.scheduledFor) > new Date() && post.status === 'scheduled'
  ) : []

  const pastPosts = Array.isArray(scheduledPosts) ? scheduledPosts.filter(post =>
    new Date(post.scheduledFor) <= new Date() || post.status !== 'scheduled'
  ) : []

  return (
    <div className="bg-[#121212] rounded-[2.5rem] border border-white/5 shadow-2xl p-6 md:p-10 relative overflow-hidden group/scheduler">
       <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[80px] rounded-full pointer-events-none"></div>
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-[2rem] flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.1)]">
            <Calendar className="w-8 h-8 text-orange-400" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#F9FAFB] tracking-tighter">Social Automator</h2>
            <p className="text-[#8a919c] mt-1 text-sm font-medium">Coordinate and synchronize your multi-channel deployment sequence</p>
          </div>
        </div>

        <button
          onClick={() => setShowScheduleModal(true)}
          className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-black rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(249,115,22,0.2)] hover:scale-[1.02] active:scale-95 flex items-center gap-2"
        >
          <Plus className="w-5 h-5 fill-black" />
          Queue Sequence
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Upcoming Posts */}
          <div className="mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#4a4a4a] mb-6 flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
               Active Deployment Queue
            </h3>
            {upcomingPosts.length === 0 ? (
              <div className="text-center py-16 bg-[#0A0A0A]/50 rounded-[2rem] border border-white/5 border-dashed group/empty">
                <Calendar className="w-20 h-20 text-white/5 mx-auto mb-6 group-hover/empty:text-orange-500/10 transition-colors" />
                <p className="text-xl font-black text-[#8a919c] uppercase tracking-widest">Queue Vacuum Detected</p>
                <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest mt-2">Initialize new sequence to populate the network</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {upcomingPosts.map((post) => {
                  const PlatformIcon = getPlatformIcon(post.platform)
                  const statusColor = getStatusColor(post.status)

                  return (
                    <div key={post.id} className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-6 sm:p-8 hover:border-orange-500/30 transition-all group/post relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-full bg-orange-500/5 -skew-x-12 translate-x-16 opacity-0 group-hover/post:opacity-100 transition-opacity"></div>
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 relative z-10">
                        <div className="flex items-center gap-4 sm:gap-6">
                          <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/post:border-orange-500/20 transition-all shadow-inner`}>
                            <PlatformIcon className="w-6 h-6 text-[#efb0ff]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                               <p className="text-xl font-black text-[#F9FAFB] tracking-tight capitalize">{post.platform}</p>
                               <span className={`text-[10px] font-black uppercase tracking-widest ${statusColor} bg-white/5 px-3 py-1 rounded-full border border-white/5`}>
                                 {post.status}
                               </span>
                            </div>
                            <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest">
                              Launch: {new Date(post.scheduledFor).toLocaleDateString()} // {new Date(post.scheduledFor).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                          <button
                            onClick={() => deleteScheduledPostMutation.mutate(post.id)}
                            className="p-3 bg-rose-500/5 hover:bg-rose-500/10 text-rose-400 rounded-2xl border border-rose-500/10 transition-all shadow-lg"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8 p-6 bg-white/[0.02] rounded-2xl border border-white/5 shadow-inner relative z-10">
                         <p className="text-sm font-medium text-[#8a919c] leading-relaxed italic line-clamp-2">&quot;{post.content}&quot;</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Past Posts */}
          {pastPosts.length > 0 && (
            <div>
               <h3 className="text-[10px] font-black uppercase tracking-widest text-[#4a4a4a] mb-6 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                Historical Deployment Log
              </h3>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {pastPosts.slice(0, 5).map((post) => {
                  const PlatformIcon = getPlatformIcon(post.platform)
                  const StatusIcon = getStatusIcon(post.status)
                  const statusColor = getStatusColor(post.status)

                  return (
                    <div key={post.id} className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group/past shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center border border-white/5 group-hover/past:border-white/10 transition-all`}>
                            <PlatformIcon className="w-4 h-4 text-[#8a919c]" />
                          </div>
                          <span className="text-sm font-black text-[#F9FAFB] tracking-tight capitalize group-hover/past:text-emerald-400 transition-colors">{post.platform}</span>
                          <StatusIcon className={`w-4 h-4 ${statusColor} shadow-[0_0_8px_currentColor] opacity-60`} />
                        </div>
                        <span className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest">
                          {new Date(post.scheduledFor).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-[10px] font-medium text-[#525252] truncate italic">&quot;{post.content}&quot;</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Schedule Post Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4 lg:p-0">
          <div className="absolute inset-x-0 inset-y-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setShowScheduleModal(false)}></div>
          <div className="bg-[#0A0A0A] rounded-[3rem] p-6 md:p-12 max-w-lg w-full relative z-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 slide-in-from-bottom-5 duration-500">
             <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 blur-[60px] rounded-full"></div>
            <h2 className="text-4xl font-black text-[#F9FAFB] tracking-tighter mb-10 flex items-center gap-4">
               <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-500/20">
                <Plus className="w-6 h-6 text-orange-400" />
              </div>
              Queue Post
            </h2>

            <div className="space-y-8">
              {/* Platform Selection */}
              <div className="group/select">
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#4a4a4a] mb-4 ml-2 font-bold">Launch Vector</label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full bg-[#121212] px-6 py-4 border border-white/5 rounded-2xl text-[#F9FAFB] focus:ring-2 focus:ring-orange-500/50 outline-none transition-all cursor-pointer group-hover/select:border-white/10 appearance-none font-bold"
                >
                  <option value="instagram" className="bg-[#0A0A0A]">Instagram Optimized</option>
                  <option value="twitter" className="bg-[#0A0A0A]">X (Twitter) Stream</option>
                  <option value="facebook" className="bg-[#0A0A0A]">Facebook Meta</option>
                  <option value="tiktok" className="bg-[#0A0A0A]">TikTok Viral</option>
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group/input">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#4a4a4a] mb-4 ml-2 font-bold">Sequence Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-[#121212] px-6 py-4 border border-white/5 rounded-2xl text-[#F9FAFB] focus:ring-2 focus:ring-orange-500/50 outline-none transition-all group-hover/input:border-white/10 dark:invert-[0.9] dark:hue-rotate-180"
                  />
                </div>
                <div className="group/input">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#4a4a4a] mb-4 ml-2 font-bold">Epoch Time</label>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-[#121212] px-6 py-4 border border-white/5 rounded-2xl text-[#F9FAFB] focus:ring-2 focus:ring-orange-500/50 outline-none transition-all group-hover/input:border-white/10 dark:invert-[0.9] dark:hue-rotate-180"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="group/input">
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#4a4a4a] mb-4 ml-2 font-bold">Neural Payload</label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Enter content payload..."
                  rows={4}
                  className="w-full bg-[#121212] px-6 py-4 border border-white/5 rounded-2xl text-[#F9FAFB] placeholder-[#4a4a4a] focus:ring-2 focus:ring-orange-500/50 outline-none transition-all resize-none group-hover/input:border-white/10 font-medium"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 py-5 px-8 bg-white/5 text-[#8a919c] rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5"
                >
                  Abort
                </button>
                <button
                  onClick={handleSchedulePost}
                  disabled={!postContent.trim() || !selectedDate || !selectedTime || schedulePostMutation.isPending}
                  className="flex-1 py-5 px-8 bg-orange-500 hover:bg-orange-600 text-black rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {schedulePostMutation.isPending ? 'Processing...' : 'Execute Queue'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}