'use client'

import { useState, useEffect } from 'react'
import WorkflowBoard from './WorkflowBoard'
import SuggestedKnowledge from './SuggestedKnowledge'
import ChartCard from './ChartCard'
import AvatarGroup from './AvatarGroup'
import Analytics from './Analytics'
import Clients from './Clients'
import Leads from './Leads'
import Management from './Management'
import Reports from './Reports'
import Settings from './Settings'
import AddTaskModal from './AddTaskModal'

interface MetricsData {
  revenue: number
  clients: number
  conversionRate: number
  responseTime: number
}

interface RevenueData {
  total: number
  monthly: number
  growth: number
  chart: Array<{
    month: string
    revenue: number
    target: number
  }>
}

interface ConversionData {
  rate: number
  totalConversions: number
  totalLeads: number
  trends: Array<{
    date: string
    rate: number
    conversions: number
  }>
}

interface ResponseTimeData {
  average: number
  today: number
  trend: string
  history: Array<{
    date: string
    average: number
    count: number
  }>
}

interface TeamMember {
  id: number
  initial: string
  name: string
  color: string
}

interface CRMDashboardProps {
  initialTab?: string
}

export default function CRMDashboard({ initialTab = 'home' }: CRMDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab)
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [metrics, setMetrics] = useState<MetricsData | null>(null)
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null)
  const [conversionData, setConversionData] = useState<ConversionData | null>(null)
  const [responseTimeData, setResponseTimeData] = useState<ResponseTimeData | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [metricsRes, revenueRes, conversionRes, responseTimeRes, teamRes] = await Promise.all([
          fetch('/api/metrics'),
          fetch('/api/revenue'),
          fetch('/api/conversion'),
          fetch('/api/response-time'),
          fetch('/api/team-members')
        ])

        if (!metricsRes.ok || !revenueRes.ok || !conversionRes.ok || !responseTimeRes.ok || !teamRes.ok) {
          throw new Error('Failed to fetch dashboard data')
        }

        const [metricsData, revenue, conversion, responseTime, team] = await Promise.all([
          metricsRes.json(),
          revenueRes.json(),
          conversionRes.json(),
          responseTimeRes.json(),
          teamRes.json()
        ])

        setMetrics(metricsData)
        setRevenueData(revenue)
        setConversionData(conversion)
        setResponseTimeData(responseTime)
        setTeamMembers(team)
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()

    // Refresh data every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000)
    return () => clearInterval(interval)
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case 'clients':
        return <Clients />
      case 'leads':
        return <Leads />
      case 'management':
        return <Management />
      case 'analytics':
        return <Analytics />
      case 'reports':
        return <Reports />
      case 'settings':
        return <Settings />
      case 'calendar':
        return (
          <div className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a]">
            <main className="p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendar</h1>
                <p className="text-gray-600">View your upcoming tasks, meetings, and deadlines.</p>
              </div>
              <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                <p className="text-gray-700">This calendar view is linked to your CRM schedule and support pipeline.</p>
              </div>
            </main>
          </div>
        )
      case 'documents':
        return (
          <div className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a]">
            <main className="p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Documents</h1>
                <p className="text-gray-600">Access your CRM documents, proposals, and sales collateral.</p>
              </div>
              <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                <p className="text-gray-700">Connect documents to client records, contracts, and proposals.</p>
              </div>
            </main>
          </div>
        )
      case 'messages':
        return (
          <div className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a]">
            <main className="p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
                <p className="text-gray-600">Review your client conversations and internal chat history.</p>
              </div>
              <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                <p className="text-gray-700">All messages are consolidated here for faster follow-ups.</p>
              </div>
            </main>
          </div>
        )
      case 'notifications':
        return (
          <div className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a]">
            <main className="p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
                <p className="text-gray-600">Track latest alerts, reminders, and system updates.</p>
              </div>
              <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                <p className="text-gray-700">Stay on top of important activity across your business.</p>
              </div>
            </main>
          </div>
        )
      case 'home':
      default:
        return (
          <div className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a]">
            <main className="p-8">
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-white font-bold">Here's what's happening in your CRM today</p>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-6">
                  <p className="text-red-800">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Team Members Section */}
              {!loading && !error && (
                <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Team Members</h3>
                  {teamMembers.length > 0 ? (
                    <AvatarGroup members={teamMembers} />
                  ) : (
                    <p className="text-gray-500">No team members yet</p>
                  )}
                </div>
              )}

              {/* Workflow Board */}
              <WorkflowBoard onAddTaskClick={() => setShowAddTaskModal(true)} />

              {/* Bottom Section: Two Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Suggested Knowledge */}
                <div className="lg:col-span-2">
                  <SuggestedKnowledge />
                </div>

                {/* Right Column: Charts */}
                <div className="space-y-6">
                  {loading ? (
                    <>
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </>
                  ) : error ? (
                    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0a] rounded-2xl p-6 border border-[#00d9ff]/50 shadow-xl">
                      <p className="text-gray-600 text-center">No data yet</p>
                    </div>
                  ) : (
                    <>
                      <ChartCard
                        title="Revenue"
                        percentage={revenueData ? Math.round((revenueData.monthly / 50000) * 100) : 0}
                        color="url(#gradient1)"
                        subtitle={`$${revenueData?.monthly.toLocaleString() || '0'} this month`}
                      />
                      <ChartCard
                        title="Conversion Rate"
                        percentage={conversionData?.rate || 0}
                        color="url(#gradient2)"
                        subtitle={`${conversionData?.totalConversions || 0} conversions`}
                      />
                    </>
                  )}
                </div>
              </div>

              {/* SVG Gradients */}
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
            </main>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a] text-white flex flex-col">
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && <AddTaskModal onClose={() => setShowAddTaskModal(false)} />}
    </div>
  )
}
