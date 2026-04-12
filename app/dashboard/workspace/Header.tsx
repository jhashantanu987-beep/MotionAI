'use client'

import { useQuery } from '@tanstack/react-query'
import { Plus, Loader2 } from 'lucide-react'

interface HeaderProps {
  onToggleFloatingPanel?: () => void
}

interface Stats {
  totalLeads: number
  activeTasks: number
  revenue: number
  conversionRate: number
  growth: number
  meetingsToday: number
}

export default function Header({ onToggleFloatingPanel }: HeaderProps) {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await fetch('/api/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')
      return response.json() as Promise<Stats>
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  return (
    <div className="relative bg-gradient-to-br from-[#111827] to-[#0f172a] rounded-2xl shadow-lg p-3 md:p-4 border border-[#1f2937]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#e5e7eb]">WORKSPACE</h1>
          <p className="text-slate-600 mt-1 text-sm md:text-base">Manage your deals, leads, and daily tasks</p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
          {/* Stats */}
          <div className="flex items-center gap-4 md:gap-6 overflow-x-auto">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                <span className="text-sm text-slate-500">Loading stats...</span>
              </div>
            ) : error ? (
              <div className="text-sm text-red-600">Error loading stats</div>
            ) : stats ? (
              <>
                <div className="text-center min-w-[60px]">
                  <div className="text-xl md:text-2xl font-bold text-slate-900">{stats.totalLeads}</div>
                  <div className="text-xs md:text-sm text-slate-500">Leads</div>
                </div>
                <div className="text-center min-w-[60px]">
                  <div className="text-xl md:text-2xl font-bold text-[#a3e635]">{stats.activeTasks}</div>
                  <div className="text-xs md:text-sm text-slate-500">Tasks</div>
                </div>
                <div className="text-center min-w-[80px]">
                  <div className="text-lg md:text-2xl font-bold text-green-600">${stats.revenue.toLocaleString()}</div>
                  <div className="text-xs md:text-sm text-slate-500">Revenue</div>
                </div>
                <div className="text-center min-w-[70px]">
                  <div className="text-lg md:text-2xl font-bold text-purple-600">{stats.conversionRate}%</div>
                  <div className="text-xs md:text-sm text-slate-500">Conversion</div>
                </div>
              </>
            ) : null}
          </div>

          {/* New Task Button */}
          <button className="bg-[#a3e635] text-[#0f172a] px-4 md:px-6 py-2 md:py-3 rounded-2xl font-semibold hover:bg-[#d9f99d] transition-colors flex items-center gap-2 text-sm md:text-base whitespace-nowrap">
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
            New Task
          </button>
        </div>
      </div>
    </div>
  )
}