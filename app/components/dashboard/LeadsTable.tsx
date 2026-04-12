'use client'

import { motion } from 'framer-motion'
import { Flame, AlertCircle, Snowflake, TrendingUp, CheckCircle } from 'lucide-react'
import { useState, useMemo } from 'react'
import { useLeads } from '../../contexts/LeadsContext'

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-red-500'
  if (score >= 65) return 'text-amber-500'
  return 'text-slate-400'
}

const getScoreBg = (score: number) => {
  if (score >= 80) return 'bg-red-500/10'
  if (score >= 65) return 'bg-amber-500/10'
  return 'bg-slate-700/20'
}

const getStatusIcon = (status: string) => {
  if (status === 'hot') return <Flame className="h-4 w-4 text-red-500" />
  if (status === 'warm') return <AlertCircle className="h-4 w-4 text-amber-500" />
  if (status === 'contacted') return <CheckCircle className="h-4 w-4 text-green-500" />
  return <Snowflake className="h-4 w-4 text-slate-400" />
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 }
  }
}

export default function LeadsTableComponent() {
  const { leads } = useLeads()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filteredLeads = useMemo(() => {
    let filtered = leads
    if (search) {
      filtered = filtered.filter((lead) =>
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.company.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (filter !== 'All') {
      filtered = filtered.filter((lead) => lead.status === filter.toLowerCase())
    }
    return filtered.sort((a, b) => b.score - a.score)
  }, [leads, search, filter])

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 overflow-x-auto">
          {['All', 'Hot', 'Warm', 'Cold'].map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                filter === status
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              {status}
            </motion.button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg bg-slate-700/30 px-4 py-2 text-sm text-slate-100 placeholder-slate-500 border border-slate-600/50 focus:outline-none focus:border-cyan-400/50"
        />
      </div>

      {/* Table */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-xl border border-slate-700/50 bg-slate-900/40 overflow-hidden"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50 bg-slate-800/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Lead</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Company</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Score</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Active</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <motion.tr
                key={lead.id}
                variants={rowVariants}
                className="border-b border-slate-700/30 hover:bg-slate-800/40 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-slate-100">{lead.name}</p>
                    <p className="text-sm text-slate-400">{lead.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-300 text-sm">{lead.company}</td>
                <td className="px-6 py-4">
                  <div className={`${getScoreBg(lead.score)} px-3 py-1 rounded-lg inline-flex items-center gap-2`}>
                    <TrendingUp className={`h-4 w-4 ${getScoreColor(lead.score)}`} />
                    <span className={`font-semibold ${getScoreColor(lead.score)}`}>{lead.score}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {getStatusIcon(lead.status)}
                    <span className="text-sm font-medium text-slate-300 capitalize">{lead.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-center">
                    <span className={`text-sm font-medium ${lead.lastActive > 3 ? 'text-red-400' : 'text-slate-300'}`}>
                      {lead.lastActive === 0 ? 'Today' : `${lead.lastActive} days ago`}
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {filteredLeads.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-slate-400">No leads found</p>
        </motion.div>
      )}
    </div>
  )
}
