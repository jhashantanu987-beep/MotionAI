'use client'

import RevenueHeader from './components/RevenueHeader'
import RevenueOverview from './components/RevenueOverview'
import FunnelAnalytics from './components/FunnelAnalytics'
import AttributionTracking from './components/AttributionTracking'
import PerformanceMetrics from './components/PerformanceMetrics'

export default function RevenueAnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1a2e4a] to-[#0f172a] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <RevenueHeader />

        {/* Content Area */}
        <div className="flex-1 p-2 md:p-3 space-y-2 md:space-y-3">
          {/* Revenue Overview */}
          <RevenueOverview />

          {/* Funnel Analytics */}
          <FunnelAnalytics />

          {/* Attribution Tracking */}
          <AttributionTracking />

          {/* Performance Metrics */}
          <PerformanceMetrics />
        </div>
      </div>
    </div>
  )
}