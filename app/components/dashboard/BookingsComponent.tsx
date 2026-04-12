'use client'

import { motion } from 'framer-motion'
import { CalendarDays, CheckCircle2, Clock, X } from 'lucide-react'
import { useState } from 'react'

const bookingsData = [
  { id: 1, leadName: 'Sarah Chen', date: '2024-04-15', time: '10:00 AM', duration: '30 min', status: 'Confirmed', timezone: 'PST' },
  { id: 2, leadName: 'Priya Patel', date: '2024-04-15', time: '2:00 PM', duration: '30 min', status: 'Confirmed', timezone: 'EST' },
  { id: 3, leadName: 'Michael Torres', date: '2024-04-16', time: '9:30 AM', duration: '45 min', status: 'Pending', timezone: 'CST' },
  { id: 4, leadName: 'Emma Richardson', date: '2024-04-17', time: '3:00 PM', duration: '30 min', status: 'Confirmed', timezone: 'PST' },
  { id: 5, leadName: 'David Kim', date: '2024-04-18', time: '11:00 AM', duration: '30 min', status: 'Cancelled', timezone: 'EST' },
  { id: 6, leadName: 'James Wilson', date: '2024-04-19', time: '1:00 PM', duration: '30 min', status: 'Pending', timezone: 'CST' },
]

const getStatusIcon = (status: string) => {
  if (status === 'Confirmed') return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
  if (status === 'Pending') return <Clock className="h-4 w-4 text-amber-500" />
  return <X className="h-4 w-4 text-slate-400" />
}

const getStatusBg = (status: string) => {
  if (status === 'Confirmed') return 'bg-emerald-500/10 text-emerald-400'
  if (status === 'Pending') return 'bg-amber-500/10 text-amber-400'
  return 'bg-slate-700/20 text-slate-400'
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 }
  },
  hover: {
    x: 4,
    transition: { duration: 0.2 }
  }
}

export default function BookingsComponent() {
  const [selectedStatus, setSelectedStatus] = useState('All')

  const filteredBookings = selectedStatus === 'All'
    ? bookingsData
    : bookingsData.filter((b) => b.status === selectedStatus)

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    const dateA = new Date(a.date + ' ' + a.time)
    const dateB = new Date(b.date + ' ' + b.time)
    return dateA.getTime() - dateB.getTime()
  })

  const upcomingCount = bookingsData.filter((b) => b.status === 'Confirmed').length
  const pendingCount = bookingsData.filter((b) => b.status === 'Pending').length

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4"
        >
          <p className="text-sm text-emerald-300 font-medium">Confirmed This Week</p>
          <p className="text-3xl font-bold text-emerald-400 mt-2">{upcomingCount}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4"
        >
          <p className="text-sm text-amber-300 font-medium">Awaiting Confirmation</p>
          <p className="text-3xl font-bold text-amber-400 mt-2">{pendingCount}</p>
        </motion.div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All', 'Confirmed', 'Pending', 'Cancelled'].map((status) => (
          <motion.button
            key={status}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-all text-sm whitespace-nowrap ${
              selectedStatus === status
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            {status}
          </motion.button>
        ))}
      </div>

      {/* Bookings List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-3"
      >
        {sortedBookings.map((booking) => (
          <motion.div
            key={booking.id}
            variants={itemVariants}
            whileHover="hover"
            className="rounded-xl border border-slate-700/50 bg-slate-900/40 hover:bg-slate-900/60 p-4 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <CalendarDays className="h-5 w-5 text-cyan-400" />
                  <p className="font-semibold text-slate-100">{booking.leadName}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm text-slate-400 ml-8">
                  <p>
                    <span className="text-slate-500">Date: </span>
                    {booking.date}
                  </p>
                  <p>
                    <span className="text-slate-500">Time: </span>
                    {booking.time} ({booking.duration})
                  </p>
                  <p>
                    <span className="text-slate-500">Timezone: </span>
                    {booking.timezone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${getStatusBg(booking.status)}`}>
                  {getStatusIcon(booking.status)}
                  <span className="text-xs font-medium">{booking.status}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {sortedBookings.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-slate-400">No bookings found</p>
        </motion.div>
      )}
    </div>
  )
}
