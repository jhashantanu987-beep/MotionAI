import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock data for AI Ad Performance Engine metrics
    const metrics = {
      totalSpend: 45678,
      totalImpressions: 1234567,
      totalClicks: 34567,
      avgCTR: 2.8,
      avgCPC: 1.32,
      avgCPA: 24.50,
      totalConversions: 1867,
      avgROAS: 3.2,
      activeCampaigns: 12,
      aiOptimizations: 89,
      platformBreakdown: [
        {
          platform: 'Google Ads',
          spend: 25000,
          impressions: 650000,
          clicks: 18000,
          conversions: 1200,
          ctr: 2.8,
          cpc: 1.39,
          roas: 3.8
        },
        {
          platform: 'Facebook Ads',
          spend: 12000,
          impressions: 380000,
          clicks: 9500,
          conversions: 450,
          ctr: 2.5,
          cpc: 1.26,
          roas: 2.9
        },
        {
          platform: 'LinkedIn Ads',
          spend: 6800,
          impressions: 150000,
          clicks: 4200,
          conversions: 180,
          ctr: 2.8,
          cpc: 1.62,
          roas: 4.1
        },
        {
          platform: 'TikTok Ads',
          spend: 1878,
          impressions: 55667,
          clicks: 3867,
          conversions: 37,
          ctr: 6.9,
          cpc: 0.49,
          roas: 1.8
        }
      ],
      topPerformingAds: [
        {
          id: '1',
          headline: 'Transform Your Business with AI',
          platform: 'Google Ads',
          impressions: 45000,
          clicks: 1350,
          ctr: 3.0,
          conversions: 45,
          cost: 1876.50
        },
        {
          id: '2',
          headline: 'AI Solutions for Modern Teams',
          platform: 'LinkedIn Ads',
          impressions: 28000,
          clicks: 840,
          ctr: 3.0,
          conversions: 28,
          cost: 1360.80
        },
        {
          id: '3',
          headline: 'Future-Proof Your Operations',
          platform: 'Facebook Ads',
          impressions: 32000,
          clicks: 960,
          ctr: 3.0,
          conversions: 19,
          cost: 1209.60
        }
      ],
      recentActivity: [
        {
          id: '1',
          action: 'Campaign Optimized',
          platform: 'Google Ads',
          campaign: 'Brand Awareness Q1',
          timestamp: '2024-01-15T11:30:00Z',
          result: '+15% CTR improvement'
        },
        {
          id: '2',
          action: 'Budget Reallocated',
          platform: 'Facebook Ads',
          campaign: 'Lead Generation',
          timestamp: '2024-01-15T10:15:00Z',
          result: '+22% conversion rate'
        },
        {
          id: '3',
          action: 'A/B Test Completed',
          platform: 'LinkedIn Ads',
          campaign: 'Professional Services',
          timestamp: '2024-01-15T09:45:00Z',
          result: 'Winner: Version B (+35% engagement)'
        }
      ]
    }

    return NextResponse.json(metrics)
  } catch (error) {
    console.error('Error fetching ad metrics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ad metrics' },
      { status: 500 }
    )
  }
}