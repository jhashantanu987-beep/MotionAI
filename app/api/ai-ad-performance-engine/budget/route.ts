import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get('timeframe') || '30d'

    // Mock budget optimization data
    const budgetData = {
      recommendations: [
        {
          campaignId: '1',
          campaignName: 'Brand Awareness Q1',
          currentBudget: 15000,
          recommendedBudget: 18000,
          expectedImprovement: {
            ctr: 15,
            conversions: 22,
            roas: 18
          },
          confidence: 'high',
          reasoning: 'Campaign showing strong performance with 3.0% CTR. Increasing budget by 20% could capture more high-intent traffic.'
        },
        {
          campaignId: '2',
          campaignName: 'Lead Generation Campaign',
          currentBudget: 8000,
          recommendedBudget: 6500,
          expectedImprovement: {
            ctr: -5,
            conversions: 8,
            roas: 12
          },
          confidence: 'medium',
          reasoning: 'High CPC detected. Reducing budget by 18.75% to focus on more efficient keywords and improve ROAS.'
        },
        {
          campaignId: '4',
          campaignName: 'TikTok Brand Campaign',
          currentBudget: 2000,
          recommendedBudget: 3500,
          expectedImprovement: {
            ctr: 25,
            conversions: 35,
            roas: 28
          },
          confidence: 'high',
          reasoning: 'Exceptional CTR at 7.0%. Viral potential identified. Increasing budget to capitalize on trending content.'
        }
      ],
      alerts: [
        {
          type: 'overspend',
          campaignName: 'Holiday Special',
          message: 'Campaign has exceeded budget by 15% this month',
          action: 'Consider pausing or reducing budget allocation'
        },
        {
          type: 'opportunity',
          campaignName: 'Professional Services',
          message: 'LinkedIn campaign performing 40% above average',
          action: 'Increase budget by 25% to maximize conversions'
        },
        {
          type: 'warning',
          campaignName: 'Facebook Ads',
          message: 'CPC increased by 18% in the last week',
          action: 'Review keywords and ad targeting'
        }
      ],
      totalBudget: 50000,
      totalSpent: 28750,
      projectedSpend: 32500
    }

    return NextResponse.json(budgetData)
  } catch (error) {
    console.error('Error fetching budget data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch budget data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { campaignId, newBudget } = body

    // Mock budget update
    return NextResponse.json({
      success: true,
      campaignId,
      newBudget,
      message: `Budget updated successfully to $${newBudget.toLocaleString()}`
    })
  } catch (error) {
    console.error('Error updating budget:', error)
    return NextResponse.json(
      { error: 'Failed to update budget' },
      { status: 500 }
    )
  }
}