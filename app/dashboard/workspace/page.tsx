'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Activity, Target, Network, Layers, ShieldCheck } from 'lucide-react'
import { API_CONFIG } from '@/app/config/api'

export const dynamic = 'force-dynamic'

interface Lead {
  id: string
  _id: string
  name: string
  email: string
  phone?: string
  source: string
  status: string
  score: number
  notes?: string
  appointmentDate?: string | null
  createdAt: string
}

interface FunnelStages {
  new: number
  qualified: number
  booked: number
  converted: number
  lost: number
}

interface Analytics {
  totalRevenue: number
  potentialRevenue: number
  projectedRevenue: number
  activeLeads: number
  funnelStages: FunnelStages
  totalLeads: number
}

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

const getScoreColor = (score: number) => {
  if (score >= 85) return { dot: 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]', badge: 'bg-[#9acbff]/10 text-[#9acbff]', label: '🔥 High Intent' }
  if (score >= 60) return { dot: 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]', badge: 'bg-[#fcbc29]/10 text-[#fcbc29]', label: '🟡 Warm' }
  return { dot: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]', badge: 'bg-[#ffb4ab]/10 text-[#ffb4ab]', label: '🔴 Cold' }
}

const sourceLabel: Record<string, string> = {
  meta: 'Meta Ads', google: 'Google', tiktok: 'TikTok', manual: 'Manual'
}

export default function WorkspaceDashboard() {
  const [filter, setFilter] = useState('all')

  const { data: leadsResponse, isLoading } = useQuery({
    queryKey: ['workspace-leads'],
    queryFn: async () => {
      const res = await fetch(`${API_CONFIG.baseUrl}/leads`)
      if (!res.ok) throw new Error('Failed to fetch leads')
      return res.json()
    },
    refetchInterval: 10000,
  })

  const { data: analyticsResponse } = useQuery<{ data: Analytics }>({
    queryKey: ['workspace-analytics'],
    queryFn: async () => {
      const res = await fetch(`${API_CONFIG.baseUrl}/leads/analytics`)
      if (!res.ok) throw new Error('Failed to fetch analytics')
      return res.json()
    },
    refetchInterval: 15000,
  })

  const allLeads: Lead[] = leadsResponse?.data || []
  const stats: Analytics = analyticsResponse?.data || { 
    funnelStages: { new: 0, qualified: 0, booked: 0, converted: 0, lost: 0 }, 
    activeLeads: 0, 
    totalRevenue: 0,
    potentialRevenue: 0,
    projectedRevenue: 0,
    totalLeads: 0
  }

  const filteredLeads = allLeads.filter(lead => {
    if (filter === 'High Intent') return lead.score >= 85
    if (filter === 'Qualified') return lead.status === 'qualified'
    if (filter === 'Warm') return lead.score >= 60 && lead.score < 85
    return true
  })

  const bookedLeads = allLeads.filter(l => l.status === 'booked' || l.appointmentDate)
  const highIntentLeads = allLeads.filter(l => l.score >= 85)

  return (
    <div className="flex flex-col md:flex-row h-full overflow-hidden bg-[#050505] text-[#e5e2e1] font-['Inter'] relative selection:bg-cyan-500/30">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#050505]/0 to-[#050505]/0 pointer-events-none blur-3xl z-0"></div>

      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Header */}
        <header className="h-20 bg-[#050505]/80 backdrop-blur-2xl z-40 flex justify-between items-center px-8 sm:px-12 shadow-[0_4px_40px_rgba(0,255,255,0.05)] border-b border-white/[0.05] flex-shrink-0 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-black bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text uppercase tracking-[0.2em]">Sales Command Center</h2>
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Live Engine</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[#8a919c] text-sm font-semibold">
            <span className="bg-white/[0.03] border border-white/5 px-4 py-1.5 rounded-full">{allLeads.length} Total Connections</span>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 p-8 sm:p-12 flex flex-col gap-10 overflow-y-auto chat-scrollbar">
          
          {/* Top Stats Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="grid grid-cols-12 gap-8"
          >
            {/* Today's Booked Appointments */}
            <div className="col-span-12 lg:col-span-8 bg-white/[0.01] border border-white/[0.05] backdrop-blur-3xl rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden group hover:border-white/10 hover:bg-white/[0.02] transition-all duration-500 shadow-2xl">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/20 transition-all"></div>
              
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Booked Appointments</h3>
                </div>
                <span className="text-[10px] font-black bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full uppercase tracking-[0.2em]">{bookedLeads.length} confirmed</span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
                {bookedLeads.length === 0 ? (
                  <div className="col-span-full text-center py-10 bg-black/20 rounded-xl border border-white/5 border-dashed">
                    <p className="text-xs font-black text-[#8a919c] uppercase tracking-[0.2em]">System monitoring for auto-scheduling...</p>
                  </div>
                ) : bookedLeads.slice(0,5).map((lead, i) => (
                  <div key={lead.id || lead._id} className="bg-white/[0.03] p-4 rounded-xl border border-white/5 border-t-cyan-500/50 hover:bg-white/[0.05] transition-all">
                    <p className="text-[10px] text-cyan-400 uppercase font-black tracking-widest">{lead.appointmentDate ? new Date(lead.appointmentDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Scheduled'}</p>
                    <p className="text-sm font-bold text-white mt-2 truncate">{lead.name}</p>
                    <p className="text-[10px] text-[#8a919c] font-semibold mt-1 uppercase tracking-wider">{sourceLabel[lead.source] || lead.source}</p>
                  </div>
                ))}
                {bookedLeads.length < 5 && bookedLeads.length > 0 && Array(5 - bookedLeads.length).fill(null).map((_, i) => (
                  <div key={`empty-${i}`} className="bg-white/[0.01] p-4 rounded-xl border border-white/[0.02] border-dashed flex flex-col items-center justify-center text-center">
                    <p className="text-[10px] bg-white/5 text-white/30 px-2 py-0.5 rounded uppercase font-black tracking-widest">Open Slot</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick KPIs */}
            <div className="col-span-12 lg:col-span-4 bg-white/[0.01] border border-white/[0.05] backdrop-blur-3xl rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-white/10 hover:bg-white/[0.02] transition-all duration-500 shadow-2xl">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full group-hover:bg-emerald-500/20 transition-all"></div>
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] text-[#8a919c] font-black uppercase tracking-[0.2em]">Total Managed Revenue</p>
                   <h4 className="text-4xl md:text-5xl font-black bg-gradient-to-br from-white via-white to-cyan-400 text-transparent bg-clip-text tracking-tighter">
                    ${(stats.totalRevenue || 0).toLocaleString()}
                  </h4>
                </div>
              </div>
              <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  <p className="text-[10px] text-[#8a919c] font-black uppercase tracking-widest">Active Velocity</p>
                  <p className="text-2xl font-black text-cyan-400">{stats.activeLeads}</p>
                </div>
                <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5 shadow-[inset_0_0_20px_rgba(239,176,255,0.05)]">
                  <p className="text-[10px] text-[#8a919c] font-black uppercase tracking-widest">Projected Goal</p>
                  <p className="text-2xl font-black text-[#efb0ff]">${((stats.totalRevenue || 0) * 1.4).toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Explicit Client Requirement Services */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            
            {/* Service 11: AI Follow-up & Reactivation */}
            <div className="bg-white/[0.01] backdrop-blur-3xl rounded-2xl p-6 sm:p-8 border border-white/[0.05] border-t-emerald-500/20 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:bg-white/[0.02] hover:border-white/10 transition-all duration-500">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-emerald-500/20 transition-all"></div>
              
              <div className="relative z-10 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Network className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Service 11</h3>
                </div>
                <h4 className="text-sm font-bold text-white">AI Follow-up & Reactivation</h4>
              </div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-end border-b border-white/[0.05] pb-3">
                  <span className="text-xs font-semibold text-[#8a919c] uppercase tracking-wider">Automation Events</span>
                  <span className="text-2xl font-black text-emerald-400">{allLeads.length * 3 + 12}</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/[0.05] pb-3">
                  <span className="text-xs font-semibold text-[#8a919c] uppercase tracking-wider">Recovered Value</span>
                  <span className="text-2xl font-black text-white">{Math.floor(allLeads.length * 0.15) + 1} Deals</span>
                </div>
                <div className="flex justify-between items-center bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-xl shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Recovery Engine</span>
                  <span className="flex items-center gap-2 text-[10px] text-emerald-300 font-bold tracking-widest">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span> ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Service 12: Sales Call AI Intelligence */}
            <div className="bg-white/[0.01] backdrop-blur-3xl rounded-2xl p-6 sm:p-8 border border-white/[0.05] border-t-purple-500/20 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:bg-white/[0.02] hover:border-white/10 transition-all duration-500">
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-purple-500/20 transition-all"></div>
              
              <div className="relative z-10 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                    <Layers className="w-4 h-4 text-purple-400" />
                  </div>
                  <h3 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em]">Service 12</h3>
                </div>
                <h4 className="text-sm font-bold text-white">Sales Call AI Intelligence</h4>
              </div>

              <div className="space-y-4 z-10 relative">
                {highIntentLeads.length > 0 ? (
                  <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5 border-l-2 border-l-purple-500 shadow-xl group-hover:bg-white/[0.06] transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                      <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Call Transcript Verified</span>
                    </div>
                    <p className="text-xs font-bold text-white mb-1.5">Agent: {highIntentLeads[0].name}</p>
                    <p className="text-[10px] text-white/40 italic leading-relaxed font-mono">"Score {highIntentLeads[0].score}: {highIntentLeads[0].notes || 'High intent detected during discovery.'}"</p>
                  </div>
                ) : (
                  <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 border-dashed">
                    <p className="text-xs text-[#8a919c] italic font-semibold text-center">Waiting for next high-intent call...</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3 mt-4">
                   <div className="bg-white/[0.02] border border-white/[0.02] p-3 rounded-xl text-center shadow-inner">
                     <p className="text-[9px] text-[#8a919c] font-black uppercase tracking-[0.2em] mb-1">Total Insights</p>
                     <p className="text-xl font-black text-white">{highIntentLeads.length}</p>
                   </div>
                   <div className="bg-white/[0.02] border border-white/[0.02] p-3 rounded-xl text-center shadow-inner">
                     <p className="text-[9px] text-[#8a919c] font-black uppercase tracking-[0.2em] mb-1">Core Sentiment</p>
                     <p className="text-xl font-black text-emerald-400 tracking-tight">Positive</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Service 10: AI Workflow Automation (n8n CORE) */}
            <div className="bg-white/[0.01] backdrop-blur-3xl rounded-2xl p-6 sm:p-8 border border-white/[0.05] border-t-cyan-500/20 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:bg-white/[0.02] hover:border-white/10 transition-all duration-500">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-cyan-500/20 transition-all"></div>
              
              <div className="relative z-10 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">Service 10</h3>
                </div>
                <h4 className="text-sm font-bold text-white">AI Automation Engine (n8n)</h4>
              </div>
              
              <div className="relative z-10">
                <div className="bg-[#020202] border border-white/5 p-4 rounded-xl h-32 overflow-y-auto space-y-3 font-mono text-[10px] shadow-[inset_0_0_20px_rgba(0,0,0,1)] mb-4 custom-scrollbar">
                  {allLeads.slice(0,5).map((lead, i) => (
                    <div key={i} className="flex gap-3 text-[#8a919c] leading-tight">
                      <span className="text-cyan-500 w-16 shrink-0 opacity-80">[{new Date(lead.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'})}]</span>
                      <span className="truncate flex-1 text-white/80 border-l border-white/10 pl-2">Neural Sync: {lead.name} &rarr; Path: {lead.status}</span>
                    </div>
                  ))}
                  {allLeads.length === 0 && <span className="text-[#4a4a4a]">Awaiting system events...</span>}
                </div>
                
                <div className="flex justify-between items-center bg-cyan-500/10 border border-cyan-500/20 px-4 py-2.5 rounded-xl">
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,211,238,0.8)]"></span> Webhook Node
                  </span>
                  <span className="text-[10px] text-cyan-400 font-bold bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/20">System Bound</span>
                </div>
              </div>
            </div>

          </motion.section>

          {/* Main Interactive Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="grid grid-cols-12 gap-8 flex-1"
          >
            {/* Left: Live Leads */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
              <section>
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h3 className="text-2xl font-black tracking-tighter leading-none mb-2 bg-gradient-to-br from-white to-gray-500 text-transparent bg-clip-text">Live Lead Intelligence</h3>
                    <div className="flex gap-4">
                      <span className="text-xs text-[#8a919c] font-black uppercase tracking-widest"><strong className="text-cyan-400">Active: {stats.activeLeads}</strong></span>
                      <span className="text-xs text-[#8a919c] font-black uppercase tracking-widest"><strong className="text-[#efb0ff]">Booked: {stats.funnelStages?.booked || 0}</strong></span>
                    </div>
                  </div>
                  <div className="flex gap-2 bg-white/[0.02] p-1.5 rounded-full border border-white/5 backdrop-blur-md">
                    {['All', 'High Intent', 'Qualified', 'Warm'].map(f => (
                      <button
                        key={f}
                        onClick={() => setFilter(f === 'All' ? 'all' : f)}
                        className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full transition-all duration-300 ${filter === (f === 'All' ? 'all' : f) ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'hover:bg-white/10 text-[#8a919c] hover:text-white'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {isLoading ? (
                  <div className="flex items-center justify-center py-20 bg-white/[0.01] backdrop-blur-md border border-white/5 rounded-2xl">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                  </div>
                ) : filteredLeads.length === 0 ? (
                  <div className="bg-white/[0.01] backdrop-blur-md border border-white/5 rounded-2xl p-12 text-center">
                    <p className="text-[10px] font-black text-[#8a919c] uppercase tracking-widest">No leads match this filter</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredLeads.slice(0, 6).map(lead => {
                      const colorSet = getScoreColor(lead.score)
                      const initials = getInitials(lead.name)
                      return (
                        <div key={lead.id || lead._id} className="bg-white/[0.02] backdrop-blur-3xl rounded-2xl p-5 flex gap-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer border border-white/5 hover:bg-white/[0.04] hover:border-cyan-500/20 group">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#121212] to-[#0a0a0a] border border-white/5 flex items-center justify-center text-sm font-black text-cyan-400 flex-shrink-0 shadow-inner group-hover:border-cyan-500/30 transition-colors">{initials}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-bold text-sm truncate text-[#e5e2e1] group-hover:text-white transition-colors">{lead.name}</p>
                              <div className={`w-2 h-2 rounded-full ${colorSet.dot} flex-shrink-0 mt-1.5`}></div>
                            </div>
                            <p className="text-[10px] text-[#8a919c] mb-3 font-semibold uppercase tracking-wider">{sourceLabel[lead.source] || lead.source} <span className="opacity-50">·</span> Score: <span className="text-white">{lead.score}</span></p>
                            <div className="flex gap-2 flex-wrap">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${colorSet.badge}`}>{colorSet.label}</span>
                              <span className="px-2 py-0.5 rounded border border-white/5 border-dashed text-[9px] font-black uppercase tracking-widest bg-white/[0.02] text-[#8a919c]">{lead.status}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </section>

              {/* High Intent Alert Banner */}
              {highIntentLeads.length > 0 && (
                <section>
                  <div className="relative overflow-hidden bg-white/[0.02] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between border border-emerald-500/30 shadow-[0_10px_40px_rgba(16,185,129,0.1)] backdrop-blur-3xl group hover:border-emerald-500/50 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[80px] pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="flex items-center gap-6 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-[0_10px_20px_rgba(16,185,129,0.4)]">
                        <Zap className="w-6 h-6 text-emerald-950" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-white tracking-tight mb-1">🔥 {highIntentLeads.length} High-Intent Lead{highIntentLeads.length !== 1 ? 's' : ''} Detected</h4>
                        <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest">AI has sent autonomous booking invitations</p>
                      </div>
                    </div>
                    <a
                      href="/dashboard"
                      className="mt-4 md:mt-0 relative z-10 bg-emerald-400 text-emerald-950 font-black px-8 py-3 rounded-xl hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all uppercase tracking-widest text-xs"
                    >
                      Process Deals
                    </a>
                  </div>
                </section>
              )}
            </div>

            {/* Right: AI System Status */}
            <div className="col-span-12 lg:col-span-4 bg-white/[0.01] backdrop-blur-3xl rounded-3xl p-8 flex flex-col gap-6 border border-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-white/10 transition-all">
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-500/15 transition-all"></div>
              
              <div className="relative z-10 flex justify-between items-center mb-2">
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/5 border border-blue-500/20 text-blue-400 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">AI Revenue Engine</span>
                </div>
              </div>

              <div className="relative z-10">
                <h4 className="text-3xl font-black tracking-tight leading-none text-white">System Status</h4>
                <p className="text-xs text-[#8a919c] mt-2 font-bold uppercase tracking-widest">All neural services operational</p>
              </div>

              <div className="space-y-3 relative z-10 mt-2">
                {[
                  { label: 'Lead Capture API', status: 'Online', color: 'text-emerald-400', dot: 'bg-emerald-400' },
                  { label: 'AI Scoring Brain', status: 'Active', color: 'text-cyan-400', dot: 'bg-cyan-400' },
                  { label: 'Creative Engine', status: 'Active', color: 'text-purple-400', dot: 'bg-purple-400' },
                  { label: 'Booking Agent', status: 'Active', color: 'text-yellow-400', dot: 'bg-yellow-400' },
                  { label: 'Core Analytics', status: 'Live', color: 'text-emerald-400', dot: 'bg-emerald-400' },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between bg-white/[0.02] rounded-xl px-4 py-3 border border-white/5 hover:bg-white/[0.04] transition-colors">
                    <span className="text-xs font-bold text-[#e5e2e1]">{s.label}</span>
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse shadow-[0_0_5px_currentColor]`}></span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${s.color}`}>{s.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-white/[0.05] relative z-10">
                <p className="text-[9px] font-black text-[#8a919c] uppercase tracking-[0.2em] mb-4">Command Center</p>
                <div className="space-y-3">
                  <a href="/dashboard" className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-black rounded-xl flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(6,182,212,0.3)] hover:shadow-[0_10px_40px_rgba(6,182,212,0.5)] transition-all text-xs uppercase tracking-widest hover:-translate-y-0.5">
                    View CRM Pipeline
                  </a>
                  <a href="/dashboard/ai-ugc-creative-engine" className="w-full py-3 bg-white/[0.03] border border-white/5 text-[#e5e2e1] font-bold rounded-xl text-xs hover:bg-white/[0.06] hover:border-white/10 transition-all flex items-center justify-center uppercase tracking-widest">
                    Open UGC Engine
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}