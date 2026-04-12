'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

interface ScheduleItem {
  id: number
  time: string
  title: string
  type: string
  avatar: string
}

export default function TimelineBar() {
  const { data: schedule = [], isLoading, error } = useQuery({
    queryKey: ['schedule'],
    queryFn: async () => {
      const response = await fetch('/api/schedule')
      if (!response.ok) throw new Error('Failed to fetch schedule')
      return response.json() as Promise<ScheduleItem[]>
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'from-blue-400 to-blue-600'
      case 'email': return 'from-green-400 to-green-600'
      case 'document': return 'from-purple-400 to-purple-600'
      case 'presentation': return 'from-orange-400 to-orange-600'
      default: return 'from-slate-400 to-slate-600'
    }
  }

  if (error) {
    return (
      <div className="bg-white mx-6 mt-6 rounded-2xl shadow-md p-6">
        <div className="text-center text-red-600">
          Error loading timeline. Please try again.
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white mx-6 mt-6 rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Today's Schedule</h2>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-950"></div>
          <span className="text-sm text-slate-600">Available</span>
          <div className="w-3 h-3 rounded-full bg-lime-400 ml-4"></div>
          <span className="text-sm text-slate-600">Busy</span>
        </div>
      </div>

      <div className="mt-6 relative">
        {/* Timeline bar */}
        <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-slate-950 to-lime-400 rounded-full relative">
            {/* Current time indicator */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-white rounded-full"></div>
          </div>
        </div>

        {/* Time slots and schedule items */}
        <div className="flex justify-between mt-4">
          {isLoading ? (
            <div className="flex items-center justify-center w-full py-4">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
              <span className="ml-2 text-sm text-slate-600">Loading schedule...</span>
            </div>
          ) : (
            schedule.map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                <div className="text-xs text-slate-500 mb-2">{item.time}</div>
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getTypeColor(item.type)} border-2 border-white shadow-sm flex items-center justify-center cursor-pointer hover:scale-110 transition-transform`}>
                  <span className="text-xs font-semibold text-white">
                    {item.avatar}
                  </span>
                </div>
                <div className="mt-2 text-center max-w-20">
                  <div className="text-xs font-medium text-slate-900 truncate" title={item.title}>
                    {item.title}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}