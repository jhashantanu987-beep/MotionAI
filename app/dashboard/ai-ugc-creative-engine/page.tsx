'use client'

import UGCHeader from './components/UGCHeader'
import ContentGenerator from './components/ContentGenerator'
import ContentLibrary from './components/ContentLibrary'
import PerformanceAnalytics from './components/PerformanceAnalytics'
import SocialScheduler from './components/SocialScheduler'

export default function AIUGCCreativeEngineDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1a2e4a] to-[#0f172a] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <UGCHeader />

        {/* Content Area */}
        <div className="flex-1 p-2 md:p-3 space-y-2 md:space-y-3">
          {/* Content Generator */}
          <ContentGenerator />

          {/* Performance Analytics */}
          <PerformanceAnalytics />

          {/* Content Library & Social Scheduler */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
            <ContentLibrary />
            <SocialScheduler />
          </div>
        </div>
      </div>
    </div>
  )
}