'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Globe, Target, DollarSign, Rocket, AlertCircle } from 'lucide-react'
import { API_CONFIG } from '@/app/config/api'

interface LaunchUnitModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function LaunchUnitModal({ isOpen, onClose, onSuccess }: LaunchUnitModalProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    platform: 'google',
    budget: '',
    goal: 'conversions'
  })

  const handleSubmit = async () => {
    if (!formData.name || !formData.budget) {
      setError('Please fill in all required fields.')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const res = await fetch(`${API_CONFIG.baseUrl}/campaigns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          budget: Number(formData.budget),
          status: 'active',
          spent: 0,
          impressions: 0,
          clicks: 0,
          conversions: 0,
          ctr: 0,
          cpc: 0,
          roas: 0,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        })
      })

      if (res.ok) {
        onSuccess()
        onClose()
        setStep(1)
        setFormData({ name: '', platform: 'google', budget: '', goal: 'conversions' })
      } else {
        setError('Failed to launch campaign. Check backend logs.')
      }
    } catch (err) {
      setError('Backend unreachable. Is the server running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Launch New Unit</h2>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Step {step} of 2: {step === 1 ? 'Optimization Strategy' : 'Financial Allocation'}</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex gap-3 text-rose-400 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {step === 1 ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Campaign Identity</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Q2 Real Estate Surge"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#121212] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Distribution Hub</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'google', label: 'Google Ads', icon: Globe },
                        { id: 'facebook', label: 'Meta Network', icon: Target },
                        { id: 'tiktok', label: 'Stream Viral', icon: Globe },
                        { id: 'linkedin', label: 'Pro Network', icon: Target },
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setFormData({...formData, platform: p.id as any})}
                          className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                            formData.platform === p.id 
                              ? 'bg-blue-500/10 border-blue-500/30 text-white' 
                              : 'bg-white/5 border-white/5 text-gray-500 hover:text-white hover:border-white/10'
                          }`}
                        >
                          <p.icon className={`w-4 h-4 ${formData.platform === p.id ? 'text-blue-400' : ''}`} />
                          <span className="text-xs font-bold">{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Daily Cap (USD)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        type="number" 
                        placeholder="50.00"
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                        className="w-full bg-[#121212] border border-white/5 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                      />
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 space-y-3">
                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest">AI Prediction</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      At this budget, KLARA estimates <span className="text-white font-bold">12-18 qualified leads</span> per week on the {formData.platform} network.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="p-8 pt-0 flex gap-3">
              {step === 2 && (
                <button
                  onClick={() => setStep(1)}
                  className="px-8 py-4 rounded-2xl border border-white/5 text-gray-400 hover:text-white hover:bg-white/5 font-bold text-xs uppercase tracking-widest transition-all"
                >
                  Back
                </button>
              )}
              <button
                disabled={loading}
                onClick={step === 1 ? () => setStep(2) : handleSubmit}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? 'Initializing Engine...' : step === 1 ? 'Configure Allocation' : (
                  <>
                    <Rocket className="w-4 h-4" />
                    Deploy Unit
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
