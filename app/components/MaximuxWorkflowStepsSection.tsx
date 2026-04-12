'use client'

import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Connect your tools',
    description: 'The first step in smart automation is to connect all the tools, apps, and systems your business relies on.'
  },
  {
    number: '02',
    title: 'Build smart workflows',
    description: 'Once your tools are connected, design and build smart workflows that bring automation to life.'
  },
  {
    number: '03',
    title: 'Let AI handle it',
    description: 'Launch your workflows and let AI handle the day-to-day execution automatically.'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function WorkflowStepsSection() {
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
          <p className="text-sm font-semibold tracking-wide text-cyan-400 uppercase">Process</p>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Smart Automation in Simple Steps
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-12 md:grid-cols-3"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              whileHover="hover"
              className="relative group cursor-pointer"
            >
              {/* Connector Line Animation */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.3 + index * 0.15, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="absolute -right-[calc(50%+1.5rem)] top-16 hidden h-1 w-[calc(100%+3rem)] bg-gradient-to-r from-cyan-500 to-transparent md:block origin-left"
                />
              )}

              <div className="relative">
                {/* Step Number */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20 border border-cyan-500/50 text-2xl font-bold text-cyan-300 group-hover:bg-cyan-500/40 group-hover:border-cyan-400 transition-all"
                >
                  {step.number}
                </motion.div>

                {/* Content */}
                <div className="mt-6 space-y-3">
                  <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                  <p className="text-slate-300">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
