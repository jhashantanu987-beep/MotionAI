'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DollarSign, TrendingUp, TrendingDown, Target, Zap, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

interface BudgetRecommendation {
  campaignId: string
  campaignName: string
  currentBudget: number
  recommendedBudget: number
  expectedImprovement: {
    ctr: number
    conversions: number
    roas: number
  }
  confidence: 'high' | 'medium' | 'low'
  reasoning: string
}

interface BudgetAlert {
  type: 'overspend' | 'underspend' | 'opportunity' | 'warning'
  campaignName: string
  message: string
  action: string
}

export default function BudgetOptimizer() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')

  const { data: budgetData, isLoading } = useQuery({
    queryKey: ['budget-optimization', selectedTimeframe],
    queryFn: async () => {
      const response = await fetch(`/api/ai-ad-performance-engine/budget?timeframe=${selectedTimeframe}`)
      if (!response.ok) throw new Error('Failed to fetch budget data')
      return response.json() as Promise<{
        recommendations: BudgetRecommendation[]
        alerts: BudgetAlert[]
        totalBudget: number
        totalSpent: number
        projectedSpend: number
      }>
    },
    refetchInterval: 30000,
  })

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-green-600 bg-green-50 border-green-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'overspend': return <TrendingDown className="w-4 h-4 text-red-600" />
      case 'underspend': return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'opportunity': return <Target className="w-4 h-4 text-blue-600" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-orange-600" />
      default: return <CheckCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const handleApplyRecommendation = (recommendation: BudgetRecommendation) => {
    // TODO: Apply budget recommendation
    console.log('Apply recommendation:', recommendation)
  }

  return (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0a] rounded-2xl shadow-2xl shadow-[#39ff14]/20 border border-[#39ff14]/50 hover:border-[#39ff14] transition-all p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#111827]">Budget Optimizer</h2>
          <p className="text-gray-600 mt-1">AI-powered budget recommendations and alerts</p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Budget Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Total Budget</p>
                  <p className="text-xl font-bold text-blue-900">
                    ${budgetData?.totalBudget.toLocaleString() || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-900">Total Spent</p>
                  <p className="text-xl font-bold text-green-900">
                    ${budgetData?.totalSpent.toLocaleString() || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-purple-900">Projected Spend</p>
                  <p className="text-xl font-bold text-purple-900">
                    ${budgetData?.projectedSpend.toLocaleString() || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Alerts */}
          {budgetData?.alerts && budgetData.alerts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Alerts</h3>
              <div className="space-y-3">
                {budgetData.alerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{alert.campaignName}</h4>
                      <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
                      <p className="text-sm font-medium text-blue-600 mt-2">{alert.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Recommendations */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Budget Recommendations</h3>
            <div className="space-y-4">
              {budgetData?.recommendations.map((rec, index) => (
                <div key={rec.campaignId} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{rec.campaignName}</h4>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(rec.confidence)}`}>
                        <Zap className="w-3 h-3" />
                        {rec.confidence} confidence
                      </div>
                    </div>

                    <button
                      onClick={() => handleApplyRecommendation(rec)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition"
                    >
                      Apply Recommendation
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Current Budget</p>
                      <p className="text-lg font-bold text-gray-900">${rec.currentBudget.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600">Recommended Budget</p>
                      <p className="text-lg font-bold text-blue-900">${rec.recommendedBudget.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-700">{rec.reasoning}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-gray-600">Expected CTR</p>
                      <p className="font-semibold text-green-600">+{rec.expectedImprovement.ctr}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Expected Conversions</p>
                      <p className="font-semibold text-green-600">+{rec.expectedImprovement.conversions}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Expected ROAS</p>
                      <p className="font-semibold text-green-600">{rec.expectedImprovement.roas}x</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {budgetData?.recommendations.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">All budgets optimized!</h3>
                <p className="text-gray-600">Your campaigns are performing optimally. We'll notify you when new optimization opportunities arise.</p>
              </div>
            )}
          </div>

          {/* Budget Allocation Tips */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Budget Allocation Tips</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <p>Focus 60% of budget on top-performing campaigns</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <p>Use dayparting to optimize spend during peak hours</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <p>Implement automatic bidding for better ROI</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}