import { testimonials } from '../data/mock'
import { Quote } from 'lucide-react'

export default function TestimonialSection() {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Trusted reviews</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Customers see Klara AI as the central nervous system of their sales motion.</h2>
        </div>
        <div className="rounded-full bg-slate-900/80 px-5 py-3 text-sm text-slate-300 ring-1 ring-slate-700/60">
          Designed for B2B growth and premium enterprise workflows
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="group glass-card p-8 space-y-6 flex flex-col relative overflow-hidden">
            {/* Spotlight effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.2) 0%, transparent 50%)`
              }}
            />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 text-cyan-300">
                <Quote className="h-5 w-5" />
                <span className="text-sm uppercase tracking-[0.2em] font-semibold">Customer story</span>
              </div>
              
              <p className="text-lg leading-8 text-slate-100 font-light group-hover:text-white transition-colors duration-300">
                "{testimonial.quote}"
              </p>
              
              <div className="border-t border-white/[0.08] group-hover:border-white/[0.12] pt-6 text-sm space-y-1 transition-colors duration-300">
                <p className="font-semibold text-white group-hover:text-cyan-200 transition-colors duration-300">
                  {testimonial.name}
                </p>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
