'use client'

import { Sparkles, Zap, Shield, BarChart3, Workflow, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Automation',
    description: 'Intelligent AI manages complex conditions, branches, and decision-making workflows automatically.'
  },
  {
    icon: Zap,
    title: 'Real-Time Monitoring',
    description: 'Track performance metrics and get live dashboards with up-to-the-minute insights.'
  },
  {
    icon: Workflow,
    title: 'No-Code Builder',
    description: 'Create powerful automations with simple drag-and-drop interface—no technical skills needed.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and compliance standards to keep your data safe and secure.'
  },
  {
    icon: BarChart3,
    title: '5000+ Integrations',
    description: 'Connect seamlessly with your entire tech stack—Slack, Zapier, and 5000+ more apps.'
  },
  {
    icon: Workflow,
    title: 'Workflow Templates',
    description: 'Get started instantly with pre-built templates for common automation scenarios.'
  }
]

export default function FeaturesSection() {
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
      transition: {
        duration: 0.6
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  }

  return (
    <section className="relative py-20 lg:py-32 bg-slate-900/50 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm font-semibold tracking-wide text-cyan-400 uppercase"
          >
            Features
          </motion.p>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Features Built to Perform
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Everything you need to automate workflows, save time, and scale your business.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover="hover"
                className="group relative rounded-xl border border-slate-700/50 bg-slate-800/60 p-8 transition-all hover:border-cyan-400/50 hover:bg-slate-800/80 cursor-pointer"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="inline-flex rounded-lg bg-cyan-500/20 p-3 text-cyan-400 group-hover:bg-cyan-500/30"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-slate-300">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
