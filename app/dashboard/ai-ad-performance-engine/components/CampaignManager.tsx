'use client'

import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus, Play, Pause, Edit, Trash2, Target, Users, Search, Filter } from 'lucide-react'
import LaunchUnitModal from './LaunchUnitModal'
import { API_CONFIG } from '@/app/config/api'

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
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false)
  const queryClient = useQueryClient()

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['ad-campaigns', selectedPlatform],
    queryFn: async () => {
      const response = await fetch(`${API_CONFIG.baseUrl}/campaigns?platform=${selectedPlatform}`)
      if (!response.ok) throw new Error('Failed to fetch campaigns')
      return response.json() as Promise<Campaign[]>
    },
    refetchInterval: 30000,
  })

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'google': return '🔍'
      case 'facebook': return '📘'
      case 'linkedin': return '💼'
      case 'tiktok': return '🎵'
      default: return '📊'
    }
  }

  const handleToggleCampaign = async (id: string, status: string) => {
    const newStatus = status === 'active' ? 'paused' : 'active'
    await fetch(`${API_CONFIG.baseUrl}/campaigns/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
    queryClient.invalidateQueries({ queryKey: ['ad-campaigns'] })
  }

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:5000/api/campaigns/${id}`, { method: 'DELETE' })
    queryClient.invalidateQueries({ queryKey: ['ad-campaigns'] })
  }

  return (
    <>
      <div className="bg-[#121212] rounded-[3rem] border border-white/5 shadow-2xl p-10 relative overflow-hidden group/container">
        <div className="flex items-center justify-between mb-12 relative z-10">
          <div>
            <h2 className="text-3xl font-black text-[#F9FAFB] tracking-tight">Campaign Flow</h2>
            <p className="text-[#8a919c] mt-1 text-sm font-medium uppercase tracking-widest text-[10px] font-black">Performance Management</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Platform Select */}
            <div className="relative group/select">
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="appearance-none bg-[#0A0A0A] border border-white/10 rounded-2xl px-8 py-4 pr-12 text-sm font-black text-[#F9FAFB] uppercase tracking-widest focus:ring-2 focus:ring-[#3B82F6]/50 focus:outline-none transition-all cursor-pointer hover:border-white/20 shadow-xl"
              >
                <option value="all">Global Reach</option>
                <option value="google">Google Core</option>
                <option value="facebook">Meta Network</option>
                <option value="linkedin">Pro Network</option>
                <option value="tiktok">Stream Viral</option>
              </select>
              <Filter className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a4a4a] pointer-events-none group-hover/select:text-white transition-colors" />
            </div>

            <button
              onClick={() => setIsLaunchModalOpen(true)}
              className="flex items-center gap-3 px-8 py-4 bg-[#3B82F6] hover:bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.05] active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Launch Unit
            </button>
          </div>
        </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#3B82F6]"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {Array.isArray(campaigns) && campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-8 hover:border-white/10 transition-all group/card relative overflow-hidden flex items-center justify-between gap-12">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] -rotate-45 translate-x-16 -translate-y-16 group-hover/card:bg-white/[0.03] transition-all"></div>
              
              <div className="flex items-center gap-10 flex-1 relative z-10">
                {/* Platform Icon */}
                <div className="w-16 h-16 bg-[#121212] rounded-[1.5rem] border border-white/5 flex items-center justify-center text-3xl shadow-inner group-hover/card:border-white/10 transition-all">
                  {getPlatformIcon(campaign.platform)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-2xl font-black text-[#F9FAFB] tracking-tight truncate group-hover/card:text-[#3B82F6] transition-colors">{campaign.name}</h3>
                    <div className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border ${campaign.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      {campaign.status}
                    </div>
                  </div>
                  <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-[0.2em] group-hover/card:text-[#8a919c] transition-colors">Digital Distribution Platform</p>
                </div>
              </div>

              {/* Metrics Strip */}
              <div className="flex items-center gap-16 relative z-10 px-8 border-x border-white/5">
                <div className="text-center">
                  <p className="text-2xl font-black text-[#F9FAFB] tracking-tight">${campaign.spent.toLocaleString()}</p>
                  <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest mt-1">Allocation</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-[#3B82F6] tracking-tight">{campaign.conversions}</p>
                  <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest mt-1">Outcome</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-emerald-400 tracking-tight">{campaign.roas}x</p>
                  <p className="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest mt-1">ROAS</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 relative z-10">
                <button
                  onClick={() => handleToggleCampaign(campaign.id, campaign.status)}
                  className={`w-14 h-14 rounded-2xl border border-white/5 flex items-center justify-center transition-all shadow-xl group/btn ${
                    campaign.status === 'active' 
                      ? 'bg-amber-500/5 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/20' 
                      : 'bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/20'
                  }`}
                >
                  {campaign.status === 'active' ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button className="w-14 h-14 bg-white/5 text-[#4a4a4a] hover:text-white rounded-2xl border border-white/5 hover:border-white/10 flex items-center justify-center transition-all shadow-xl">
                  <Edit className="w-6 h-6" />
                </button>
                <button className="w-14 h-14 bg-rose-500/5 text-rose-400/50 hover:text-rose-400 rounded-2xl border border-white/5 hover:border-rose-500/20 flex items-center justify-center transition-all shadow-xl">
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

      <LaunchUnitModal 
        isOpen={isLaunchModalOpen}
        onClose={() => setIsLaunchModalOpen(false)}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ['ad-campaigns'] })}
      />
    </>
  )
}