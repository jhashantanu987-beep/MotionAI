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
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0a] rounded-3xl shadow-2xl shadow-[#00d9ff]/20 border border-[#00d9ff]/50 hover:border-[#00d9ff] transition-all p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Social Scheduler</h2>
            <p className="text-sm text-gray-600">Schedule and automate your content posting</p>
          </div>
        </div>

        <button
          onClick={() => setShowScheduleModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Schedule Post
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Upcoming Posts */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Posts</h3>
            {upcomingPosts.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-2xl">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No upcoming posts scheduled</p>
                <p className="text-sm text-gray-400 mt-1">Schedule your first post to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingPosts.map((post) => {
                  const PlatformIcon = getPlatformIcon(post.platform)
                  const StatusIcon = getStatusIcon(post.status)
                  const statusColor = getStatusColor(post.status)

                  return (
                    <div key={post.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 bg-gradient-to-br ${getPlatformColor(post.platform)} rounded-lg flex items-center justify-center`}>
                            <PlatformIcon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 capitalize">{post.platform}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(post.scheduledFor).toLocaleDateString()} at {new Date(post.scheduledFor).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <StatusIcon className={`w-5 h-5 ${statusColor}`} />
                          <button
                            onClick={() => deleteScheduledPostMutation.mutate(post.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-700 text-sm line-clamp-2">{post.content}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Past Posts */}
          {pastPosts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {pastPosts.slice(0, 3).map((post) => {
                  const PlatformIcon = getPlatformIcon(post.platform)
                  const StatusIcon = getStatusIcon(post.status)
                  const statusColor = getStatusColor(post.status)

                  return (
                    <div key={post.id} className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 bg-gradient-to-br ${getPlatformColor(post.platform)} rounded-lg flex items-center justify-center`}>
                            <PlatformIcon className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-900 capitalize">{post.platform}</span>
                          <StatusIcon className={`w-4 h-4 ${statusColor}`} />
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(post.scheduledFor).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm line-clamp-1">{post.content}</p>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule Post</h2>

            <div className="space-y-4">
              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter</option>
                  <option value="facebook">Facebook</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Enter your post content..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSchedulePost}
                  disabled={!postContent.trim() || !selectedDate || !selectedTime || schedulePostMutation.isPending}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {schedulePostMutation.isPending ? 'Scheduling...' : 'Schedule Post'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}