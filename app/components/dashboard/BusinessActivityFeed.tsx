'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Activity, DollarSign, Users, TrendingUp, RotateCw, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ActivityItem {
  event: string
  time: string
  type: 'revenue' | 'lead' | 'booking' | 'demand' | 'recovery' | 'optimization'
  value: string
  id: string
}

interface BusinessActivityFeedProps {
  data: ActivityItem[]
}

const typeConfig = {
  revenue: {
    icon: DollarSign,
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    glow: 'shadow-emerald-500/20'
  },
  lead: {
    icon: Users,
    bg: 'bg-cyan-500/20',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    glow: 'shadow-cyan-500/20'
  },
  booking: {
    icon: Activity,
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    glow: 'shadow-blue-500/20'
  },
  demand: {
    icon: TrendingUp,
    bg: 'bg-purple-500/20',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    glow: 'shadow-purple-500/20'
  },
  recovery: {
    icon: RotateCw,
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
    border: 'border-yellow-500/30',
    glow: 'shadow-yellow-500/20'
  },
  optimization: {
    icon: Zap,
    bg: 'bg-pink-500/20',
    text: 'text-pink-400',
    border: 'border-pink-500/30',
    glow: 'shadow-pink-500/20'
  }
}

const newActivityTemplates = [
  { event: 'New lead captured from Meta Ads campaign', type: 'lead' as const, value: '+1 lead' },
  { event: 'Consultation booking confirmed for Nova Clinic', type: 'booking' as const, value: '+1 booking' },
  { event: 'AI SDR responded to inbound lead inquiry', type: 'lead' as const, value: '2.1s response' },
  { event: 'Follow-up sequence triggered for cold leads', type: 'optimization' as const, value: '5 leads' },
  { event: 'Revenue milestone reached: $45k MRR', type: 'revenue' as const, value: '+$2,400' },
  { event: 'Ad performance optimization deployed', type: 'demand' as const, value: '+12% CTR' },
  { event: 'No-show recovery SMS sent successfully', type: 'recovery' as const, value: '+1 saved' },
  { event: 'AI insights updated conversion strategy', type: 'optimization' as const, value: '+8% gain' }
]

export default function BusinessActivityFeed({ data }: BusinessActivityFeedProps) {
  const [activities, setActivities] = useState<ActivityItem[]>(
    data.map((item, index) => ({ ...item, id: `initial-${index}` }))
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const randomTemplate = newActivityTemplates[Math.floor(Math.random() * newActivityTemplates.length)]
      const newActivity: ActivityItem = {
        ...randomTemplate,
        time: 'just now',
        id: `activity-${Date.now()}`
      }

      setActivities(prev => [newActivity, ...prev.slice(0, 4)])
    }, 7000) // Update every 7 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {activities.map((item, index) => {
          const config = typeConfig[item.type]
          const Icon = config.icon

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                layout: { duration: 0.3 }
              }}
              whileHover={{ scale: 1.02, x: 8 }}
              className={`flex items-center gap-4 p-4 rounded-xl border ${config.border} ${config.bg} backdrop-blur-sm hover:${config.glow} transition-all duration-300 cursor-pointer group`}
            >
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className={`p-2.5 rounded-lg ${config.bg} border ${config.border} group-hover:scale-110 transition-transform duration-200`}
              >
                <Icon className={`h-4 w-4 ${config.text}`} />
              </motion.div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white group-hover:text-gray-200 transition-colors">
                  {item.event}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className={`px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold ${config.text} backdrop-blur-sm`}
              >
                {item.value}
              </motion.div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
