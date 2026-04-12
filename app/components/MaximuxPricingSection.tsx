'use client'

import { CheckCircle2 } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'Forever',
    description: 'Great for individuals and small teams just starting out.',
    cta: 'Get Started Free',
    highlighted: false,
    features: [
      '3 active workflows',
      'Basic app integrations',
      'Access to core AI tools',
      'Community support',
      'Up to 1,000 automations/month'
    ],
    notIncluded: ['Real-time analytics', 'Priority support', 'Advanced integrations']
  },
  {
    name: 'Pro',
    price: '$159',
    period: '/month',
    description: 'Best for teams who want unlimited workflows and real-time insights.',
    cta: 'Start Free Trial',
    highlighted: true,
    features: [
      'Unlimited workflows',
      '100+ app integrations',
      'AI-powered assistant',
      'Real-time analytics',
      'Workflow templates',
      'Priority email support',
      'Advanced automation rules',
      'Team collaboration'
    ],
    notIncluded: []
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'For large teams requiring custom setup and dedicated support.',
    cta: 'Talk to Sales',
    highlighted: false,
    features: [
      'Everything in Pro',
      'Custom onboarding',
      'Dedicated account manager',
      'SSO & advanced permissions',
      'SLA-backed support',
      'Audit logs & security controls',
      'Custom integrations',
      'Annual contracts available'
    ],
    notIncluded: []
  }
]

export default function PricingSection() {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">Pricing</p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Simple Pricing, No Hidden Fees
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose the perfect plan for your team. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl transition-all ${
                plan.highlighted
                  ? 'border-2 border-indigo-600 bg-gradient-to-br from-indigo-50 to-white shadow-xl'
                  : 'border border-slate-200 bg-white hover:shadow-lg'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{plan.description}</p>

                {/* Price */}
                <div className="mt-6">
                  <span className="text-5xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-600 ml-2">/{plan.period}</span>
                </div>

                {/* CTA Button */}
                <button
                  className={`mt-8 w-full rounded-lg py-3 px-6 font-semibold transition-all ${
                    plan.highlighted
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg'
                      : 'border border-slate-300 text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {plan.cta}
                </button>

                {/* Features */}
                <div className="mt-8 space-y-4 border-t border-slate-200 pt-8">
                  <p className="text-sm font-semibold text-slate-900">What's included:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-indigo-600 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.notIncluded.length > 0 && (
                    <div className="mt-6 space-y-2">
                      {plan.notIncluded.map((feature) => (
                        <p key={feature} className="text-sm text-slate-500">
                          ✗ {feature}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-600">
            All plans include 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}
