import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock data for AI UGC Creative Engine metrics
    const metrics = {
      totalContent: 1247,
      totalEngagement: 456789,
      viralPosts: 89,
      avgEngagementRate: 4.2,
      topPerformingContent: [
        {
          id: '1',
          title: 'AI-Generated Product Demo',
          platform: 'TikTok',
          engagement: 125000,
          engagementRate: 8.5,
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          title: 'Customer Success Story',
          platform: 'Instagram',
          engagement: 89000,
          engagementRate: 6.2,
          createdAt: '2024-01-14T14:20:00Z'
        },
        {
          id: '3',
          title: 'Behind-the-Scenes Content',
          platform: 'YouTube',
          engagement: 67000,
          engagementRate: 5.8,
          createdAt: '2024-01-13T16:45:00Z'
        }
      ],
      platformPerformance: [
        {
          platform: 'TikTok',
          posts: 245,
          totalEngagement: 180000,
          avgEngagementRate: 7.2,
          viralRate: 12.5
        },
        {
          platform: 'Instagram',
          posts: 312,
          totalEngagement: 145000,
          avgEngagementRate: 5.8,
          viralRate: 8.3
        },
        {
          platform: 'YouTube',
          posts: 156,
          totalEngagement: 98000,
          avgEngagementRate: 4.9,
          viralRate: 6.1
        },
        {
          platform: 'Twitter',
          posts: 534,
          totalEngagement: 33889,
          avgEngagementRate: 3.2,
          viralRate: 2.8
        }
      ],
      contentTypes: [
        { type: 'Video', count: 456, engagement: 280000, avgRate: 6.8 },
        { type: 'Image', count: 523, engagement: 120000, avgRate: 4.2 },
        { type: 'Story', count: 268, engagement: 56889, avgRate: 5.1 }
      ],
      recentActivity: [
        {
          id: '1',
          action: 'Content Generated',
          platform: 'TikTok',
          timestamp: '2024-01-15T11:30:00Z',
          status: 'scheduled'
        },
        {
          id: '2',
          action: 'Viral Post Detected',
          platform: 'Instagram',
          timestamp: '2024-01-15T10:15:00Z',
          status: 'viral'
        },
        {
          id: '3',
          action: 'Content Published',
          platform: 'YouTube',
          timestamp: '2024-01-15T09:45:00Z',
          status: 'published'
        }
      ]
    }

    return NextResponse.json(metrics)
  } catch (error) {
    console.error('Error fetching UGC metrics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch UGC metrics' },
      { status: 500 }
    )
  }
}