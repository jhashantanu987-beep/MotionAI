'use client'

import { Suspense } from 'react'
import TopNavigation from './TopNavigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0b0f17] text-[#e5e7eb] flex flex-col">
      {/* Top Navigation Bar */}
      <Suspense fallback={<div className="h-32 bg-[#1a0a2e] border-b border-[#00d9ff]/30" />}>
        <TopNavigation />
      </Suspense>

      {/* Content */}
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  )
}
