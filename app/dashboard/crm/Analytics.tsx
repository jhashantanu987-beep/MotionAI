'use client'

import { TrendingUp, TrendingDown, Calendar } from 'lucide-react'

export default function AnalyticsPage() {
  const metrics = [
    { label: 'Total Revenue', value: '$124,500', change: '+12.5%', isPositive: true, icon: TrendingUp },
    { label: 'Active Cases', value: '487', change: '+8.2%', isPositive: true, icon: TrendingUp },
    { label: 'Conversion Rate', value: '38.2%', change: '-2.1%', isPositive: false, icon: TrendingDown },
    { label: 'Avg Resolution Time', value: '4.2 days', change: '+0.5 days', isPositive: false, icon: TrendingDown },
  ]

  const chartData = [
    { month: 'Jan', revenue: 45000, cases: 120, satisfaction: 85 },
    { month: 'Feb', revenue: 52000, cases: 145, satisfaction: 87 },
    { month: 'Mar', revenue: 48000, cases: 135, satisfaction: 84 },
    { month: 'Apr', revenue: 61000, cases: 165, satisfaction: 89 },
    { month: 'May', revenue: 58000, cases: 155, satisfaction: 86 },
    { month: 'Jun', revenue: 71000, cases: 187, satisfaction: 91 },
  ]

  const topPerformers = [
    { name: 'Alice Johnson', cases: 45, revenue: '$52,400', rating: '4.8/5' },
    { name: 'Bob Smith', cases: 38, revenue: '$41,200', rating: '4.6/5' },
    { name: 'Carol Williams', cases: 42, revenue: '$48,800', rating: '4.7/5' },
    { name: 'David Brown', cases: 35, revenue: '$38,900', rating: '4.5/5' },
  ]

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a]">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Track performance metrics and insights</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">{metric.label}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                  </div>
                  <div className={`p-3 rounded-lg ${metric.isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
                    <Icon className={`w-5 h-5 ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                </div>
                <p className={`text-sm font-semibold ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </p>
              </div>
            )
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Revenue Trend</h2>
            <div className="h-64 flex items-end gap-3 justify-around">
              {chartData.map((data, idx) => {
                const maxValue = Math.max(...chartData.map(d => d.revenue))
                const height = (data.revenue / maxValue) * 100
                return (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500" style={{ height: `${height}%` }}></div>
                    <p className="text-xs text-gray-600 mt-2">{data.month}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Cases Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Cases Resolved</h2>
            <div className="h-64 flex items-end gap-3 justify-around">
              {chartData.map((data, idx) => {
                const maxValue = Math.max(...chartData.map(d => d.cases))
                const height = (data.cases / maxValue) * 100
                return (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <div className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg transition-all hover:from-purple-600 hover:to-purple-500" style={{ height: `${height}%` }}></div>
                    <p className="text-xs text-gray-600 mt-2">{data.month}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Top Performers</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Team Member</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Cases Closed</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Revenue Generated</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Rating</th>
                </tr>
              </thead>
              <tbody>
                {topPerformers.map((performer, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-4 font-medium text-gray-900">{performer.name}</td>
                    <td className="py-4 px-4 text-gray-600">{performer.cases}</td>
                    <td className="py-4 px-4 font-medium text-gray-900">{performer.revenue}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                        ⭐ {performer.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
