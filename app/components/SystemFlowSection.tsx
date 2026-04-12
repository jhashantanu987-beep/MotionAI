'use client'

import { Fragment } from 'react'
import { Activity, Users, Cpu, Zap, CalendarDays, Repeat, CheckCircle2, Database, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const flowSteps = [
  {
    title: 'Traffic',
    description: 'High-intent visitors are sourced from premium channels and paid media.',
    icon: Activity
  },
  {
    title: 'Lead',
    description: 'Every visitor is turned into a qualified lead through clean capture flows.',
    icon: Users
  },
  {
    title: 'AI Response',
    description: 'Instant, personalized follow-up engages prospects while interest is hot.',
    icon: Cpu
  },
  {
    title: 'Qualification',
    description: 'AI scores intent and routes the right opportunities to your team.',
    icon: Zap
  },
  {
    title: 'Booking',
    description: 'Meetings are scheduled automatically with premium prospects.',
    icon: CalendarDays
  },
  {
    title: 'Follow-up',
    description: 'Automated sequences keep buyers engaged and moving forward.',
    icon: Repeat
  },
  {
    title: 'Conversion',
    description: 'High-value deals close faster with aligned messaging and timing.',
    icon: CheckCircle2
  },
  {
    title: 'Data',
    description: 'Every interaction feeds back into performance intelligence.',
    icon: Database
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

export default function SystemFlowSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-slate-900/40">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center space-y-4 mb-14"
        >
          <p className="text-sm font-semibold tracking-[0.32em] text-cyan-400 uppercase">System flow</p>
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">How the System Works</h2>
          <p className="text-base leading-7 text-slate-300">
            A high-speed, intelligent pipeline that turns traffic into revenue with precision, speed, and repeatability.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
            className="hidden lg:block absolute inset-x-0 top-1/2 h-px rounded-full bg-slate-700/80 origin-left"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-4 overflow-x-auto pb-6 lg:overflow-visible lg:pb-0"
          >
            {flowSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <Fragment key={step.title}>
                  <motion.div
                    variants={itemVariants}
                    whileHover="hover"
                    className="group relative flex min-w-[220px] flex-col gap-4 rounded-[2rem] border border-slate-700/50 bg-slate-800/60 px-6 py-8 shadow-lg shadow-slate-900/20 transition duration-300 hover:border-cyan-400/50 hover:bg-slate-800/80 cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-500/20 text-cyan-400 transition duration-300 group-hover:bg-cyan-500/30"
                    >
                      <Icon className="h-7 w-7" />
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      <p className="text-sm leading-6 text-slate-300">{step.description}</p>
                    </div>
                  </motion.div>

                  {index < flowSteps.length - 1 ? (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="hidden items-center gap-2 lg:flex origin-left"
                    >
                      <div className="h-px w-14 bg-slate-700/80"></div>
                      <ArrowRight className="h-4 w-4 text-slate-500" />
                    </motion.div>
                  ) : null}
                </Fragment>
              )
            })}
          </motion.div>

          <div className="mt-6 text-right lg:hidden text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
            Swipe to explore the flow
          </div>
        </div>
      </div>
    </section>
  )
}
