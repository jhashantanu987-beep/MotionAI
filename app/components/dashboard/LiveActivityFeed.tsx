'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ActivityItem {
  event: string
  time: string
  type: 'lead' | 'booking' | 'conversion' | 'system'
  timestamp?: number
}

interface LiveActivityFeedProps {
  items: ActivityItem[]
}

const activityTypes = [
  { event: 'New high-intent lead captured from premium chatbot', type: 'lead' as const },
  { event: 'AI optimized campaign performance by 15%', type: 'system' as const },
  { event: 'Booking confirmed with Enterprise Corp', type: 'booking' as const },
  { event: 'Conversion funnel improved by automated follow-ups', type: 'conversion' as const },
  { event: 'Pipeline value increased to $189k', type: 'system' as const },
  { event: 'Lead scoring updated for 47 prospects', type: 'lead' as const },
  { event: 'Revenue projection updated: +$23k this week', type: 'conversion' as const }
]

const updateTimes = (items: ActivityItem[]) => {
  return items.map((item, index) => {
    const now = Date.now()
    const timeDiff = index * 45000
    const timestamp = now - timeDiff
    return { ...item, timestamp }
  })
}

const formatTime = (timestamp: number) => {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)

  if (minutes < 1) return 'Just now'
  if (minutes === 1) return '1 min ago'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours === 1) return '1 hour ago'
  return `${hours} hours ago`
}

export default function LiveActivityFeed({ items }: LiveActivityFeedProps) {
  const [feed, setFeed] = useState<ActivityItem[]>(updateTimes(items))
  const [timeUpdate, setTimeUpdate] = useState(0)

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTimeUpdate((prev) => prev + 1)
    }, 30000)

    return () => clearInterval(timeInterval)
  }, [])

  useEffect(() => {
    const activityInterval = setInterval(() => {
      const randomActivity = activityTypes[Math.floor(Math.random() * activityTypes.length)]
      setFeed((current) => {
        const newItem = {
          ...randomActivity,
          time: 'Just now',
          timestamp: Date.now()
        }
        const updated = [newItem, ...current.slice(0, 4)]
        return updateTimes(updated)
      })
    }, 12000)

    return () => clearInterval(activityInterval)
  }, [])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lead':
        return 'border-l-cyan-400'
      case 'booking':
        return 'border-l-emerald-400'
      case 'conversion':
        return 'border-l-violet-400'
      case 'system':
        return 'border-l-amber-400'
      default:
        return 'border-l-slate-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="glass-panel p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Live activity</p>
          <h3 className="text-2xl font-semibold text-slate-900">Real-time signal stream</h3>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.2)]"
          />
          Live
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {feed.map((item, index) => (
          <motion.div
            key={`${item.event}-${item.timestamp}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`rounded-3xl border border-slate-200 bg-white p-4 transition hover:shadow-lg ${getTypeColor(item.type)} border-l-4`}
          >
            <p className="text-sm text-slate-900">{item.event}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.35em] text-slate-500">
              {formatTime(item.timestamp || Date.now())}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
