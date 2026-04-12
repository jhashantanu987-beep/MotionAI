'use client'

import { motion } from 'framer-motion'
import { PhoneCall, TrendingUp, BarChart3, Zap } from 'lucide-react'
import Link from 'next/link'

export default function AdvancedAIServicesSection() {
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

  const services = [
    {
      icon: PhoneCall,
      name: 'Call Intelligence',
      benefit: 'Understand every customer interaction',
      metric: '95%+ accuracy',
      description: 'AI-powered voice analysis automatically captures tone, sentiment, and intent from every call',
      color: 'from-cyan-500/20 to-blue-500/20',
      borderColor: 'border-cyan-400/30'
    },
    {
      icon: TrendingUp,
      name: 'Follow-up Engine',
      benefit: 'Never miss a sales opportunity',
      metric: '3x more follow-ups',
      description: 'Automatically identifies next steps and schedules timely follow-ups based on conversation context',
      color: 'from-emerald-500/20 to-green-500/20',
      borderColor: 'border-emerald-400/30'
    },
    {
      icon: BarChart3,
      name: 'Revenue Analytics',
      benefit: 'See where money is being made',
      metric: '$2.3M tracked',
      description: 'Real-time dashboard connects calls to revenue, showing exact ROI per representative and campaign',
      color: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'border-amber-400/30'
    },
    {
      icon: Zap,
      name: 'Optimization Engine',
      benefit: 'Continuously improve what works',
      metric: '40% efficiency gain',
      description: 'AI learns from top performers and automatically suggests optimizations for processes and scripts',
      color: 'from-pink-500/20 to-rose-500/20',
      borderColor: 'border-pink-400/30'
    }
  ]

  return (
    <section className="relative py-20 px-6 lg:px-8 bg-slate-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent"
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Advanced AI Services
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Four powerful AI systems that work together to transform how your team operates and generates revenue
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover="hover"
                className={`group relative rounded-xl border ${service.borderColor} bg-gradient-to-br ${service.color} backdrop-blur-sm p-6 transition-all shadow-lg shadow-slate-900/20 hover:shadow-xl hover:${service.borderColor.replace('border', 'shadow')} overflow-hidden`}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="mb-4 p-3 rounded-lg bg-slate-800/60 w-fit"
                  >
                    <Icon className="h-6 w-6 text-cyan-400" />
                  </motion.div>

                  {/* Service Name */}
                  <h3 className="text-lg font-bold text-white mb-2">{service.name}</h3>

                  {/* Metric Badge */}
                  <div className="mb-3 inline-block px-2 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400/30">
                    <p className="text-xs font-semibold text-cyan-300">{service.metric}</p>
                  </div>

                  {/* Benefit */}
                  <p className="text-sm font-semibold text-white mb-3">{service.benefit}</p>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Link */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-cyan-400 text-xs font-medium hover:text-cyan-300 transition-colors"
                  >
                    <span>See in Dashboard</span>
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <Link
            href="/dashboard/advanced"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-semibold hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all"
          >
            Explore All Services
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
