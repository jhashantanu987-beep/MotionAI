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
