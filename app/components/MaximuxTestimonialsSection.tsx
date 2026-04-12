'use client'

import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: 'This platform removed manual busywork. We save 25+ hours every week and run workflows with full confidence.',
    author: 'Dennis Barrett',
    role: 'Product Manager',
    company: 'Leaf',
    metric: '25+ hours saved per week',
    image: '👨‍💼'
  },
  {
    quote: 'Predictive analytics let us anticipate changes, improve engagement, and make smarter strategic decisions.',
    author: 'Jessica Moore',
    role: 'CTO',
    company: 'NovaTech',
    metric: '2x increase in lead generation',
    image: '👩‍💼'
  },
  {
    quote: 'Slack + Airtable integration simplified campaigns, aligned our team, and removed endless meetings.',
    author: 'Amanda Reed',
    role: 'Tech Lead',
    company: 'OSLO',
    metric: '60% reduction in coordination',
    image: '👩‍🔬'
  },
  {
    quote: 'AI automation reduced manual tasks, streamlined processes, and gave us the clarity we needed.',
    author: 'Mark Johnson',
    role: 'CEO',
    company: 'TechFlow',
    metric: '40% efficiency gain',
    image: '👨‍🏫'
  }
]

export default function TestimonialsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7
      }
    },
    hover: {
      y: -8,
      rotateZ: 2,
      transition: { duration: 0.3 }
    }
  }

  return (
    <section className="relative py-20 lg:py-32 bg-slate-950">
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
            Results from Real Users
          </motion.p>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            See How Teams Are Winning with AI Automation
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-8 md:grid-cols-2"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.author}
              variants={itemVariants}
              whileHover="hover"
              className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-8 transition-all hover:border-cyan-400/50 hover:bg-slate-800/80 perspective"
            >
              {/* Stars */}
              <motion.div
                className="flex gap-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Star
                      className="h-4 w-4 fill-cyan-400 text-cyan-400"
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Quote */}
              <p className="mt-4 text-lg text-slate-100">"{testimonial.quote}"</p>

              {/* Metric */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-6 rounded-lg bg-cyan-500/20 p-4 border border-cyan-500/40"
              >
                <p className="text-sm font-semibold text-cyan-300">{testimonial.metric}</p>
              </motion.div>

              {/* Author */}
              <div className="mt-6 border-t border-slate-700 pt-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="text-3xl"
                    whileHover={{ scale: 1.3, rotate: 10 }}
                  >
                    {testimonial.image}
                  </motion.div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-slate-400">
                      {testimonial.role} @ {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
