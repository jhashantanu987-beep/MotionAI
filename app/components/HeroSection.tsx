import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-glow backdrop-blur-xl sm:p-12">
      <div className="absolute inset-0 bg-hero-gradient opacity-90" />
      <div className="relative z-10 flex flex-col gap-10 xl:flex-row xl:items-center xl:justify-between">
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200 ring-1 ring-cyan-400/20">
            <Sparkles className="h-4 w-4" />
            AI Revenue System for premium teams
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              AI Revenue System That Converts Leads into Customers Automatically
            </h1>
            <p className="max-w-2xl text-lg text-slate-300 sm:text-xl">
              Klara AI blends lead generation, intelligent automation, and CRM workflows into one premium growth system designed for modern sales teams.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <div className="rounded-full border border-white/10 bg-slate-900/80 px-5 py-3 text-sm text-slate-300">
              Trusted by teams scaling pipeline motion and customer conversations.
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:max-w-lg sm:grid-cols-2">
          <div className="glass-card p-6">
            <p className="text-sm uppercase text-cyan-300">Live uptime</p>
            <p className="mt-3 text-3xl font-semibold">99.98%</p>
            <p className="mt-2 text-sm text-slate-400">Always-on AI capture and booking engine.</p>
          </div>
          <div className="glass-card p-6">
            <p className="text-sm uppercase text-violet-300">Pipeline velocity</p>
            <p className="mt-3 text-3xl font-semibold">+3.4x</p>
            <p className="mt-2 text-sm text-slate-400">Faster sales outcomes with automation nudges.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
