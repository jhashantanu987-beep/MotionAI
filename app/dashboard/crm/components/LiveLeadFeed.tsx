'use client'

import { useQuery } from '@tanstack/react-query'
import { crmApi, Lead } from '../services/crmApi'
import { Loader2, AlertCircle, RefreshCcw, User, Mail, Phone, ExternalLink, ShieldCheck, MessageSquare, Zap, Calendar, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LiveLeadFeed({ onSelectLead }: { onSelectLead: (lead: Lead) => void }) {
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ['live-leads'],
    queryFn: () => crmApi.getLeads(),
    refetchInterval: 10000, 
  })

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      await crmApi.updateLead(leadId, { status: newStatus as any })
      refetch() // Refresh data after update
    } catch (err) {
      console.error('Failed to update status:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white/[0.01] rounded-2xl border border-white/[0.05] backdrop-blur-md">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-[#bfc7d3]">Synchronizing with Revenue Neural Network</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white/[0.01] rounded-2xl border border-rose-500/20 backdrop-blur-md">
        <AlertCircle className="w-8 h-8 text-rose-500" />
        <p className="text-sm font-bold text-[#e5e2e1]">Connection Bridge Interrupted</p>
        <button 
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-500 rounded-lg text-xs font-bold hover:bg-rose-500/20 transition-all border border-rose-500/20"
        >
          <RefreshCcw className="w-3 h-3" /> Retry Connection
        </button>
      </div>
    )
  }

  const leads = data?.data || []
  const storageMode = data?.storage || 'mongodb'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-black text-[#e5e2e1] uppercase tracking-tighter">Live Pipeline Feed</h3>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${
            storageMode === 'local-file' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
          }`}>
             <ShieldCheck className="w-3 h-3" /> {storageMode === 'local-file' ? 'Local Vault Active' : 'Neural Core Connected'}
          </div>
        </div>
        <button 
          onClick={() => refetch()}
          disabled={isRefetching}
          className="p-2 bg-white/[0.04] border border-white/5 text-[#bfc7d3] rounded-lg hover:text-white hover:bg-white/[0.08] transition-all disabled:opacity-50"
        >
          <RefreshCcw className={`w-4 h-4 ${isRefetching ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[10px] font-black uppercase tracking-widest text-[#bfc7d3]">
              <th className="px-6 pb-2">Lead Identity</th>
              <th className="px-6 pb-2">Pipeline Status</th>
              <th className="px-6 pb-2">Appointment</th>
              <th className="px-6 pb-2">Conversion Score</th>
              <th className="px-6 pb-2">Origin</th>
              <th className="px-6 pb-2 text-right">Engagement</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-24 text-center bg-white/[0.01] rounded-[2rem] border border-dashed border-white/10 backdrop-blur-sm">
                    <div className="max-w-xs mx-auto space-y-4">
                      <div className="w-16 h-16 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center mx-auto opacity-20">
                        <Zap className="w-8 h-8 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-xl font-black text-white/40 uppercase tracking-tighter">Engine Standby</p>
                        <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] mt-2 font-bold select-none">Waiting for Funnel Ingestion...</p>
                      </div>
                      <p className="text-[10px] text-[#bfc7d3]/40 leading-relaxed italic font-medium">
                        "The Intelligence layer is active. Submit a lead from your landing page to see the Neural Network Bridge in action."
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white/[0.01] hover:bg-white/[0.04] transition-colors border border-white/5 group shadow-sm backdrop-blur-md"
                  >
                    <td className="px-6 py-5 rounded-l-2xl border-y border-l border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#121212] to-[#0a0a0a] flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#e5e2e1] group-hover:text-white transition-colors">{lead.name}</p>
                          <p className="text-[10px] text-[#bfc7d3] font-medium flex items-center gap-1">
                            <Mail className="w-2.5 h-2.5" /> {lead.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 border-y border-white/5">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id || lead._id, e.target.value)}
                        className={`appearance-none inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer focus:outline-none ${
                        lead.status === 'converted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]' :
                        lead.status === 'booked' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]' :
                        lead.status === 'lost' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}
                      >
                        <option value="new" className="bg-[#050505]">New</option>
                        <option value="qualified" className="bg-[#050505]">Qualified</option>
                        <option value="booked" className="bg-[#050505]">Booked</option>
                        <option value="converted" className="bg-[#050505]">Converted</option>
                        <option value="lost" className="bg-[#050505]">Lost</option>
                      </select>
                    </td>
                    <td className="px-6 py-5 border-y border-white/5">
                      <div className="flex items-center gap-2">
                        {lead.appointmentDate ? (
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#9acbff]/10 border border-[#9acbff]/20 rounded-lg">
                            <Calendar className="w-3 h-3 text-[#9acbff]" />
                            <span className="text-[10px] font-black text-white">{new Date(lead.appointmentDate).toLocaleDateString()}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 border border-white/5 rounded-md opacity-40">
                             <Clock className="w-3 h-3" />
                             <span className="text-[9px] font-bold uppercase tracking-tight">Pending</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 border-y border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 w-24 h-1.5 bg-white/[0.05] rounded-full overflow-hidden shadow-inner">
                          <div 
                            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full" 
                            style={{ width: `${lead.score}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-[#e5e2e1] group-hover:text-cyan-400 transition-colors">{lead.score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 border-y border-white/5">
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#bfc7d3] bg-white/[0.03] border border-white/5 px-3 py-1 rounded-md">
                         {lead.source}
                       </span>
                    </td>
                    <td className="px-6 py-5 rounded-r-2xl border-y border-r border-white/5 text-right">
                       <button 
                        onClick={() => onSelectLead(lead)}
                        className="p-2 bg-white/[0.03] border border-white/5 text-[#bfc7d3] hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/20 rounded-lg transition-all group/btn flex items-center gap-2 ml-auto"
                       >
                         <span className="text-[10px] font-bold uppercase hidden group-hover:block transition-all">View AI Chat</span>
                         <MessageSquare className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                       </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  )
}
