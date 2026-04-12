import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock creative analysis data
    const creativeData = {
      topCreatives: [
        {
          id: '1',
          type: 'text',
          headline: 'Transform Your Business with AI',
          description: 'Discover how AI can revolutionize your operations and boost productivity by 300%',
          platform: 'google',
          performance: {
            impressions: 45000,
            clicks: 1350,
            ctr: 3.0,
            conversions: 45,
            engagement: 4.2,
            cost: 1876.50
          }
        },
        {
          id: '2',
          type: 'image',
          headline: 'AI Solutions for Modern Teams',
          description: 'Empower your team with cutting-edge AI tools designed for the future of work',
          platform: 'linkedin',
          performance: {
            impressions: 28000,
            clicks: 840,
            ctr: 3.0,
            conversions: 28,
            engagement: 5.1,
            cost: 1360.80
          }
        },
        {
          id: '3',
          type: 'video',
          headline: 'Future-Proof Your Operations',
          description: 'See how our AI platform adapts and grows with your business needs',
          platform: 'facebook',
          performance: {
            impressions: 32000,
            clicks: 960,
            ctr: 3.0,
            conversions: 19,
            engagement: 8.7,
            cost: 1209.60
          }
        },
        {
          id: '4',
          type: 'video',
          headline: 'Viral AI Content Creation',
          description: 'Watch how easy it is to create engaging content with AI assistance',
          platform: 'tiktok',
          performance: {
            impressions: 15600,
            clicks: 1092,
            ctr: 7.0,
            conversions: 11,
            engagement: 12.3,
            cost: 534.68
          }
        },
        {
          id: '5',
          type: 'text',
          headline: 'Enterprise AI Solutions',
          description: 'Scalable AI solutions trusted by Fortune 500 companies worldwide',
          platform: 'google',
          performance: {
            impressions: 38000,
            clicks: 1140,
            ctr: 3.0,
            conversions: 34,
            engagement: 3.8,
            cost: 1576.80
          }
        }
      ],
      creativeInsights: {
        bestPerformingType: 'video',
        recommendedChanges: [
          'Increase video content budget by 30% - videos showing 2.5x higher engagement',
          'Test emotional storytelling in headlines for better CTR',
          'Use more specific numbers and statistics in ad copy',
          'Experiment with question-based headlines for higher engagement'
        ],
        trendingElements: [
          'AI transformation stories',
          'ROI-focused messaging',
          'Social proof and testimonials',
          'Future-focused language'
        ],
        underperformingElements: [
          'Generic business jargon',
          'Overly technical language',
          'Lack of clear value proposition',
          'Poor mobile optimization'
        ]
      },
      abTestResults: [
        {
          testId: 'ab_test_001',
          testName: 'Headline Optimization',
          winner: 'B',
          improvement: 35,
          confidence: 95,
          status: 'completed'
        },
        {
          testId: 'ab_test_002',
          testName: 'Image vs Video',
          winner: 'A',
          improvement: 67,
          confidence: 98,
          status: 'completed'
        },
        {
          testId: 'ab_test_003',
          testName: 'CTA Button Color',
          winner: 'A',
          improvement: 12,
          confidence: 87,
          status: 'running'
        }
      ]
    }

    return NextResponse.json(creativeData)
  } catch (error) {
    console.error('Error fetching creative analysis:', error)
    return NextResponse.json(
      { error: 'Failed to fetch creative analysis' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { testName, variations, platform } = body

    // Mock A/B test creation
    const newTest = {
      testId: `ab_test_${Date.now()}`,
      testName,
      variations,
      platform,
      status: 'running',
      startDate: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    }

    return NextResponse.json(newTest)
  } catch (error) {
    console.error('Error creating A/B test:', error)
    return NextResponse.json(
      { error: 'Failed to create A/B test' },
      { status: 500 }
    )
  }
}