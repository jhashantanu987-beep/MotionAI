// Revenue streams mock data
export const revenueMetrics = {
  totalMRR: 45250,
  mrrIncrease: '+28%',
  setupFeesMonth: 2500,
  performanceEarnings: 12750,
  totalClients: 18,
  activeServices: 3
}

export const leadsData = [
  { id: 1, name: 'Sarah Chen', company: 'TechFlow Corp', email: 'sarah@techflow.io', score: 94, status: 'hot', lastActive: 1 },
  { id: 2, name: 'Michael Torres', company: 'Growth Ventures', email: 'michael@growthventures.com', score: 78, status: 'warm', lastActive: 2 },
  { id: 3, name: 'Emma Richardson', company: 'Digital Labs', email: 'emma@digitallabs.net', score: 65, status: 'warm', lastActive: 4 },
  { id: 4, name: 'James Wilson', company: 'Enterprise AI', email: 'james@enterpriseai.co', score: 52, status: 'cold', lastActive: 7 },
  { id: 5, name: 'Priya Patel', company: 'Innovation Studios', email: 'priya@innovationstudios.com', score: 88, status: 'hot', lastActive: 0 },
  { id: 6, name: 'David Kim', company: 'NextGen Solutions', email: 'david@nextgensolutions.io', score: 71, status: 'warm', lastActive: 5 },
]

export const demandEngineStats = [
  {
    title: 'Total Traffic',
    value: 24500,
    change: '+34%',
    source: 'Meta, Google, TikTok',
    accent: 'indigo'
  },
  {
    title: 'Leads Generated',
    value: 1542,
    change: '+18%',
    source: 'This month',
    accent: 'cyan'
  },
  {
    title: 'Cost Per Lead',
    value: '$12.50',
    change: '-8%',
    source: 'Optimizing',
    accent: 'emerald'
  },
  {
    title: 'Ad Spend ROAS',
    value: '4.2x',
    change: '+12%',
    source: 'Return on ad spend',
    accent: 'violet'
  }
]

export const aiSDRMetrics = [
  {
    title: 'Response Rate',
    value: '98.5%',
    change: '+2.1%',
    benchmark: 'vs industry 45%',
    accent: 'emerald'
  },
  {
    title: 'Qualification Rate',
    value: '67%',
    change: '+5%',
    benchmark: 'Leads qualified',
    accent: 'cyan'
  },
  {
    title: 'Avg Response Time',
    value: '2.3s',
    change: '-1.2s',
    benchmark: 'Target: <5s',
    accent: 'indigo'
  },
  {
    title: 'Booking Rate',
    value: '34%',
    change: '+3%',
    benchmark: 'Qualified to booked',
    accent: 'violet'
  }
]

export const conversionFunnel = [
  { stage: 'Ad Clicks', value: 24500, percentage: 100 },
  { stage: 'Landing Page', value: 18200, percentage: 74 },
  { stage: 'Lead Capture', value: 6850, percentage: 38 },
  { stage: 'Qualified Lead', value: 4589, percentage: 25 },
  { stage: 'Booked Call', value: 1562, percentage: 9 },
  { stage: 'Closed Deal', value: 547, percentage: 3 }
]

export const clientPerformance = [
  {
    name: 'Nova Clinic',
    industry: 'Healthcare',
    leads: 342,
    bookings: 89,
    conversions: 34,
    revenue: '$15,200',
    noShowRate: '8%'
  },
  {
    name: 'BrightMode Studios',
    industry: 'Beauty',
    leads: 256,
    bookings: 72,
    conversions: 28,
    revenue: '$11,500',
    noShowRate: '5%'
  },
  {
    name: 'Cadence Real Estate',
    industry: 'Real Estate',
    leads: 428,
    bookings: 104,
    conversions: 31,
    revenue: '$13,800',
    noShowRate: '12%'
  },
  {
    name: 'EverWell Insurance',
    industry: 'Insurance',
    leads: 189,
    bookings: 42,
    conversions: 18,
    revenue: '$8,900',
    noShowRate: '6%'
  }
]

export const optimizationInsights = [
  {
    title: 'Best Performing Ad',
    metric: 'Nova Clinic UGC Video #3',
    performance: '8.2% CTR',
    recommendation: 'Scale spend +30%'
  },
  {
    title: 'Top Funnel Copy',
    metric: '"Limited spots available today"',
    performance: '+34% conversions',
    recommendation: 'Use in all campaigns'
  },
  {
    title: 'Fastest Response Time',
    metric: 'AI SDR Variant 2.1',
    performance: '1.8s avg response',
    recommendation: 'Deploy to all bots'
  },
  {
    title: 'Highest Show Rate',
    metric: 'SMS reminder + call 2h before',
    performance: '94% show rate',
    recommendation: 'Trigger on all bookings'
  }
]

export const businessActivityFeed: Array<{
  event: string
  time: string
  type: 'revenue' | 'lead' | 'booking' | 'demand' | 'recovery' | 'optimization'
  value: string
  id: string
}> = [
  {
    event: 'Nova Clinic booked $2,400 in new revenue',
    time: 'Just now',
    type: 'revenue',
    value: '+$2,400',
    id: 'activity-1'
  },
  {
    event: 'AI SDR qualified 23 leads from Meta campaign',
    time: '3 min ago',
    type: 'lead',
    value: '+23',
    id: 'activity-2'
  },
  {
    event: 'BrightMode Studios hit 12 bookings today',
    time: '8 min ago',
    type: 'booking',
    value: '+12',
    id: 'activity-3'
  },
  {
    event: 'Top-performing ad reached 5,234 people',
    time: '15 min ago',
    type: 'demand',
    value: '5,234 reach',
    id: 'activity-4'
  },
  {
    event: 'Cadence RE: No-show recovery sequence saved call',
    time: '22 min ago',
    type: 'recovery',
    value: '+1 booking',
    id: 'activity-5'
  },
  {
    event: 'AI optimization loop: +8% performance gain detected',
    time: '31 min ago',
    type: 'optimization',
    value: '+8%',
    id: 'activity-6'
  }
]

export const revenueBreakdown = [
  { source: 'Setup Fees', value: 2500, percentage: 5.5 },
  { source: 'Monthly Retainer', value: 30000, percentage: 66.2 },
  { source: 'Performance Layer', value: 12750, percentage: 28.2 }
]

export const teamMetrics = [
  {
    name: 'Demand Engine',
    traffic: '24.5k',
    cost: '$8,420',
    roi: '4.2x',
    status: 'Scaling'
  },
  {
    name: 'AI SDR System',
    traffic: '4.5k',
    cost: 'Automated',
    roi: 'High',
    status: 'Optimizing'
  },
  {
    name: 'Booking Engine',
    traffic: '1.5k',
    cost: 'API costs',
    roi: '12x',
    status: 'Running'
  },
  {
    name: 'Back-office OS',
    traffic: 'N/A',
    cost: '$800',
    roi: 'Cost save',
    status: 'Active'
  }
]
