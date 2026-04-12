'use client'

import { useQuery } from '@tanstack/react-query'
import { Zap, TrendingUp, Target, AlertTriangle, Lightbulb, DollarSign, BarChart3, Rocket, Clock, Settings, X, ChevronLeft } from 'lucide-react'
import { useState } from 'react'

interface AdInsights {
  optimizationOpportunities: {
    title: string
    description: string
    impact: 'high' | 'medium' | 'low'
    action: string
  }[]
  performanceAlerts: {
    type: 'warning' | 'opportunity' | 'success'
    message: string
    campaign?: string
  }[]
  budgetRecommendations: {
    campaign: string
    currentSpend: number
    recommendedSpend: number
    expectedROI: number
  }[]
  predictiveInsights: {
    trend: string
    prediction: string
    confidence: number
  }[]
}

export default function AdFloatingPanel() {
  const [isOpen, setIsOpen] = useState(true)
  const { data: insights, isLoading } = useQuery({
    queryKey: ['ad-insights'],
    queryFn: async () => {
      const response = await fetch('/api/ai-ad-performance-engine/insights')
      if (!response.ok) throw new Error('Failed to fetch ad insights')
      return response.json() as Promise<AdInsights>
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
        title="Show Ad Insights"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
    )
  }

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 w-80 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-6 max-h-[90vh] overflow-y-auto">
      {/* Header with Close Button */}
      <div className="flex items-center justify-between -mx-6 -mt-6 px-6 pt-6 pb-4 border-b border-slate-200">
        <h3 className="font-bold text-slate-900 text-lg">Ad Insights</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
          title="Close Ad Insights"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Performance Alerts */}
          {insights?.performanceAlerts && insights.performanceAlerts.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <h4 className="text-sm font-medium text-gray-900">Performance Alerts</h4>
              </div>
              <div className="space-y-2">
                {insights.performanceAlerts.slice(0, 3).map((alert, index) => (
                  <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <div>
                        <p className="text-sm text-orange-800">{alert.message}</p>
                        {alert.campaign && (
                          <p className="text-xs text-orange-600 mt-1">{alert.campaign}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Optimization Opportunities */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4 text-purple-600" />
              <h4 className="text-sm font-medium text-gray-900">Optimization Opportunities</h4>
            </div>
            <div className="space-y-2">
              {insights?.optimizationOpportunities.slice(0, 3).map((opp, index) => (
              <div key={index} className={`border rounded-lg p-3 ${getImpactColor(opp.impact)}`}>
                  <p className="text-sm font-medium">{opp.title}</p>
                  <p className="text-xs mt-1 opacity-80">{opp.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-50 capitalize">
                      {opp.impact} impact
                    </span>
                    <button className="text-xs font-medium hover:underline">
                      {opp.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Recommendations */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <h4 className="text-sm font-medium text-gray-900">Budget Recommendations</h4>
            </div>
            <div className="space-y-2">
              {insights?.budgetRecommendations.slice(0, 2).map((rec, index) => (
                <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-800">{rec.campaign}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs">
                      <p className="text-green-600">Current: ${rec.currentSpend.toLocaleString()}</p>
                      <p className="text-green-600">Recommended: ${rec.recommendedSpend.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-green-800">{rec.expectedROI}x ROI</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-medium hover:shadow-lg transition text-sm">
                Optimize Budget
              </button>
              <button className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-2xl font-medium hover:bg-gray-50 transition text-sm">
                Create A/B Test
              </button>
              <button className="w-full p-3 bg-lime-500 text-white rounded-2xl font-medium hover:bg-lime-600 transition text-sm">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}