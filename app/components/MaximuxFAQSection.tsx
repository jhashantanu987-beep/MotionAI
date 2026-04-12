'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    category: 'Getting Started',
    question: 'Do I need to know how to code to use this?',
    answer: 'No! Our platform is designed for non-technical users. Our drag-and-drop workflow builder makes it easy to create powerful automations without any coding knowledge.'
  },
  {
    category: 'Getting Started',
    question: 'Can I try it before committing?',
    answer: 'Yes, we offer a 14-day free trial with full access to all Pro features. No credit card required to get started.'
  },
  {
    category: 'Features & Integrations',
    question: 'What apps can I integrate with?',
    answer: 'We support 5,000+ app integrations including Slack, Zapier, Airtable, Notion, Google Workspace, Salesforce, HubSpot, and many more. Check our integration directory for a complete list.'
  },
  {
    category: 'Billing & Security',
    question: 'Is my data secure?',
    answer: 'Yes, we use bank-grade encryption and comply with SOC 2, GDPR, and HIPAA standards. All data is encrypted in transit and at rest.'
  },
  {
    category: 'Billing & Security',
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. You can cancel your subscription anytime with no questions asked or hidden fees. Your data remains accessible for 30 days after cancellation.'
  }
]

const categories = ['Getting Started', 'Features & Integrations', 'Billing & Security']

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative py-20 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">FAQ</p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need to get started with AI automation.
          </p>
        </div>

        {/* FAQ Tabs & Content */}
        <div>
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg border border-slate-200 bg-white overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <div>
                    <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                      {faq.category}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">{faq.question}</h3>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-600 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
                    <p className="text-slate-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <p className="text-slate-600">
              Something unclear?{' '}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-700">
                Reach out and we'll help
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
