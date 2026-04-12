'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface AnimatedStatCardProps {
  label: string
  value: number
  display: string
  change: string
  accent: 'cyan' | 'violet' | 'emerald' | 'indigo'
}

const accentMap: Record<AnimatedStatCardProps['accent'], string> = {
  cyan: 'from-cyan-400 to-blue-500',
  violet: 'from-violet-400 to-fuchsia-400',
  emerald: 'from-emerald-400 to-teal-400',
  indigo: 'from-indigo-400 to-cyan-400'
}

export default function AnimatedStatCard({ label, value, display, change, accent }: AnimatedStatCardProps) {
  const [count, setCount] = useState(0)
  const [currentValue, setCurrentValue] = useState(value)
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('up')

  useEffect(() => {
    const duration = 900
    const stepTime = 16
    const totalFrames = Math.round(duration / stepTime)
    let frame = 0
    const counter = window.setInterval(() => {
      frame += 1
      const progress = frame / totalFrames
      const nextValue = Number((value * progress).toFixed(2))
      setCount(nextValue)
      if (frame >= totalFrames) {
        setCount(value)
        window.clearInterval(counter)
      }
    }, stepTime)

    return () => window.clearInterval(counter)
  }, [value])

  useEffect(() => {
    const interval = setInterval(() => {
      const changePercent = (Math.random() - 0.3) * 0.1
      const newValue = Math.max(0, currentValue * (1 + changePercent))
      setCurrentValue(newValue)
      setTrend(changePercent > 0 ? 'up' : changePercent < 0 ? 'down' : 'stable')
    }, 15000)

    return () => clearInterval(interval)
  }, [currentValue])

  const formatted = display.includes('$') || display.includes('%')
    ? display.replace(/\d+/, count.toFixed(display.includes('%') ? 1 : 0))
    : count.toFixed(0)

  const isPositive = change.startsWith('+')

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass-card relative overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(15,23,42,0.12)]"
    >
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accentMap[accent]} opacity-80`} />
      <p className="text-sm uppercase tracking-[0.32em] text-slate-500">{label}</p>
      <div className="mt-4 flex items-end gap-3">
        <p className="text-3xl font-semibold text-slate-900 sm:text-4xl">{formatted}</p>
        <motion.span
          animate={trend === 'up' ? { y: [-2, 2, -2] } : trend === 'down' ? { y: [2, -2, 2] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs ${
            isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
          }`}
        >
          {isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {change}
        </motion.span>
      </div>
      <p className="mt-3 text-sm text-slate-500">Realtime updates from your AI pipeline.</p>
    </motion.div>
  )
}
