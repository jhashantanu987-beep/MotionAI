'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface ClientData {
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

interface ClientPerformanceTableProps {
  data: ClientData[]
}

export default function ClientPerformanceTable({ data }: ClientPerformanceTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
    >
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white">Client Performance</h2>
        <p className="text-sm text-gray-400 mt-1">This month's results across all active clients</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Client</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Industry</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Leads</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Bookings</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Conversions</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Revenue</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">No-show</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <td colSpan={7} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 font-medium">No clients yet</p>
                      <p className="text-sm text-gray-500">Add your first client to see performance data</p>
                    </div>
                  </div>
                </td>
              </motion.tr>
            ) : (
              data.map((client, index) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  className="border-b border-white/5 hover:bg-white/5 transition-all duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{client.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-white/10 text-gray-300 rounded-full">
                      {client.industry}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-medium text-white">{client.leads.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-medium text-white">{client.bookings}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-medium text-green-400">{client.conversions}%</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-semibold text-white">{client.revenue}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-sm font-medium ${client.noShowRate === '5%' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {client.noShowRate}
                    </span>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
