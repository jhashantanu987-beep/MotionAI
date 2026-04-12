'use client'

import { Bolt, Repeat, ShieldCheck, TrendingUp } from 'lucide-react'

const revenueCards = [
  {
    title: 'Setup Fee',
    price: '$2,500',
    description: 'One-time onboarding, strategy, and activation fee to launch your growth machine.',
    features: ['Custom campaign design', 'Full systems audit', 'Integration setup'],
    icon: ShieldCheck,
    accent: 'from-slate-800 via-slate-900 to-black',
    highlighted: false
  },
  {
    title: 'Monthly Retainer',
    price: '$7,500/month',
    description: 'Ongoing management, optimizations, and team support to keep performance moving.',
    features: ['Weekly reporting', 'Strategy calls', 'Creative refreshes'],
    icon: Repeat,
    accent: 'from-slate-700 via-slate-800 to-slate-900',
    highlighted: false
  },
  {
    title: 'Performance-Based',
    price: '15% of new revenue',
    description: 'We only earn when your revenue grows—aligned incentives for long-term success.',
    features: ['Revenue share model', 'No win, no fee structure', 'Aligned growth targets'],
    icon: TrendingUp,
    accent: 'from-indigo-600 via-fuchsia-600 to-pink-500',
    highlighted: true
  },
  {
    title: 'Demand Generation',
    price: 'Optional +$3,000',
    description: 'High-converting lead generation campaigns for premium audience capture.',
    features: ['Paid media activation', 'Creative testing', 'Rapid scaling'],
    icon: Bolt,
    accent: 'from-slate-700 via-slate-800 to-slate-900',
    highlighted: false
  }
]

export default function RevenueModelSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-slate-950 text-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="relative mb-12 overflow-hidden rounded-[2rem] bg-gradient-to-br from-white/5 via-white/10 to-transparent p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
          <div className="space-y-4 text-center">
            <p className="text-sm font-semibold tracking-[0.25em] text-cyan-300 uppercase">Revenue Model</p>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Revenue Model That Scales With You
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-300">
              We combine a performance-first approach with predictable retainers so your success drives our rewards.
              The more your business earns, the better we perform together.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {revenueCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className={`group rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_60px_-30px_rgba(99,102,241,0.75)] ${
                  card.highlighted ? 'ring-2 ring-cyan-400/40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : ''
                }`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/5 text-cyan-300 shadow-lg shadow-cyan-500/10 transition duration-300 group-hover:bg-cyan-500/15">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-8 space-y-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
                    <p className="mt-3 text-sm text-slate-400">{card.description}</p>
                  </div>

                  <div className="rounded-3xl bg-slate-950/90 px-5 py-4 ring-1 ring-white/10">
                    <p className="text-3xl font-bold text-white">{card.price}</p>
                  </div>

                  <ul className="space-y-3">
                    {card.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm text-slate-300">
                        <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
