'use client'

import { motion } from 'framer-motion'
import { Users, Target, Calendar, DollarSign } from 'lucide-react'

interface FunnelStage {
  stage: string
  value: number
  percentage: number
}

interface ConversionFunnelProps {
  data: FunnelStage[]
}

const stageIcons = {
  'Ad Clicks': Users,
  'Landing Page': Target,
  'Lead Capture': Users,
  'Qualified Lead': Target,
  'Booked Call': Calendar,
  'Closed Deal': DollarSign
}

const stageColors = {
  'Ad Clicks': 'from-blue-500 to-cyan-500',
  'Landing Page': 'from-cyan-500 to-blue-500',
  'Lead Capture': 'from-purple-500 to-pink-500',
  'Qualified Lead': 'from-pink-500 to-purple-500',
  'Booked Call': 'from-emerald-500 to-green-500',
  'Closed Deal': 'from-green-500 to-emerald-500'
}

export default function ConversionFunnel({ data }: ConversionFunnelProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {data.map((stage, index) => {
          const maxWidth = Math.max(...data.map((d) => d.value))
          const width = (stage.value / maxWidth) * 100
          const Icon = stageIcons[stage.stage as keyof typeof stageIcons] || Users
          const gradient = stageColors[stage.stage as keyof typeof stageColors] || 'from-gray-500 to-gray-600'

          return (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className={`p-2 rounded-lg bg-gradient-to-r ${gradient} bg-opacity-20`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </motion.div>
                  <span className="text-sm font-medium text-gray-300">{stage.stage}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-white">{stage.value.toLocaleString()}</span>
                  <span className="text-xs text-gray-400 ml-2">({stage.percentage}%)</span>
                </div>
              </div>

              <div className="h-12 w-full rounded-2xl bg-white/5 overflow-hidden relative shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{ duration: 1.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`h-full bg-gradient-to-r ${gradient} rounded-2xl relative overflow-hidden shadow-lg`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                  <motion.div
                    animate={{ x: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  />
                </motion.div>
              </div>

              {index < data.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
                  className="flex justify-center"
                >
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
