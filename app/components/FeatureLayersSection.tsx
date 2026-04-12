'use client'

import { Users, CheckCircle2, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const features = [
  {
    title: 'Lead Qualification',
    description: 'AI instantly scores and ranks every lead. Know exactly who\'s ready to buy before your team reaches out.',
    icon: Users,
    benefit: 'Convert 3-5x more leads',
    preview: 'Scoring System'
  },
  {
    title: 'Booking System',
    description: 'Automated scheduling with smart calendar sync. Meetings book themselves while you focus on closing.',
    icon: CheckCircle2,
    benefit: '2-3x more meetings',
    preview: 'Calendar Integration'
  },
  {
    title: 'Workflow Automation',
    description: 'Multi-step automations that handle follow-ups, data syncing, and team notifications on autopilot.',
    icon: Zap,
    benefit: '25+ hours saved weekly',
    preview: 'Activity Logs'
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

export default function FeatureLayersSection() {
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
          <p className="text-sm font-semibold tracking-[0.32em] text-cyan-400 uppercase">Platform Features</p>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Three Powerful Layers
          </h2>
          <p className="text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
            Every feature is designed to be simple on the surface, powerful underneath.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3 mb-16"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover="hover"
                className="group relative rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/60 p-8 shadow-lg shadow-slate-900/20 hover:border-cyan-400/40 transition-all cursor-pointer overflow-hidden"
              >
                {/* Hover Glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent"
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

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>

                  {/* Description */}
                  <p className="text-sm leading-6 text-slate-300">
                    {feature.description}
                  </p>

                  {/* Benefit Highlight */}
                  <div className="pt-4 border-t border-slate-700/50">
                    <p className="text-sm font-semibold text-cyan-300">{feature.benefit}</p>
                  </div>

                  {/* Preview Label */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-400 uppercase tracking-wide">See in dashboard</span>
                    <span className="text-xs font-mono text-slate-500 bg-slate-800/50 px-2 py-1 rounded">
                      {feature.preview}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            Explore Full Dashboard →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
