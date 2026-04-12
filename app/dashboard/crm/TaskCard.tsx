'use client'

import { Check, Calendar, MoreVertical } from 'lucide-react'

interface TaskCardProps {
  title: string
  avatar: string
  priority: 'low' | 'medium' | 'high' | 'critical'
}

const priorityColors = {
  low: 'bg-gray-500/20 text-gray-400',
  medium: 'bg-blue-500/20 text-blue-400',
  high: 'bg-orange-500/20 text-orange-400',
  critical: 'bg-red-500/20 text-red-400',
}

const priorityBgRing = {
  low: 'ring-gray-500/20',
  medium: 'ring-blue-500/20',
  high: 'ring-orange-500/20',
  critical: 'ring-red-500/20',
}

export default function TaskCard({ title, avatar, priority }: TaskCardProps) {
  return (
    <div className={`bg-[#111827] border border-[#1f2937] rounded-2xl p-5 shadow-lg ring-1 ${priorityBgRing[priority]}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
          {avatar.substring(0, 1)}
        </div>

        {/* Status Badge */}
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          priority === 'critical' ? 'bg-red-500/20 text-red-400' :
          priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
          priority === 'medium' ? 'bg-blue-500/20 text-blue-400' :
          'bg-green-500/20 text-green-400'
        }`}>
          {priority === 'critical' ? 'Urgent' : priority === 'high' ? 'High' : priority === 'medium' ? 'Medium' : 'Low'}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm font-medium text-white mb-4 line-clamp-2">
        {title}
      </h3>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Priority Badge */}
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${priorityColors[priority]}`}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>

        {/* Icons */}
        <div className="flex gap-2">
          <button className="p-2 hover:bg-[#1a1f2e] rounded-lg transition text-[#94a3b8] hover:text-green-500">
            <Check className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-[#1a1f2e] rounded-lg transition text-[#94a3b8] hover:text-blue-500">
            <Calendar className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
