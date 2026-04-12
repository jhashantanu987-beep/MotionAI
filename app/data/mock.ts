export const serviceCards = [
  {
    title: 'Performance Ads',
    description: 'Target the right buyers with automated AI ad optimization and funnel signals.',
    icon: 'rocket'
  },
  {
    title: 'AI Chatbot',
    description: '24/7 conversational lead capture with natural follow-ups and booking prompts.',
    icon: 'message-square'
  },
  {
    title: 'Booking System',
    description: 'Smart scheduling with availability syncing and instant confirmations.',
    icon: 'calendar'
  },
  {
    title: 'Automation',
    description: 'Nurture leads with sequences, reminders, and predictive next actions.',
    icon: 'zap'
  },
  {
    title: 'Analytics',
    description: 'Real-time dashboards showing conversion impact and revenue trends.',
    icon: 'bar-chart'
  }
]

export const systemFlow = [
  { label: 'Traffic', detail: 'Inbound campaigns, ads, and organic reach.' },
  { label: 'Lead', detail: 'Capture profiles with smart forms and chat.' },
  { label: 'AI', detail: 'Rank intent, qualify prospects, and personalize follow-up.' },
  { label: 'Booking', detail: 'Automated appointment scheduling in seconds.' },
  { label: 'Conversion', detail: 'Close faster with streamlined communication.' }
]

export const metrics = [
  { label: 'Conversion lift', value: '+312%', detail: 'Higher closing velocity' },
  { label: 'Response time', value: '< 5s', detail: 'Instant engagement with leads' },
  { label: 'Qualified pipeline', value: '+184', detail: 'Sales-ready contacts' },
  { label: 'ROI increase', value: '+78%', detail: 'More revenue from fewer campaigns' }
]

export const testimonials = [
  {
    quote: 'Klara AI turned our lead engine into a fully automated revenue machine. The team loves the workflow.',
    name: 'Maya Chen',
    role: 'Head of Growth, Lumina Labs'
  },
  {
    quote: 'Within weeks we reduced manual outreach and doubled qualified meetings. The dashboard feels premium.',
    name: 'Rafael Soto',
    role: 'Founder, Stellar Practice'
  }
]

export const aiInsight = {
  summary: 'AI detected 23 high-intent leads ready for conversion today',
  subtext: 'Klara AI is prioritizing these prospects with real-time urgency signals.',
  change: '+14% stronger pipeline confidence'
}

export const dashboardStats = [
  { label: 'Total Leads', value: 1842, display: '1,842', change: '+18%', accent: 'cyan' },
  { label: 'Bookings', value: 276, display: '276', change: '+12%', accent: 'violet' },
  { label: 'Revenue', value: 132000, display: '$132k', change: '+24%', accent: 'emerald' },
  { label: 'Conversion Rate', value: 24.8, display: '24.8%', change: '+3.6%', accent: 'indigo' }
]

export type ActivityFeedItem = {
  event: string
  time: string
  type: 'lead' | 'booking' | 'conversion' | 'system'
}

export const activityFeed: ActivityFeedItem[] = [
  { event: 'AI flagged 23 high-intent leads for outreach.', time: 'Just now', type: 'lead' },
  { event: 'New hot lead captured from the premium chatbot.', time: '2 min ago', type: 'lead' },
  { event: 'Booking confirmed with Nova Health.', time: '8 min ago', type: 'booking' },
  { event: 'Pipeline forecast improved by 18%.', time: '19 min ago', type: 'system' },
  { event: 'Proposal sent to Acme Group with automated follow-up.', time: '34 min ago', type: 'conversion' }
]

export const leads = [
  { name: 'Lina Park', email: 'lina@brightmode.com', status: 'Hot', source: 'Chatbot' },
  { name: 'Jordan Tate', email: 'jordan@cadence.co', status: 'Warm', source: 'Ad' },
  { name: 'Priya Singh', email: 'priya@everwell.com', status: 'Cold', source: 'Form' },
  { name: 'Noah Reed', email: 'noah@helix.ai', status: 'Hot', source: 'Referral' },
  { name: 'Ava Martinez', email: 'ava@studiox.com', status: 'Warm', source: 'Booking' }
]

export const bookings = [
  { title: 'Strategy review with Nova Health', time: 'Today • 11:30 AM', status: 'Confirmed' },
  { title: 'Discovery call with BrightMode', time: 'Tomorrow • 9:00 AM', status: 'Pending' },
  { title: 'Demo session with Cadence Co.', time: 'Wed • 2:00 PM', status: 'Confirmed' },
  { title: 'Follow-up with EverWell', time: 'Thu • 4:15 PM', status: 'Pending' }
]

export const conversationHistory = [
  { sender: 'assistant', text: 'Hey there — I can help you turn leads into customers faster. What would you like to optimize today?' },
  { sender: 'user', text: 'Show me the latest lead status and next steps.' },
  { sender: 'assistant', text: 'Your hottest leads are ready. I recommend confirming appointments and using the follow-up sequence for warm prospects.' }
]

export const analyticsCards = [
  { label: 'Lead conversion', value: '24.8%', progress: 72, accent: 'cyan' },
  { label: 'Pipeline growth', value: '+38%', progress: 58, accent: 'violet' },
  { label: 'Avg. deal size', value: '$4.9k', progress: 84, accent: 'emerald' },
  { label: 'Engagement', value: '92%', progress: 92, accent: 'indigo' }
]

export const conversionSeries = [12, 18, 29, 34, 41, 49, 57]
export const revenueSeries = [28, 34, 45, 59, 67, 74, 88]
export const bookingSeries = [3, 5, 7, 8, 12, 14, 16]
