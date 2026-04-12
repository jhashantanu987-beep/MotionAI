'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { TrendingUp, DollarSign, BarChart3 } from 'lucide-react'

export default function RevenueAnalyticsDashboard() {
  const [revenueValue, setRevenueValue] = useState(0)
  const [dealValue, setDealValue] = useState(0)
  const [winValue, setWinValue] = useState(0)

  useEffect(() => {
    let revenue = 0
    let deal = 0
    let win = 0
    const interval = setInterval(() => {
      revenue = Math.min(87450, revenue + 2750)
      deal = Math.min(12340, deal + 460)
      win = Math.min(62, win + 2)
      setRevenueValue(revenue)
      setDealValue(deal)
      setWinValue(win)
      if (revenue >= 87450 && deal >= 12340 && win >= 62) {
        clearInterval(interval)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [])

  const kpis = [
    { label: 'Revenue This Week', value: `$${revenueValue.toLocaleString()}`, change: '+18.2%', color: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
    { label: 'Avg Deal Value', value: `$${dealValue.toLocaleString()}`, change: '+4.1%', color: 'text-cyan-400', bgColor: 'bg-cyan-500/10' },
    { label: 'Win Rate', value: `${winValue}%`, change: '+7.8%', color: 'text-amber-400', bgColor: 'bg-amber-500/10' }
  ]

  const topPerformers = [
    { name: 'Sarah Chen', revenue: '$28,450', calls: 24, conversionRate: '72%' },
    { name: 'Michael Torres', revenue: '$24,230', calls: 19, conversionRate: '68%' },
    { name: 'Emma Richardson', revenue: '$19,340', calls: 16, conversionRate: '65%' },
    { name: 'David Kim', revenue: '$15,430', calls: 12, conversionRate: '58%' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-8"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="rounded-xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-6 hover:border-cyan-400/30 transition-all shadow-lg shadow-slate-900/20"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${kpi.bgColor} p-3 rounded-lg`}>
                <DollarSign className={`h-6 w-6 ${kpi.color}`} />
              </div>
              <span className="text-emerald-400 text-xs font-semibold">{kpi.change}</span>
            </div>
            <p className="text-slate-400 text-sm mb-2">{kpi.label}</p>
            <p className="text-3xl font-bold text-white">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <motion.div
        variants={itemVariants}
        className="rounded-xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-6 shadow-lg shadow-slate-900/20"
      >
        <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-cyan-400" />
          Revenue Trend
        </h3>
        <div className="flex items-center justify-center h-48 bg-slate-800/30 rounded-lg border border-slate-700/30">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Weekly revenue visualization</p>
          </div>
        </div>
      </motion.div>

      {/* Top Performers */}
      <motion.div
        variants={itemVariants}
        className="rounded-xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-6 shadow-lg shadow-slate-900/20"
      >
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-400" />
          Top Revenue Generators
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/30">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Rep Name</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">Revenue</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">Calls</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {topPerformers.map((performer, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-slate-700/20 hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-3 px-4 text-white font-medium">{performer.name}</td>
                  <td className="text-right py-3 px-4 text-emerald-400 font-semibold">{performer.revenue}</td>
                  <td className="text-right py-3 px-4 text-slate-300">{performer.calls}</td>
                  <td className="text-right py-3 px-4 text-cyan-400 font-medium">{performer.conversionRate}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
