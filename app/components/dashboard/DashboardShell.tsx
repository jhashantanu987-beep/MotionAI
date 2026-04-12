'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Activity,
  BarChart3,
  CalendarDays,
  MessagesSquare,
  PieChart,
  Sparkles,
  TrendingUp
} from 'lucide-react'
import AIInsight from './AIInsight'
import AnimatedStatCard from './AnimatedStatCard'
import AIOptimizationEngine from './AIOptimizationEngine'
import LiveActivityFeed from './LiveActivityFeed'
import {
  activityFeed,
  aiInsight,
  analyticsCards,
  bookings,
  conversationHistory,
  conversionSeries,
  dashboardStats,
  leads,
  revenueSeries
} from '../../data/mock'

const navItems = [
  { key: 'overview', label: 'Overview', icon: Sparkles },
  { key: 'leads', label: 'Leads', icon: Activity },
  { key: 'bookings', label: 'Bookings', icon: CalendarDays },
  { key: 'conversations', label: 'Conversations', icon: MessagesSquare },
  { key: 'analytics', label: 'Analytics', icon: PieChart }
]

const badgeColor: Record<string, string> = {
  Hot: 'bg-rose-100 text-rose-600',
  Warm: 'bg-amber-100 text-amber-700',
  Cold: 'bg-slate-100 text-slate-700',
  Confirmed: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-cyan-100 text-cyan-700'
}

interface DashboardShellProps {
  selectedView?: 'overview' | 'leads' | 'bookings' | 'conversations' | 'analytics'
}

export default function DashboardShell({ selectedView }: DashboardShellProps) {
  const pathname = usePathname()
  const currentSegment = pathname?.split('/').filter(Boolean).pop() ?? 'overview'
  const activeRoute = selectedView ?? (['overview', 'leads', 'bookings', 'conversations', 'analytics'].includes(currentSegment) ? currentSegment : 'overview')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Hot' | 'Warm' | 'Cold'>('All')

  const filteredLeads = useMemo(() => {
    const query = search.toLowerCase()
    return leads.filter((lead) => {
      const matchesQuery = lead.name.toLowerCase().includes(query) || lead.email.toLowerCase().includes(query)
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter
      return matchesQuery && matchesStatus
    })
  }, [search, statusFilter])

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="rounded-[2rem] bg-white p-8 shadow-[0_35px_90px_rgba(15,23,42,0.08)]"
        >
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Klara AI</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Premium AI revenue analytics for high-growth teams.
              </h1>
              <p className="mt-5 text-base leading-7 text-slate-600">
                A clean, soft dashboard experience built for focus, trust, and fast decision-making. Monitor pipeline momentum, bookings, and AI recommendations in one polished workspace.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
                Live AI dashboard
              </span>
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100">
                Subtle AI suggestions
              </span>
            </div>
          </div>
        </motion.section>

        <motion.nav
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-wrap items-center gap-3 rounded-[2rem] bg-white p-4 shadow-[0_25px_60px_rgba(15,23,42,0.06)]"
        >
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/dashboard/${item.key}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeRoute === item.key
                  ? 'bg-indigo-600 text-white shadow-[0_15px_35px_rgba(99,102,241,0.18)]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </motion.nav>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.slice(0, 4).map((stat) => (
            <AnimatedStatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              display={stat.display}
              change={stat.change}
              accent={stat.accent as any}
            />
          ))}
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="rounded-[2rem] bg-white p-6 shadow-[0_25px_60px_rgba(15,23,42,0.08)]"
          >
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Pipeline momentum</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900">Revenue performance</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                <span className="text-indigo-700">+18%</span> month-over-month
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[1.75rem] bg-slate-50 p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Forecast</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">$132k</p>
                  </div>
                  <div className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                    Revenue growth
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  {revenueSeries.map((value, index) => (
                    <div key={index} className="flex items-end gap-3">
                      <span className="text-sm text-slate-500">{`Day ${index + 1}`}</span>
                      <div className="relative flex-1 h-24 rounded-[1.5rem] bg-slate-200">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${value + 10}%` }}
                          transition={{ duration: 0.85, ease: 'easeOut' }}
                          className="absolute bottom-0 left-0 right-0 rounded-[1.5rem] bg-gradient-to-t from-cyan-500 to-violet-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {analyticsCards.slice(0, 3).map((card) => (
                  <div key={card.label} className="rounded-[1.75rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm uppercase tracking-[0.28em] text-slate-500">{card.label}</p>
                      <span className="text-sm font-semibold text-slate-700">{card.value}</span>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-slate-200">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${card.progress}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <div className="space-y-6">
            <AIInsight summary={aiInsight.summary} subtext={aiInsight.subtext} change={aiInsight.change} />
            <LiveActivityFeed items={activityFeed} />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="rounded-[2rem] bg-white p-6 shadow-[0_25px_60px_rgba(15,23,42,0.08)]"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Pipeline watchlist</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Top prospects to engage</h2>
              </div>
              <p className="text-sm text-slate-500">Updated just now</p>
            </div>

            <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredLeads.slice(0, 5).map((lead) => (
                    <tr key={lead.email} className="transition hover:bg-slate-50">
                      <td className="px-6 py-4 text-slate-900 font-medium">{lead.name}</td>
                      <td className="px-6 py-4 text-slate-500">{lead.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeColor[lead.status]}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{lead.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          <div className="space-y-6">
            <AIOptimizationEngine />
            <motion.section
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="rounded-[2rem] bg-white p-6 shadow-[0_25px_60px_rgba(15,23,42,0.08)]"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Team summary</p>
              <div className="mt-6 space-y-4">
                {bookings.slice(0, 3).map((booking) => (
                  <div key={booking.title} className="rounded-[1.75rem] bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{booking.title}</p>
                        <p className="mt-1 text-sm text-slate-500">{booking.time}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor[booking.status]}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  )
}
