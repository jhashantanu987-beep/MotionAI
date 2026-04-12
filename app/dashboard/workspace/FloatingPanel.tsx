'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

import { useQuery } from '@tanstack/react-query'
import { FileText, Target, TrendingUp, Users, DollarSign, Loader2 } from 'lucide-react'

interface Stats {
  totalLeads: number
  activeTasks: number
  revenue: number
  conversionRate: number
  growth: number
  meetingsToday: number
}

interface FloatingPanelProps {
  isOpen: boolean
  onToggle: (open: boolean) => void
}

export default function FloatingPanel({ isOpen, onToggle }: FloatingPanelProps) {
  const panelClasses = `fixed right-4 md:right-6 top-1/2 transform -translate-y-1/2 w-72 md:w-80 bg-gradient-to-br from-[#111827] to-[#0f172a] rounded-2xl shadow-lg border border-[#1f2937] p-3 md:p-4 space-y-3 md:space-y-4 max-h-[80vh] overflow-y-auto transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`

  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await fetch('/api/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')
      return response.json() as Promise<Stats>
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  if (!isOpen) {
    return (
      <button
        onClick={() => onToggle(true)}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#8b5cf6] hover:bg-[#7c3aed] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
      >
        <Target className="w-5 h-5 text-white" />
      </button>
    )
  }

  return (
    <div className={panelClasses}>
      {/* Close Button */}
      <button
        onClick={() => onToggle(false)}
        className="absolute top-3 right-3 p-1 hover:bg-[#1e293b] rounded-full transition-colors"
      >
        <X className="w-4 h-4 text-[#9ca3af] hover:text-white" />
      </button>

      {/* TODAY'S SCHEDULE - AT TOP */}
      <div className="space-y-3 md:space-y-4">
        <h4 className="text-xs md:text-sm font-medium text-[#e5e7eb] flex items-center gap-2">
          <Target className="w-3 h-3 md:w-4 md:h-4" />
          Today's Schedule
        </h4>
        
        {/* Status Indicators */}
        <div className="flex gap-3 md:gap-4 text-xs">
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
            <span className="text-[#9ca3af]">Available</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
            <span className="text-[#9ca3af]">Busy</span>
          </div>
        </div>

        {/* Schedule Items */}
        <div className="space-y-2 md:space-y-2.5">
          {[
            { time: '9:00 AM', initials: 'TS', event: 'Team Standup', busy: true },
            { time: '10:00 AM', initials: 'CO', event: 'Client Onboarding', busy: true },
            { time: '11:00 AM', initials: 'CR', event: 'Contract Review', busy: true },
            { time: '1:00 PM', initials: 'PD', event: 'Proposal Draft', busy: true },
            { time: '2:00 PM', initials: 'QR', event: 'Quarterly Review', busy: true },
            { time: '3:00 PM', initials: 'PD', event: 'Product Demo', busy: true },
            { time: '4:30 PM', initials: 'EF', event: 'Email Follow-up', busy: false },
            { time: '5:00 PM', initials: 'ER', event: 'End of Day Review', busy: false },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 md:gap-3 p-2 md:p-2.5 bg-[#111827] rounded-xl border border-[#1f2937] hover:border-[#3b82f6] transition-all duration-300">
              {/* Time */}
              <span className="text-xs text-[#9ca3af] min-w-fit">{item.time}</span>
              
              {/* Avatar with initials */}
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
                item.busy ? 'bg-red-500/80' : 'bg-green-500/80'
              }`}>
                {item.initials}
              </div>
              
              {/* Event name */}
              <span className="text-xs md:text-sm text-[#e5e7eb] truncate flex-1">{item.event}</span>
              
              {/* Status dot */}
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.busy ? 'bg-red-500' : 'bg-green-500'}`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats - Capsule Bars */}
      <div className="space-y-3 md:space-y-4">
        <h3 className="font-semibold text-[#e5e7eb] text-base md:text-lg">Quick Stats</h3>

        {isLoading ? (
          <div className="flex items-center justify-center py-3 md:py-4">
            <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin text-[#8b5cf6]" />
            <span className="ml-2 text-xs md:text-sm text-[#9ca3af]">Loading stats...</span>
          </div>
        ) : error ? (
          <div className="text-center text-[#ef4444] text-xs md:text-sm">
            Error loading stats
          </div>
        ) : stats ? (
          <div className="space-y-3 md:space-y-4">
            {/* Active Leads */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm text-[#9ca3af]">Active Leads</span>
                <span className="text-sm md:text-base font-bold text-[#e5e7eb]">{stats.totalLeads}</span>
              </div>
              <svg width="100%" height="20" viewBox="0 0 100 20" className="w-full">
                <rect x="0" y="2" width="90" height="16" rx="8" fill="#e5e7eb" opacity="0.1" />
                <rect x="0" y="2" width={Math.min(stats.totalLeads * 4, 90)} height="16" rx="8" fill="#3b82f6" />
              </svg>
            </div>

            {/* Revenue */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm text-[#9ca3af]">Revenue</span>
                <span className="text-sm md:text-base font-bold text-[#e5e7eb]">${(stats.revenue / 1000).toFixed(0)}K</span>
              </div>
              <svg width="100%" height="20" viewBox="0 0 100 20" className="w-full">
                <rect x="0" y="2" width="90" height="16" rx="8" fill="#e5e7eb" opacity="0.1" />
                <rect x="0" y="2" width={Math.min((stats.revenue / 50000) * 90, 90)} height="16" rx="8" fill="#22c55e" />
              </svg>
            </div>

            {/* Growth */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm text-[#9ca3af]">Growth</span>
                <span className="text-sm md:text-base font-bold text-[#e5e7eb]">+{stats.growth}%</span>
              </div>
              <svg width="100%" height="20" viewBox="0 0 100 20" className="w-full">
                <rect x="0" y="2" width="90" height="16" rx="8" fill="#e5e7eb" opacity="0.1" />
                <rect x="0" y="2" width={Math.min((stats.growth / 100) * 90, 90)} height="16" rx="8" fill="#8b5cf6" />
              </svg>
            </div>

            {/* Conversion */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm text-[#9ca3af]">Conversion</span>
                <span className="text-sm md:text-base font-bold text-[#e5e7eb]">{stats.conversionRate}%</span>
              </div>
              <svg width="100%" height="20" viewBox="0 0 100 20" className="w-full">
                <rect x="0" y="2" width="90" height="16" rx="8" fill="#e5e7eb" opacity="0.1" />
                <rect x="0" y="2" width={Math.min((stats.conversionRate / 100) * 90, 90)} height="16" rx="8" fill="#ef4444" />
              </svg>
            </div>
          </div>
        ) : null}
      </div>

      {/* Recent Documents */}
      <div className="space-y-3 md:space-y-4">
        <h4 className="text-xs md:text-sm font-medium text-[#e5e7eb] flex items-center gap-2">
          <FileText className="w-3 h-3 md:w-4 md:h-4" />
          Recent Documents
        </h4>
        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-[#111827] rounded-2xl border border-[#1f2937] hover:border-[#3b82f6] hover:shadow-md hover:shadow-[#3b82f6]/20 transition-all duration-300 cursor-pointer transform hover:scale-102">
            <FileText className="w-4 h-4 md:w-5 md:h-5 text-[#3b82f6]" />
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-[#e5e7eb] truncate">Proposal.pdf</p>
              <p className="text-xs text-[#9ca3af]">2.4 MB • 5 min ago</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-[#111827] rounded-2xl border border-[#1f2937] hover:border-[#22c55e] hover:shadow-md hover:shadow-[#22c55e]/20 transition-all duration-300 cursor-pointer transform hover:scale-102">
            <FileText className="w-4 h-4 md:w-5 md:h-5 text-[#22c55e]" />
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-[#e5e7eb] truncate">Contract.docx</p>
              <p className="text-xs text-[#9ca3af]">1.8 MB • 1 hour ago</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-[#111827] rounded-2xl border border-[#1f2937] hover:border-[#8b5cf6] hover:shadow-md hover:shadow-[#8b5cf6]/20 transition-all duration-300 cursor-pointer transform hover:scale-102">
            <FileText className="w-4 h-4 md:w-5 md:h-5 text-[#8b5cf6]" />
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-[#e5e7eb] truncate">Report.xlsx</p>
              <p className="text-xs text-[#9ca3af]">3.2 MB • 2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}