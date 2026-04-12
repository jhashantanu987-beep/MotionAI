'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Cpu, Zap, Target, TrendingUp } from 'lucide-react'

interface OptimizationProcess {
  id: string
  name: string
  status: 'running' | 'completed' | 'paused'
  progress: number
  description: string
}

const processes: OptimizationProcess[] = [
  {
    id: 'campaign-analysis',
    name: 'Analyzing campaign performance',
    status: 'running',
    progress: 0,
    description: 'Optimizing ad spend and targeting parameters'
  },
  {
    id: 'funnel-optimization',
    name: 'Improving funnel conversion',
    status: 'running',
    progress: 0,
    description: 'Testing new landing page variations'
  },
  {
    id: 'lead-scoring',
    name: 'Refining lead scoring algorithm',
    status: 'completed',
    progress: 100,
    description: 'Updated scoring model with new data'
  },
  {
    id: 'automation-workflows',
    name: 'Enhancing automation workflows',
    status: 'running',
    progress: 0,
    description: 'Adding intelligent follow-up sequences'
  }
]

export default function AIOptimizationEngine() {
  const [currentProcesses, setCurrentProcesses] = useState(processes)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProcesses((prev) =>
        prev.map((process) => {
          if (process.status === 'running') {
            const newProgress = Math.min(100, process.progress + Math.random() * 15)
            return {
              ...process,
              progress: newProgress,
              status: newProgress >= 100 ? 'completed' : 'running'
            }
          }
          return process
        })
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const activeProcesses = currentProcesses.filter((p) => p.status === 'running').length
  const completedProcesses = currentProcesses.filter((p) => p.status === 'completed').length

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="glass-panel p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">AI optimization engine</p>
          <h3 className="text-2xl font-semibold text-slate-900">Running intelligent processes</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-2xl font-semibold text-slate-900">{activeProcesses}</p>
            <p className="text-xs text-slate-500">Active</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-indigo-700">{completedProcesses}</p>
            <p className="text-xs text-slate-500">Completed</p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {currentProcesses.map((process, index) => (
          <motion.div
            key={process.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                    process.status === 'running'
                      ? 'bg-cyan-100 text-cyan-700'
                      : process.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {process.status === 'running' ? (
                    <Cpu className="h-4 w-4" />
                  ) : process.status === 'completed' ? (
                    <Zap className="h-4 w-4" />
                  ) : (
                    <Target className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{process.name}</p>
                  <p className="text-xs text-slate-500">{process.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{Math.round(process.progress)}%</p>
                <p className={`text-xs ${
                  process.status === 'running'
                    ? 'text-cyan-700'
                    : process.status === 'completed'
                    ? 'text-emerald-700'
                    : 'text-slate-500'
                }`}>
                  {process.status}
                </p>
              </div>
            </div>
            <div className="h-2 rounded-full bg-slate-200">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${process.progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`h-2 rounded-full ${
                  process.status === 'running'
                    ? 'bg-gradient-to-r from-cyan-400 to-violet-500'
                    : process.status === 'completed'
                    ? 'bg-emerald-500'
                    : 'bg-slate-400'
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <TrendingUp className="h-4 w-4 text-cyan-700" />
          <span>System efficiency improved by 23% in the last hour</span>
        </div>
      </div>
    </motion.div>
  )
}
