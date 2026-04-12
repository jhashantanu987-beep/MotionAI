'use client'

import { Sparkles, BarChart3, Zap, MessageSquare, Puzzle, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const aiSystems = [
  {
    title: 'AI Creative Engine',
    description: 'Generates personalized ad copy, landing page variations, and messaging based on audience insights.',
    icon: Sparkles,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Ad Performance System',
    description: 'Automatic budget optimization and targeting refinement across channels for maximum ROI.',
    icon: BarChart3,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Funnel System',
    description: 'Intelligent lead capture flows with dynamic forms that adapt to visitor behavior in real-time.',
    icon: Zap,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    title: 'AI Sales Bot',
    description: 'Conversational AI that qualifies leads, answers questions, and schedules meetings automatically.',
    icon: MessageSquare,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Workflow Automation',
    description: 'Orchestrates multi-step sequences across tools, data syncing, and team notifications.',
    icon: Puzzle,
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    title: 'Advanced Analytics',
    description: 'Real-time dashboards with actionable insights, attribution tracking, and revenue attribution.',
    icon: TrendingUp,
    gradient: 'from-cyan-500 to-blue-500'
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
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6 }
  },
  hover: {
    y: -10,
    scale: 1.03,
    transition: { duration: 0.3 }
  }
}

export default function AdvancedAISystemsSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-slate-900/50">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-cyan-500/5 to-transparent"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.32em] text-cyan-400 uppercase">Execution Layer</p>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Advanced AI Systems
          </h2>
          <p className="text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
            Enterprise-grade AI systems that work together to automate your entire business pipeline.
          </p>
        </motion.div>

        {/* Systems Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {aiSystems.map((system) => {
            const Icon = system.icon
            return (
              <motion.div
                key={system.title}
                variants={itemVariants}
                whileHover="hover"
                className="group relative rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 shadow-lg shadow-slate-900/20 hover:border-slate-600/60 transition-all cursor-pointer overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className={`absolute inset-0 bg-gradient-to-br ${system.gradient} opacity-5 rounded-2xl`}
                />

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.25, rotate: 12 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${system.gradient} text-white opacity-90 group-hover:opacity-100 transition-all shadow-lg`}
                  >
                    <Icon className="h-7 w-7" />
                  </motion.div>

                  {/* Title and Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {system.title}
                    </h3>
                    <p className="text-sm leading-6 text-slate-300 group-hover:text-slate-200 transition-colors">
                      {system.description}
                    </p>
                  </div>

                  {/* Accent Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`h-1 w-12 bg-gradient-to-r ${system.gradient} rounded-full origin-left`}
                  />
                </div>

                {/* Subtle Corner Accent */}
                <div className={`absolute -top-1 -right-1 h-20 w-20 bg-gradient-to-br ${system.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-all duration-300`} />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
