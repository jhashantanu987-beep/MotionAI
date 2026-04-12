'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Zap, Database, Mail, CheckCircle2, AlertCircle, Clock } from 'lucide-react'

const initialActivityLog = [
  { id: 1, action: 'AI Lead Scoring', lead: 'Sarah Chen', details: 'Score updated to 94 (Hot)', secondsAgo: 120, status: 'completed', icon: Zap },
  { id: 2, action: 'Email Sequence', lead: 'Michael Torres', details: 'Automated follow-up sent', secondsAgo: 300, status: 'completed', icon: Mail },
  { id: 3, action: 'Calendar Sync', lead: 'Emma Richardson', details: 'Meeting scheduled & confirmed', secondsAgo: 480, status: 'completed', icon: Database },
  { id: 4, action: 'Data Sync', lead: 'Priya Patel', details: 'CRM updated with engagement data', secondsAgo: 720, status: 'completed', icon: Database },
  { id: 5, action: 'AI Response', lead: 'David Kim', details: 'Auto-response sent to inbound inquiry', secondsAgo: 900, status: 'completed', icon: Zap },
  { id: 6, action: 'Appointment Reminder', lead: 'James Wilson', details: 'Reminder scheduled for tomorrow', secondsAgo: 1200, status: 'pending', icon: Clock },
  { id: 7, action: 'Lead Nurture Flow', lead: 'John Davis', details: 'Entered drip campaign sequence', secondsAgo: 1500, status: 'completed', icon: Zap },
  { id: 8, action: 'Slack Notification', team: 'Sales Team', details: 'Hot lead alert broadcasted', secondsAgo: 1680, status: 'completed', icon: Mail }
]

const newActivityTemplates = [
  { action: 'Lead Qualification', lead: 'Ava Brooks', details: 'AI updated lead score to 87 (Warm)', status: 'completed', icon: Zap },
  { action: 'Call Review', lead: 'Mason Lee', details: 'Transcript insight added to CRM', status: 'completed', icon: Mail },
  { action: 'Booking Follow-up', lead: 'Noah Davis', details: 'Reminder sent for 3:00 PM demo', status: 'pending', icon: Clock },
  { action: 'Revenue Alert', team: 'Sales Ops', details: 'High opportunity streak detected', status: 'completed', icon: Database }
]

const getStatusIcon = (status: string) => {
  if (status === 'completed') return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
  if (status === 'pending') return <Clock className="h-4 w-4 text-amber-500" />
  return <AlertCircle className="h-4 w-4 text-slate-400" />
}

const getStatusColor = (status: string) => {
  if (status === 'completed') return 'text-emerald-400'
  if (status === 'pending') return 'text-amber-400'
  return 'text-slate-400'
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

const itemVariants = {
  hidden: { opacity: 0, y: 20, x: -10 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.4 }
  }
}

const formatRelativeTime = (seconds: number) => {
  if (seconds < 60) return 'just now'
  if (seconds < 120) return '1 min ago'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
  return `${Math.floor(seconds / 3600)}h ago`
}

export default function ActivityLogsComponent() {
  const [logs, setLogs] = useState(
    initialActivityLog.map((item) => ({
      ...item,
      secondsAgo: item.secondsAgo
    }))
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setLogs((currentLogs) =>
        currentLogs.map((item) => ({
          ...item,
          secondsAgo: item.secondsAgo + 12
        }))
      )
    }, 7000)

    const newItemTimer = setInterval(() => {
      setLogs((currentLogs) => {
        const nextTemplate = newActivityTemplates[Math.floor(Math.random() * newActivityTemplates.length)]
        const newEntry = {
          id: Date.now(),
          ...nextTemplate,
          secondsAgo: 8,
          icon: nextTemplate.icon
        }
        return [newEntry, ...currentLogs].slice(0, 8)
      })
    }, 23000)

    return () => {
      clearInterval(timer)
      clearInterval(newItemTimer)
    }
  }, [])

  const completedCount = logs.filter((a) => a.status === 'completed').length
  const automationsSaved = completedCount * 8 // Assuming 8 min per automation
  const pendingCount = logs.filter((a) => a.status === 'pending').length

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="premium-card p-4 bg-cyan-500/10 border-cyan-500/20"
        >
          <p className="text-sm text-cyan-300 font-medium">Automations Running</p>
          <p className="text-3xl font-bold text-cyan-300 mt-2">{completedCount}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          className="premium-card p-4 bg-emerald-500/10 border-emerald-500/20"
        >
          <p className="text-sm text-emerald-300 font-medium">Time Saved Today</p>
          <p className="text-3xl font-bold text-emerald-300 mt-2">{automationsSaved}m</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="premium-card p-4 bg-purple-500/10 border-purple-500/20"
        >
          <p className="text-sm text-purple-300 font-medium">Pending Actions</p>
          <p className="text-3xl font-bold text-purple-300 mt-2">{pendingCount}</p>
        </motion.div>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider px-4">Recent Activity</h3>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-2"
        >
          {logs.map((activity, index) => {
            const IconComponent = activity.icon
            return (
              <motion.div
                key={activity.id}
                variants={itemVariants}
                className="relative rounded-lg border border-slate-700/40 bg-slate-900/50 hover:bg-slate-900/70 p-4 transition-all cursor-pointer"
              >
                <div className="flex gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className="rounded-full bg-slate-700/50 p-2 text-slate-400">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    {index < logs.length - 1 && (
                      <div className="mt-2 w-px h-12 bg-gradient-to-b from-slate-700/50 to-transparent" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 py-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-100">{activity.action}</p>
                        <p className="text-sm text-slate-400 mt-1">
                          {activity.lead || activity.team}: {activity.details}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <span className="text-xs text-slate-500">{formatRelativeTime(activity.secondsAgo)}</span>
                        {getStatusIcon(activity.status)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* System Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="premium-card p-4"
      >
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">System Status</p>
        <div className="space-y-2 text-sm">
          {[
            { name: 'Automation Engine', uptime: '98.5%', color: 'bg-emerald-500' },
            { name: 'Data Sync', uptime: '99.2%', color: 'bg-emerald-500' },
            { name: 'Lead Scoring AI', uptime: '99.9%', color: 'bg-emerald-500' }
          ].map((system) => (
            <div key={system.name} className="flex items-center justify-between">
              <span className="text-slate-400">{system.name}</span>
              <span className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${system.color}`} />
                <span className="text-emerald-400 font-medium">{system.uptime} online</span>
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
