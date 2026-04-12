'use client'

import { useQuery } from '@tanstack/react-query'
import { Image, Video, FileText, TrendingUp, Eye, Heart, Share2, MessageCircle, ThumbsUp } from 'lucide-react'

interface CreativeAnalysis {
  topCreatives: {
    id: string
    type: 'image' | 'video' | 'text'
    headline: string
    description: string
    platform: string
    performance: {
      impressions: number
      clicks: number
      ctr: number
      conversions: number
      engagement: number
      cost: number
    }
    thumbnail?: string
  }[]
  creativeInsights: {
    bestPerformingType: string
    recommendedChanges: string[]
    trendingElements: string[]
    underperformingElements: string[]
  }
  abTestResults: {
    testId: string
    testName: string
    winner: 'A' | 'B'
    improvement: number
    confidence: number
    status: 'running' | 'completed'
  }[]
}

export default function CreativeAnalyzer() {
  const { data: creativeData, isLoading } = useQuery({
    queryKey: ['creative-analysis'],
    queryFn: async () => {
      const response = await fetch('/api/ai-ad-performance-engine/creatives')
      if (!response.ok) throw new Error('Failed to fetch creative analysis')
      return response.json() as Promise<CreativeAnalysis>
    },
    refetchInterval: 30000,
  })

  const getCreativeIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-5 h-5" />
      case 'video': return <Video className="w-5 h-5" />
      case 'text': return <FileText className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'google': return 'bg-blue-100 text-blue-800'
      case 'facebook': return 'bg-blue-100 text-blue-800'
      case 'linkedin': return 'bg-blue-100 text-blue-800'
      case 'tiktok': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0a] rounded-2xl shadow-2xl shadow-[#ff006e]/20 border border-[#ff006e]/50 hover:border-[#ff006e] transition-all p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Creative Analyzer</h2>
          <p className="text-gray-600 mt-1">Analyze and optimize your ad creative performance</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition">
            Run A/B Test
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top Performing Creatives */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Creatives</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {creativeData?.topCreatives.map((creative, index) => (
                <div key={creative.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                      {getCreativeIcon(creative.type)}
                    </div>
                    <div className="flex-1">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(creative.platform)}`}>
                        {creative.platform}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{creative.headline}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{creative.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="text-center">
                      <p className="text-gray-600">CTR</p>
                      <p className="font-semibold text-gray-900">{creative.performance.ctr}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Engagement</p>
                      <p className="font-semibold text-gray-900">{creative.performance.engagement}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Conversions</p>
                      <p className="font-semibold text-gray-900">{creative.performance.conversions}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Cost</p>
                      <p className="font-semibold text-gray-900">${creative.performance.cost.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Impressions</span>
                      <span className="font-semibold text-gray-900">{creative.performance.impressions.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* A/B Test Results */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">A/B Test Results</h3>
            <div className="space-y-3">
              {creativeData?.abTestResults.map((test) => (
                <div key={test.testId} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${test.status === 'completed' ? 'bg-green-500' : 'bg-blue-500 animate-pulse'}`}></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{test.testName}</h4>
                      <p className="text-sm text-gray-600">
                        Winner: Version {test.winner} • {test.improvement}% improvement
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      test.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {test.status === 'completed' ? 'Completed' : 'Running'}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{test.confidence}% confidence</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Creative Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Creative Insights */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Creative Insights</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Best Performing Type</p>
                  <div className="flex items-center gap-2">
                    {getCreativeIcon(creativeData?.creativeInsights.bestPerformingType || 'text')}
                    <span className="text-sm text-gray-700 capitalize">
                      {creativeData?.creativeInsights.bestPerformingType || 'text'} ads
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Trending Elements</p>
                  <div className="flex flex-wrap gap-2">
                    {creativeData?.creativeInsights.trendingElements.map((element, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        {element}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Recommendations</h3>
              <div className="space-y-3">
                {creativeData?.creativeInsights.recommendedChanges.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />
                    <p className="text-sm text-gray-700">{recommendation}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-sm font-medium text-gray-900 mb-2">Underperforming Elements</p>
                <div className="flex flex-wrap gap-2">
                  {creativeData?.creativeInsights.underperformingElements.map((element, index) => (
                    <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                      {element}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Creative Performance Metrics */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Creative Performance Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">2.4M</p>
                <p className="text-sm text-gray-600">Total Impressions</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <ThumbsUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">4.2%</p>
                <p className="text-sm text-gray-600">Avg CTR</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">8.7%</p>
                <p className="text-sm text-gray-600">Avg Engagement</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Share2 className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">1.2K</p>
                <p className="text-sm text-gray-600">Total Conversions</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}