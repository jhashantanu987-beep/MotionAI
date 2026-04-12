'use client'

import { Sparkles, Zap, CheckCircle2, BarChart3 } from 'lucide-react'

const benefits = [
  {
    icon: Sparkles,
    title: 'Intelligent AI-driven automations',
    description: 'AI handles complex logic and decision-making automatically'
  },
  {
    icon: Zap,
    title: 'No-code drag-and-drop builder',
    description: 'Create sophisticated workflows with our visual builder'
  },
  {
    icon: BarChart3,
    title: 'Real-time performance tracking',
    description: 'Monitor all your automations with live dashboards'
  },
  {
    icon: Sparkles,
    title: 'Connects with 5,000+ tools',
    description: 'Integrate your entire tech stack seamlessly'
  }
]

const alternatives = [
  {
    title: 'Manual, repetitive workflows',
    vs: 'Automated intelligent workflows'
  },
  {
    title: 'Requires technical setup',
    vs: 'Simple no-code setup'
  },
  {
    title: 'Delayed or no insights',
    vs: 'Real-time analytics'
  },
  {
    title: 'Limited integration options',
    vs: '5,000+ app connections'
  },
  {
    title: 'Basic data security',
    vs: 'Enterprise-grade encryption'
  },
  {
    title: 'Lacks AI optimization',
    vs: 'Advanced AI-powered features'
  }
]

export default function WhyChooseUsSection() {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">Why Us</p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Why Teams Choose Our Platform
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-20">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div key={benefit.title} className="text-center">
                <div className="inline-flex rounded-lg bg-indigo-100 p-3 text-indigo-600 mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-slate-900">{benefit.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{benefit.description}</p>
              </div>
            )
          })}
        </div>

        {/* Comparison */}
        <div className="bg-gradient-to-b from-slate-50 to-transparent rounded-2xl border border-slate-200 p-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            We vs. The Rest
          </h3>

          <div className="grid gap-6">
            {alternatives.map((alt) => (
              <div key={alt.title} className="flex items-center gap-4">
                <div className="min-w-max">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600">
                    <span>✗</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-slate-600 line-through">{alt.title}</p>
                </div>
                <div className="min-w-max">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-slate-900 font-medium">{alt.vs}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
