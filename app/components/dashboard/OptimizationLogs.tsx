'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Zap, CheckCircle2, AlertCircle, Clock } from 'lucide-react'

export default function OptimizationLogs() {
  const [progress, setProgress] = useState(0)
  const logs = [
    {
      id: 'OPT-847',
      action: 'Script Optimization',
      description: 'Updated intro script based on top performer analysis',
      result: '+8.3% conversion rate',
      status: 'Completed',
      timestamp: '2 hours ago',
      icon: CheckCircle2
    },
    {
      id: 'OPT-846',
      action: 'Call Timing Analysis',
      description: 'Identified optimal call times per lead segment',
      result: '+12% call completion',
      status: 'Completed',
      timestamp: '4 hours ago',
      icon: CheckCircle2
    },
    {
      id: 'OPT-845',
      action: 'Workflow Suggestion',
      description: 'Recommended new follow-up sequence for warm leads',
      result: 'Pending review',
      status: 'Pending',
      timestamp: '6 hours ago',
      icon: Clock
    },
    {
      id: 'OPT-844',
      action: 'Alert: Low Performer',
      description: 'Team member below performance baseline this week',
      result: 'Action needed',
      status: 'Alert',
      timestamp: '8 hours ago',
      icon: AlertCircle
    },
    {
      id: 'OPT-843',
      action: 'Process Improvement',
      description: 'Detected bottleneck in proposal review stage',
      result: 'Can save 15 min/deal',
      status: 'Completed',
      timestamp: '12 hours ago',
      icon: CheckCircle2
    }
  ]

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += 4
      setProgress(current)
      if (current >= 78) {
        setProgress(78)
        clearInterval(interval)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  }

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Completed': return { bg: 'bg-emerald-500/10', border: 'border-emerald-400/30', text: 'text-emerald-400' }
      case 'Pending': return { bg: 'bg-amber-500/10', border: 'border-amber-400/30', text: 'text-amber-400' }
      case 'Alert': return { bg: 'bg-red-500/10', border: 'border-red-400/30', text: 'text-red-400' }
      default: return { bg: 'bg-slate-500/10', border: 'border-slate-400/30', text: 'text-slate-400' }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-4"
    >
      <div className="premium-card p-5">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-700/50">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">AI Optimization Engine</p>
            <h3 className="text-xl font-semibold text-white mt-2">Optimization performance</h3>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Goal progress</p>
            <p className="text-xl font-semibold text-white">{progress}%</p>
          </div>
        </div>
        <div className="mt-4 rounded-full bg-slate-900/70 h-3 overflow-hidden border border-slate-700/60">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {logs.map((log, idx) => {
        const styles = getStatusStyles(log.status)
        const IconComponent = log.icon
        return (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="rounded-lg border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-4 hover:border-cyan-400/30 transition-all shadow-lg shadow-slate-900/20"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`${styles.bg} p-2 rounded-lg mt-0.5 flex-shrink-0`}>
                <IconComponent className={`h-5 w-5 ${styles.text}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p className="font-semibold text-white text-sm">{log.action}</p>
                    <p className="text-xs text-slate-500">{log.id}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap flex-shrink-0 ${styles.bg} ${styles.border} border ${styles.text}`}>
                    {log.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 mb-2">{log.description}</p>

                {/* Result & Timestamp */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-cyan-400 font-medium">{log.result}</span>
                  <span className="text-xs text-slate-500">{log.timestamp}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
