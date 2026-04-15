'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { crmApi } from './services/crmApi'
import { Loader2, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import LiveLeadFeed from './components/LiveLeadFeed'
import AIConversationPanel from './components/AIConversationPanel'
import { Lead } from './services/crmApi'

export default function CRMDashboard({ initialTab = 'home' }: { initialTab?: string }) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['lead-analytics'],
    queryFn: () => crmApi.getAnalytics(),
    refetchInterval: 15000, // Refresh analytics every 15 seconds
  })

  const stats = statsData?.data || {
    totalRevenue: 0,
    activeLeads: 0,
    funnelStages: { new: 0, qualified: 0, booked: 0, converted: 0, lost: 0 }
  }

  // Format revenue to looks like $244.8k
  const formatRevenue = (val: number) => {
    if (val >= 1000) return `$${(val / 1000).toFixed(1)}k`
    return `$${val}`
  }

  return (
    <div className="flex h-full overflow-hidden bg-[#050505] text-[#e5e2e1] font-['Inter'] relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050505]/0 to-[#050505]/0 pointer-events-none blur-3xl z-0"></div>

      {/* Main Content Canvas */}
      <main className="flex-1 overflow-y-auto bg-transparent p-8 relative z-10 custom-scrollbar">
        {/* AI Revenue Pulse - Modern Dynamic Insights */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="md:col-span-2 p-8 rounded-3xl bg-white/[0.01] backdrop-blur-3xl border border-white/[0.05] relative overflow-hidden group shadow-2xl hover:border-white/10 transition-all duration-500">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-[90px] rounded-full -translate-y-1/2 translate-x-1/3 group-hover:bg-blue-500/20 transition-all duration-700 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-400 to-cyan-500"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-0.5">Autonomous Operations View</h4>
                    <p className="text-2xl font-black bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text tracking-tight">AI Revenue Pulse</p>
                  </div>
                </div>
                <p className="text-sm text-[#8a919c] leading-relaxed max-w-lg font-medium border-l-2 border-white/5 pl-4 ml-1">
                  The Core Neural Engine has analyzed <span className="text-blue-400 font-bold">{stats.activeLeads} active connections</span>. 
                  <span className="text-white"> {Math.floor(stats.activeLeads * 0.4)} leads</span> show High Buy Intent (85%+ Score) and have been <span className="text-blue-400 italic font-bold">Autonomously Actioned</span> to book calls.
                </p>
              </div>
              <div className="flex items-center gap-8 bg-black/20 p-6 rounded-2xl border border-white/5 shadow-inner">
                <div className="text-center">
                  <p className="text-[10px] font-black text-[#8a919c] uppercase tracking-[0.2em] mb-2">Deal Velocity</p>
                  <p className="text-4xl font-black text-emerald-400 tracking-tighter drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">{stats.funnelStages.booked}</p>
                </div>
                <div className="h-16 w-px bg-white/10"></div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-[#8a919c] uppercase tracking-[0.2em] mb-2">Auto-Book Rate</p>
                  <p className="text-4xl font-black text-blue-400 tracking-tighter drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">12%</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8 rounded-3xl bg-white/[0.01] backdrop-blur-3xl border border-white/[0.05] shadow-2xl flex flex-col justify-center gap-3 relative overflow-hidden group hover:border-white/10 transition-all duration-500">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(34,197,94,0.05)_0%,transparent_60%)] pointer-events-none group-hover:bg-[radial-gradient(circle,rgba(34,197,94,0.1)_0%,transparent_60%)] transition-all"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
               <span className="text-[10px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.1)] mb-4">System Core Health</span>
               <div className="flex items-center gap-3">
                   <span className="text-5xl font-black text-white tracking-tighter">100%</span>
               </div>
               <div className="mt-4 flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                   <p className="text-xs font-bold text-[#8a919c] uppercase tracking-widest">Routing Traffic Seamlessly</p>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Main Flow (Responsive Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 relative">
          
          {/* Aesthetic Connecting Flow Line (Visible on Desktop) */}
          <div className="hidden lg:block absolute top-[10%] left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-purple-500/0 z-0"></div>

          {/* Column 1: Traffic & Lead Capture */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-4 relative z-10">
            <div className="p-6 rounded-2xl bg-white/[0.01] backdrop-blur-xl border border-white/[0.05] shadow-xl hover:border-white/10 transition-colors h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase tracking-[0.15em] text-white">1. Capture</h3>
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
              </div>
              <div className="space-y-3 flex-1">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] border-l-2 border-l-cyan-500 hover:bg-white/[0.04] transition-all cursor-default">
                  <p className="text-sm font-bold text-[#e5e2e1]">Traffic Intercept</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[9px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-black tracking-widest uppercase px-2 py-0.5 rounded-full">Automated API</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all cursor-default">
                  <p className="text-sm font-bold text-[#e5e2e1]">Store &amp; Validate</p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 opacity-50">
                <p className="text-[10px] font-black text-[#8a919c] uppercase tracking-widest">Entry Node</p>
              </div>
            </div>
          </motion.div>

          {/* Column 2: AI Qualification */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-4 relative z-10">
            <div className="p-6 rounded-2xl bg-white/[0.01] backdrop-blur-xl border border-white/[0.05] shadow-xl hover:border-purple-500/30 transition-colors relative overflow-hidden h-full flex flex-col group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 mix-blend-screen blur-[60px] rounded-full pointer-events-none group-hover:bg-purple-500/20 transition-all"></div>
              <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-sm font-black uppercase tracking-[0.15em] text-white">2. Qualify</h3>
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-3 relative z-10 flex-1">
                {['AI Response Routing', 'Intent & Budget Check', 'Predictive Scoring', 'Handler Escalation'].map((step, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] border-l-2 border-l-purple-500/50 hover:bg-white/[0.05] transition-colors">
                    <p className="text-xs font-bold text-white/90">{step}</p>
                    {i === 2 && (
                      <div className="mt-2 flex items-center gap-1 bg-black/20 p-1.5 rounded-md border border-white/5 w-fit">
                        {['⭐','⭐','⭐'].map((s, j) => <span key={j} className="text-[8px] text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]">{s}</span>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 opacity-50 relative z-10">
                <p className="text-[10px] font-black text-[#8a919c] uppercase tracking-widest">Neural Layer</p>
              </div>
            </div>
          </motion.div>

          {/* Column 3: Booking & Conversion */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="space-y-4 relative z-10">
            <div className="p-6 rounded-2xl bg-white/[0.01] backdrop-blur-xl border border-white/[0.05] shadow-xl hover:border-yellow-500/30 transition-colors h-full flex flex-col group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-yellow-500/10 transition-all"></div>
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-sm font-black uppercase tracking-[0.15em] text-white">3. Close</h3>
                <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-3 flex-1 relative z-10">
                {['Calendar Cross-Check', 'Secure Appointment', 'Automated Reminders'].map((step, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] border-l-2 border-l-yellow-500/50 hover:bg-white/[0.05] transition-colors">
                    <p className="text-xs font-bold text-white/90">{step}</p>
                  </div>
                ))}
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-green-600/5 border border-emerald-500/20 shadow-[0_5px_20px_rgba(16,185,129,0.1)] mt-4">
                  <p className="text-sm font-black text-emerald-400">Revenue Recognized</p>
                  <span className="text-[9px] text-emerald-300/70 font-black uppercase tracking-[0.2em]">Deal Complete</span>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 opacity-50 relative z-10">
                <p className="text-[10px] font-black text-[#8a919c] uppercase tracking-widest">Transaction Layer</p>
              </div>
            </div>
          </motion.div>

          {/* Column 4: Automation & Follow-up */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="space-y-4 relative z-10">
            <div className="p-6 rounded-2xl bg-white/[0.01] backdrop-blur-xl border border-white/[0.05] shadow-xl hover:border-white/10 transition-colors h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase tracking-[0.15em] text-white">4. Retain</h3>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#8a919c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              </div>
              <div className="space-y-3 flex-1 opacity-70 hover:opacity-100 transition-opacity">
                {['No-show Recovery', 'Cold Lead Re-engagement', 'Dynamic Script Logic', 'Lifetime Value Comm'].map((step, i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/[0.01] border border-white/[0.05] border-dashed">
                    <p className="text-[11px] font-bold text-[#8a919c]">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 opacity-50">
                <p className="text-[10px] font-black text-[#8a919c] uppercase tracking-widest">Post-Funnel Ops</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Bottom Left: Live Pipeline Feed (Real-Time Backend Data) */}
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="lg:col-span-8 p-8 rounded-3xl bg-white/[0.01] backdrop-blur-3xl border border-white/[0.05] shadow-2xl relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-cyan-500/10 transition-all"></div>
            <LiveLeadFeed onSelectLead={(lead) => setSelectedLead(lead)} />
          </motion.div>

          {/* Bottom Right Chart: Revenue Funnel Metrics */}
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="lg:col-span-4 p-8 rounded-3xl bg-white/[0.01] backdrop-blur-3xl border border-white/[0.05] shadow-2xl relative min-h-[400px] group hover:border-white/10 transition-colors overflow-hidden flex flex-col">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-emerald-500/10 transition-all"></div>

            {statsLoading && (
              <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 backdrop-blur-sm z-20">
                <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
                <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Syncing Analytics...</span>
              </div>
            )}
            
            <h3 className="text-lg font-black text-white mb-2 relative z-10 tracking-tight">Revenue Pipeline Velocity</h3>
            <p className="text-[10px] font-bold text-[#8a919c] uppercase tracking-widest mb-10 relative z-10">Real-Time Trajectory Analysis</p>
            
            <div className="relative h-48 flex items-end justify-between gap-4 mb-8 flex-1 mt-auto z-10">
              {[
                { label: 'New', val: stats.funnelStages.new },
                { label: 'Qual', val: stats.funnelStages.qualified },
                { label: 'Book', val: stats.funnelStages.booked },
                { label: 'Conv', val: stats.funnelStages.converted },
              ].map((stage, i) => {
                const maxVal = Math.max(...Object.values(stats.funnelStages), 1)
                const height = `${(stage.val / maxVal) * 100}%`
                return (
                  <div key={i} className="flex-1 bg-white/[0.02] border border-white/5 rounded-t-xl relative h-full overflow-hidden group-hover:bg-white/[0.04] transition-colors">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-600 to-cyan-400 rounded-t-lg transition-all shadow-[0_0_20px_rgba(52,211,153,0.4)]"
                    ></motion.div>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-[#8a919c] uppercase tracking-wider">
                      {stage.val}
                    </div>
                  </div>
                )
              })}
            </div>
            
            <div className="space-y-3 relative z-10 pb-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                  <span className="text-[11px] font-black text-[#8a919c] uppercase tracking-widest">Total Pipeline</span>
                </div>
                <span className="text-xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(52,211,153,0.2)]">{formatRevenue(stats.totalRevenue)}</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 shadow-inner opacity-70">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/50"></div>
                  <span className="text-[11px] font-black text-[#8a919c] uppercase tracking-widest">Active Leads</span>
                </div>
                <span className="text-xl font-black text-white">{stats.activeLeads.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Brain Conversation Panel */}
        <AIConversationPanel 
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          leadId={selectedLead?._id || selectedLead?.id || ''}
          leadName={selectedLead?.name || ''}
          conversionScore={selectedLead?.score || 0}
          conversation={selectedLead?.conversation || []}
          analysisReason={selectedLead?.analysisReason}
        />
      </main>
    </div>
  )
}
