'use client'

import { motion } from 'framer-motion'
import { Volume2, Lightbulb, AlertCircle } from 'lucide-react'

export default function CallInsights() {
  const insights = [
    {
      callId: 'CALL-2847',
      duration: '4m 32s',
      sentiment: 'Positive',
      keyPoints: ['Interested in pricing', 'Needs demo', 'Budget approved'],
      status: 'Action Required',
      timestamp: '2 min ago'
    },
    {
      callId: 'CALL-2846',
      duration: '6m 18s',
      sentiment: 'Neutral',
      keyPoints: ['Collecting information', 'Compared with competitor', 'Will review proposal'],
      status: 'Follow-up Scheduled',
      timestamp: '12 min ago'
    },
    {
      callId: 'CALL-2845',
      duration: '3m 45s',
      sentiment: 'Positive',
      keyPoints: ['Ready to move forward', 'Wants contract review', 'Timeline: This week'],
      status: 'Booking Available',
      timestamp: '18 min ago'
    }
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive': return 'text-emerald-400 bg-emerald-500/10'
      case 'Neutral': return 'text-amber-400 bg-amber-500/10'
      case 'Negative': return 'text-red-400 bg-red-500/10'
      default: return 'text-slate-400 bg-slate-500/10'
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
      {insights.map((insight, idx) => (
        <motion.div
          key={idx}
          variants={itemVariants}
          className="rounded-lg border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-5 hover:border-cyan-400/30 transition-all shadow-lg shadow-slate-900/20"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-semibold text-white">{insight.callId}</p>
              <p className="text-xs text-slate-500">{insight.duration} • {insight.timestamp}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSentimentColor(insight.sentiment)}`}>
              {insight.sentiment}
            </span>
          </div>

          <div className="space-y-3">
            {/* Key Points */}
            <div>
              <p className="text-xs text-slate-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-3 w-3" />
                Key Points
              </p>
              <div className="flex flex-wrap gap-2">
                {insight.keyPoints.map((point, pointIdx) => (
                  <span
                    key={pointIdx}
                    className="px-2 py-1 rounded bg-slate-800/50 text-xs text-slate-300 border border-slate-700/30"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Next Action</span>
              <span className="px-3 py-1 rounded-full text-xs font-medium border border-cyan-400/30 text-cyan-400 bg-cyan-500/10">
                {insight.status}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
