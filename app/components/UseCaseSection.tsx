'use client'

import { Target, SlidersHorizontal, Monitor, Cpu, CalendarDays, Repeat, CheckCircle2, Database, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'

const useCaseSteps = [
  {
    title: 'Client comes in',
    description: '"We want more patients" — A cosmetic clinic needs a predictable patient pipeline.',
    icon: Target
  },
  {
    title: 'Setup',
    description: 'Launch Meta ads, build landing page, configure chatbot and booking system.',
    icon: SlidersHorizontal
  },
  {
    title: 'Lead comes in',
    description: 'User clicks ad, lands on page, submits contact form.',
    icon: Monitor
  },
  {
    title: 'AI Response',
    description: 'User asks "What\'s the price?" — AI responds instantly with qualifying questions.',
    icon: Cpu,
    highlight: true
  },
  {
    title: 'Booking',
    description: 'AI suggests available times, books appointment automatically.',
    icon: CalendarDays
  },
  {
    title: 'Follow-up',
    description: 'Reminder 24h before, reminder 2h before, no-show recovery flow.',
    icon: Repeat
  },
  {
    title: 'Conversion',
    description: 'Client visits clinic, receives treatment, pays.',
    icon: CheckCircle2
  },
  {
    title: 'Data Capture',
    description: 'System tracks best ads, best questions, best scripts for optimization.',
    icon: Database
  }
]

const chatExample = [
  {
    label: 'Patient',
    message: 'What\'s the price for laser hair removal?',
    color: 'text-slate-900',
    bg: 'bg-white'
  },
  {
    label: 'AI assistant',
    message: 'Our laser treatments start at $299 per session. Are you looking for a consultation this week?',
    color: 'text-slate-100',
    bg: 'bg-cyan-500/15'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.8 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6 }
  },
  hover: {
    x: 8,
    scale: 1.02,
    transition: { duration: 0.3 }
  }
}

const chatVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

export default function UseCaseSection() {
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
          <p className="text-sm font-semibold tracking-[0.32em] text-cyan-400 uppercase">Use case</p>
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Real Use Case: How It Works for a Clinic</h2>
          <p className="text-base leading-7 text-slate-300">
            See the actual clinic journey from initial goal to seamless bookings, with AI response driving every step.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr] items-start">
          <div className="relative">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              viewport={{ once: true }}
              className="pointer-events-none absolute left-7 top-0 hidden h-full w-px rounded-full bg-slate-700/50 lg:block origin-top"
            />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {useCaseSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.title}
                    variants={itemVariants}
                    whileHover="hover"
                    className={
                      `relative overflow-hidden rounded-[2rem] border p-6 shadow-lg transition duration-300 cursor-pointer ${
                        step.highlight
                          ? 'border-cyan-400/50 bg-cyan-500/10 shadow-cyan-500/20'
                          : 'border-slate-700/50 bg-slate-800/50'
                      }`
                    }
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="absolute -left-4 top-10 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-slate-600 bg-slate-900 shadow-sm"
                    >
                      <Icon className={step.highlight ? 'h-6 w-6 text-cyan-400' : 'h-6 w-6 text-slate-300'} />
                    </motion.div>
                    <div className="pl-10">
                      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400">
                        <span>{`Step ${index + 1}`}</span>
                        {step.highlight ? <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.2 + index * 0.12 }} viewport={{ once: true }} className="rounded-full bg-cyan-500/20 px-2 py-1 text-cyan-400">AI</motion.span> : null}
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{step.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-slate-700/50 bg-slate-900/80 p-6 shadow-2xl shadow-slate-900/30 text-white"
            >
              <div className="flex items-center justify-between rounded-3xl bg-slate-900/95 px-4 py-3 text-sm uppercase tracking-[0.28em] text-cyan-300">
                <span>Live chat example</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">AI response</span>
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-6 space-y-4"
              >
                {chatExample.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={chatVariants}
                    className={`rounded-3xl p-4 ${item.bg === 'bg-white' ? 'bg-slate-800' : 'bg-cyan-500/20'}`}
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
                    <p className={`mt-3 rounded-3xl px-4 py-3 text-sm leading-6 ${item.color === 'text-slate-900' ? 'text-slate-200' : 'text-slate-100'}`}>{item.message}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-slate-700/50 bg-slate-800/50 p-7 shadow-lg shadow-slate-900/20"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Why it feels real</div>
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-6 space-y-4 text-sm leading-6 text-slate-300"
              >
                {[
                  'Clear milestones for every clinic action, from goal to optimization.',
                  'AI is highlighted as the intelligence center of the workflow.',
                  'Concise, client-facing language makes the journey easy to grasp.'
                ].map((item, idx) => (
                  <motion.li key={idx} variants={itemVariants}>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
