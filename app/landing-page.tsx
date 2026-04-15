'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView, animate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { Activity, BarChart3, Cpu, ShieldCheck, Lock, Globe, Server } from 'lucide-react'
import { API_CONFIG } from '@/app/config/api'
import ComparisonSection from './components/ComparisonSection'
import TestimonialMarquee from './components/TestimonialMarquee'
import PhoneMockup from './components/PhoneMockup'
import ProcessSection from './components/ProcessSection'

/* ─── Floating orb helper ─── */
const Orb = ({ className }: { className: string }) => (
  <div className={`absolute rounded-full pointer-events-none ${className}`} />
)

/* ─── Section observer hook ─── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))

    // Subtle parallax effect for hero background
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const heroParallax = document.getElementById('hero-parallax')
      if (heroParallax) {
        heroParallax.style.transform = `translateY(${scrolled * 0.4}px)`
      }
    }
    window.addEventListener('scroll', handleScroll)

    // Mouse move effect for hoverable elements
    const premiumHoverEls = document.querySelectorAll('.premium-hover')
    premiumHoverEls.forEach(card => {
      card.addEventListener('mousemove', ((e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
          ; (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`)
          ; (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`)
      }) as EventListener)
    })

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
}

/* ─── FAQ Item ─── */
function FaqItem({ q }: { q: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors bg-white/[0.02]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 text-left font-semibold flex items-center justify-between hover:bg-white/[0.04] transition-colors"
      >
        <span className="text-white text-lg">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-cyan-400 flex-shrink-0"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
              Our AI system activates immediately upon setup. Most clients start seeing
              automated responses and qualified leads within the first 24 hours of going live.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Counter({ value }: { value: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [displayValue, setDisplayValue] = useState(0)

  const numericStr = value.replace(/[^0-9.]/g, '')
  const numericValue = parseFloat(numericStr) || 0
  const isFloat = numericStr.includes('.')
  const suffix = value.replace(/[0-9.]/g, '')

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, numericValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(isFloat ? parseFloat(latest.toFixed(1)) : Math.round(latest))
        }
      })
      return () => controls.stop()
    }
  }, [isInView, numericValue, isFloat])

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  )
}

export default function LandingPage() {
  const router = useRouter()
  useScrollReveal()
  const [activeStep, setActiveStep] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  // Lead Form State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' })
  const [formStatus, setFormStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message?: string }>({ type: 'idle' })

  // Rotating Stats State
  const [activeStatIndex, setActiveStatIndex] = useState(0)
  const rotatingStats = [
    { val: '85%', label: 'Lead Response Rate', desc: 'Instant WhatsApp replies within 5 seconds of lead arrival.', color: 'from-[#0077F5] to-blue-600' },
    { val: '3.2x', label: 'More Qualified Leads', desc: 'AI qualification increases conversion-ready leads by 320%.', color: 'from-blue-400 to-cyan-500' },
    { val: '500+', label: 'Booked Appointments', desc: 'Successfully booked client appointments through automated follow-ups.', color: 'from-purple-500 to-indigo-600' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStatIndex((prev) => (prev + 1) % rotatingStats.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])


  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Strict Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.notes) {
      setFormStatus({ type: 'error', message: 'Please provide all details (Name, Email, Phone, and Goal) to activate the engine.' })
      return
    }

    setFormStatus({ type: 'loading' })
    try {
      const res = await fetch(`${API_CONFIG.baseUrl}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData, // This now includes 'notes'
          source: 'manual',
          score: 0, // Backend will recalculate
        })
      })

      const data = await res.json()
      if (data.success) {
        setFormStatus({ type: 'success', message: 'Success! Our AI will contact you on WhatsApp in < 5s.' })
        setFormData({ name: '', email: '', phone: '', notes: '' })
      } else {
        setFormStatus({ type: 'error', message: data.message || 'Submission failed.' })
      }
    } catch (err) {
      setFormStatus({ type: 'error', message: 'Server unreachable. Is the backend running?' })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hero mouse tracking
  const heroRef = useRef<HTMLElement>(null)
  const mX = useMotionValue(0)
  const mY = useMotionValue(0)
  const springX = useSpring(mX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mY, { stiffness: 50, damping: 20 })

  function handleMouseMove(e: React.MouseEvent) {
    if (!heroRef.current) return
    const { left, top } = heroRef.current.getBoundingClientRect()
    mX.set(e.clientX - left)
    mY.set(e.clientY - top)
  }

  const steps = [
    { title: 'Traffic', desc: 'Demand is sourced from Meta, TikTok, Google and optimized landing pages.', color: '#3496e3' },
    { title: 'Lead capture', desc: 'Visitors are converted into qualified prospects through high-converting capture flows.', color: '#efb0ff' },
    { title: 'AI response', desc: 'The system replies in under 5 seconds with qualifying questions and booking intent.', color: '#fcbc29' },
    { title: 'Qualification', desc: 'AI automatically filters and scores leads so your team only works the best opportunities.', color: '#34d399' },
    { title: 'Booking', desc: 'Appointments are scheduled automatically with calendar integration and instant confirmation.', color: '#ffffff' },
    { title: 'Follow-up', desc: 'Reminder sequences and no-show recovery keep prospects moving toward conversion.', color: '#fb7185' },
    { title: 'Conversion', desc: 'Qualified bookings are turned into paying customers with seamless handoffs.', color: '#a855f7' },
    { title: 'Data', desc: 'Every interaction feeds performance intelligence and improves scripts, funnels, and ROI.', color: '#38bdf8' },
  ]

  const faqItems = [
    'How fast will I start getting leads?',
    'What happens when a lead comes in?',
    'Do I need to reply manually?',
    'Will this work for my business?',
    "What if a lead doesn't respond?",
    'How do I track results?',
  ]

  const row1Testimonials = [
    { name: 'Sarah Miller', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e', role: 'Clinic Manager', company: 'DentalSpa', quote: 'The AI is frighteningly fast. We booked 12 patients while our receptionist was on lunch.', metric: '$4.2K', metricLabel: 'Weekly Boost' },
    { name: 'Dr. David Chen', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a', role: 'Lead Dentist', company: 'BrightSmile', quote: 'The patient qualification is perfect. Our high-intent leads have tripled in 30 days.', metric: '92%', metricLabel: 'Qual Rate' },
    { name: 'Elena Rodriguez', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956', role: 'Ops Director', company: 'GlowMed', quote: 'Simple, elegant, and powerful. It handled 400+ inquiries this week sans manual input.', metric: '15hr', metricLabel: 'Saved/Wk' },
    { name: 'Thomas Vance', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7', role: 'Founder', company: 'Vance Cons.', quote: 'The follow-up system is a total gamechanger. We recovered 4 lost deals in the first week.', metric: '4.5x', metricLabel: 'ROAS' },
  ]

  const row2Testimonials = [
    { name: 'Mike Thompson', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', role: 'Principal', company: 'Urban Realty', quote: 'Finally, an AI that understands intent. Our conversion rate hit record highs in March.', metric: '$850k', metricLabel: 'Pipe Value' },
    { name: 'Jessica Wu', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80', role: 'Growth Lead', company: 'Arca Growth', quote: 'Deployment was minutes, results were instant. Our lead velocity is through the roof.', metric: '320%', metricLabel: 'Velocity' },
    { name: 'Robert Blake', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e', role: 'Sales VP', company: 'Nexus Real Estate', quote: 'Our human agents now only talk to verified, high-intent buyers. It is a dream.', metric: '0.4s', metricLabel: 'Reply Time' },
    { name: 'Sophia Loren', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', role: 'Marketing Dir', company: 'Aesthetix', quote: 'The ROI was clear within 48 hours. Best software investment we have made this year.', metric: '12x', metricLabel: 'ROI' },
  ]

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden selection:bg-blue-500/30" style={{ background: '#000000' }} suppressHydrationWarning={true}>

      {/* ═══════════════════════ MAXIMUX BACKGROUND ═══════════════════════ */}
      <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
        {/* Screenshot Specific Glows */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[60%] glow-purple opacity-40 rounded-full" />
        <div className="absolute top-0 left-0 w-[40%] h-[40%] glow-orange-top opacity-30" />
        <div className="absolute top-0 right-0 w-[30%] h-[30%] glow-corner-white opacity-40" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* ═══════════════════════ NAVBAR ═══════════════════════ */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'
          }`}
      >
        <div
          className={`flex justify-between items-center mx-auto transition-all duration-300 ${isScrolled
              ? 'max-w-4xl px-6 py-2 bg-[#0c0c14]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
              : 'max-w-7xl px-8 bg-transparent border-transparent'
            }`}
        >
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src="/images/IMG_2224.png"
              alt="KLARA AI logo"
              className="h-9 w-9 rounded-[0.4rem] object-cover border border-white/10 bg-slate-950/80"
            />
            <span className="text-xl font-bold tracking-tighter text-white">KLARA AI</span>
          </div>
          <div className={`hidden md:flex items-center font-medium tracking-tight ${isScrolled ? 'space-x-4 text-xs' : 'space-x-6 text-sm'}`}>
            <a className="px-4 py-1.5 rounded-full bg-white/10 text-white transition-all border border-white/5" href="/">Home</a>
            <a className="nav-link text-white/50 hover:text-white transition-colors" href="#features">Features</a>
            <a className="nav-link text-white/50 hover:text-white transition-colors" href="#pricing">Pricing</a>
            <a className="nav-link text-white/50 hover:text-white transition-colors" href="#faqs">FAQs</a>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className={`rounded-full bg-[#0077F5] text-white font-bold hover:brightness-110 active:scale-95 transition-all px-6 py-2.5 text-sm shadow-lg shadow-blue-500/20`}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative px-8 pt-20 pb-32 max-w-7xl mx-auto overflow-hidden"
      >
        {/* Subtle glow layers */}
        <div className="parallax-bg absolute inset-0 -z-10 opacity-30" id="hero-parallax">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0077F5]/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#0077F5]/5 rounded-full blur-[120px]"></div>
        </div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#efb0ff] animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#efb0ff]">We generate and convert demand using AI</span>
            </div>
            <h1 className="text-5xl md:text-[4rem] font-bold tracking-tighter text-white mb-8 leading-[1.05] max-w-4xl text-left">
              We generate and convert demand using AI <span className="text-[#888888]">— end-to-end</span> <span className="text-[#F97316]">from traffic to booking</span>
            </h1>
            <p className="text-xl text-[#888888] mb-12 max-w-xl text-left leading-relaxed">
              From traffic to booking to revenue, our AI system captures demand, qualifies leads, and automates every conversion step with performance-aligned incentives.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-20">
              <button onClick={() => router.push('/dashboard')} className="px-10 py-5 rounded-full bg-[#0077F5] text-white font-bold transition-all hover:shadow-[0_0_40px_rgba(0,119,245,0.4)] hover:scale-105 active:scale-95 text-lg">
                Get started free
              </button>
              <button className="px-10 py-5 rounded-full bg-white/5 text-white font-bold hover:bg-white/10 transition-all border border-white/10 hover:scale-105 active:scale-95 text-lg backdrop-blur-sm">
                Book a demo
              </button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end relative">
            {/* Multi-layered Backlight Glows */}
            <div className="absolute bottom-[-10%] left-[-5%] w-[70%] h-[70%] bg-purple-600/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute top-[-5%] left-[10%] w-[60%] h-[60%] bg-orange-500/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-[#0077F5]/5 rounded-full blur-[120px] -z-10" />

            {/* Hanging Connectivity Decor (SVG) */}
            <svg className="absolute -top-12 -left-12 w-32 h-32 text-blue-500/20 -z-10" viewBox="0 0 100 100">
              <path d="M0 50 H50 V100" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="2" fill="currentColor" />
            </svg>
            <svg className="absolute -bottom-8 -right-8 w-40 h-40 text-purple-500/20 -z-10 rotate-180" viewBox="0 0 100 100">
              <path d="M0 50 H60 V100" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              <circle cx="60" cy="50" r="1.5" fill="currentColor" />
            </svg>

            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TRUST SECTION ═══════════════════════ */}
      <section className="py-24 border-y border-white/[0.06] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Text Side (1/3) */}
          <div className="col-span-1" data-reveal>
            <p className="text-xl font-medium text-white/40 leading-snug">
              Trusted by leading <span className="text-[#F97316] font-bold">businesses</span> worldwide.
            </p>
          </div>

          {/* Marquee Side (2/3) */}
          <div className="col-span-1 lg:col-span-2 relative marquee-mask overflow-hidden" data-reveal style={{ '--delay': '200ms' } as React.CSSProperties}>
            <div className="flex animate-marquee whitespace-nowrap">
              {['DentalCare Pro', 'RealEstate Plus', 'Consulting Hub', 'Tech Solutions', 'Business Growth', 'Marketing Pro',
                'DentalCare Pro', 'RealEstate Plus', 'Consulting Hub', 'Tech Solutions', 'Business Growth', 'Marketing Pro'].map((name, i) => (
                  <span
                    key={i}
                    className="inline-block mx-12 text-lg font-bold text-white/20 hover:text-white transition-colors"
                  >
                    {name}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ KLARA AI SECTIONS ═══════════════════════ */}

      {/* New: How It Works Section */}
      <ProcessSection />

      {/* Core Systems Section */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden bg-[#05050b]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-reveal>
            <p className="text-xs font-bold text-[#0077F5] uppercase tracking-[0.3em] mb-4">Core Systems</p>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">3 systems that power demand, conversion, and operations</h2>
            <p className="text-[#888888] max-w-3xl mx-auto text-lg leading-relaxed">A fully integrated growth stack with a demand engine, AI revenue agent, and back-office OS to convert leads into paying customers.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-[#0077F5]/10 text-[#0077F5] mb-6">
                <Activity className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Demand Engine</h3>
              <p className="text-sm text-slate-300 mb-5">Generate traffic and capture high-value leads across the top channels.</p>
              <ul className="space-y-3 text-slate-300">
                <li>Meta, TikTok, Google ads</li>
                <li>Landing pages and funnel creation</li>
                <li>AI UGC creatives and ad management</li>
                <li>Lead capture and qualification</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-[#22c55e]/10 text-[#22c55e] mb-6">
                <BarChart3 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Revenue Agent System</h3>
              <p className="text-sm text-slate-300 mb-5">Convert leads into bookings and paid customers with AI-driven sales automation.</p>
              <ul className="space-y-3 text-slate-300">
                <li>AI SDR chat across web, WhatsApp, Instagram</li>
                <li>Calendar integration and auto scheduling</li>
                <li>No-show recovery and drip follow-up</li>
                <li>Call summaries and missed opportunity detection</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-[#8b5cf6]/10 text-[#8b5cf6] mb-6">
                <Cpu className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Back-Office OS</h3>
              <p className="text-sm text-slate-300 mb-5">Automate operations, reporting, and data flow so the business runs smoothly.</p>
              <ul className="space-y-3 text-slate-300">
                <li>Invoice reminders and CRM sync</li>
                <li>Task routing and workflow automation</li>
                <li>Reporting and revenue analytics</li>
                <li>Continuous performance feedback loops</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase Section 1 */}
      <section className="py-24 px-8 max-w-7xl mx-auto" id="feature-1">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div data-reveal>
            <div className="w-12 h-12 rounded-xl bg-[#0077F5]/10 flex items-center justify-center mb-8 border border-[#0077F5]/20">
              <span className="material-symbols-outlined text-[#0077F5]">neurology</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">Instant WhatsApp Reply</h2>
            <p className="text-lg text-[#888888] mb-10 leading-relaxed font-medium">
              Respond to leads in under 5 seconds. Our AI immediately engages prospects with personalized messages, ensuring you're always the first to connect.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 transition-all" data-reveal style={{ '--delay': '100ms' } as React.CSSProperties}>
                <div className="mt-1 w-5 h-5 rounded-full bg-[#0077F5]/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#0077F5] text-sm">check</span>
                </div>
                <p className="text-white font-semibold">Auto-qualify leads via conversation</p>
              </li>
              <li className="flex items-start gap-4 transition-all" data-reveal style={{ '--delay': '200ms' } as React.CSSProperties}>
                <div className="mt-1 w-5 h-5 rounded-full bg-[#3496e3]/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#3496e3] text-sm">check</span>
                </div>
                <p className="text-white font-medium">Real-time intent detection</p>
              </li>
            </ul>
          </div>
          <div className="relative" data-reveal style={{ '--delay': '300ms' } as React.CSSProperties}>
            <div className="relative rounded-2xl overflow-hidden border border-white/5 glass-panel shadow-2xl transition-all duration-700 hover:scale-[1.02]">
              <img alt="WhatsApp Automation Interface" className="w-full h-auto" src="https://lh3.googleusercontent.com/aida/ADBb0uitIj52HVp6qfajyOeZI7JBaNw7JFZWFcEtzBiQ0hCHZPogJMU2Qx2mPo478_-C9ULLGUlokYPPhsQSC18yTa2xQBCrbwYj-lPQaYcQnilffMWviAAqodfCI7ExJvHyk3T33uW99dAKMdqwEiaK0tWX0F2-QzADEPjagrpJ3l_vpqHlO4bZH1seuTqgi4L3Aur0aSaQF4wILw3FDOxfT5osDG2n6Ce5UgRHoP0FxQSQlsjGGYK-eP24KrZTPkadxNTKsTK6Ci6G" style={{ filter: 'none' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase Section 2 */}
      <section className="py-24 px-8 max-w-7xl mx-auto" id="feature-2">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 relative" data-reveal style={{ '--delay': '300ms' } as React.CSSProperties}>
            <div className="relative rounded-2xl overflow-hidden border border-white/5 glass-panel shadow-2xl transition-all duration-700 hover:scale-[1.02]">
              <img alt="Automated Follow-ups interface" className="w-full h-auto" src="https://lh3.googleusercontent.com/aida/ADBb0uiGImwQQSEqekbK3BEpYoA-tkvy97SkK9Bpf9XxmYvuM44ZOVcJ0oyAptUUbWjbzird4ZOhXsUXa8E6cT5bsjcK-Yjnbx881bcsYHoDVhOPCjjm9jOcxVljiofSo1oj8q58kW_NuTVVRsQXsmKOj3v1PotsAms5EFE08VT5BfSAk58bLXgTBpFP3VywkOnosgOqEzDrUDgKXC0QnL9gI9yiEwWwoVSoWREcrdGK-EFJREs5UFrvkTXR_jg2ofim_WLCUfZluOvFSg" style={{ filter: 'none' }} />
            </div>
          </div>
          <div className="order-1 lg:order-2" data-reveal>
            <div className="w-12 h-12 rounded-xl bg-[#0077F5]/10 flex items-center justify-center mb-8 border border-[#0077F5]/20">
              <span className="material-symbols-outlined text-[#0077F5]">history</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">Automated Follow-ups</h2>
            <p className="text-lg text-[#888888] mb-10 leading-relaxed">
              Re-engage leads who haven't responded. Persistent, intelligent follow-ups ensure no potential client falls through the cracks.
            </p>
            <div className="premium-hover p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm" data-reveal style={{ '--delay': '200ms' } as React.CSSProperties}>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-white">85%</span>
                <span className="text-xs text-[#0077F5] font-bold uppercase tracking-widest">Lead Response Rate</span>
              </div>
              <p className="text-sm text-[#888888] font-medium">Industry leading conversion metrics for automated messaging workflows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase Section 3 */}
      <section className="py-24 px-8 max-w-7xl mx-auto" id="feature-3">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div data-reveal>
            <div className="w-12 h-12 rounded-xl bg-[#0077F5]/10 flex items-center justify-center mb-8 border border-[#0077F5]/20">
              <span className="material-symbols-outlined text-[#0077F5]">trending_up</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">Surge in Lead Activity</h2>
            <p className="text-lg text-[#888888] mb-10 leading-relaxed">
              Scale your operations without increasing headcount. Our infrastructure handles thousands of simultaneous leads with zero latency.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="premium-hover p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm" data-reveal style={{ '--delay': '100ms' } as React.CSSProperties}>
                <p className="text-3xl font-bold text-white mb-1">450%</p>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Volume Increase</p>
              </div>
              <div className="premium-hover p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm" data-reveal style={{ '--delay': '200ms' } as React.CSSProperties}>
                <p className="text-3xl font-bold text-white mb-1">0.4s</p>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">AI Response Time</p>
              </div>
            </div>
          </div>
          <div className="relative" data-reveal style={{ '--delay': '300ms' } as React.CSSProperties}>
            <div className="relative rounded-2xl overflow-hidden border border-white/5 glass-panel shadow-2xl transition-all duration-700 hover:scale-[1.02]">
              <img alt="Lead activity analytics chart" className="w-full h-auto" src="https://lh3.googleusercontent.com/aida/ADBb0ujKR-31jBGutKwMcEdPl_NZc54HsdzyxpGx1U2uQHseFgTzzPCMjgYWRcB1Pr6F4byf44fe3vxcVboN9LnpJhloPYT3-v4Fsd1vh6NoCKoM52FslQl6to8tgiWXdrWssnxcUAZ478-VjDSFMf5w3UCkTYAd8lquw0RcYXnk-zI41xZISI1c0PwZuzHmhqtMueK0RuQEkA5cU7jJIjZFz1UVSM2WpSInBL100A5EongrJ4Sdl9QSy42kutFQfCQx3iqKypCV4VP4WA" style={{ filter: 'none' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Results from Real Users - ARCLINE STYLE MARQUEE */}
      <section className="py-24 sm:py-32 relative overflow-hidden bg-[#020202]">
        <div className="max-w-7xl mx-auto px-8 mb-16 sm:mb-24">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20" data-reveal>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Wall of Proof</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter" data-reveal style={{ '--delay': '100ms' } as React.CSSProperties}>
              Engineered for <span className="text-blue-500">Absolute Results</span>
            </h2>
            <p className="text-[#8a919c] max-w-2xl text-lg font-medium" data-reveal style={{ '--delay': '200ms' } as React.CSSProperties}>
              See how modern enterprises are deploying KLARA AI to eliminate lead friction and accelerate revenue.
            </p>
          </div>
        </div>

        <div className="space-y-0" data-reveal style={{ '--delay': '300ms' } as React.CSSProperties}>
          <TestimonialMarquee testimonials={row1Testimonials} direction="left" speed={60} />
          <TestimonialMarquee testimonials={row2Testimonials} direction="right" speed={55} />
        </div>

        {/* Ambient Bottom Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-1/2 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      </section>

      {/* Comparison Section */}

      {/* ═══════════════════════ ANIMATED STATS ═══════════════════════ */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.06) 50%, transparent 100%)',
          }}
        />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12" data-reveal>
            <h2 className="text-4xl md:text-5xl font-black">
              <span
                style={{
                  background: 'linear-gradient(90deg, #ffffff 0%, #fb923c 50%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Our results in numbers
              </span>
            </h2>
          </div>

          <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStatIndex}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              >
                <div
                  className="text-[8rem] md:text-[12rem] font-black leading-none mb-4 tracking-tighter"
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(0,119,245,0.2))',
                  }}
                >
                  <div className={`bg-gradient-to-br ${rotatingStats[activeStatIndex].color} bg-clip-text text-transparent`}>
                    <Counter value={rotatingStats[activeStatIndex].val} />
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                  {rotatingStats[activeStatIndex].label}
                </h3>

                <p className="text-xl text-[#888888] max-w-2xl font-medium leading-relaxed">
                  {rotatingStats[activeStatIndex].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SECURITY BADGES ═══════════════════════ */}
      <section className="py-32 px-4 sm:px-6 relative overflow-hidden bg-[#0a0a0f] border-y border-white/[0.06]">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#06060c] via-transparent to-[#06060c]" />
        </div>
        {/* Radar Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16" data-reveal>
            <h3 className="text-3xl md:text-5xl font-black mb-4 text-white tracking-tight">Enterprise-Grade Security &amp; Compliance</h3>
            <p className="text-[#8a919c] text-lg max-w-2xl mx-auto">Your data is protected with industry-leading security standards</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: 'SOC 2 Type II', desc: 'Security & compliance certified', color: 'text-green-400', shadow: 'hover:shadow-[0_0_30px_rgba(74,222,128,0.15)]' },
              { icon: Lock, title: 'End-to-End Encryption', desc: '256-bit AES encryption', color: 'text-blue-400', shadow: 'hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]' },
              { icon: Globe, title: 'GDPR Compliant', desc: 'European data protection', color: 'text-purple-400', shadow: 'hover:shadow-[0_0_30px_rgba(192,132,252,0.15)]' },
              { icon: Server, title: '99.9% Uptime', desc: 'Enterprise SLA guarantee', color: 'text-orange-400', shadow: 'hover:shadow-[0_0_30px_rgba(251,146,60,0.15)]' },
            ].map(({ icon: Icon, title, desc, color, shadow }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative group p-8 rounded-[2rem] bg-[#0c0c14]/90 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 ${shadow} hover:-translate-y-2`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={`w-14 h-14 mb-6 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${color} group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300`}>
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-white text-lg mb-2">{title}</h4>
                <p className="text-[#8a919c] text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <ComparisonSection />

      {/* ═══════════════════════ PRICING ═══════════════════════ */}
      <section id="pricing" className="py-24 md:py-36 px-4 sm:px-6 relative">
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.5) 50%, transparent 100%)' }}
        />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16" data-reveal>
            <p className="text-xs font-bold tracking-[0.3em] text-cyan-300 uppercase mb-4">Pricing</p>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-5">Choose your plan</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Flexible pricing designed to scale with your business. Start with setup, then choose ongoing or performance-based pricing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {[
              {
                name: 'Setup', sub: 'One-time activation fee to launch the system', price: '$300', period: 'One-time fee',
                cta: 'Get Started', ctaStyle: 'border', popular: false,
                features: ['Demand strategy & funnel setup', 'Full campaign and integration build', 'Lead capture activation', 'System onboarding'],
                glow: false,
              },
              {
                name: 'Monthly', sub: 'Ongoing optimization & campaign management', price: '$2K', period: '/month',
                cta: 'Get Started', ctaStyle: 'gradient', popular: true,
                features: ['Lead nurturing and reporting', 'Creative refreshes', 'Performance tuning', 'Follow-up automation'],
                glow: true,
              },
              {
                name: 'Performance', sub: 'Aligned incentives for growth', price: '$25 per booked lead', period: 'or 10% of revenue',
                cta: 'Contact Sales', ctaStyle: 'border', popular: false,
                features: ['Pay per booked lead', 'Revenue share option', 'No upfront revenue risk', 'Aligned growth targets'],
                glow: false,
              },
            ].map(({ name, sub, price, period, cta, ctaStyle, popular, features, glow }, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`relative group ${popular ? 'md:-mt-4 md:mb-4' : ''}`}
                data-reveal
                style={{ '--delay': `${i * 100}ms` } as React.CSSProperties}
              >
                {popular && (
                  <>
                    <div className="absolute -inset-px bg-gradient-to-r from-[#3496e3] via-[#efb0ff] to-[#3496e3] rounded-2xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-[#3496e3] to-[#efb0ff] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      Most Popular
                    </div>
                  </>
                )}
                <div className={`relative rounded-2xl border p-8 min-h-[520px] flex flex-col backdrop-blur-xl
                  ${popular ? 'border-cyan-400/50 bg-gradient-to-br from-cyan-500/10 to-blue-500/10' : 'border-white/10 bg-white/[0.03]'}
                  group-hover:border-white/20 transition-all duration-300
                `}>
                  <div className="mb-6">
                    <h3 className={`text-2xl font-bold mb-1 ${popular ? 'text-cyan-300' : 'text-white'}`}>{name}</h3>
                    <p className="text-sm text-gray-400">{sub}</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-3xl md:text-4xl font-black text-white">{price}</span>
                    <span className="text-gray-400 text-sm ml-1">{period}</span>
                  </div>
                  <button
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 mb-6
                      ${ctaStyle === 'gradient'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 shadow-lg shadow-cyan-500/30'
                        : 'border border-white/15 text-white hover:bg-white/10 hover:border-white/30'
                      }
                    `}
                  >
                    {cta}
                  </button>
                  <ul className="space-y-3 flex-1">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-[#8a919c]">
                        <span className={`font-black ${popular ? 'text-[#efb0ff]' : 'text-[#3496e3]'}`}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ VIDEO DEMO ═══════════════════════ */}
      <section className="py-32 px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14" data-reveal>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span
                style={{
                  background: 'linear-gradient(90deg, #ffffff 0%, #c4b5fd 50%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                See it in action
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Watch how KLARA AI transforms leads into booked appointments automatically</p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-video" data-reveal>
            {/* Background gradient masquerade */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0a0a20] to-slate-900" />
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/30 rounded-full blur-xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1 group-hover:border-l-cyan-300 transition-colors duration-300" />
                </div>
              </div>
            </div>
            {/* Caption */}
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-white font-bold text-lg mb-1">Lead to Booking in 60 Seconds</h3>
              <p className="text-gray-400 text-sm">Real demonstration of automated lead qualification and booking</p>
            </div>
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">2:34</div>
          </div>

          <div className="flex justify-center gap-10 mt-8 text-sm text-gray-500">
            {[{ dot: 'bg-green-400', label: 'Live Demo' }, { dot: 'bg-blue-400', label: 'Real Results' }, { dot: 'bg-purple-400', label: 'Enterprise Ready' }].map(({ dot, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-2 h-2 ${dot} rounded-full`} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FAQ ═══════════════════════ */}
      <section id="faqs" className="py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14" data-reveal>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Frequently asked questions</h2>
            <p className="text-gray-400 text-lg">Everything you need to get started: features, setup, pricing, and getting more clients.</p>
          </div>
          <div className="space-y-3 mb-16" data-reveal>
            {faqItems.map((q) => <FaqItem key={q} q={q} />)}
          </div>

          <div className="text-center p-14 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-xl" data-reveal>
            <p className="text-gray-400 mb-2 text-sm">Something unclear?</p>
            <h3 className="text-3xl font-black text-white mb-6">Reach out anytime.</h3>
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30">
              Send us a message
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA BANNER ═══════════════════════ */}
      <section className="py-32 px-4 sm:px-6 text-center relative" data-reveal>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 65%)',
          }}
        />
        <div className="max-w-3xl mx-auto relative">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-5">Ready to Scale Your Revenue with AI?</h2>
          <p className="text-gray-400 text-lg mb-10">Book a Demo and Start Converting More Leads Today</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-12 py-5 text-white font-black rounded-full text-lg transition-all duration-300 relative group overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0066FF 0%, #4f46e5 100%)',
              boxShadow: '0 0 60px rgba(79,70,229,0.5), 0 20px 40px rgba(0,0,0,0.4)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Book Demo <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>
        </div>
      </section>

      {/* ═══════════════════════ WHATSAPP LEAD FORM ═══════════════════════ */}
      <section className="py-24 px-4 sm:px-6 border-t border-white/[0.06]">
        <div className="max-w-md mx-auto">
          <p className="text-center text-lg font-bold text-white mb-5">Enter your number and get an instant WhatsApp reply</p>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7">
            {formStatus.type === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                  <span className="material-symbols-outlined text-green-400 text-3xl font-black">check</span>
                </div>
                <h4 className="text-xl font-bold text-white">System Activated</h4>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">{formStatus.message}</p>
                <button
                  onClick={() => setFormStatus({ type: 'idle' })}
                  className="text-xs font-bold text-[#0077F5] uppercase tracking-widest hover:underline"
                >
                  Submit Another
                </button>
              </motion.div>
            ) : (
              <form className="space-y-4" onSubmit={handleLeadSubmit}>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-all font-medium"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-all font-medium"
                />
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-all font-medium"
                />
                <textarea
                  required
                  placeholder="Business Goal / Primary Pain Point"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-all font-medium resize-none"
                />

                {formStatus.type === 'error' && (
                  <p className="text-xs text-rose-500 font-bold bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                    ⚠️ {formStatus.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formStatus.type === 'loading'}
                  className="relative w-full py-4 font-black rounded-xl text-white transition-all duration-300 group overflow-hidden disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, #0077F5 0%, #0066FF 100%)',
                    boxShadow: '0 4px 20px rgba(0,119,245,0.35)',
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {formStatus.type === 'loading' ? (
                      <span className="animate-pulse">Connecting to Revenue Engine...</span>
                    ) : (
                      <>Get Started Now <span className="group-hover:translate-x-1 transition-transform">→</span></>
                    )}
                  </span>
                </button>
              </form>
            )}
            <p className="text-center text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-6">Automated Qualification Engine Active</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <footer className="border-t border-white/[0.06] bg-[#020202] py-20 px-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#efb0ff]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/images/IMG_2224.png"
                  alt="KLARA AI logo"
                  className="h-9 w-9 rounded-[0.4rem] object-cover border border-white/10"
                />
                <span className="text-2xl font-black tracking-tighter text-white">KLARA AI</span>
              </div>
              <p className="text-[#8a919c] text-sm leading-relaxed max-w-sm mb-8">
                The ultimate engine for modern digital craftsmanship that captures and qualifies prospects while you sleep.
              </p>
            </div>

            {[
              { title: 'AI Revenue System', links: ['Demand Engine', 'AI Sales Agent', 'Booking System', 'Follow-up Automation', 'Revenue Analytics'] },
              { title: 'Performance', links: ['Ad Optimization', 'Lead Conversion', 'Funnel Tracking', 'ROAS Insights', 'AI Optimization'] },
              { title: 'Resources', links: ['Case Studies', 'Guides', 'Documentation', 'API', 'System Status'] },
              { title: 'Company', links: ['About', 'Careers', 'Contact', 'Blog'] },
            ].map(({ title, links }) => (
              <div key={title} className="col-span-1">
                <h4 className="font-bold text-white mb-6 tracking-wide">{title}</h4>
                <div className="space-y-4">
                  {links.map((l) => (
                    <a key={l} href="#" className="block text-[#8a919c] font-medium text-sm hover:text-[#3496e3] transition-colors">{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 gap-4">
            <div className="text-center md:text-left text-[#8a919c] text-sm font-medium">
              © 2026 KLARA AI — AI-Powered Revenue Systems
            </div>

            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8a919c] hover:bg-white/10 hover:text-white transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8a919c] hover:bg-white/10 hover:text-white transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8a919c] hover:bg-white/10 hover:text-white transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
