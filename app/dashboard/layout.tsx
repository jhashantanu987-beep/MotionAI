'use client'

import { Suspense } from 'react'
import GlobalHeader from './components/GlobalHeader'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e7eb] flex flex-col pt-20">
      
      {/* Horizontal Top Navigation */}
      <Suspense fallback={<div className="h-20 bg-[#050505] animate-pulse" />}>
        <GlobalHeader />
      </Suspense>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto relative">
        <Suspense fallback={<div className="flex-1 h-screen bg-[#050505] animate-pulse" />}>
          {children}
        </Suspense>
      </main>
    </div>
  )
}
