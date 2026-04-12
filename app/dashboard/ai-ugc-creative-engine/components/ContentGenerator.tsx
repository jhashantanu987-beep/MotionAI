'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Sparkles, Wand2, Image, Video, Type, Hash, Target, Users, Calendar, Loader2, Copy, Download, Share } from 'lucide-react'

interface ContentRequest {
  platform: string
  contentType: string
  topic: string
  tone: string
  targetAudience: string
  hashtags: boolean
  length: string
}

interface GeneratedContent {
  id: string
  content: string
  platform: string
  type: string
  hashtags: string[]
  engagement: number
  createdAt: string
}

export default function ContentGenerator() {
  const [contentRequest, setContentRequest] = useState<ContentRequest>({
    platform: 'instagram',
    contentType: 'post',
    topic: '',
    tone: 'engaging',
    targetAudience: 'young-adults',
    hashtags: true,
    length: 'medium'
  })

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const queryClient = useQueryClient()

  const generateContentMutation = useMutation({
    mutationFn: async (request: ContentRequest) => {
      const response = await fetch('/api/ai-ugc-creative-engine/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      })
      if (!response.ok) throw new Error('Failed to generate content')
      return response.json()
    },
    onSuccess: (data) => {
      setGeneratedContent(data)
      queryClient.invalidateQueries({ queryKey: ['ai-ugc-creative-engine'] })
    }
  })

  const handleGenerate = async () => {
    if (!contentRequest.topic.trim()) return

    setIsGenerating(true)
    try {
      await generateContentMutation.mutateAsync(contentRequest)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Could add toast notification here
  }

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Image },
    { id: 'tiktok', name: 'TikTok', icon: Video },
    { id: 'twitter', name: 'Twitter', icon: Hash },
    { id: 'facebook', name: 'Facebook', icon: Users },
  ]

  const contentTypes = [
    { id: 'post', name: 'Post', icon: Type },
    { id: 'story', name: 'Story', icon: Image },
    { id: 'reel', name: 'Reel', icon: Video },
    { id: 'thread', name: 'Thread', icon: Hash },
  ]

  const tones = [
    { id: 'engaging', name: 'Engaging' },
    { id: 'humorous', name: 'Humorous' },
    { id: 'inspirational', name: 'Inspirational' },
    { id: 'educational', name: 'Educational' },
    { id: 'controversial', name: 'Controversial' },
  ]

  return (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0a] rounded-3xl shadow-2xl shadow-[#b537f2]/20 border border-[#b537f2]/50 hover:border-[#b537f2] transition-all p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Wand2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">AI Content Generator</h2>
          <p className="text-sm text-gray-600">Create viral UGC content powered by advanced AI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="space-y-6">
          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-white mb-3">Platform</label>
            <div className="grid grid-cols-2 gap-6">
              {platforms.map((platform) => {
                const Icon = platform.icon
                return (
                  <button
                    key={platform.id}
                    onClick={() => setContentRequest(prev => ({ ...prev, platform: platform.id }))}
                    className={`bg-[#111827] border border-[#1f2937] rounded-2xl p-5 shadow-lg transition-all hover:border-purple-500/50 ${
                      contentRequest.platform === platform.id
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'hover:bg-[#1a1f2e]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Icon className={`w-6 h-6 ${
                        platform.id === 'instagram' ? 'text-pink-500' :
                        platform.id === 'tiktok' ? 'text-red-500' :
                        platform.id === 'twitter' ? 'text-blue-500' : 'text-green-500'
                      }`} />
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        contentRequest.platform === platform.id ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {contentRequest.platform === platform.id ? 'Selected' : 'Select'}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-white">{platform.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-sm font-medium text-white mb-3">Content Type</label>
            <div className="grid grid-cols-2 gap-6">
              {contentTypes.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => setContentRequest(prev => ({ ...prev, contentType: type.id }))}
                    className={`bg-[#111827] border border-[#1f2937] rounded-2xl p-5 shadow-lg transition-all hover:border-pink-500/50 ${
                      contentRequest.contentType === type.id
                        ? 'border-pink-500 bg-pink-500/10'
                        : 'hover:bg-[#1a1f2e]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Icon className={`w-6 h-6 ${
                        type.id === 'post' ? 'text-green-500' :
                        type.id === 'story' ? 'text-purple-500' :
                        type.id === 'reel' ? 'text-red-500' : 'text-blue-500'
                      }`} />
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        contentRequest.contentType === type.id ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {contentRequest.contentType === type.id ? 'Selected' : 'Select'}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-white">{type.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Topic Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Topic or Keyword</label>
            <input
              type="text"
              value={contentRequest.topic}
              onChange={(e) => setContentRequest(prev => ({ ...prev, topic: e.target.value }))}
              placeholder="Enter your content topic..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Tone & Audience */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
              <select
                value={contentRequest.tone}
                onChange={(e) => setContentRequest(prev => ({ ...prev, tone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {tones.map((tone) => (
                  <option key={tone.id} value={tone.id}>{tone.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
              <select
                value={contentRequest.targetAudience}
                onChange={(e) => setContentRequest(prev => ({ ...prev, targetAudience: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="young-adults">Young Adults (18-34)</option>
                <option value="professionals">Professionals (25-45)</option>
                <option value="families">Families</option>
                <option value="seniors">Seniors (55+)</option>
              </select>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={contentRequest.hashtags}
                onChange={(e) => setContentRequest(prev => ({ ...prev, hashtags: e.target.checked }))}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">Include hashtags</span>
            </label>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Length:</span>
              <select
                value={contentRequest.length}
                onChange={(e) => setContentRequest(prev => ({ ...prev, length: e.target.value }))}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!contentRequest.topic.trim() || isGenerating}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Content
              </>
            )}
          </button>
        </div>

        {/* Generated Content Preview */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Generated Content</h3>

          {generatedContent ? (
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                    {generatedContent.platform}
                  </span>
                  <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs font-medium">
                    {generatedContent.type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(generatedContent.content)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    title="Share"
                  >
                    <Share className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <p className="text-gray-900 mb-3 whitespace-pre-wrap">{generatedContent.content}</p>

              {generatedContent.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {generatedContent.hashtags.map((hashtag, index) => (
                    <span key={index} className="text-sm text-purple-600 font-medium">
                      {hashtag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
                <span>Predicted engagement: {generatedContent.engagement}%</span>
                <span>{new Date(generatedContent.createdAt).toLocaleTimeString()}</span>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 border-dashed text-center">
              <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Your generated content will appear here</p>
              <p className="text-sm text-gray-400 mt-1">Fill out the form and click generate</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}