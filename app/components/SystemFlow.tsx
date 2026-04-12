import { ArrowRight } from 'lucide-react'
import { systemFlow } from '../data/mock'

export default function SystemFlow() {
  return (
    <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">System flow</p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Intelligent automation from first click to close.</h2>
        <p className="max-w-xl text-slate-400">
          Klara AI makes every step in the funnel feel sleek, private, and automated — with a premium experience for each lead.
        </p>
      </div>
      <div className="glass-card p-6">
        <div className="grid gap-4">
          {systemFlow.map((step, index) => (
            <div key={step.label} className="rounded-[1.75rem] border border-slate-800/70 bg-slate-950/70 p-5 text-sm shadow-sm transition hover:border-cyan-400/40 hover:bg-slate-900/80">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">{step.label}</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-3 text-slate-400">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
