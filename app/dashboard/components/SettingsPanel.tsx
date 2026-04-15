'use client'

import React, { useState } from 'react'
import { User, Shield, Zap, Globe, Cpu, CreditCard, ChevronRight, X, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Item {
  icon: any
  label: string
  desc: string
  status?: string
  badge?: string
  toggle?: boolean
}

interface Section {
  title: string
  items: Item[]
}

export default function SettingsPanel() {
  const [toast, setToast] = useState<{show: boolean, title: string, message: string}>({ show: false, title: '', message: '' })

  const handleAction = (label: string) => {
    setToast({
      show: true,
      title: 'Action Restricted',
      message: `Configuring "${label}" requires Master Admin privileges. Please upgrade your workspace role.`
    })
    setTimeout(() => setToast({ show: false, title: '', message: '' }), 4000)
  }

  const handleLogout = () => {
    window.location.href = '/'
  }

  const sections: Section[] = [
    {
      title: 'Account Settings',
      items: [
        { icon: User, label: 'Profile Information', desc: 'Agency branding & contact' },
        { icon: Shield, label: 'Security & Access', desc: 'Passwords & 2FA' },
        { icon: CreditCard, label: 'Subscription & Billing', desc: 'Current plan: Enterprise' },
      ]
    },
    {
      title: 'AI Configuration',
      items: [
        { icon: Cpu, label: 'Global AI Model', desc: 'Currently: Gemini 1.5 Pro', badge: 'Active' },
        { icon: Zap, label: 'Automation Mode', desc: 'Instant-reply is enabled', toggle: true },
      ]
    },
    {
      title: 'Integrations',
      items: [
        { icon: Globe, label: 'Meta Ads Manager', desc: 'Connected to KLARA Ads', status: 'Connected' },
        { icon: Globe, label: 'Calendly API', desc: 'Real-time booking and availability sync', status: 'Connected' },
        { icon: Globe, label: 'Google Ads', desc: 'Lead tracking active', status: 'Connected' },
        { icon: Globe, label: 'TikTok For Business', desc: 'Syncing creative assets', status: 'Disconnected' },
      ]
    }
  ]

  return (
    <div className="space-y-8 pb-10 relative">
      
      {/* Premium Toast Notification System */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 bg-[#0a0a0a] border border-rose-500/20 p-4 rounded-2xl shadow-2xl flex items-start gap-4 max-w-sm"
          >
            <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4 text-rose-500" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#e5e2e1]">{toast.title}</h4>
              <p className="text-xs text-[#bfc7d3] mt-1 pr-6 leading-relaxed">{toast.message}</p>
            </div>
            <button 
              onClick={() => setToast({ show: false, title: '', message: '' })}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {sections.map((section, idx) => (
        <div key={idx} className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 px-1">
            {section.title}
          </h3>
          <div className="space-y-2">
            {section.items.map((item, i) => (
              <button
                key={i}
                onClick={() => handleAction(item.label)}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group active:scale-[0.99]"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#121212] flex items-center justify-center text-gray-400 group-hover:text-blue-400 border border-white/5 transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">{item.label}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
                {item.status ? (
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${
                    item.status === 'Connected' ? 'text-green-400 bg-green-400/10 border-green-400/20 shadow-[0_0_10px_rgba(74,222,128,0.1)]' : 'text-gray-500 bg-gray-500/10 border-gray-500/20'
                  }`}>
                    {item.status}
                  </span>
                ) : item.badge ? (
                  <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2 py-1 rounded-md shadow-[0_0_10px_rgba(96,165,250,0.1)]">
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
      
      <div className="pt-4 border-t border-white/5">
        <button onClick={handleLogout} className="w-full py-4 text-sm font-bold text-rose-500 hover:bg-rose-500/5 rounded-2xl transition-all">
          Logout of KLARA AI
        </button>
      </div>
    </div>
  )
}

