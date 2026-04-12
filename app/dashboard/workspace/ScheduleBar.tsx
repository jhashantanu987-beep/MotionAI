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

export default function ScheduleBar() {
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
      <div className="relative bg-gradient-to-br from-[#111827] to-[#0f172a] mx-4 md:mx-6 mt-4 md:mt-6 rounded-2xl shadow-lg p-4 md:p-6 border border-[#1f2937]">
        <div className="text-center text-red-600">
          Error loading schedule. Please try again.
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-gradient-to-br from-[#111827] to-[#0f172a] mx-4 md:mx-6 mt-4 md:mt-6 rounded-2xl shadow-lg p-4 md:p-6 border border-[#1f2937]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h2 className="text-lg font-bold text-[#8b5cf6]">Today's Schedule</h2>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
          <span className="text-[#9ca3af]">Available</span>
          <div className="w-3 h-3 rounded-full bg-lime-400 ml-2 md:ml-4"></div>
          <span className="text-slate-600">Busy</span>
        </div>
      </div>

      <div className="mt-4 md:mt-6 relative">
        {/* Timeline bar */}
        <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-slate-950 to-lime-400 rounded-full relative">
            {/* Current time indicator */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-white rounded-full"></div>
          </div>
        </div>

        {/* Time slots and schedule items */}
        <div className="flex justify-between mt-4 overflow-x-auto pb-2">
          {isLoading ? (
            <div className="flex items-center justify-center w-full py-4">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
              <span className="ml-2 text-sm text-slate-600">Loading schedule...</span>
            </div>
          ) : (
            schedule.map((item) => (
              <div key={item.id} className="flex flex-col items-center min-w-[60px] md:min-w-[80px]">
                <div className="text-xs text-slate-500 mb-2">{item.time}</div>
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br ${getTypeColor(item.type)} border-2 border-white shadow-sm flex items-center justify-center cursor-pointer hover:scale-110 transition-transform`}>
                  <span className="text-xs font-semibold text-white">
                    {item.avatar}
                  </span>
                </div>
                <div className="mt-2 text-center max-w-16 md:max-w-20">
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