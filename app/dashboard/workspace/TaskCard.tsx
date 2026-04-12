'use client'

import { Mail, Video, Calendar, Clock, CheckCircle } from 'lucide-react'

interface Task {
  id: number
  title: string
  time: string
  date: string
  status: string
  priority: string
  type: string
  description: string
  isHighlighted: boolean
}

interface TaskCardProps {
  task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400'
      case 'upcoming': return 'bg-yellow-500/20 text-yellow-400'
      case 'pending': return 'bg-orange-500/20 text-orange-400'
      case 'scheduled': return 'bg-purple-500/20 text-purple-400'
      case 'in-progress': return 'bg-blue-500/20 text-blue-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return Video
      case 'email': return Mail
      case 'document': return Calendar
      case 'presentation': return Clock
      default: return CheckCircle
    }
  }

  const getTypeIconColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'text-red-500'
      case 'email': return 'text-green-500'
      case 'document': return 'text-purple-500'
      case 'presentation': return 'text-blue-500'
      default: return 'text-gray-500'
    }
  }

  const TypeIcon = getTypeIcon(task.type)
  const isCompleted = task.status === 'completed'

  return (
    <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-5 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-[#1a1f2e]`}>
            <TypeIcon className={`w-5 h-5 ${getTypeIconColor(task.type)}`} />
          </div>
          <div>
            <h3 className={`font-semibold ${isCompleted ? 'line-through text-[#64748b]' : 'text-white'}`}>
              {task.title}
            </h3>
            <p className="text-sm text-[#94a3b8]">{task.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isCompleted && (
            <CheckCircle className="w-5 h-5 text-green-500" />
          )}
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
            {task.status}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-[#94a3b8]">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-[#64748b]" />
            <span>{task.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-[#64748b]" />
            <span>{task.date}</span>
          </div>
        </div>
      </div>
    </div>
  )
}