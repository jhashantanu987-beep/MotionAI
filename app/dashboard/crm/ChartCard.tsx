'use client'

interface ChartCardProps {
  title: string
  percentage: number
  color: string
  subtitle?: string
}

export default function ChartCard({ title, percentage, color, subtitle }: ChartCardProps) {
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-5 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
          {subtitle && <p className="text-sm text-[#94a3b8]">{subtitle}</p>}
        </div>
        <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
          Active
        </div>
      </div>

      {/* Circular Chart */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-40 h-40">
          {/* SVG Circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#374151"
              strokeWidth="8"
            />
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{percentage}%</p>
              <p className="text-xs text-[#94a3b8]">Complete</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-2 border-t border-[#1f2937] pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#94a3b8]">Total Items</span>
          <span className="font-semibold text-white">124</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#94a3b8]">Completed</span>
          <span className="font-semibold text-white">{Math.round((percentage / 100) * 124)}</span>
        </div>
      </div>
    </div>
  )
}
