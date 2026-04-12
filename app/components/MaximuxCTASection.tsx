'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="relative py-20 lg:py-32 bg-slate-900/50">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-cyan-500/10 to-transparent rounded-3xl blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="relative text-center space-y-8 rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-12 lg:p-16 transition-all hover:shadow-xl hover:shadow-cyan-500/20 overflow-hidden"
        >
          {/* Animated background glow */}
          <motion.div
            animate={{
              boxShadow: [
                'inset 0 0 60px rgba(56,189,248,0)',
                'inset 0 0 60px rgba(56,189,248,0.1)',
                'inset 0 0 60px rgba(56,189,248,0)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 rounded-3xl"
          />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Launch Your Workflow, Try It Free
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="relative text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Automate your workflow with AI logic, real-time syncing, and smart integrations. Save your team hours every week.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="relative flex flex-col gap-4 items-center justify-center sm:flex-row pt-8"
          >
            <motion.div
              whileHover={{
                scale: 1.08,
                y: -4,
                boxShadow: '0 20px 40px rgba(34,197,94,0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-8 py-4 text-base font-semibold text-slate-950 transition-all hover:shadow-lg hover:shadow-cyan-500/30"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="relative text-sm text-slate-400"
          >
            14-day free trial. No credit card required.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
