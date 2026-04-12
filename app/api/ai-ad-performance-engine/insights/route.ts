import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock AI insights data for ad performance
    const insights = {
      optimizationOpportunities: [
        {
          title: 'Increase Google Ads Budget',
          description: 'Brand Awareness campaign showing 3.0% CTR, 40% above average. Potential for 25% more conversions.',
          impact: 'high',
          action: 'Increase by 20%'
        },
        {
          title: 'Optimize TikTok Targeting',
          description: 'TikTok ads performing exceptionally with 7.0% CTR. Expand audience targeting.',
          impact: 'high',
          action: 'Expand audience'
        },
        {
          title: 'Pause Underperforming Keywords',
          description: '5 keywords with CPC > $2.50 and low conversion rates detected.',
          impact: 'medium',
          action: 'Review keywords'
        },
        {
          title: 'Test Video Ads on Facebook',
          description: 'Video content showing 2.5x higher engagement than images.',
          impact: 'medium',
          action: 'Create video ads'
        }
      ],
      performanceAlerts: [
        {
          type: 'warning',
          message: 'Facebook Ads CPC increased by 18% this week',
          campaign: 'Lead Generation Campaign'
        },
        {
          type: 'opportunity',
          message: 'LinkedIn campaign performing 40% above average',
          campaign: 'Professional Services'
        },
        {
          type: 'success',
          message: 'TikTok campaign achieved viral coefficient of 1.8x',
          campaign: 'Brand Awareness'
        }
      ],
      budgetRecommendations: [
        {
          campaign: 'Brand Awareness Q1',
          currentSpend: 8750,
          recommendedSpend: 10500,
          expectedROI: 4.5
        },
        {
          campaign: 'TikTok Brand Campaign',
          currentSpend: 1200,
          recommendedSpend: 2100,
          expectedROI: 3.2
        }
      ],
      predictiveInsights: [
        {
          trend: 'Mobile traffic increasing',
          prediction: 'Mobile conversions expected to rise 25% next week',
          confidence: 87
        },
        {
          trend: 'Competitor ad spend rising',
          prediction: 'CPC may increase 15% due to market competition',
          confidence: 92
        },
        {
          trend: 'Seasonal demand peaking',
          prediction: 'Q1 campaigns will see 30% higher engagement',
          confidence: 78
        }
      ]
    }

    return NextResponse.json(insights)
  } catch (error) {
    console.error('Error fetching ad insights:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ad insights' },
      { status: 500 }
    )
  }
}