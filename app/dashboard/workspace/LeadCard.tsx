'use client'

import { Mail, Phone, MessageCircle } from 'lucide-react'

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

interface LeadCardProps {
  lead: Lead
}

export default function LeadCard({ lead }: LeadCardProps) {
  return (
    <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-5 shadow-lg min-w-[280px]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
            {lead.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-white">{lead.name}</h3>
            <p className="text-sm text-[#94a3b8]">{lead.role}</p>
            <p className="text-sm text-[#64748b]">{lead.company}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          lead.tags.includes('hot') ? 'bg-red-500/20 text-red-400' :
          lead.tags.includes('warm') ? 'bg-orange-500/20 text-orange-400' :
          'bg-green-500/20 text-green-400'
        }`}>
          {lead.tags.includes('hot') ? 'Hot' : lead.tags.includes('warm') ? 'Warm' : 'Active'}
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex gap-2 mb-4">
        <button className="w-8 h-8 rounded-full bg-[#1a1f2e] hover:bg-[#2a2f3e] flex items-center justify-center transition-colors">
          <Mail className="w-4 h-4 text-[#94a3b8]" />
        </button>
        <button className="w-8 h-8 rounded-full bg-[#1a1f2e] hover:bg-[#2a2f3e] flex items-center justify-center transition-colors">
          <Phone className="w-4 h-4 text-[#94a3b8]" />
        </button>
        <button className="w-8 h-8 rounded-full bg-[#1a1f2e] hover:bg-[#2a2f3e] flex items-center justify-center transition-colors">
          <MessageCircle className="w-4 h-4 text-[#94a3b8]" />
        </button>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-4">
        {lead.tags.map((tag) => (
          <span
            key={tag}
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              tag === 'hot' ? 'bg-red-500/20 text-red-400' :
              tag === 'warm' ? 'bg-orange-500/20 text-orange-400' :
              tag === 'cold' ? 'bg-blue-500/20 text-blue-400' :
              'bg-gray-500/20 text-gray-400'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Contact Info */}
      <div className="space-y-2 text-sm text-[#94a3b8]">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#64748b]" />
          <span className="truncate">{lead.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-[#64748b]" />
          <span>{lead.phone}</span>
        </div>
      </div>
    </div>
  )
}