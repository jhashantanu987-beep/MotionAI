'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Zap, Bot, Calendar, Repeat, TrendingUp, CircleDollarSign, CheckCircle2, XCircle, LayoutGrid, Sun } from 'lucide-react'

export default function ComparisonSection() {
  const router = useRouter()
  const ourPlatform = [
    { icon: <Zap className="w-5 h-5 text-yellow-400" />, text: 'Generate High-Quality Leads Automatically' },
    { icon: <Bot className="w-5 h-5 text-blue-400" />, text: 'AI Responds Instantly (<5 seconds)' },
    { icon: <Calendar className="w-5 h-5 text-purple-400" />, text: 'Auto-Books Qualified Appointments' },
    { icon: <Repeat className="w-5 h-5 text-cyan-400" />, text: 'Follow-Up System Recovers Lost Leads' },
    { icon: <TrendingUp className="w-5 h-5 text-green-400" />, text: 'Optimizes Campaigns for Maximum ROAS' },
    { icon: <CircleDollarSign className="w-5 h-5 text-emerald-400" />, text: 'Turns Traffic into Paying Customers' },
  ]

  const oldWay = [
    { text: 'Rely on manual lead handling' },
    { text: 'Slow response = lost customers' },
    { text: 'Missed bookings and no-shows' },
    { text: 'No follow-up = wasted leads' },
    { text: 'Guesswork in ads performance' },
    { text: 'Traffic without conversions' },
  ]

  return (
    <section className="py-32 px-8 relative overflow-hidden bg-[#06060c]">
      {/* Background Dots */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-8" data-reveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
            <LayoutGrid className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-300">Comparison</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-20" data-reveal>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4">
            Why Businesses Choose
          </h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white/40">
            Our AI Revenue System
          </h3>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Your Platform (Left Side) */}
          <div 
            className="relative group p-1 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/5 shadow-2xl overflow-hidden"
            data-reveal
            style={{ '--delay': '100ms' } as React.CSSProperties}
          >
            {/* Inner Glow */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-green-500/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative h-full p-8 md:p-12 rounded-[2.3rem] bg-[#0c0c14]/80 backdrop-blur-xl border border-white/5 flex flex-col">
              {/* Header Box */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner overflow-hidden uppercase">
                   <img 
                      src="/images/IMG_2224.png" 
                      alt="KLARA logo" 
                      className="w-full h-full object-cover"
                   />
                </div>
                <h4 className="text-2xl font-black text-white">KLARA</h4>
              </div>

              {/* List */}
              <ul className="space-y-6 flex-1 mb-12">
                {ourPlatform.map((item, i) => (
                  <li key={i} className="flex items-center gap-5 group/item">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover/item:border-green-500/30 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-lg font-medium text-white/90 group-hover/item:text-white transition-colors">{item.text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button 
                onClick={() => router.push('/dashboard')}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-lg shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:shadow-[0_0_50px_rgba(34,197,94,0.5)] hover:scale-[1.02] active:scale-95 transition-all"
              >
                Start Generating Revenue with AI
              </button>
            </div>
          </div>

          {/* The Old Way (Right Side) */}
          <div 
            className="relative p-1 rounded-[2.5rem] border border-white/5 transition-all duration-700"
            data-reveal
            style={{ '--delay': '200ms' } as React.CSSProperties}
          >
            <div className="relative h-full p-8 md:p-12 rounded-[2.3rem] bg-white/[0.02] border border-white/5 flex flex-col">
              {/* Header Box */}
              <div className="flex items-center gap-4 mb-10 opacity-60">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                   <Sun className="w-7 h-7 text-white/60" />
                </div>
                <h4 className="text-2xl font-black text-white/60">Old Way</h4>
              </div>

              {/* List */}
              <ul className="space-y-6 flex-1">
                {oldWay.map((item, i) => (
                  <li key={i} className="flex items-center gap-5 opacity-40 grayscale">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <XCircle className="w-5 h-5 text-white/40" />
                    </div>
                    <span className="text-lg font-medium text-white/60">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
