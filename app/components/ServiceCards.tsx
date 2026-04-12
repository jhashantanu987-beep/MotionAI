import type { ComponentType } from 'react'
import { ArrowRight, BarChart3, Calendar, MessageCircle, Zap } from 'lucide-react'
import { serviceCards } from '../data/mock'

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  rocket: ArrowRight,
  'message-square': MessageCircle,
  calendar: Calendar,
  zap: Zap,
  'bar-chart': BarChart3
}

export default function ServiceCards() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Core services</p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">A complete lead engine built for revenue teams.</h2>
        <p className="max-w-xl text-slate-400">
          Deploy AI-driven capture, booking workflows, and analytics in one interface to convert more prospects into customers.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {serviceCards.map((service) => {
          const Icon = iconMap[service.icon] || ArrowRight
          return (
            <div key={service.title} className="group glass-card p-6 sm:p-8 space-y-4 relative overflow-hidden">
              {/* Spotlight effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.2) 0%, transparent 50%)`
                }}
              />
              
              <div className="relative z-10 space-y-4">
                {/* Icon with glow */}
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 transition-all duration-300 group-hover:bg-cyan-500/40 group-hover:text-cyan-200 group-hover:shadow-lg group-hover:shadow-cyan-500/50">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.15] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Icon className="h-7 w-7 relative z-10" />
                </div>
                
                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-100 transition-colors duration-300">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-slate-300 text-sm md:text-base leading-6 group-hover:text-slate-100 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
