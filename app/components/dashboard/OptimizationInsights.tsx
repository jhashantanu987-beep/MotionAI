'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, TrendingUp, Zap, Lightbulb, Target, BarChart3 } from 'lucide-react'
import { useState, useEffect } from 'react'

interface OptimizationItem {
  title: string
  metric: string
  performance: string
  recommendation: string
}

interface OptimizationInsightsProps {
  data: OptimizationItem[]
}

const rotatingInsights = [
  {
    title: 'Increase budget on Campaign A',
    metric: 'Meta Ads Performance',
    performance: '+23% CTR',
    recommendation: 'Scale spend +30% for optimal ROI',
    icon: TrendingUp,
    gradient: 'from-emerald-500/20 to-cyan-500/20',
    border: 'border-emerald-500/30',
    glow: 'shadow-emerald-500/20'
  },
  {
    title: '3 high-intent leads ready',
    metric: 'Lead Scoring AI',
    performance: '95%+ score',
    recommendation: 'Schedule immediate follow-up calls',
    icon: Target,
    gradient: 'from-blue-500/20 to-purple-500/20',
    border: 'border-blue-500/30',
    glow: 'shadow-blue-500/20'
  },
  {
    title: 'Follow-up recommended',
    metric: '5 cold leads inactive',
    performance: '7+ days',
    recommendation: 'Send personalized re-engagement sequence',
    icon: Zap,
    gradient: 'from-orange-500/20 to-red-500/20',
    border: 'border-orange-500/30',
    glow: 'shadow-orange-500/20'
  },
  {
    title: 'Ad creative optimization',
    metric: 'A/B Test Results',
    performance: 'Variant B +34%',
    recommendation: 'Deploy winning creative across campaigns',
    icon: BarChart3,
    gradient: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/30',
    glow: 'shadow-purple-500/20'
  }
]

export default function OptimizationInsights({ data }: OptimizationInsightsProps) {
  const [currentInsight, setCurrentInsight] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight(prev => (prev + 1) % rotatingInsights.length)
    }, 5000) // Rotate every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const insight = rotatingInsights[currentInsight]
  const Icon = insight.icon

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentInsight}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`rounded-xl border ${insight.border} bg-gradient-to-r ${insight.gradient} p-4 hover:shadow-2xl hover:${insight.glow} transition-all duration-300 backdrop-blur-sm group`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon className="h-4 w-4 text-white" />
                </motion.div>
                <h3 className="font-semibold text-white">{insight.title}</h3>
              </div>
              <p className="text-sm text-gray-300">{insight.metric}</p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 px-3 py-1.5"
            >
              <TrendingUp className="h-3.5 w-3.5 text-green-400" />
              <span className="text-sm font-semibold text-green-400">{insight.performance}</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20"
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ duration: 0.2 }}
            >
              <Lightbulb className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
            </motion.div>
            <p className="text-sm text-blue-300 leading-relaxed">{insight.recommendation}</p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Insight indicators */}
      <div className="flex justify-center gap-2">
        {rotatingInsights.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentInsight
                ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50'
                : 'bg-gray-600'
            }`}
            whileHover={{ scale: 1.2 }}
            onClick={() => setCurrentInsight(index)}
          />
        ))}
      </div>
    </div>
  )
}
