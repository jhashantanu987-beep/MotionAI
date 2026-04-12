import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock performance analytics data
    const performanceData = {
      overview: {
        totalReach: 1250000,
        totalEngagement: 456789,
        engagementRate: 4.2,
        viralCoefficient: 1.8,
        avgShares: 234,
        avgComments: 567,
        avgLikes: 1234
      },
      platformBreakdown: [
        {
          platform: 'TikTok',
          reach: 450000,
          engagement: 180000,
          engagementRate: 7.2,
          viralPosts: 45,
          topContent: 'Dance Challenge Video',
          growth: 15.3
        },
        {
          platform: 'Instagram',
          reach: 380000,
          engagement: 145000,
          engagementRate: 5.8,
          viralPosts: 32,
          topContent: 'Reels Series',
          growth: 12.1
        },
        {
          platform: 'YouTube',
          reach: 280000,
          engagement: 98000,
          engagementRate: 4.9,
          viralPosts: 18,
          topContent: 'Tutorial Series',
          growth: 8.7
        },
        {
          platform: 'Twitter',
          reach: 140000,
          engagement: 33889,
          engagementRate: 3.2,
          viralPosts: 8,
          topContent: 'Thread Series',
          growth: 5.4
        }
      ],
      contentPerformance: [
        {
          type: 'Video',
          posts: 456,
          totalEngagement: 280000,
          avgEngagementRate: 6.8,
          viralRate: 15.2,
          bestTime: 'Tuesday 2PM'
        },
        {
          type: 'Image',
          posts: 523,
          totalEngagement: 120000,
          avgEngagementRate: 4.2,
          viralRate: 8.1,
          bestTime: 'Thursday 11AM'
        },
        {
          type: 'Story',
          posts: 268,
          totalEngagement: 56889,
          avgEngagementRate: 5.1,
          viralRate: 11.3,
          bestTime: 'Friday 4PM'
        }
      ],
      engagementTrends: [
        { date: '2024-01-08', engagement: 3200, reach: 45000 },
        { date: '2024-01-09', engagement: 4100, reach: 52000 },
        { date: '2024-01-10', engagement: 3800, reach: 48000 },
        { date: '2024-01-11', engagement: 5200, reach: 61000 },
        { date: '2024-01-12', engagement: 4800, reach: 57000 },
        { date: '2024-01-13', engagement: 6100, reach: 72000 },
        { date: '2024-01-14', engagement: 5500, reach: 65000 },
        { date: '2024-01-15', engagement: 6700, reach: 78000 }
      ],
      topPerformingContent: [
        {
          id: '1',
          title: 'AI Product Demo',
          platform: 'TikTok',
          engagement: 125000,
          reach: 450000,
          engagementRate: 8.5,
          shares: 8900,
          comments: 2340,
          likes: 113760
        },
        {
          id: '2',
          title: 'Customer Success Story',
          platform: 'Instagram',
          engagement: 89000,
          reach: 320000,
          engagementRate: 6.2,
          shares: 5600,
          comments: 1890,
          likes: 81410
        },
        {
          id: '3',
          title: 'Behind-the-Scenes',
          platform: 'YouTube',
          engagement: 67000,
          reach: 280000,
          engagementRate: 5.8,
          shares: 3400,
          comments: 1230,
          likes: 62370
        }
      ],
      audienceInsights: {
        demographics: {
          age: [
            { range: '18-24', percentage: 35 },
            { range: '25-34', percentage: 42 },
            { range: '35-44', percentage: 18 },
            { range: '45+', percentage: 5 }
          ],
          gender: [
            { type: 'Female', percentage: 58 },
            { type: 'Male', percentage: 40 },
            { type: 'Other', percentage: 2 }
          ]
        },
        interests: [
          'Technology', 'Business', 'Marketing', 'Entrepreneurship',
          'AI & Machine Learning', 'Digital Marketing', 'Startups'
        ],
        locations: [
          { country: 'United States', percentage: 45 },
          { country: 'United Kingdom', percentage: 15 },
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