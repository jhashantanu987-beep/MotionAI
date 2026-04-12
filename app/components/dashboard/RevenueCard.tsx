'use client'

import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Users, Zap } from 'lucide-react'

interface RevenueCardProps {
  title: string
  value: string | number
  change: string
  subtext: string
  icon: React.ReactNode
}

export default function RevenueCard({ title, value, change, subtext, icon }: RevenueCardProps) {
  const isPositive = change.startsWith('+')

  return (
    <motion.div
      whileHover={{ translateY: -4 }}
      className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg hover:border-indigo-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="inline-flex rounded-lg bg-indigo-100 p-3 text-indigo-600 group-hover:bg-indigo-200">
          {icon}
        </div>
        <div className={`text-sm font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
          {change}
        </div>
      </div>

      <h3 className="text-sm font-medium text-slate-600">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{subtext}</p>
    </motion.div>
  )
}
