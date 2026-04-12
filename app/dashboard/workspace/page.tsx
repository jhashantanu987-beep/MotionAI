'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText } from 'lucide-react'
import ScheduleBar from './ScheduleBar'
import Header from './Header'
import LeadsSection from './LeadsSection'
import TasksSection from './TasksSection'
import { useQuery } from '@tanstack/react-query'

interface Stats {
  totalLeads: number
  activeTasks: number
  revenue: number
  conversionRate: number
  growth: number
  meetingsToday: number
}

export default function WorkspaceDashboard() {
  const [activeTab, setActiveTab] = useState('workspace')
  const router = useRouter()

  const { data: stats = { totalLeads: 24, revenue: 45000, growth: 23, conversionRate: 89 } } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await fetch('/api/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')
      return response.json() as Promise<Stats>
    },
    refetchInterval: 30000,
  })

  const handleTabChange = (tab: string) => {
    if (tab === 'crm') {
      router.push('/dashboard?view=crm')
    } else if (tab === 'revenue') {
      router.push('/dashboard/revenue-analytics')
    } else if (tab === 'ads') {
      router.push('/dashboard/ai-ad-performance-engine')
    } else if (tab === 'ugc') {
      router.push('/dashboard/ai-ugc-creative-engine')
    } else {
      setActiveTab(tab)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1a2e4a] to-[#0f172a] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Schedule Bar */}
        <ScheduleBar />

        {/* Content Area */}
        <div className="flex-1 p-2 md:p-3 space-y-2 md:space-y-3">
          {/* Header */}
          <Header onToggleFloatingPanel={() => {}} />

          {/* Leads Section */}
          <LeadsSection />

          {/* Tasks Section */}
          <TasksSection />

          {/* Info Panel - Quick Stats & Recent Documents - Unified */}
          <div className="bg-[#111827] rounded-2xl border border-[#1f2937] p-3 md:p-4 space-y-4">
            
            {/* Quick Stats Section */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#e5e7eb]">Quick Stats</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Active Leads */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#9ca3af]">Active Leads</span>
                    <span className="text-base font-bold text-[#e5e7eb]">{stats.totalLeads}</span>
                  </div>
                  <svg width="100%" height="20" viewBox="0 0 100 20" className="w-full">
                    <rect x="0" y="2" width="90" height="16" rx="8" fill="#e5e7eb" opacity="0.1" />
                    <rect x="0" y="2" width={Math.min(stats.totalLeads * 4, 90)} height="16" rx="8" fill="#3b82f6" />
                  </svg>
                </div>

                {/* Revenue */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#9ca3af]">Revenue</span>
                    <span className="text-base font-bold text-[#e5e7eb]">${(stats.revenue / 1000).toFixed(0)}K</span>
                  </div>
                  <svg width="100%" height="20" viewBox="0 0 100 20" className="w-full">
                    <rect x="0" y="2" width="90" height="16" rx="8" fill="#e5e7eb" opacity="0.1" />
                    <rect x="0" y="2" width={Math.min((stats.revenue / 50000) * 90, 90)} height="16" rx="8" fill="#22c55e" />
                  </svg>
                </div>

                {/* Growth */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#9ca3af]">Growth</span>
                    <span className="text-base font-bold text-[#e5e7eb]">+{stats.growth}%</span>
                  </div>
                  <svg width="100%" height="20" viewBox="0 0 100 20" className="w-full">
                    <rect x="0" y="2" width="90" height="16" rx="8" fill="#e5e7eb" opacity="0.1" />
                    <rect x="0" y="2" width={Math.min((stats.growth / 100) * 90, 90)} height="16" rx="8" fill="#8b5cf6" />
                  </svg>
                </div>

                {/* Conversion */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#9ca3af]">Conversion</span>
                    <span className="text-base font-bold text-[#e5e7eb]">{stats.conversionRate}%</span>
                  </div>
                  <svg width="100%" height="20" viewBox="0 0 100 20" className="w-full">
                    <rect x="0" y="2" width="90" height="16" rx="8" fill="#e5e7eb" opacity="0.1" />
                    <rect x="0" y="2" width={Math.min((stats.conversionRate / 100) * 90, 90)} height="16" rx="8" fill="#ef4444" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-[#1f2937] via-[#3b82f6]/30 to-[#1f2937]"></div>

            {/* Recent Documents Section */}
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-[#e5e7eb] flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Recent Documents
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="flex items-center gap-3 p-3 bg-[#0f172a] rounded-lg border border-[#1f2937] hover:border-[#3b82f6] hover:shadow-md hover:shadow-[#3b82f6]/20 transition-all">
                  <FileText className="w-4 h-4 text-[#3b82f6] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#e5e7eb] truncate">Proposal.pdf</p>
                    <p className="text-xs text-[#9ca3af]">2.4 MB • 5 min ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#0f172a] rounded-lg border border-[#1f2937] hover:border-[#22c55e] hover:shadow-md hover:shadow-[#22c55e]/20 transition-all">
                  <FileText className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#e5e7eb] truncate">Contract.docx</p>
                    <p className="text-xs text-[#9ca3af]">1.8 MB • 1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#0f172a] rounded-lg border border-[#1f2937] hover:border-[#8b5cf6] hover:shadow-md hover:shadow-[#8b5cf6]/20 transition-all">
                  <FileText className="w-4 h-4 text-[#8b5cf6] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#e5e7eb] truncate">Report.xlsx</p>
                    <p className="text-xs text-[#9ca3af]">3.2 MB • 2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}