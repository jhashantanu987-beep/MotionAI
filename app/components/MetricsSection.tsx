import { metrics } from '../data/mock'

const colors = [
  '#fbbf24', // First metric - yellow
  '#4ade80', // Second metric - green
  '#f87171', // Third metric - red
  '#60a5fa'  // Fourth metric - blue
]

export default function MetricsSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Results</p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Premium metrics that showcase momentum.</h2>
        <p className="max-w-xl text-slate-400">
          Build credibility with data that feels elevated — from fast response times to dramatic conversion improvement.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {metrics.map((metric, index) => (
          <div key={metric.label} className="group glass-card p-6 sm:p-8 space-y-4 relative overflow-hidden">
            {/* Spotlight effect - orange for metrics */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)`
              }}
            />
            
            <div className="relative z-10 space-y-4">
              <p className="text-sm uppercase tracking-[0.2em] font-semibold text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300">
                {metric.label}
              </p>
              
              <p 
                className="text-5xl font-bold transition-all duration-300 group-hover:scale-105 inline-block origin-left group-hover:text-opacity-100" 
                style={{ color: colors[index] }}
              >
                {metric.value}
              </p>
              
              <p className="text-slate-300 text-sm group-hover:text-slate-100 transition-colors duration-300">
                {metric.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
