'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Plus, Play, Pause, Edit, Trash2, TrendingUp, TrendingDown, Eye, Target, DollarSign, Calendar } from 'lucide-react'

interface Campaign {
  id: string
  name: string
  platform: 'google' | 'facebook' | 'linkedin' | 'tiktok'
  status: 'active' | 'paused' | 'draft'
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  roas: number
  startDate: string
  endDate: string
}

export default function CampaignManager() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['ad-campaigns', selectedPlatform],
    queryFn: async () => {
      const response = await fetch(`/api/ai-ad-performance-engine/campaigns?platform=${selectedPlatform}`)
      if (!response.ok) throw new Error('Failed to fetch campaigns')
      return response.json() as Promise<Campaign[]>
    },
    refetchInterval: 30000,
  })

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'google': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'facebook': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'linkedin': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'tiktok': return 'bg-black text-white border-gray-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleCreateCampaign = () => {
    // TODO: Open campaign creation modal
    console.log('Create new campaign')
  }

  const handleToggleCampaign = (campaignId: string, currentStatus: string) => {
    // TODO: Toggle campaign status
    console.log('Toggle campaign:', campaignId, currentStatus)
  }

  return (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0a] rounded-2xl shadow-2xl shadow-[#b537f2]/20 border border-[#b537f2]/50 hover:border-[#b537f2] transition-all p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Campaign Manager</h2>
          <p className="text-gray-600 mt-1">Manage and optimize your advertising campaigns</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Platform Filter */}
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Platforms</option>
            <option value="google">Google Ads</option>
            <option value="facebook">Facebook Ads</option>
            <option value="linkedin">LinkedIn Ads</option>
            <option value="tiktok">TikTok Ads</option>
          </select>

          {/* Create Campaign Button */}
          <button
            onClick={handleCreateCampaign}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            <Plus className="w-4 h-4" />
            New Campaign
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {campaigns?.map((campaign) => (
            <div key={campaign.id} className="bg-[#111827] border border-[#1f2937] rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    campaign.platform === 'google' ? 'bg-blue-500/20 text-blue-400' :
                    campaign.platform === 'facebook' ? 'bg-blue-500/20 text-blue-400' :
                    campaign.platform === 'linkedin' ? 'bg-blue-500/20 text-blue-400' :
                    campaign.platform === 'tiktok' ? 'bg-red-500/20 text-red-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {campaign.platform.charAt(0).toUpperCase() + campaign.platform.slice(1)}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    campaign.status === 'paused' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                    {campaign.roas >= 3 ? 'High ROAS' : campaign.roas >= 2 ? 'Good ROAS' : 'Low ROAS'}
                  </div>
                  <button
                    onClick={() => handleToggleCampaign(campaign.id, campaign.status)}
                    className={`p-2 rounded-lg transition ${
                      campaign.status === 'active'
                        ? 'text-yellow-400 hover:bg-yellow-500/20'
                        : 'text-green-400 hover:bg-green-500/20'
                    }`}
                  >
                    {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button className="p-2 text-[#94a3b8] hover:text-white hover:bg-[#1a1f2e] rounded-lg transition">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-sm font-semibold text-white">${campaign.spent.toLocaleString()}</p>
                  <p className="text-xs text-[#94a3b8]">Spent</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Eye className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-sm font-semibold text-white">{campaign.impressions.toLocaleString()}</p>
                  <p className="text-xs text-[#94a3b8]">Impressions</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Target className="w-4 h-4 text-purple-400" />
                  </div>
                  <p className="text-sm font-semibold text-white">{campaign.clicks.toLocaleString()}</p>
                  <p className="text-xs text-[#94a3b8]">Clicks</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="w-4 h-4 text-orange-400" />
                  </div>
                  <p className="text-sm font-semibold text-white">{campaign.ctr}%</p>
                  <p className="text-xs text-[#94a3b8]">CTR</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign className="w-4 h-4 text-red-400" />
                  </div>
                  <p className="text-sm font-semibold text-white">${campaign.cpc.toFixed(2)}</p>
                  <p className="text-xs text-[#94a3b8]">CPC</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="w-4 h-4 text-indigo-400" />
                  </div>
                  <p className="text-sm font-semibold text-white">{campaign.conversions}</p>
                  <p className="text-xs text-[#94a3b8]">Conversions</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-sm font-semibold text-white">{campaign.roas}x</p>
                  <p className="text-xs text-[#94a3b8]">ROAS</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Calendar className="w-4 h-4 text-[#94a3b8]" />
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {new Date(campaign.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-[#94a3b8]">End Date</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Budget Progress</span>
                  <span>${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}

          {campaigns?.length === 0 && (
            <div className="text-center py-12">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
              <p className="text-gray-600 mb-4">Create your first advertising campaign to get started</p>
              <button
                onClick={handleCreateCampaign}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Create Campaign
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}