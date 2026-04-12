'use client'

import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  value: string | number
  label: string
  color: string
  bgColor: string
  borderColor: string
}

export default function StatCard({ icon: Icon, value, label, color, bgColor, borderColor }: StatCardProps) {
  return (
    <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 ${color.replace('text-', 'bg-').replace('-600', '-500')} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
          Active
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-[#94a3b8]">{label}</p>
      </div>
    </div>
  )
}