'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Check, Star, Zap, Shield, Users, TrendingUp, MessageSquare, Play, Clock, Target, Award } from 'lucide-react'
import PricingPlansSection from './components/PricingPlansSection'

export default function LandingPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Instant WhatsApp Reply",
      description: "AI responds within 5 seconds of lead arrival with personalized messages",
      image: "/images/ChatGPT Image Apr 11, 2026, 12_53_43 AM.png"
    },
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: "Smart Lead Qualification",
      description: "AI engages in natural conversations to identify serious prospects",
      image: "/images/सक्रिय लीड वृद्धि और नये संपर्क.png"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Automated Booking",
      description: "Seamlessly schedules and confirms appointments when leads are ready",
      image: "/images/ChatGPT Image Apr 11, 2026, 12_53_58 AM.png"
    }
  ]

  const stats = [
    { number: "85%", label: "Lead Response Rate", description: "Instant WhatsApp replies within 5 seconds" },
    { number: "3.2x", label: "More Qualified Leads", description: "AI qualification increases conversion-ready leads by 320%" },
    { number: "500+", label: "Booked Appointments", description: "Successfully booked client appointments" }
  ]

  const testimonials = [
    {
      quote: "Since implementing KLARA AI, our lead response time dropped from 24 hours to under 5 seconds. We've seen a 320% increase in qualified leads and our booking rate has tripled.",
      name: "Dr. Jennifer Davis",
      role: "Dental Practice Owner",
      rating: 5
    },
    {
      quote: "The AI qualification system is incredible. It understands context and only books appointments with serious buyers. Our close rate has increased by 85% since going live.",
      name: "Michael Rodriguez",
      role: "Real Estate Agent",
      rating: 5
    },
    {
      quote: "Setup was seamless and the results were immediate. We're now booking 15-20 appointments per week automatically. This system pays for itself every month.",
      name: "Sarah Chen",
      role: "Business Consultant",
      rating: 5
    }
  ]

  const securityFeatures = [
    { icon: "🔒", title: "SOC 2 Type II", description: "Security & compliance certified" },
    { icon: "⚡", title: "End-to-End Encryption", description: "256-bit AES encryption" },
    { icon: "🛡️", title: "GDPR Compliant", description: "European data protection" },
    { icon: "⏱️", title: "99.9% Uptime", description: "Enterprise SLA guarantee" }
  ]

  const howItWorks = [
    {
      step: "1",
      title: "Lead comes in",
      description: "A potential client submits their contact information through your website or lead form."
    },
    {
      step: "2",
      title: "Instant WhatsApp reply (under 5 seconds)",
      description: "Our AI immediately responds on WhatsApp with a personalized message acknowledging their interest."
    },
    {
      step: "3",
      title: "AI qualifies the lead",
      description: "Our AI engages in natural conversation to understand their needs and determine if they're a good fit."
    },
    {
      step: "4",
      title: "Booking confirmed automatically",
      description: "When the lead is qualified, our system automatically schedules and confirms their appointment."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <div className="text-xl font-bold text-gray-900">KLARA AI</div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                  Never lose a lead again
                  <span className="block text-3xl lg:text-4xl font-medium text-gray-600 mt-2">
                    —turn them into booked clients automatically
                  </span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Enterprise-grade AI that captures leads, responds instantly on WhatsApp, qualifies prospects, and books appointments — all while you sleep.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  🚀 Get More Clients Now
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </button>

                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                  📹 Book a demo
                </button>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>✅ No setup fees</span>
                <span>🔄 Cancel anytime</span>
                <span>🛟 24/7 support</span>
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className={`relative ${isVisible ? 'animate-fade-in-delay' : 'opacity-0'}`}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Lead Dashboard</h3>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-600">247</div>
                        <div className="text-sm text-gray-600">Active Leads</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-600">89%</div>
                        <div className="text-sm text-gray-600">Response Rate</div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <MessageSquare className="w-5 h-5 text-green-600" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">New lead responded</div>
                          <div className="text-xs text-gray-500">2 minutes ago</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <Users className="w-5 h-5 text-blue-600" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">Appointment booked</div>
                          <div className="text-xs text-gray-500">15 minutes ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-600 mb-6">TRUSTED BY LEADING BUSINESSES WORLDWIDE</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['DentalCare Pro', 'RealEstate Plus', 'Consulting Hub', 'Tech Solutions', 'Business Growth', 'Marketing Pro'].map((company, index) => (
                <div key={index} className="text-gray-400 font-semibold">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Features that get you more clients
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tools that turn leads into booked appointments automatically
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 mb-6 rounded-lg overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                Enterprise-Grade Security
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Encrypted data with industry-leading compliance.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/ChatGPT Image Apr 11, 2026, 12_43_53 AM.png"
                alt="Integration"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              How it works
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <img
              src="/images/Gemini_Generated_Image_mwf3lumwf3lumwf3.png"
              alt="How It Works"
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              What our clients say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join hundreds of businesses transforming their lead generation with AI automation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Our results in numbers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-xl font-semibold text-gray-700 mb-2">{stat.label}</div>
                <div className="text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingPlansSection />

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Launch your workflow
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start automating with AI logic and comprehensive integrations today.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-12 py-4 bg-white text-gray-900 rounded-full font-semibold text-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Get More Clients Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <div className="text-xl font-bold text-white">KLARA AI</div>
              </div>
              <p className="text-gray-400">
                Capture, qualify, and book leads automatically — without lifting a finger
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 KLARA AI. All rights reserved.
            </div>
            <div className="text-gray-400 text-sm mt-4 md:mt-0">
              Made with ❤️ for businesses worldwide
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fadeInUp 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}