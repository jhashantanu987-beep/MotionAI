'use client'

import { useState, useRef } from 'react'

export default function PricingPlansSection() {
  const [cardRotates, setCardRotates] = useState([{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])

  const handleMouseMove = (index: number) => (e: React.MouseEvent) => {
    const element = cardRefs.current[index]
    if (!element) return

    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * 8
    const rotateY = ((centerX - x) / centerX) * 8

    const newRotates = [...cardRotates]
    newRotates[index] = { x: rotateX, y: rotateY }
    setCardRotates(newRotates)
  }

  const handleMouseLeave = (index: number) => () => {
    const newRotates = [...cardRotates]
    newRotates[index] = { x: 0, y: 0 }
    setCardRotates(newRotates)
  }

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el
  }

  return (
    <section id="pricing" className="relative py-12 lg:py-16 bg-[#0A0A0A] text-white overflow-visible">
      {/* Background gradients matching website */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-fadeInUp">
          <p className="text-sm font-semibold tracking-[0.25em] text-cyan-300 uppercase mb-4 animated-in">Pricing</p>
          <h2 className="text-5xl font-bold tracking-tight text-white sm:text-6xl mb-8 animated-in" style={{animationDelay: '0.1s'}}>
            Choose your plan
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto animated-in" style={{animationDelay: '0.2s'}}>
            Flexible pricing designed to scale with your business. Start with setup, then choose ongoing or performance-based pricing.
          </p>
        </div>

        {/* Pricing Cards with 3D Effect - Fixed Cropping */}
        <div className="grid gap-8 md:grid-cols-3 perspective">
          {/* Setup Plan */}
          <div
            ref={setCardRef(0)}
            onMouseMove={handleMouseMove(0)}
            onMouseLeave={handleMouseLeave(0)}
            className="animated-in group"
            style={{
              animationDelay: '0.4s',
              transformStyle: 'preserve-3d' as any,
              transform: `rotateX(${cardRotates[0].x}deg) rotateY(${cardRotates[0].y}deg)`
            }}
          >
            <div className="relative rounded-2xl overflow-visible min-h-[520px]">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

              {/* Card background with glassmorphism */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-white/[0.02] backdrop-blur-[12px] border border-white/10 group-hover:border-white/15 rounded-2xl transition-all duration-500 pointer-events-none"></div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.08] via-transparent to-blue-500/[0.08] group-hover:from-cyan-500/15 group-hover:to-blue-500/15 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>

              {/* Content */}
              <div className="relative p-8 space-y-6 flex flex-col h-full">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">Setup</h3>
                  <p className="text-sm text-slate-400">One-time setup to build your system</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-bold text-white">
                      $400
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">One-time payment</p>
                </div>

                <button className="w-full px-6 py-3 rounded-lg bg-slate-800/50 hover:bg-slate-700 text-white font-semibold transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-cyan-500/20 group-hover:-translate-y-1">
                  Get Started
                </button>

                <ul className="space-y-3 flex-1">
                  <li className="flex gap-3 text-sm text-slate-300">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>Complete system setup</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-300">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>WhatsApp integration</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-300">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>Lead qualification setup</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-300">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>Training included</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Monthly Plan (Highlighted) */}
          <div
            ref={setCardRef(1)}
            onMouseMove={handleMouseMove(1)}
            onMouseLeave={handleMouseLeave(1)}
            className="animated-in group md:scale-105 relative"
            style={{
              animationDelay: '0.5s',
              transformStyle: 'preserve-3d' as any,
              transform: `rotateX(${cardRotates[1].x}deg) rotateY(${cardRotates[1].y}deg)`
            }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse pointer-events-none"></div>
            <div className="relative rounded-2xl overflow-visible min-h-[520px]">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-cyan-500/30 opacity-100 rounded-2xl pointer-events-none"></div>

              {/* Card background with glassmorphism */}
              <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xl border border-cyan-400/40 rounded-2xl transition-all duration-500 pointer-events-none"></div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20 rounded-2xl pointer-events-none"></div>

              {/* Content */}
              <div className="relative p-8 space-y-6 flex flex-col h-full">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg shadow-cyan-500/50 z-20">
                  Most Popular
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2 text-cyan-300">Monthly</h3>
                  <p className="text-sm text-slate-300">Ongoing optimization & automation</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-bold text-white">
                      $2,000
                    </span>
                    <span className="text-slate-400">/month</span>
                  </div>
                  <p className="text-sm text-slate-400">Ongoing optimization</p>
                </div>

                <button className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-1 group-hover:scale-105">
                  Get Started
                </button>

                <ul className="space-y-3 flex-1">
                  <li className="flex gap-3 text-sm text-slate-100">
                    <span className="text-cyan-300 font-bold">✓</span>
                    <span>24/7 system monitoring</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-100">
                    <span className="text-cyan-300 font-bold">✓</span>
                    <span>Performance optimization</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-100">
                    <span className="text-cyan-300 font-bold">✓</span>
                    <span>Lead response automation</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-100">
                    <span className="text-cyan-300 font-bold">✓</span>
                    <span>Monthly reporting</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Performance Plan */}
          <div
            ref={setCardRef(2)}
            onMouseMove={handleMouseMove(2)}
            onMouseLeave={handleMouseLeave(2)}
            className="animated-in group"
            style={{
              animationDelay: '0.6s',
              transformStyle: 'preserve-3d' as any,
              transform: `rotateX(${cardRotates[2].x}deg) rotateY(${cardRotates[2].y}deg)`
            }}
          >
            <div className="relative rounded-2xl overflow-visible min-h-[520px]">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

              {/* Card background with glassmorphism */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-white/[0.02] backdrop-blur-[12px] border border-white/10 group-hover:border-white/15 rounded-2xl transition-all duration-500 pointer-events-none"></div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-transparent to-white/0 group-hover:from-purple-500/15 group-hover:to-pink-500/15 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>

              {/* Content */}
              <div className="relative p-8 space-y-6 flex flex-col h-full">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">Performance</h3>
                  <p className="text-sm text-slate-400">Pay per result</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl md:text-3xl font-bold text-white">
                      $20 per booked lead
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">or 5-15% of revenue</p>
                </div>

                <button className="w-full px-6 py-3 rounded-lg bg-slate-800/50 hover:bg-slate-700 text-white font-semibold transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/20 group-hover:-translate-y-1">
                  Contact Sales
                </button>

                <ul className="space-y-3 flex-1">
                  <li className="flex gap-3 text-sm text-slate-300">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>No upfront costs</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-300">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>Pay only for results</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-300">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>Scalable pricing</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-300">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>Revenue sharing option</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animated-in {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}
