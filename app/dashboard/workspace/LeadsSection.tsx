'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Mail, Phone, MessageCircle, Loader2 } from 'lucide-react'

interface Lead {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  tags: string[]
  email: string
  phone: string
}

const filterTabs = ['All', 'Hot Client', 'Warm Lead', 'Cold Lead']

export default function LeadsSection() {
  const [activeFilter, setActiveFilter] = useState('All')

  const { data: leads = [], isLoading, error } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const response = await fetch('/api/leads')
      if (!response.ok) throw new Error('Failed to fetch leads')
      return response.json() as Promise<Lead[]>
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  const filteredLeads = activeFilter === 'All'
    ? leads
    : leads.filter(lead => {
        if (activeFilter === 'Hot Client') return lead.tags.includes('hot')
        if (activeFilter === 'Warm Lead') return lead.tags.includes('warm')
        if (activeFilter === 'Cold Lead') return lead.tags.includes('cold')
        return true
      })

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="text-center text-red-600">
          Error loading leads. Please try again.
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-[#111827] to-[#0f172a] rounded-2xl shadow-lg p-3 md:p-4 border border-[#1f2937]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 md:mb-4">
      <h2 className="text-lg md:text-xl font-bold text-[#3b82f6]">New Leads</h2>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 md:px-4 py-2 rounded-2xl text-sm font-medium transition-colors whitespace-nowrap ${
                activeFilter === tab
                  ? 'bg-[#a3e635] text-[#0f172a]'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Cards */}
      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4">
        {isLoading ? (
          <div className="flex items-center justify-center w-full py-8">
            <Loader2 className="w-6 h-6 md:w-8 md:h-8 animate-spin text-slate-400" />
            <span className="ml-2 text-slate-600">Loading leads...</span>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div key={lead.id} className="bg-slate-50 rounded-2xl p-3 md:p-4 min-w-[260px] md:min-w-[280px] border border-slate-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                    {lead.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900 truncate text-sm md:text-base">{lead.name}</h3>
                    <p className="text-xs md:text-sm text-slate-600 truncate">{lead.role}</p>
                    <p className="text-xs md:text-sm text-slate-500 truncate">{lead.company}</p>
                  </div>
                </div>

                {/* Action Icons */}
                <div className="flex gap-1 md:gap-2 ml-2">
                  <button className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors">
                    <Mail className="w-3 h-3 md:w-4 md:h-4 text-slate-600" />
                  </button>
                  <button className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors">
                    <Phone className="w-3 h-3 md:w-4 md:h-4 text-slate-600" />
                  </button>
                  <button className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors">
                    <MessageCircle className="w-3 h-3 md:w-4 md:h-4 text-slate-600" />
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-1 md:gap-2 mb-3 md:mb-4 overflow-x-auto">
                {lead.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      tag === 'hot' ? 'bg-red-100 text-red-700' :
                      tag === 'warm' ? 'bg-orange-100 text-orange-700' :
                      tag === 'cold' ? 'bg-[#dbeafe] text-[#0369a1]' :
                      'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-1 md:space-y-2 text-xs md:text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                  <span className="truncate">{lead.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                  <span>{lead.phone}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}