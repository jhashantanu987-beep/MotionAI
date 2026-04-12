'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface AIInsightProps {
  summary: string
  subtext: string
  change: string
}

const insights = [
  {
    summary: '23 high-intent leads detected in the last hour',
    subtext: 'AI is prioritizing these prospects with real-time urgency signals.',
    change: '+14% stronger pipeline confidence'
  },
  {
    summary: 'Conversion probability increased by 18% after last interaction',
    subtext: 'Automated follow-ups are driving engagement across all channels.',
    change: '+8% response rate improvement'
  },
  {
    summary: 'Revenue forecast updated: $147k projected this month',
    subtext: 'Based on current pipeline velocity and conversion trends.',
    change: '+12% above target trajectory'
  },
  {
    summary: 'AI optimized 47 campaign variations in real-time',
    subtext: 'Performance ads are now targeting higher-value segments.',
    change: '+22% ad spend efficiency'
  }
]

export default function AIInsight({ summary, subtext, change }: AIInsightProps) {
  const [currentInsight, setCurrentInsight] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const insight = insights[currentInsight]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="glass-panel relative overflow-hidden p-6"
    >
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-cyan-400 via-violet-500 to-indigo-400 opacity-40" />
      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-100 text-cyan-700 ring-1 ring-cyan-200">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_8px_rgba(52,211,153,0.12)]"
            />
            <span>AI intelligence layer</span>
            <span className="text-xs text-cyan-700">LIVE</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentInsight}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl font-semibold leading-tight text-slate-900 sm:text-2xl">{insight.summary}</p>
              <p className="text-sm leading-6 text-slate-600">{insight.subtext}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="mt-5 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600 shadow-sm">
        <span className="text-cyan-700">Live signal:</span> {insight.change}
      </div>
    </motion.div>
  )
}
