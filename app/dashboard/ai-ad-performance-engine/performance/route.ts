import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock performance analytics data
    const performanceData = {
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
      dailyPerformance: [
        { date: '2024-01-08', spend: 1200, impressions: 32000, clicks: 960, conversions: 38 },
        { date: '2024-01-09', spend: 1350, impressions: 35000, clicks: 1050, conversions: 42 },
        { date: '2024-01-10', spend: 1180, impressions: 31000, clicks: 930, conversions: 37 },
        { date: '2024-01-11', spend: 1420, impressions: 38000, clicks: 1140, conversions: 46 },
        { date: '2024-01-12', spend: 1280, impressions: 34000, clicks: 1020, conversions: 41 },
        { date: '2024-01-13', spend: 1560, impressions: 42000, clicks: 1260, conversions: 50 },
        { date: '2024-01-14', spend: 1380, impressions: 37000, clicks: 1110, conversions: 44 },
        { date: '2024-01-15', spend: 1650, impressions: 45000, clicks: 1350, conversions: 54 }
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
        },
        {
          id: '4',
          headline: 'Viral AI Content Creation',
          platform: 'TikTok Ads',
          impressions: 15600,
          clicks: 1092,
          ctr: 7.0,
          conversions: 11,
          cost: 534.68
        },
        {
          id: '5',
          headline: 'Enterprise AI Solutions',
          platform: 'Google Ads',
          impressions: 38000,
          clicks: 1140,
          ctr: 3.0,
          conversions: 34,
          cost: 1576.80
        }
      ],
      audienceInsights: {
        demographics: {
          age: [
            { range: '18-24', percentage: 15 },
            { range: '25-34', percentage: 35 },
            { range: '35-44', percentage: 28 },
            { range: '45-54', percentage: 15 },
            { range: '55+', percentage: 7 }
          ],
          gender: [
            { type: 'Male', percentage: 52 },
            { type: 'Female', percentage: 45 },
            { type: 'Other', percentage: 3 }
          ]
        },
        interests: [
          'Technology', 'Business Intelligence', 'Marketing', 'AI & Machine Learning',
          'Digital Transformation', 'SaaS', 'Entrepreneurship', 'Data Analytics'
        ],
        locations: [
          { country: 'United States', percentage: 42 },
          { country: 'United Kingdom', percentage: 18 },
          { country: 'Canada', percentage: 12 },
          { country: 'Australia', percentage: 8 },
          { country: 'Germany', percentage: 6 },
          { country: 'Other', percentage: 14 }
        ]
      }
    }

    return NextResponse.json(performanceData)
  } catch (error) {
    console.error('Error fetching performance analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch performance analytics' },
      { status: 500 }
    )
  }
}