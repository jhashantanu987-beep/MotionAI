'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, 
  Target, 
  MessageSquare, 
  ShieldCheck, 
  Calendar, 
  RefreshCcw, 
  TrendingUp, 
  Database
} from 'lucide-react'

const steps = [
  {
    title: 'Traffic',
    desc: 'Demand enters from Meta, TikTok, Google, and high-converting landing pages to feed the pipeline.',
    icon: Zap,
    color: 'from-blue-500 to-cyan-400',
    mockup: {
      title: 'Traffic Ingest',
      content: 'Ingesting 450+ leads from Meta/Google ads network. ROAS optimized at 4.2x.',
      sub: 'Source: Multi-Channel'
    }
  },
  {
    title: 'Lead capture',
    desc: 'Visitors are converted into qualified prospects through high-converting capture flows.',
    icon: Target,
    color: 'from-[#efb0ff] to-purple-600',
    mockup: {
      title: 'Neural Capture',
      content: 'High-conversion flow active. User intent detected at 92%. Capturing contact vectors.',
      sub: 'Status: Capturing'
    }
  },
  {
    title: 'AI response',
    desc: 'The system replies in under 5 seconds with qualifying questions and booking intent.',
    icon: MessageSquare,
    color: 'from-[#fcbc29] to-orange-500',
    mockup: {
      title: 'Neural Reply',
      content: 'KLARA: "I noticed you were looking for scaled lead ops. Do you have a current CRM?"',
      sub: 'Reply Time: 1.2s'
    }
  },
  {
    title: 'Qualification',
    desc: 'AI automatically filters and scores leads so your team only works the best opportunities.',
    icon: ShieldCheck,
    color: 'from-[#34d399] to-emerald-600',
    mockup: {
      title: 'Agent Audit',
      content: 'Lead qualified. Score: 94/100. High budget signal detected. Pushing to Booking Engine.',
      sub: 'Intent: High'
    }
  },
  {
    title: 'Booking',
    desc: 'Appointments are scheduled automatically with calendar integration and instant confirmation.',
    icon: Calendar,
    color: 'from-blue-400 to-indigo-500',
    mockup: {
      title: 'Smart Booking',
      content: 'Discovery Call scheduled: Thursday @ 2:30 PM. Calendar sync complete. Zoom link sent.',
      sub: 'Status: Confirmed'
    }
  },
  {
    title: 'Follow-up',
    desc: 'Reminder sequences and no-show recovery keep prospects moving toward conversion.',
    icon: RefreshCcw,
    color: 'from-pink-500 to-rose-500',
    mockup: {
      title: 'Recovery Pulse',
      content: 'Reminder sent via WhatsApp. Link clicked. Lead confirmed attendance.',
      sub: 'Follow-up: Passive'
    }
  },
  {
    title: 'Conversion',
    desc: 'Qualified bookings are turned into paying customers with seamless handoffs.',
    icon: TrendingUp,
    color: 'from-purple-500 to-violet-600',
    mockup: {
      title: 'Revenue Event',
      content: 'Contract signed. Managed Revenue increased by $115k. Welcome sequence active.',
      sub: 'Result: Paid'
    }
  },
  {
    title: 'Data',
    desc: 'Every interaction feeds performance intelligence and improves scripts, funnels, and ROI.',
    icon: Database,
    color: 'from-sky-400 to-blue-600',
    mockup: {
      title: 'Intelligence Loop',
      content: 'ROI: 12x. Optimized script deployed. CPA reduced by 14%. Training next neural node.',
      sub: 'Metric: ROI 12x'
    }
  }
]

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="relative py-40 px-8 max-w-7xl mx-auto overflow-visible" id="how-it-works">
      <div className="text-center mb-24">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-xs font-bold text-[#0077F5] uppercase tracking-[0.3em] mb-4"
        >
          The Process
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter"
        >
          How it works
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#888888] max-w-xl mx-auto text-lg leading-relaxed"
        >
          A full traffic-to-revenue flow that turns demand into qualified bookings and high-value customers.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Steps 1-4 */}
        <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
          {steps.slice(0, 4).map((step, i) => (
            <StepCard 
              key={i} 
              step={step} 
              index={i} 
              active={activeStep === i} 
              onClick={() => setActiveStep(i)} 
            />
          ))}
        </div>

        {/* Center Column: 3D Phone Mockup */}
        {/* Center Column: Synchronized 3D Phone Mockup */}
        <div className="lg:col-span-6 flex justify-center items-center order-1 lg:order-2 mb-12 lg:mb-0">
          <div className="phone-wrap scale-90 sm:scale-100 origin-center">
            <div className="phone-frame w-[310px] aspect-[9/18.5] bg-[#050608] overflow-hidden flex flex-col border-[#111]">
              {/* Hardware Elements */}
              <div className="dynamic-island"></div>
              <div className="side-btn btn-power"></div>
              <div className="side-btn btn-volume-up"></div>
              <div className="side-btn btn-volume-down"></div>

              {/* Internal Screen Content */}
              <div className="relative h-full w-full flex flex-col pt-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.92, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -15 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="flex-1 p-8 flex flex-col items-center justify-center text-center"
                  >
                    <motion.div 
                      className={`w-24 h-24 rounded-[2.5rem] bg-gradient-to-br ${steps[activeStep].color} p-[1px] mb-10 shadow-[0_25px_50px_rgba(0,0,0,0.6)]`}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="w-full h-full rounded-[2.4rem] bg-[#050608] flex items-center justify-center">
                        {React.createElement(steps[activeStep].icon, { className: "w-12 h-12 text-white" })}
                      </div>
                    </motion.div>
                    
                    <h4 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                      {steps[activeStep].mockup.title}
                    </h4>
                    
                    <p className="text-base text-[#8a919c] font-medium leading-relaxed mb-8 px-2">
                      {steps[activeStep].mockup.content}
                    </p>

                    <div className="px-6 py-2.5 rounded-full bg-[#0077F5]/10 border border-[#0077F5]/20 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077F5] shadow-[0_0_20px_rgba(0,119,245,0.1)]">
                      {steps[activeStep].mockup.sub}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Home Indicator */}
                <div className="h-1.5 w-[110px] bg-white/10 rounded-full mx-auto mb-5 translate-y-[-10px]"></div>
              </div>

              {/* Ambient Glow synced to step color */}
              <div className={`absolute -inset-20 bg-gradient-to-br ${steps[activeStep].color} opacity-[0.05] blur-[100px] -z-10 rounded-full transition-all duration-1000`}></div>
            </div>
          </div>
        </div>

        {/* Right Column: Steps 5-8 */}
        <div className="lg:col-span-3 space-y-6 order-3 lg:order-3">
          {steps.slice(4, 8).map((step, i) => (
            <StepCard 
              key={i+4} 
              step={step} 
              index={i+4} 
              active={activeStep === i+4} 
              onClick={() => setActiveStep(i+4)} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ step, index, active, onClick }: { step: any, index: number, active: boolean, onClick: () => void }) {
  const Icon = step.icon
  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer p-6 rounded-3xl border transition-all duration-500 ${
        active 
          ? 'bg-white/[0.04] border-white/10 shadow-2xl scale-105' 
          : 'bg-transparent border-transparent opacity-40 hover:opacity-100 hover:bg-white/[0.02]'
      }`}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
          active ? 'bg-white text-black' : 'bg-white/5 text-white'
        }`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className={`text-xl font-bold tracking-tight transition-all ${active ? 'text-white' : 'text-white/60'}`}>
          {step.title}
        </h3>
      </div>
      <p className={`text-xs leading-relaxed font-medium transition-all ${active ? 'text-[#8a919c]' : 'text-[#8a919c]/40'}`}>
        {step.desc}
      </p>
    </motion.div>
  )
}
