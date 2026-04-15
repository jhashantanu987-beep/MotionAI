'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
  metric: string
  metricLabel: string
  image?: string
}

interface TestimonialMarqueeProps {
  testimonials: Testimonial[]
  direction?: 'left' | 'right'
  speed?: number
}

export default function TestimonialMarquee({ 
  testimonials, 
  direction = 'left', 
  speed = 40 
}: TestimonialMarqueeProps) {
  // Duplicate the list to create a seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

  return (
    <div className="relative w-full overflow-hidden py-10 marquee-mask">
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? [0, -1000] : [-1000, 0]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        style={{ width: 'max-content' }}
      >
        {duplicatedTestimonials.map((t, i) => (
          <div
            key={i}
            className="w-[350px] sm:w-[450px] p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col justify-between group hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-500"
          >
            <div className="flex flex-col gap-6">
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#0077F5] text-[#0077F5]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl sm:text-2xl text-white font-serif italic leading-relaxed whitespace-normal">
                "{t.quote}"
              </p>
            </div>

            <div className="mt-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-red-600 border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-inner group-hover:scale-110 transition-transform">
                  {t.image ? (
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  ) : (
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2" alt="forced fallback" className="w-full h-full object-cover" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">{t.name}</h4>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest leading-none mt-1">
                    {t.role} @ {t.company}
                  </p>
                </div>
              </div>

              {/* Performance Badge */}
              <div className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest whitespace-nowrap">
                  <span className="text-white">{t.metric}</span> {t.metricLabel}
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
