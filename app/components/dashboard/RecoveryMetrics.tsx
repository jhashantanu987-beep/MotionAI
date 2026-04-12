'use client'

import { motion } from 'framer-motion'
import { TrendingUp, PhoneCall, Target, Clock } from 'lucide-react'

export default function RecoveryMetrics() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const metrics = [
    {
      label: 'Calls Recovered',
      value: '2,847',
      subtext: '+12% this week',
      icon: PhoneCall,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10'
    },
    {
      label: 'Opportunity Rate',
      value: '34.2%',
      subtext: '+5.1% vs last quarter',
      icon: Target,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10'
    },
    {
      label: 'Avg Recovery Time',
      value: '2.3 min',
      subtext: '-18% faster',
      icon: Clock,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10'
    },
    {
      label: 'Success Rate',
      value: '68.9%',
      subtext: 'Conversation to booking',
      icon: TrendingUp,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10'
    }
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {metrics.map((metric, idx) => {
        const Icon = metric.icon
        return (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="rounded-xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-6 hover:border-cyan-400/30 transition-all shadow-lg shadow-slate-900/20"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${metric.bgColor} p-3 rounded-lg`}>
                <Icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <span className="text-emerald-400 text-xs font-semibold">{metric.subtext}</span>
            </div>
            <p className="text-slate-400 text-sm mb-2">{metric.label}</p>
            <p className="text-3xl font-bold text-white">{metric.value}</p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
