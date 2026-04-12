'use client'

import { ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

// Adapted Framer-style store using React state
const useStore = () => {
  const [state, setState] = useState({
    background: "#0099FF",
  })
  return [state, setState] as const
}

// Random color utility
const randomColor = () => {
  const colors = [
    "#0099FF", "#FF0099", "#00FF99", "#FF9900", "#9900FF",
    "#00FFFF", "#FFFF00", "#FF0000", "#00FF00", "#0000FF"
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// Framer-style animation HOCs adapted for React
export function withRotate(Component: any) {
  return motion(Component)
}

export function withHover(Component: any) {
  return motion(Component)
}

export function withRandomColor(Component: any) {
  return motion(Component)
}

export default function MaximuxHeroSection() {
  const [store, setStore] = useStore()

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-slate-950"
    >
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent"
        />
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, 15, 0]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute right-[-8%] top-12 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, -15, 0]
          }}
          transition={{ duration: 24, repeat: Infinity, delay: 2 }}
          className="absolute left-[-12%] bottom-10 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),transparent_28%)] opacity-80" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            animate={{ rotate: 90 }}
            transition={{ duration: 2 }}
            style={{
              background: store.background,
            }}
            onClick={() => {
              setStore({ background: randomColor() })
            }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              animate={{ rotate: 90 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <Zap className="h-4 w-4 text-white" />
            </motion.div>
            <span className="text-sm font-medium text-slate-200">Let AI automate your work to 10x output</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="inline-block"
            >
              AI-Powered
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="inline-block bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent"
            >
              Workflow Automation
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="inline-block"
            >
              Platform
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-xl text-slate-300 sm:text-2xl"
          >
            Automate complex workflows, save hours every week, and scale your operations with intelligent AI automation—no coding required.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 items-center justify-center sm:flex-row"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-8 py-4 text-base font-semibold text-slate-950 transition duration-300 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
                Get Started Free
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-500/30 bg-slate-900/90 px-8 py-4 text-base font-semibold text-slate-100 transition duration-300 hover:border-cyan-400/50 hover:bg-slate-800"
              >
                <motion.div
                  animate={{ rotate: 90 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
                Book a Demo
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Badge */}
          <motion.p
            variants={itemVariants}
            className="text-sm text-slate-400"
          >
            <span className="font-semibold text-white">1,200+</span> teams trust us to power their workflows
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}
