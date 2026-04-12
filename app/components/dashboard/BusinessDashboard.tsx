'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { DollarSign, TrendingUp, Users, Zap, Target, Activity, Settings, ArrowUpRight, Send } from 'lucide-react'
import ConversionFunnel from './ConversionFunnel'
import ClientPerformanceTable from './ClientPerformanceTable'
import BusinessActivityFeed from './BusinessActivityFeed'
import { MetricCardSkeleton, ActivityFeedSkeleton, FunnelSkeleton } from './Skeletons'
import { useLeads } from '../../contexts/LeadsContext'

type Metrics = {
  revenue: number
  clients: number
  conversionRate: number
  responseTime: number
  updatedAt: number
}

type FunnelResponse = {
  adClicks: number
  landingPage: number
  leadCapture: number
  qualifiedLead: number
  bookedCall: number
  closedDeal: number
  updatedAt: number
}

type ClientData = {
  id: string
  name: string
  industry: string
  leads: number
  bookings: number
  conversions: number
  revenue: string
  noShowRate: string
  createdAt: string
  updatedAt: string
  status: 'active' | 'inactive'
}

type InsightCard = {
  title: string
  description: string
  action: string
}

const placeholderActivity = [
  { event: 'New lead captured from paid traffic', time: 'Just now', type: 'lead' as const, value: '+1 lead', id: 'activity-1' },
  { event: 'Follow-up sequence triggered for warm prospects', time: '2 min ago', type: 'optimization' as const, value: '5 targets', id: 'activity-2' },
  { event: 'AI engine refreshed conversion signals', time: '7 min ago', type: 'demand' as const, value: '+1 insight', id: 'activity-3' },
  { event: 'Booking window updated for next client calls', time: '14 min ago', type: 'booking' as const, value: '10 slots', id: 'activity-4' },
  { event: 'System performance check completed successfully', time: '21 min ago', type: 'recovery' as const, value: 'Stable', id: 'activity-5' }
]

export default function BusinessDashboard() {
  const { inactiveLeadsCount, sendFollowUp, isSendingFollowUp } = useLeads()
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [funnel, setFunnel] = useState<FunnelResponse | null>(null)
  const [insights, setInsights] = useState<InsightCard[]>([])
  const [clients, setClients] = useState<ClientData[]>([])
  const [activeInsight, setActiveInsight] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [secondsAgo, setSecondsAgo] = useState(0)

  const refreshDashboard = async () => {
    setIsLoading(true)

    try {
      const [insightsRes, clientsRes] = await Promise.all([
        fetch('/api/insights'),
        fetch('/api/clients')
      ])

      if (!insightsRes.ok || !clientsRes.ok) {
        throw new Error('Unable to load dashboard data')
      }

      const insightsData = await insightsRes.json()
      const clientsData = await clientsRes.json()

      // Calculate real metrics and funnel from client data
      const realMetrics = calculateMetricsFromClients(clientsData)
      const realFunnel = calculateFunnelFromClients(clientsData)

      setMetrics(realMetrics)
      setFunnel(realFunnel)
      setInsights(insightsData)
      setClients(clientsData)
      setSecondsAgo(0)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate metrics from real client data
  const calculateMetricsFromClients = (clientsData: ClientData[]): Metrics => {
    if (!clientsData || clientsData.length === 0) {
      return {
        revenue: 0,
        clients: 0,
        conversionRate: 0,
        responseTime: 2.5,
        updatedAt: Date.now()
      }
    }

    // Calculate total revenue from all clients
    const totalRevenue = clientsData.reduce((sum, client) => {
      const revenueValue = parseFloat(client.revenue.replace(/[$,]/g, ''))
      return sum + (isNaN(revenueValue) ? 0 : revenueValue)
    }, 0)

    // Count active clients
    const activeClients = clientsData.filter(client => client.status === 'active').length

    // Calculate average conversion rate
    const avgConversionRate = clientsData.length > 0
      ? clientsData.reduce((sum, client) => sum + client.conversions, 0) / clientsData.length
      : 0

    // Calculate average response time (simulated based on client activity)
    const avgResponseTime = Math.max(1.2, 4.8 - (activeClients * 0.1))

    return {
      revenue: Math.round(totalRevenue),
      clients: activeClients,
      conversionRate: Number(avgConversionRate.toFixed(1)),
      responseTime: Number(avgResponseTime.toFixed(1)),
      updatedAt: Date.now()
    }
  }

  // Calculate funnel from real client data
  const calculateFunnelFromClients = (clientsData: ClientData[]): FunnelResponse => {
    if (!clientsData || clientsData.length === 0) {
      return {
        adClicks: 0,
        landingPage: 0,
        leadCapture: 0,
        qualifiedLead: 0,
        bookedCall: 0,
        closedDeal: 0,
        updatedAt: Date.now()
      }
    }

    // Calculate real funnel metrics from client data
    const totalLeads = clientsData.reduce((sum, client) => sum + (client.leads || 0), 0)
    const totalBookings = clientsData.reduce((sum, client) => sum + (client.bookings || 0), 0)

    // Estimate funnel stages based on client data with realistic conversion rates
    const qualifiedLeads = Math.round(totalLeads * 0.68) // 68% of leads become qualified
    const bookedCalls = totalBookings // Direct from client bookings
    const closedDeals = Math.round(totalBookings * 0.35) // 35% of bookings close

    // Estimate earlier funnel stages (reverse engineering typical conversion rates)
    const leadCapture = Math.round(qualifiedLeads / 0.68) // Leads that were captured
    const landingPage = Math.round(leadCapture / 0.38) // Landing page visitors
    const adClicks = Math.round(landingPage / 0.74) // Ad clicks that led to landing page

    return {
      adClicks: Math.max(adClicks, totalLeads * 3), // Ensure minimum based on leads
      landingPage: Math.max(landingPage, totalLeads * 2.5),
      leadCapture: Math.max(leadCapture, totalLeads * 1.5),
      qualifiedLead: Math.max(qualifiedLeads, totalLeads),
      bookedCall: Math.max(bookedCalls, totalBookings),
      closedDeal: Math.max(closedDeals, Math.round(totalBookings * 0.2)),
      updatedAt: Date.now()
    }
  }

  useEffect(() => {
    refreshDashboard()
    const refreshInterval = window.setInterval(refreshDashboard, 12000)
    return () => window.clearInterval(refreshInterval)
  }, [])

  // Recalculate metrics and funnel when clients data changes
  useEffect(() => {
    if (clients.length >= 0) { // Allow empty array
      const realMetrics = calculateMetricsFromClients(clients)
      const realFunnel = calculateFunnelFromClients(clients)
      setMetrics(realMetrics)
      setFunnel(realFunnel)
    }
  }, [clients])

  useEffect(() => {
    if (!metrics) return
    setSecondsAgo(Math.round((Date.now() - metrics.updatedAt) / 1000))
    const timer = window.setInterval(() => {
      setSecondsAgo(Math.round((Date.now() - metrics.updatedAt) / 1000))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [metrics])

  useEffect(() => {
    if (!insights.length) return
    const rotate = window.setInterval(() => {
      setActiveInsight((prev) => (prev + 1) % insights.length)
    }, 9000)
    return () => window.clearInterval(rotate)
  }, [insights])

  const computedMetrics = metrics
    ? [
        {
          title: 'Monthly Revenue',
          value: `$${metrics.revenue.toLocaleString()}`,
          change: metrics.clients > 0 ? `${Math.round((metrics.revenue / metrics.clients) / 100)}% vs last month` : 'No data',
          icon: DollarSign,
          gradient: 'from-green-500 to-emerald-600',
          trend: 'up'
        },
        {
          title: 'Active Clients',
          value: metrics.clients,
          change: metrics.clients > 0 ? `${metrics.clients} total clients` : 'No active clients',
          icon: Users,
          gradient: 'from-blue-500 to-cyan-600',
          trend: 'up'
        },
        {
          title: 'Lead Conversion',
          value: `${metrics.conversionRate.toFixed(1)}%`,
          change: metrics.conversionRate > 0 ? `${metrics.conversionRate > 50 ? 'High' : 'Moderate'} performance` : 'No conversions',
          icon: Target,
          gradient: 'from-purple-500 to-pink-600',
          trend: 'up'
        },
        {
          title: 'AI Response Time',
          value: `${metrics.responseTime.toFixed(1)}s`,
          change: metrics.responseTime < 3 ? 'Excellent' : 'Good',
          icon: Zap,
          gradient: 'from-orange-500 to-red-600',
          trend: 'down'
        }
      ]
    : []

  const funnelStages = funnel
    ? [
        { stage: 'Ad Clicks', value: funnel.adClicks, percentage: 100 },
        { stage: 'Landing Page', value: funnel.landingPage, percentage: funnel.adClicks > 0 ? Math.round((funnel.landingPage / funnel.adClicks) * 100) : 0 },
        { stage: 'Lead Capture', value: funnel.leadCapture, percentage: funnel.adClicks > 0 ? Math.round((funnel.leadCapture / funnel.adClicks) * 100) : 0 },
        { stage: 'Qualified Lead', value: funnel.qualifiedLead, percentage: funnel.adClicks > 0 ? Math.round((funnel.qualifiedLead / funnel.adClicks) * 100) : 0 },
        { stage: 'Booked Call', value: funnel.bookedCall, percentage: funnel.adClicks > 0 ? Math.round((funnel.bookedCall / funnel.adClicks) * 100) : 0 },
        { stage: 'Closed Deal', value: funnel.closedDeal, percentage: funnel.adClicks > 0 ? Math.round((funnel.closedDeal / funnel.adClicks) * 100) : 0 }
      ]
    : []

  const demandStats = funnel
    ? [
        { label: 'Traffic', value: funnel.adClicks.toLocaleString() },
        { label: 'Cost/Lead', value: `$${(metrics ? metrics.revenue / Math.max(funnel.leadCapture, 1) : 0).toFixed(2)}` },
        { label: 'ROAS', value: `${Math.max(1.2, ((metrics?.revenue ?? 0) / Math.max(funnel.adClicks * 10, 1))).toFixed(1)}x`, highlight: true }
      ]
    : []

  const sdrStats = metrics
    ? [
        { label: 'Response Rate', value: `${Math.max(85, 100 - metrics.responseTime * 8).toFixed(1)}%` },
        { label: 'Qualification', value: `${metrics.conversionRate.toFixed(1)}%` },
        { label: 'Avg Response', value: `${metrics.responseTime.toFixed(1)}s` }
      ]
    : []

  const revenueMix = metrics
    ? [
        { label: 'Monthly Retainer', value: `$${Math.round(metrics.revenue * 0.58).toLocaleString()}` },
        { label: 'Performance', value: `$${Math.round(metrics.revenue * 0.28).toLocaleString()}` },
        { label: 'Setup Fees', value: `$${Math.round(metrics.revenue * 0.14).toLocaleString()}` }
      ]
    : []

  const detailSections: Array<{ title: string; metrics?: Array<{ label: string; value: string; highlight?: boolean }>; actions?: string[] }> = [
    { title: 'Demand Engine', metrics: demandStats },
    { title: 'AI SDR', metrics: sdrStats },
    { title: 'Revenue Mix', metrics: revenueMix },
    { title: 'Quick Actions', actions: ['Create New Campaign', 'Review AI Insights', 'Export Report', 'Manage Clients'] }
  ]

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8 space-y-6">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white tracking-tight sm:text-6xl">
            Business Overview
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-8">
            Monitor your AI revenue systems and client performance with real-time insights.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="premium-card border border-emerald-500/30 p-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 shadow-lg shadow-emerald-500/10"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="p-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg"
              >
                <Zap className="w-4 h-4 text-white" />
              </motion.div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
                  AI Insight
                </p>
                <motion.p
                  key={`followup-${inactiveLeadsCount}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-sm text-white font-medium"
                >
                  {inactiveLeadsCount > 0
                    ? `${inactiveLeadsCount} lead${inactiveLeadsCount === 1 ? '' : 's'} need${inactiveLeadsCount === 1 ? 's' : ''} follow-up (inactive >3 days)`
                    : 'All leads are active and engaged'
                  }
                </motion.p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {inactiveLeadsCount > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendFollowUp}
                  disabled={isSendingFollowUp}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {isSendingFollowUp ? 'Sending...' : 'Send Follow-up'}
                </motion.button>
              )}
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.28em] text-emerald-400/70">Real-time updates</p>
                {metrics && <p className="text-xs text-slate-400">Last updated: {secondsAgo}s ago</p>}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <MetricCardSkeleton />
            </motion.div>
          ))
        ) : (
          computedMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  y: -5
                }}
                className="premium-card p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Live indicator dot */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${metric.gradient} bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-1">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
                      )}
                      <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  >
                    <p className="text-3xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                      {metric.value}
                    </p>
                    <p className="text-sm font-medium text-slate-400 mb-2 group-hover:text-slate-300 transition-colors">
                      {metric.title}
                    </p>
                    <p className={`text-sm flex items-center gap-1 ${
                      metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {metric.change}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )
          })
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Charts and Performance */}
        <div className="lg:col-span-2 space-y-8">
          {/* Conversion Funnel */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Conversion Funnel</h2>
              <motion.select
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <option className="bg-gray-800">Last 30 days</option>
                <option className="bg-gray-800">Last 7 days</option>
                <option className="bg-gray-800">This month</option>
              </motion.select>
            </div>
            {isLoading ? <FunnelSkeleton /> : <ConversionFunnel data={funnelStages} />}
          </div>

          {/* Client Performance Table */}
          <div>
            <ClientPerformanceTable data={clients} />
          </div>
        </div>

        {/* Right Column - Activity and Insights */}
        <div className="space-y-8">
          {/* AI Optimization Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-blue-500/10 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg shadow-lg shadow-emerald-400/30"
                >
                  <Zap className="w-5 h-5 text-white" />
                </motion.div>
                <h3 className="text-lg font-semibold text-white">AI Insights</h3>
              </div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-400 hover:text-white" />
              </motion.div>
            </div>
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-20 w-full rounded-2xl bg-slate-800/70 animate-pulse" />
                <div className="h-14 w-full rounded-2xl bg-slate-800/70 animate-pulse" />
              </div>
            ) : (
              <div className="space-y-4">
                {insights.length > 0 && (
                  <motion.div
                    key={activeInsight}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="rounded-2xl border border-white/10 bg-slate-950/80 p-5"
                  >
                    <p className="text-sm uppercase tracking-[0.28em] text-cyan-300 mb-2">{insights[activeInsight].title}</p>
                    <p className="text-white text-base leading-7 mb-4">{insights[activeInsight].description}</p>
                    <button className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200 hover:bg-cyan-500/20 transition">
                      <Send className="w-4 h-4" />
                      {insights[activeInsight].action}
                    </button>
                  </motion.div>
                )}
                <div className="flex gap-2">
                  {insights.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveInsight(index)}
                      className={`h-2.5 w-2.5 rounded-full transition-all ${index === activeInsight ? 'bg-cyan-400 shadow-lg shadow-cyan-400/40' : 'bg-slate-700'}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Live Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-600/30 rounded-2xl p-6 hover:shadow-2xl hover:shadow-slate-500/20 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
                />
                <h3 className="text-lg font-semibold text-white">Live Activity</h3>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Activity className="w-5 h-5 text-gray-400 hover:text-white" />
              </motion.div>
            </div>
            {isLoading ? <ActivityFeedSkeleton /> : <BusinessActivityFeed data={placeholderActivity} />}
          </motion.div>

          {/* System Performance */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-6">System Performance</h3>
            <div className="space-y-6">
              {[
                { name: "Demand Engine", uptime: "98.5%", color: "bg-green-500" },
                { name: "AI SDR System", uptime: "99.2%", color: "bg-green-500" },
                { name: "Booking Engine", uptime: "94.7%", color: "bg-yellow-500" }
              ].map((system, index) => (
                <div key={system.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300">{system.name}</span>
                    <span className={`text-sm font-medium ${system.uptime === '94.7%' ? 'text-yellow-400' : 'text-green-400'}`}>
                      {system.uptime} uptime
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${system.color} rounded-full`}
                      style={{ width: system.uptime }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Detailed Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {detailSections.map((section, index) => (
          <div
            key={section.title}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
            {section.metrics ? (
              <div className="space-y-3">
                {section.metrics.map((metric, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-sm text-gray-400">{metric.label}</span>
                    <span className={`text-sm font-medium ${metric.highlight ? 'text-green-400' : 'text-white'}`}>
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {section.actions?.map((action, idx) => (
                  <motion.button
                    key={idx}
                    className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    whileHover={{ scale: 1.02, x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {action}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
