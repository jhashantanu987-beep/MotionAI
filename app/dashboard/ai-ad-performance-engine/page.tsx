'use client'

import AdHeader from './components/AdHeader'
import CampaignManager from './components/CampaignManager'
import PerformanceAnalytics from './components/PerformanceAnalytics'
import BudgetOptimizer from './components/BudgetOptimizer'
import CreativeAnalyzer from './components/CreativeAnalyzer'

export default function AIAdPerformanceEngineDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1a2e4a] to-[#0f172a] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdHeader />

        {/* Content Area */}
        <div className="flex-1 p-2 md:p-3 space-y-2 md:space-y-3">
          {/* Campaign Manager */}
          <CampaignManager />

          {/* Performance Analytics & Budget Optimizer */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
            <PerformanceAnalytics />
            <BudgetOptimizer />
          </div>

          {/* Creative Analyzer */}
          <CreativeAnalyzer />
        </div>
      </div>
    </div>
  )
}