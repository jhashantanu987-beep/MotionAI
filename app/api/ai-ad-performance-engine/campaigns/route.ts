import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const platform = searchParams.get('platform') || 'all'

    // Mock campaign data
    const allCampaigns = [
      {
        id: '1',
        name: 'Brand Awareness Q1',
        platform: 'google',
        status: 'active',
        budget: 15000,
        spent: 8750,
        impressions: 285000,
        clicks: 8550,
        conversions: 342,
        ctr: 3.0,
        cpc: 1.02,
        roas: 4.2,
        startDate: '2024-01-01',
        endDate: '2024-03-31'
      },
      {
        id: '2',
        name: 'Lead Generation Campaign',
        platform: 'facebook',
        status: 'active',
        budget: 8000,
        spent: 5200,
        impressions: 168000,
        clicks: 4200,
        conversions: 126,
        ctr: 2.5,
        cpc: 1.24,
        roas: 2.8,
        startDate: '2024-01-01',
        endDate: '2024-03-31'
      },
      {
        id: '3',
        name: 'Professional Services',
        platform: 'linkedin',
        status: 'active',
        budget: 5000,
        spent: 3200,
        impressions: 112000,
        clicks: 3136,
        conversions: 94,
        ctr: 2.8,
        cpc: 1.02,
        roas: 3.5,
        startDate: '2024-01-01',
        endDate: '2024-03-31'
      },
      {
        id: '4',
        name: 'TikTok Brand Campaign',
        platform: 'tiktok',
        status: 'active',
        budget: 2000,
        spent: 1200,
        impressions: 45600,
        clicks: 3192,
        conversions: 32,
        ctr: 7.0,
        cpc: 0.38,
        roas: 2.1,
        startDate: '2024-01-01',
        endDate: '2024-03-31'
      },
      {
        id: '5',
        name: 'Holiday Special',
        platform: 'google',
        status: 'paused',
        budget: 3000,
        spent: 1800,
        impressions: 72000,
        clicks: 2160,
        conversions: 65,
        ctr: 3.0,
        cpc: 0.83,
        roas: 3.8,
        startDate: '2023-12-01',
        endDate: '2023-12-31'
      }
    ]

    let filteredCampaigns = allCampaigns

    if (platform !== 'all') {
      filteredCampaigns = allCampaigns.filter(campaign =>
        campaign.platform === platform
      )
    }

    return NextResponse.json(filteredCampaigns)
  } catch (error) {
    console.error('Error fetching campaigns:', error)
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, platform, budget, startDate, endDate } = body

    // Mock campaign creation
    const newCampaign = {
      id: `campaign_${Date.now()}`,
      name,
      platform,
      status: 'draft',
      budget: parseFloat(budget),
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ctr: 0,
      cpc: 0,
      roas: 0,
      startDate,
      endDate,
      createdAt: new Date().toISOString()
    }

    return NextResponse.json(newCampaign)
  } catch (error) {
    console.error('Error creating campaign:', error)
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, action, ...updates } = body

    // Mock campaign updates
    if (action === 'toggle_status') {
      return NextResponse.json({
        success: true,
        campaignId: id,
        newStatus: updates.status
      })
    }

    if (action === 'update_budget') {
      return NextResponse.json({
        success: true,
        campaignId: id,
        newBudget: updates.budget
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error updating campaign:', error)
    return NextResponse.json(
      { error: 'Failed to update campaign' },
      { status: 500 }
    )
  }
}