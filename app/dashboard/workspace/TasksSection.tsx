'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Mail, Video, Calendar, Clock, CheckCircle, Loader2 } from 'lucide-react'

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

const filterTabs = ['All', 'Hot', 'Due Today', 'Completed', 'Overdue']

export default function TasksSection() {
  const [activeFilter, setActiveFilter] = useState('All')

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch('/api/tasks')
      if (!response.ok) throw new Error('Failed to fetch tasks')
      return response.json() as Promise<Task[]>
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  const filteredTasks = activeFilter === 'All'
    ? tasks
    : tasks.filter(task => {
        if (activeFilter === 'Hot') return task.priority === 'high'
        if (activeFilter === 'Due Today') return task.date === 'Today'
        if (activeFilter === 'Completed') return task.status === 'completed'
        if (activeFilter === 'Overdue') return task.status === 'overdue'
        return true
      })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700'
      case 'upcoming': return 'bg-[#fef3c7] text-[#92400e]'
      case 'pending': return 'bg-orange-100 text-orange-700'
      case 'scheduled': return 'bg-purple-100 text-purple-700'
      case 'in-progress': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return Video
      case 'email': return Mail
      case 'document': return Calendar
      case 'presentation': return Video
      default: return Calendar
    }
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="text-center text-red-600">
          Error loading tasks. Please try again.
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-[#111827] to-[#0f172a] rounded-2xl shadow-lg p-3 md:p-4 border border-[#1f2937]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 md:mb-4">
      <h2 className="text-lg md:text-xl font-bold text-[#22c55e]">Your Day's Tasks</h2>

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

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center py-6 md:py-8">
            <Loader2 className="w-6 h-6 md:w-8 md:h-8 animate-spin text-slate-400" />
            <span className="ml-2 text-slate-600">Loading tasks...</span>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const TypeIcon = getTypeIcon(task.type)
            const isCompleted = task.status === 'completed'

            return (
              <div
                key={task.id}
                className={`rounded-2xl p-4 md:p-6 border transition-all duration-300 hover:shadow-md ${
                  task.isHighlighted
                    ? 'bg-lime-50 border-lime-200 shadow-lg'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-2xl flex items-center justify-center ${
                      task.isHighlighted ? 'bg-lime-400' : 'bg-slate-950'
                    }`}>
                      <TypeIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className={`font-semibold truncate ${isCompleted ? 'line-through text-slate-500' : 'text-slate-900'} text-sm md:text-base`}>
                        {task.title}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-600 line-clamp-2">{task.description}</p>
                    </div>
                  </div>

                  {isCompleted && (
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 ml-2" />
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{task.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{task.date}</span>
                    </div>
                  </div>

                  <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}