'use client'

import { motion } from 'framer-motion'

interface PerformanceCardProps {
  title: string
  value: string
  change: string
  benchmark: string
  accent: string
}

const accentColors: Record<string, string> = {
  emerald: 'bg-emerald-100 text-emerald-600',
  cyan: 'bg-cyan-100 text-cyan-600',
  indigo: 'bg-indigo-100 text-indigo-600',
  violet: 'bg-violet-100 text-violet-600'
}

export default function PerformanceCard({ title, value, change, benchmark, accent }: PerformanceCardProps) {
  const isPositive = change.startsWith('+')

  return (
    <motion.div
      whileHover={{ translateY: -4 }}
      className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg hover:border-slate-300"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-600">{title}</h3>
        <div className={`text-sm font-bold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
          {change}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-3xl font-bold text-slate-900">{value}</p>
        <p className="text-xs text-slate-500">{benchmark}</p>
      </div>

      {/* Progress indicator */}
      <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '85%' }}
          transition={{ duration: 0.8 }}
          className={`h-full ${accentColors[accent] || accentColors.indigo}`}
        />
      </div>
    </motion.div>
  )
}
