'use client'

import { useState, useEffect } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Database,
  Globe,
  Layers,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
  Phone,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react'

interface RevenueData {
  total: number
  monthly: number
  growth: number
  breakdown: {
    subscriptions: number
    oneTime: number
    upsells: number
  }
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
  funnel: {
    visitors: number
    leads: number
    qualified: number
    booked: number
    closed: number
  }
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
  breakdown: {
    email: number
    chat: number
    phone: number
  }
  history: Array<{
    date: string
    average: number
    count: number
  }>
}

const rightPanelItems = [
  {
    icon: PhoneCall,
    title: 'Quick Call',
    description: 'Make instant calls to leads and clients.',
    action: 'call'
  },
  {
    icon: ShieldCheck,
    title: 'Community',
    description: 'Connect with peers across teams.',
  },
  {
    icon: BookOpen,
    title: 'Academy',
    description: 'Learn the latest workflow practices.',
  },
  {
    icon: MessageCircle,
    title: 'Help Center',
    description: 'Support articles and FAQs.',
  },
  {
    icon: Globe,
    title: 'Partner Directory',
    description: 'Find trusted solution partners.',
  },
  {
    icon: Sparkles,
    title: 'Blog',
    description: 'Read product updates and ideas.',
  },
  {
    icon: Users,
    title: 'Use Cases',
    description: 'Explore use case templates.',
  },
]

const sectionDetails: Record<
  string,
  {
    heading: string
    description: string
    cards: { title: string; value: string; label: string }[]
  }
> = {
  Overview: {
    heading: 'Overview of your workflow landscape',
    description: 'Track high-level performance across scenarios, teams, and operational outcomes.',
    cards: [
      { title: 'Scenario completion', value: '74%', label: 'Tasks completed this week' },
      { title: 'Team alignment', value: '92%', label: 'Cross-team collaboration score' },
      { title: 'Workflow load', value: '18', label: 'Active automations' },
    ],
  },
  Team: {
    heading: 'Team capacity and active users',
    description: 'View the current workload, active members, and collaboration readiness.',
    cards: [
      { title: 'Active members', value: '28', label: 'Team users online' },
      { title: 'Open tasks', value: '45', label: 'Tasks assigned' },
      { title: 'Collaboration score', value: '88%', label: 'Meeting targets' },
    ],
  },
  Security: {
    heading: 'Security posture and compliance',
    description: 'Monitor recent access events, privileges, and data protection status.',
    cards: [
      { title: 'Secure sessions', value: '100%', label: 'Encrypted connections' },
      { title: 'Alerts reviewed', value: '7', label: 'Threats closed today' },
      { title: 'Permissions audit', value: 'Completed', label: 'Last 24 hours' },
    ],
  },
  Data: {
    heading: 'Data sync and ownership',
    description: 'Analyze sync health, storage utilization, and record activity.',
    cards: [
      { title: 'Sync success', value: '99.4%', label: 'Data processed successfully' },
      { title: 'Records moved', value: '12.4K', label: 'Today' },
      { title: 'Storage used', value: '38GB', label: 'Active workspace' },
    ],
  },
  Insights: {
    heading: 'Insights and scenario performance',
    description: 'Review key signals and predicted improvements for your top workflows.',
    cards: [
      { title: 'Growth signal', value: '+16%', label: 'Scenario velocity' },
      { title: 'Risk alerts', value: '3', label: 'High-priority items' },
      { title: 'Forecast score', value: 'A', label: 'Next 7 days' },
    ],
  },
  Organization: {
    heading: 'Organization settings and configuration',
    description: 'Manage your organization details, branding, and general settings.',
    cards: [
      { title: 'Organization size', value: '50-100', label: 'Active users' },
      { title: 'Departments', value: '8', label: 'Configured' },
      { title: 'Compliance status', value: 'Compliant', label: 'GDPR & SOC2' },
    ],
  },
  Teams: {
    heading: 'Team management and permissions',
    description: 'Configure team structures, roles, and access permissions.',
    cards: [
      { title: 'Active teams', value: '12', label: 'Configured teams' },
      { title: 'Role templates', value: '5', label: 'Available' },
      { title: 'Permission sets', value: '18', label: 'Custom permissions' },
    ],
  },
  Users: {
    heading: 'User management and access control',
    description: 'Manage user accounts, authentication, and access policies.',
    cards: [
      { title: 'Total users', value: '247', label: 'Active accounts' },
      { title: 'Pending invites', value: '3', label: 'Awaiting acceptance' },
      { title: 'Last login', value: '2 min ago', label: 'System activity' },
    ],
  },
  Subscription: {
    heading: 'Subscription and billing management',
    description: 'Monitor your subscription plan, usage, and billing information.',
    cards: [
      { title: 'Current plan', value: 'Enterprise', label: 'Active subscription' },
      { title: 'Monthly usage', value: '78%', label: 'Of allocated resources' },
      { title: 'Next billing', value: 'Mar 15', label: '2024' },
    ],
  },
  Payment: {
    heading: 'Payment methods and transactions',
    description: 'Manage payment methods, view transaction history, and billing details.',
    cards: [
      { title: 'Payment methods', value: '3', label: 'Active cards' },
      { title: 'Last payment', value: '$2,450', label: 'Feb 15, 2024' },
      { title: 'Failed payments', value: '0', label: 'This month' },
    ],
  },
  'Installed Apps': {
    heading: 'Third-party integrations and apps',
    description: 'Manage connected applications, API keys, and integration settings.',
    cards: [
      { title: 'Active integrations', value: '12', label: 'Connected apps' },
      { title: 'API calls', value: '45.2K', label: 'This month' },
      { title: 'Webhook events', value: '8.9K', label: 'Processed' },
    ],
  },
  Variables: {
    heading: 'System variables and environment settings',
    description: 'Configure global variables, environment settings, and system parameters.',
    cards: [
      { title: 'Global variables', value: '47', label: 'Defined' },
      { title: 'Environment vars', value: '23', label: 'Active' },
      { title: 'Custom fields', value: '156', label: 'Configured' },
    ],
  },
  'Scenario Properties': {
    heading: 'Scenario configuration and properties',
    description: 'Define scenario templates, properties, and automation rules.',
    cards: [
      { title: 'Active scenarios', value: '34', label: 'Running' },
      { title: 'Templates', value: '12', label: 'Available' },
      { title: 'Automation rules', value: '89', label: 'Configured' },
    ],
  },
}

function ManagementHeader({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-lime-700">
              Management
            </span>
            <span className="rounded-full bg-slate-900/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Premium
            </span>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-slate-950">Managing Your Team and Workflows</h1>
            <p className="max-w-2xl text-sm text-slate-500">
              Keep your organization aligned with powerful scenario management and workflow insights.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCreate}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 lg:w-auto"
        >
          <ArrowUpRight className="w-4 h-4" />
          Create a New Scenario
        </button>
      </div>
    </div>
  )
}

function TabNavigation({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  return (
    <div className="rounded-3xl bg-white p-3 sm:p-4 shadow-sm border border-gray-200 overflow-x-auto">
      <div className="flex gap-2 sm:gap-3 whitespace-nowrap min-w-max">
        {['Organization', 'Teams', 'Users', 'Subscription', 'Payment', 'Installed Apps', 'Variables', 'Scenario Properties'].map((tab) => {
          const isActive = tab === activeTab
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`rounded-full border px-3 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition flex-shrink-0 ${
                isActive
                  ? 'bg-slate-950 text-white border-slate-950'
                  : 'bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SidebarMenu({ activeMenu, onMenuChange }: { activeMenu: string; onMenuChange: (menu: string) => void }) {
  const items = [
    { icon: Layers, label: 'Overview' },
    { icon: Users, label: 'Team' },
    { icon: ShieldCheck, label: 'Security' },
    { icon: Database, label: 'Data' },
    { icon: Sparkles, label: 'Insights' },
  ]

  return (
    <nav className="space-y-3">
      {items.map((item) => {
        const isActive = item.label === activeMenu
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => onMenuChange(item.label)}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
              isActive ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-200'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

function TopCards({ revenueData, conversionData, responseTimeData }: {
  revenueData: RevenueData | null
  conversionData: ConversionData | null
  responseTimeData: ResponseTimeData | null
}) {
  const cards = [
    {
      title: 'Revenue',
      subtitle: 'Monthly recurring revenue',
      value: revenueData ? `$${revenueData.monthly.toLocaleString()}` : 'Loading...',
      detail: revenueData ? `${revenueData.growth > 0 ? '+' : ''}${revenueData.growth}% growth` : '',
      accent: 'bg-white',
      icon: Briefcase,
    },
    {
      title: 'Conversion Rate',
      subtitle: 'Lead to customer conversion',
      value: conversionData ? `${conversionData.rate}%` : 'Loading...',
      detail: conversionData ? `${conversionData.totalConversions} conversions` : '',
      accent: 'bg-lime-100',
      icon: Database,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div key={card.title} className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-200 ${card.accent}`}>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <p className="text-sm font-semibold text-slate-500">{card.subtitle}</p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-950 mt-2">{card.value}</h2>
              </div>
              <div className="rounded-2xl bg-slate-950 p-3 text-white shadow-sm">
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm text-slate-500">{card.detail}</p>
          </div>
        )
      })}

      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-200 bg-slate-950 text-white flex flex-col justify-between">
        <div className="mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-lime-100/20 px-3 py-1 text-xs font-semibold text-lime-300">
            <ShieldCheck className="w-4 h-4" />
            Response Time
          </div>
          <h3 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-semibold">
            {responseTimeData ? `${responseTimeData.average}s` : 'Loading...'}
          </h3>
          <p className="mt-3 text-sm text-slate-300">
            Average response time across all channels
          </p>
        </div>
        <div className="text-sm text-slate-400">
          Today: {responseTimeData ? `${responseTimeData.today}s` : 'Loading...'}
        </div>
      </div>
    </div>
  )
}

function RightPanel({ onAction }: { onAction: (title: string, action?: string) => void }) {
  return (
    <div className="space-y-3 sm:space-y-4 xl:space-y-4">
      {rightPanelItems.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.title}
            type="button"
            onClick={() => onAction(item.title, item.action)}
            className="w-full rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-4 sm:p-5 text-left shadow-sm transition hover:border-slate-300"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="rounded-2xl bg-slate-950 p-2 sm:p-3 text-white flex-shrink-0">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-500">{item.description}</p>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-900">
              <span>Open</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500" />
            </div>
          </button>
        )
      })}
    </div>
  )
}

function ChartSection({ activeTab, revenueData, conversionData }: { 
  activeTab: string
  revenueData: RevenueData | null
  conversionData: ConversionData | null
}) {
  const chartData = revenueData?.chart || []
  const maxRevenue = chartData.length > 0 ? Math.max(...chartData.map(item => item.revenue)) : 100

  const statSummaries = [
    {
      label: 'Monthly Revenue',
      value: revenueData ? `$${revenueData.monthly.toLocaleString()}` : 'Loading...'
    },
    {
      label: 'Conversion Rate',
      value: conversionData ? `${conversionData.rate}%` : 'Loading...'
    },
    {
      label: 'Total Conversions',
      value: conversionData ? conversionData.totalConversions.toString() : 'Loading...'
    },
  ]

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Statistics</p>
          <h2 className="text-2xl font-semibold text-slate-950 mt-2">{activeTab} activity</h2>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          Live overview
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl sm:rounded-3xl bg-slate-950 p-4 sm:p-6 text-white">
          <div className="flex items-end gap-2 sm:gap-4 h-60 sm:h-72 justify-between">
            {chartData.length > 0 ? chartData.map((item) => {
              const height = (item.revenue / maxRevenue) * 100
              return (
                <div key={item.month} className="flex flex-col items-center gap-2 sm:gap-3 flex-1">
                  <div className="relative flex h-40 sm:h-52 w-full max-w-8 sm:max-w-10 items-end rounded-full bg-slate-800">
                    <div
                      className="absolute bottom-0 left-0 right-0 rounded-full bg-lime-300"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-400">{item.month.slice(0, 3)}</span>
                </div>
              )
            }) : (
              <div className="flex items-center justify-center w-full h-full">
                <p className="text-slate-400 text-sm sm:text-base">Loading chart data...</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {statSummaries.map((stat) => (
            <div key={stat.label} className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-3 text-2xl sm:text-3xl font-semibold text-slate-950">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Management() {
  const [activeMenu, setActiveMenu] = useState('Overview')
  const [activeTab, setActiveTab] = useState('Organization')
  const [statusMessage, setStatusMessage] = useState('')
  const [alertVisible, setAlertVisible] = useState(false)
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null)
  const [conversionData, setConversionData] = useState<ConversionData | null>(null)
  const [responseTimeData, setResponseTimeData] = useState<ResponseTimeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Call functionality state
  const [showCallModal, setShowCallModal] = useState(false)
  const [callInProgress, setCallInProgress] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [callHistory, setCallHistory] = useState([
    { id: 1, contact: 'Sarah Mitchell', number: '+1 (555) 111-2222', duration: '5:23', status: 'completed', time: '2 hours ago' },
    { id: 2, contact: 'Michael Chen', number: '+1 (555) 222-3333', duration: '3:45', status: 'completed', time: '4 hours ago' },
    { id: 3, contact: 'Emma Rodriguez', number: '+1 (555) 333-4444', duration: '0:00', status: 'missed', time: '6 hours ago' },
  ])

  useEffect(() => {
    const fetchManagementData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [revenueRes, conversionRes, responseTimeRes] = await Promise.all([
          fetch('/api/revenue'),
          fetch('/api/conversion'),
          fetch('/api/response-time')
        ])

        if (!revenueRes.ok || !conversionRes.ok || !responseTimeRes.ok) {
          throw new Error('Failed to fetch management data')
        }

        const [revenue, conversion, responseTime] = await Promise.all([
          revenueRes.json(),
          conversionRes.json(),
          responseTimeRes.json()
        ])

        setRevenueData(revenue)
        setConversionData(conversion)
        setResponseTimeData(responseTime)
      } catch (err) {
        console.error('Error fetching management data:', err)
        setError('Failed to load management data')
      } finally {
        setLoading(false)
      }
    }

    fetchManagementData()

    // Refresh data every 60 seconds
    const interval = setInterval(fetchManagementData, 60000)
    return () => clearInterval(interval)
  }, [])

  const showTemporaryMessage = (message: string) => {
    setStatusMessage(message)
    setAlertVisible(true)
    window.setTimeout(() => setAlertVisible(false), 3000)
  }

  const handleCreateScenario = () => {
    showTemporaryMessage('New scenario created successfully. It is now available in your workflow list.')
  }

  const handlePanelAction = (title: string, action?: string) => {
    if (action === 'call') {
      setShowCallModal(true)
    } else {
      showTemporaryMessage(`${title} opened`)
    }
  }

  // Call functionality
  const startCall = (contact: string, number: string) => {
    setCallInProgress(true)
    setCallDuration(0)
    setShowCallModal(true)
    showTemporaryMessage(`Calling ${contact}...`)

    // Simulate call timer
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1)
    }, 1000)

    // Auto-end call after 2 minutes for demo
    setTimeout(() => {
      endCall()
      clearInterval(interval)
      const newCall = {
        id: callHistory.length + 1,
        contact,
        number,
        duration: `${Math.floor(callDuration / 60)}:${(callDuration % 60).toString().padStart(2, '0')}`,
        status: 'completed',
        time: 'Just now'
      }
      setCallHistory(prev => [newCall, ...prev])
    }, 120000)
  }

  const endCall = () => {
    setCallInProgress(false)
    setShowCallModal(false)
    setCallDuration(0)
    showTemporaryMessage('Call ended')
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    showTemporaryMessage(isMuted ? 'Microphone unmuted' : 'Microphone muted')
  }

  const currentSection = sectionDetails[activeTab] || sectionDetails['Overview']

  return (
    <div className="min-h-full bg-[#f5f7fb] py-4 sm:py-6">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 sm:gap-6 px-4 sm:px-6">
        <div className="grid gap-4 sm:gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-2xl sm:rounded-[2rem] bg-slate-950 p-4 sm:p-6 text-slate-100 shadow-sm order-2 xl:order-1">
            <div className="mb-6 sm:mb-10">
              <h2 className="text-lg sm:text-xl font-semibold">Management</h2>
              <p className="mt-2 text-sm text-slate-400">A central hub for teams, workflows, and scenarios.</p>
            </div>
            <SidebarMenu activeMenu={activeMenu} onMenuChange={setActiveMenu} />
            <div className="mt-6 sm:mt-10 rounded-2xl sm:rounded-[2rem] bg-slate-800 p-4 sm:p-5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-3xl bg-lime-300 text-slate-950 flex items-center justify-center font-bold text-base sm:text-lg">
                  M
                </div>
                <div>
                  <p className="text-sm text-slate-400">Signed in as</p>
                  <p className="font-semibold">Miranda Prieto</p>
                </div>
              </div>
            </div>
          </aside>

          <main className="space-y-4 sm:space-y-6 order-1 xl:order-2">
            <ManagementHeader onCreate={handleCreateScenario} />

            {alertVisible ? (
              <div className="rounded-3xl border border-lime-200 bg-lime-50 p-4 text-sm text-lime-900 shadow-sm">
                {statusMessage}
              </div>
            ) : null}

            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{activeTab}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950">{currentSection.heading}</h2>
                  <p className="mt-3 max-w-2xl text-sm text-slate-500">{currentSection.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => showTemporaryMessage('Management view refreshed.')}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Refresh view
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-4 sm:mt-6 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {currentSection.cards.map((card) => (
                  <div key={card.title} className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-slate-50 p-4 sm:p-5 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-600">{card.title}</p>
                        <p className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-950">{card.value}</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2 sm:px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                        {card.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:gap-6 xl:grid-cols-[1.5fr_0.9fr]">
              <div className="space-y-4 sm:space-y-6">
                {loading ? (
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-200 bg-white animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-200 bg-white">
                    <p className="text-gray-600 text-center">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 mx-auto block px-4 py-2 bg-slate-950 text-white rounded-lg hover:bg-slate-800"
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <TopCards
                    revenueData={revenueData}
                    conversionData={conversionData}
                    responseTimeData={responseTimeData}
                  />
                )}
                <ChartSection activeTab={activeTab} revenueData={revenueData} conversionData={conversionData} />
              </div>
              <RightPanel onAction={handlePanelAction} />
            </div>
          </main>
        </div>

        {/* Call Modal */}
        {showCallModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PhoneCall className="w-12 h-12 text-green-600" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {callInProgress ? 'Call in Progress' : 'Quick Call'}
                </h2>

                {callInProgress ? (
                  <div className="space-y-6">
                    <div className="text-4xl font-mono text-gray-900">
                      {Math.floor(callDuration / 60)}:{(callDuration % 60).toString().padStart(2, '0')}
                    </div>

                    <div className="flex justify-center gap-4">
                      <button
                        onClick={toggleMute}
                        className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          isMuted ? 'bg-red-500' : 'bg-gray-200'
                        }`}
                      >
                        {isMuted ? (
                          <MicOff className="w-6 h-6 text-white" />
                        ) : (
                          <Mic className="w-6 h-6 text-gray-700" />
                        )}
                      </button>

                      <button
                        onClick={endCall}
                        className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center"
                      >
                        <PhoneOff className="w-6 h-6 text-white" />
                      </button>

                      <button className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <Volume2 className="w-6 h-6 text-gray-700" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-gray-600">Select a contact to call</p>

                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {callHistory.slice(0, 5).map((call) => (
                        <button
                          key={call.id}
                          onClick={() => startCall(call.contact, call.number)}
                          className="w-full p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition flex items-center justify-between"
                        >
                          <div className="text-left">
                            <p className="font-semibold text-gray-900">{call.contact}</p>
                            <p className="text-sm text-gray-500">{call.number}</p>
                          </div>
                          <PhoneCall className="w-5 h-5 text-green-600" />
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowCallModal(false)}
                        className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-2xl font-semibold"
                      >
                        Cancel
                      </button>
                      <button className="flex-1 py-3 px-6 bg-blue-500 text-white rounded-2xl font-semibold">
                        Dial Number
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Call History Panel */}
        <div className="fixed right-6 bottom-6 w-80 bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-900">Recent Calls</h3>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {callHistory.map((call) => (
              <div key={call.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                <div>
                  <p className="font-medium text-gray-900">{call.contact}</p>
                  <p className="text-sm text-gray-500">{call.time}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    {call.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {call.status === 'missed' && <XCircle className="w-4 h-4 text-red-500" />}
                    <span className="text-sm font-medium">{call.duration}</span>
                  </div>
                  <button
                    onClick={() => startCall(call.contact, call.number)}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Call back
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
