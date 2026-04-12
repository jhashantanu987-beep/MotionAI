import { NextResponse } from 'next/server'

const revenueAnalytics = {
  // Overview Metrics
  overview: {
    totalRevenue: 125000,
    monthlyGrowth: 23.5,
    averageOrderValue: 450,
    customerLifetimeValue: 2850,
    totalCustomers: 278,
    activeCustomers: 156,
    churnRate: 4.2,
    netRevenueRetention: 112.5
  },

  // Revenue by Channel
  revenueByChannel: [
    { channel: 'Meta Ads', revenue: 45000, percentage: 36, growth: 28.5 },
    { channel: 'Google Ads', revenue: 32000, percentage: 25.6, growth: 15.2 },
    { channel: 'TikTok Ads', revenue: 28000, percentage: 22.4, growth: 42.1 },
    { channel: 'Direct/Organic', revenue: 12000, percentage: 9.6, growth: 8.3 },
    { channel: 'Referrals', revenue: 8000, percentage: 6.4, growth: 18.7 }
  ],

  // Funnel Data
  funnel: {
    traffic: { count: 50000, conversion: 100 },
    leads: { count: 2500, conversion: 5.0 },
    qualified: { count: 850, conversion: 34.0 },
    meetings: { count: 425, conversion: 50.0 },
    proposals: { count: 278, conversion: 65.4 },
    closed: { count: 156, conversion: 56.1 }
  },

  // Attribution Tracking
  attribution: [
    {
      customerId: 'CUST-001',
      journey: [
        { touchpoint: 'Meta Ad', timestamp: '2024-04-01T10:30:00Z', value: 25 },
        { touchpoint: 'Website Visit', timestamp: '2024-04-01T10:45:00Z', value: 0 },
        { touchpoint: 'Email Click', timestamp: '2024-04-02T14:20:00Z', value: 15 },
        { touchpoint: 'Demo Call', timestamp: '2024-04-03T11:00:00Z', value: 35 },
        { touchpoint: 'Purchase', timestamp: '2024-04-05T16:30:00Z', value: 2850 }
      ],
      totalRevenue: 2850,
      attributedValue: 2925
    },
    {
      customerId: 'CUST-002',
      journey: [
        { touchpoint: 'Google Search', timestamp: '2024-04-02T09:15:00Z', value: 45 },
        { touchpoint: 'Landing Page', timestamp: '2024-04-02T09:30:00Z', value: 0 },
        { touchpoint: 'WhatsApp Chat', timestamp: '2024-04-02T15:45:00Z', value: 20 },
        { touchpoint: 'Purchase', timestamp: '2024-04-04T13:20:00Z', value: 1250 }
      ],
      totalRevenue: 1250,
      attributedValue: 1315
    }
  ],

  // Performance Metrics
  performance: {
    roas: {
      overall: 4.2,
      byChannel: {
        meta: 5.1,
        google: 3.8,
        tiktok: 4.9,
        organic: 6.2
      }
    },
    cpa: {
      overall: 125,
      byChannel: {
        meta: 95,
        google: 145,
        tiktok: 110,
        organic: 85
      }
    },
    cac: {
      overall: 285,
      paybackPeriod: 45 // days
    },
    ltv: {
      overall: 2850,
      ratio: 10.0 // LTV:CAC ratio
    }
  },

  // Monthly Trends (last 12 months)
  monthlyTrends: [
    { month: 'Apr 2023', revenue: 85000, customers: 189, growth: 0 },
    { month: 'May 2023', revenue: 92000, customers: 204, growth: 8.2 },
    { month: 'Jun 2023', revenue: 98000, customers: 218, growth: 6.5 },
    { month: 'Jul 2023', revenue: 105000, customers: 233, growth: 7.1 },
    { month: 'Aug 2023', revenue: 112000, customers: 249, growth: 6.7 },
    { month: 'Sep 2023', revenue: 118000, customers: 262, growth: 5.4 },
    { month: 'Oct 2023', revenue: 121000, customers: 269, growth: 2.5 },
    { month: 'Nov 2023', revenue: 115000, customers: 256, growth: -4.9 },
    { month: 'Dec 2023', revenue: 128000, customers: 284, growth: 11.3 },
    { month: 'Jan 2024', revenue: 132000, customers: 293, growth: 3.1 },
    { month: 'Feb 2024', revenue: 118000, customers: 262, growth: -10.6 },
    { month: 'Mar 2024', revenue: 125000, customers: 278, growth: 5.9 }
  ]
}

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600))

  return NextResponse.json(revenueAnalytics)
}