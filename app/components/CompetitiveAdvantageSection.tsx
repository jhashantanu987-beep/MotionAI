'use client'

import { BarChart3, Zap, Lock, Target } from 'lucide-react'

const advantageCards = [
  {
    title: 'Data Layer',
    description: 'System collects conversion rates, best-performing scripts, and best-performing funnels.',
    icon: BarChart3
  },
  {
    title: 'Speed Advantage',
    description: 'Response time < 5 seconds — faster than any human or competing system.',
    icon: Zap
  },
  {
    title: 'Switching Cost',
    description: 'Client becomes dependent on your funnel + system, making it hard to switch.',
    icon: Lock
  },
  {
    title: 'Niche Knowledge',
    description: 'Deep specialization in clinics, real estate, etc., with industry-specific scripts.',
    icon: Target
  }
]

export default function CompetitiveAdvantageSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-14">
          <p className="text-sm font-semibold tracking-[0.32em] text-cyan-400 uppercase">Competitive advantage</p>
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Why This System Wins</h2>
          <p className="text-base leading-7 text-slate-300">
            The advantage comes from speed, intelligence, and a setup that is difficult to copy or replace.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {advantageCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="group rounded-[2rem] border border-slate-700/50 bg-slate-800/60 p-8 shadow-lg shadow-slate-900/20 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-cyan-400/50 hover:bg-slate-800/80"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-500/20 text-cyan-400 transition duration-300 group-hover:bg-cyan-500/30">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-6 space-y-3">
                  <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                  <p className="text-sm leading-6 text-slate-300">{card.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
