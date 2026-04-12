'use client'

import { useState } from 'react'
import Layout from '../components/CollapsibleSidebar/Layout'
import Sidebar from '../components/CollapsibleSidebar/Sidebar'
import Header from '../components/CollapsibleSidebar/Header'

const contentMap: Record<string, { title: string; description: string }> = {
  home: {
    title: 'Home dashboard',
    description: 'Overview of activity, stats, and shortcuts for your workspace.'
  },
  crm: {
    title: 'CRM workspace',
    description: 'Manage leads, clients, and conversations in one place.'
  },
  workspace: {
    title: 'Workspace',
    description: 'Project boards, tasks, and notes for fast collaboration.'
  },
  calendar: {
    title: 'Calendar',
    description: 'Your upcoming meetings, reminders, and deadlines.'
  },
  reports: {
    title: 'Reports',
    description: 'Performance analytics, revenue, and campaign health.'
  },
  documents: {
    title: 'Documents',
    description: 'Proposals, invoices, and knowledge assets in one view.'
  },
  messages: {
    title: 'Messages',
    description: 'Recent conversations and team updates.'
  },
  notifications: {
    title: 'Notifications',
    description: 'Alerts, reminders, and system updates for today.'
  },
  revenue: {
    title: 'Revenue analytics',
    description: 'Track sales performance, growth, and revenue trends.'
  },
  ads: {
    title: 'Ad performance',
    description: 'Monitor campaign results and creative effectiveness.'
  },
  ugc: {
    title: 'UGC creative',
    description: 'Review user-generated content and social performance.'
  },
  settings: {
    title: 'Settings',
    description: 'Control appearance, notifications, and account preferences.'
  }
}

export default function CollapsibleSidebarPage() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [activeItem, setActiveItem] = useState('home')
  const current = contentMap[activeItem]

  return (
    <Layout>
      <Sidebar isExpanded={isExpanded} activeItem={activeItem} onSelectItem={setActiveItem} />

      <div className="flex flex-1 flex-col transition-all duration-300">
        <Header isExpanded={isExpanded} toggleSidebar={() => setIsExpanded((value) => !value)} />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Current page</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">{current.title}</h2>
                <p className="mt-2 max-w-2xl text-slate-600">{current.description}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 px-4 py-3 text-slate-700 shadow-sm">
                <span className="font-medium">Active item:</span> {activeItem}
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-slate-900">Quick actions</h3>
                <ul className="mt-4 space-y-3 text-slate-600">
                  <li>• Review latest data</li>
                  <li>• Customize your sidebar</li>
                  <li>• Track campaign progress</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-slate-900">Sidebar state</h3>
                <p className="mt-4 text-slate-600">
                  The menu is currently <span className="font-semibold">{isExpanded ? 'expanded' : 'collapsed'}</span>. Click the button to toggle width and reveal item labels.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}
