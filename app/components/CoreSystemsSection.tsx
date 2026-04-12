'use client'

import { Activity, BarChart3, Cpu } from 'lucide-react'

const systems = [
  {
    title: 'Demand Engine',
    description: 'Drive high-intent traffic and capture the strongest leads with channel-agnostic ad systems.',
    points: ['Traffic amplification', 'Lead capture', 'Channel optimization'],
    icon: Activity,
    accent: 'from-sky-500 to-cyan-400',
    highlighted: false
  },
  {
    title: 'Revenue Agent System',
    description: 'Convert prospects into booked meetings with AI-powered chat, conversion flows, and booking automation.',
    points: ['AI chat conversion', 'Smart booking flows', 'Revenue performance'],
    icon: BarChart3,
    accent: 'from-fuchsia-500 to-indigo-500',
    highlighted: true
  },
  {
    title: 'Back-Office OS',
    description: 'Automate operations, workflows, and reporting so your team can scale without manual work.',
    points: ['Operational automation', 'Client handoffs', 'Data sync & reporting'],
    icon: Cpu,
    accent: 'from-slate-500 to-slate-700',
    highlighted: false
  }
]

export default function CoreSystemsSection() {
  return (
    <section className="relative py-24 lg:py-28 bg-slate-950 text-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-cyan-300">Core Systems</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            3 Core Systems That Drive Your Growth
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            A complete end-to-end system from traffic acquisition to conversion and back-office automation, built for predictable growth.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-12 overflow-hidden">
          <div className="flex items-center gap-3 rounded-full bg-white/5 px-5 py-3 text-sm text-slate-300 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.8)]">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-sky-400"></span>
            Traffic
            <span className="text-slate-500">→</span>
            Conversion
            <span className="text-slate-500">→</span>
            Operations
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {systems.map((system) => {
            const Icon = system.icon
            return (
              <div
                key={system.title}
                className={`group rounded-[2rem] bg-slate-900/90 p-8 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.8)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-40px_rgba(56,189,248,0.35)] ${
                  system.highlighted ? 'ring-1 ring-cyan-400/20 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900' : ''
                }`}
              >
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${system.accent} bg-opacity-20 text-white transition duration-300 group-hover:scale-105`}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-950/95 shadow-lg shadow-cyan-500/10">
                    <Icon className="h-6 w-6 text-cyan-300" />
                  </div>
                </div>

                <div className="mt-8 space-y-5">
                  <div>
                    <h3 className={`text-3xl font-semibold ${system.highlighted ? 'text-white' : 'text-slate-100'}`}>
                      {system.title}
                    </h3>
                    <p className="mt-4 text-slate-400">{system.description}</p>
                  </div>

                  <ul className="space-y-4">
                    {system.points.map((point) => (
                      <li key={point} className="flex gap-3 text-slate-300">
                        <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                        <span>{point}</span>
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
