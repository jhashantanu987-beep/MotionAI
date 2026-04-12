'use client'

import { TrendingUp, Zap, Calendar, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

const outcomes = [
  {
    title: 'More Qualified Leads',
    description: 'AI-powered lead scoring ensures every prospect meets your ideal customer profile.',
    icon: TrendingUp,
    metric: '3-5x increase'
  },
  {
    title: 'Faster Response Time',
    description: 'Instant AI engagement captures intent while competitors are still waking up.',
    icon: Zap,
    metric: '<5 seconds'
  },
  {
    title: 'More Bookings',
    description: 'Automated follow-up sequences convert interested prospects into scheduled meetings.',
    icon: Calendar,
    metric: '2-3x more meetings'
  },
  {
    title: 'Fewer Lost Customers',
    description: 'Proactive outreach and engagement prevents prospects from slipping through the cracks.',
    icon: Shield,
    metric: '60% reduction'
  }
]

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
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6 }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3 }
  }
}

export default function ClientOutcomesSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.32em] text-cyan-400 uppercase">Results</p>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Results You Can Expect
          </h2>
          <p className="text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
            Proven outcomes that directly impact your revenue and operational efficiency.
          </p>
        </motion.div>

        {/* Outcomes Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16"
        >
          {outcomes.map((outcome) => {
            const Icon = outcome.icon
            return (
              <motion.div
                key={outcome.title}
                variants={itemVariants}
                whileHover="hover"
                className="group relative rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-sm p-8 shadow-lg shadow-slate-900/20 hover:border-cyan-400/30 transition-all cursor-pointer overflow-hidden"
              >
                {/* Background Glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent rounded-2xl"
                />

                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/30 transition-all"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>

                  {/* Metric Badge */}
                  <div className="inline-block">
                    <span className="text-xs font-bold tracking-widest text-cyan-300 uppercase bg-cyan-500/10 px-3 py-1 rounded-full">
                      {outcome.metric}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">{outcome.title}</h3>
                    <p className="text-sm leading-6 text-slate-300">{outcome.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-6 py-3 backdrop-blur-sm">
            <div className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold tracking-wide text-cyan-300 uppercase">Direct Revenue Impact</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
