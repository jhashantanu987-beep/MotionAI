'use client'

import { Download, Filter, Calendar } from 'lucide-react'

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      name: 'Monthly Sales Report',
      description: 'Comprehensive sales metrics for the current month',
      generatedDate: 'April 8, 2026',
      period: 'April 2026',
      status: 'Ready',
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'Client Performance Analysis',
      description: 'Detailed performance metrics for all active clients',
      generatedDate: 'April 5, 2026',
      period: 'Q2 2026',
      status: 'Ready',
      size: '3.1 MB',
    },
    {
      id: 3,
      name: 'Team Productivity Report',
      description: 'Individual and team productivity metrics',
      generatedDate: 'April 3, 2026',
      period: 'March 2026',
      status: 'Ready',
      size: '1.8 MB',
    },
    {
      id: 4,
      name: 'Revenue Forecast',
      description: 'Q3 2026 revenue projections based on current data',
      generatedDate: 'March 28, 2026',
      period: 'Q3 2026',
      status: 'Processing',
      size: '—',
    },
    {
      id: 5,
      name: 'Customer Satisfaction Survey',
      description: 'Results from recent customer satisfaction surveys',
      generatedDate: 'March 15, 2026',
      period: 'Q1 2026',
      status: 'Ready',
      size: '485 KB',
    },
  ]

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
            <p className="text-gray-600">View and download all your business reports</p>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
            + Generate Report
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition">
            <Calendar className="w-4 h-4" />
            Date Range
          </button>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{report.name}</h3>
                  <p className="text-gray-600 mb-4">{report.description}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span>Generated: {report.generatedDate}</span>
                    <span>Period: {report.period}</span>
                    <span>Size: {report.size}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    report.status === 'Ready'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {report.status}
                  </span>
                  {report.status === 'Ready' && (
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition text-blue-600">
                      <Download className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
