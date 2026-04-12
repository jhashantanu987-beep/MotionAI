'use client'

import { useQuery } from '@tanstack/react-query'
import { Zap, TrendingUp, Target, Clock, Users, Heart, Share2, BarChart3, Lightbulb, AlertTriangle, X, ChevronLeft } from 'lucide-react'
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
    refetchInterval: 60000, // Refresh every minute
  })

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-full shadow-lg border border-slate-700 flex items-center justify-center hover:from-slate-800 hover:to-slate-700 transition-all hover:shadow-xl"
        title="Show UGC Insights"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
    )
  }

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 w-80 bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-6 max-h-[90vh] overflow-y-auto">
      {/* Header with Close Button */}
      <div className="flex items-center justify-between -mx-6 -mt-6 px-6 pt-6 pb-4 border-b border-slate-200">
        <h3 className="font-bold text-slate-900 text-lg">UGC Insights</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
          title="Close UGC Insights"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Trending Topics */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <h4 className="text-sm font-medium text-gray-900">Trending Topics</h4>
            </div>
            <div className="space-y-2">
              {insights?.trendingTopics.slice(0, 3).map((topic, index) => (
                <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-800">{topic}</p>
                  <p className="text-xs text-green-600 mt-1">High engagement potential</p>
                </div>
              ))}
            </div>
          </div>

          {/* Best Posting Times */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-medium text-gray-900">Best Posting Times</h4>
            </div>
            <div className="space-y-2">
              {insights?.bestPostingTimes.slice(0, 2).map((time, index) => (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-blue-800">
                    {time.day} at {time.hour}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    {time.engagement}% higher engagement
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-600" />
              <h4 className="text-sm font-medium text-gray-900">AI Recommendations</h4>
            </div>
            <div className="space-y-2">
              {insights?.aiRecommendations.slice(0, 2).map((rec, index) => (
                <div key={index} className={`border rounded-lg p-3 ${getImpactColor(rec.impact)}`}>
                  <p className="text-sm font-medium">{rec.title}</p>
                  <p className="text-xs mt-1 opacity-80">{rec.description}</p>
                  <span className="text-xs font-medium mt-2 inline-block px-2 py-1 rounded-full bg-white bg-opacity-50 capitalize">
                    {rec.impact} impact
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Alerts */}
          {insights?.performanceAlerts && insights.performanceAlerts.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <h4 className="text-sm font-medium text-gray-900">Performance Alerts</h4>
              </div>
              <div className="space-y-2">
                {insights.performanceAlerts.slice(0, 2).map((alert, index) => (
                  <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-sm text-orange-800">{alert}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content Suggestions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-600" />
              <h4 className="text-sm font-medium text-gray-900">Content Ideas</h4>
            </div>
            <div className="space-y-2">
              {insights?.contentSuggestions.slice(0, 2).map((suggestion, index) => (
                <div key={index} className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                  <p className="text-sm text-indigo-800">{suggestion}</p>
                  <button className="text-xs text-indigo-600 font-medium mt-2 hover:text-indigo-800">
                    Generate →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Today's Performance</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Heart className="w-4 h-4 text-pink-600" />
                </div>
                <p className="text-lg font-bold text-pink-600">2.4K</p>
                <p className="text-xs text-pink-700">Likes</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Share2 className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-lg font-bold text-blue-600">847</p>
                <p className="text-xs text-blue-700">Shares</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-medium hover:shadow-lg transition text-sm">
                Generate Viral Content
              </button>
              <button className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-2xl font-medium hover:bg-gray-50 transition text-sm">
                Schedule Next Post
              </button>
              <button className="w-full p-3 bg-lime-500 text-white rounded-2xl font-medium hover:bg-lime-600 transition text-sm">
                Analyze Performance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}