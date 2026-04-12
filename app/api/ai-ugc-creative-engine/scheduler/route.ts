import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'all'

    // Mock scheduled posts data
    const allPosts = [
      {
        id: '1',
        title: 'AI Marketing Trends 2024',
        platform: 'Instagram',
        contentType: 'video',
        scheduledDate: '2024-01-16T10:00:00Z',
        status: 'scheduled',
        content: 'Exploring the latest AI marketing trends that will shape 2024...',
        hashtags: ['#AIMarketing', '#DigitalTrends', '#2024Marketing'],
        estimatedReach: 45000,
        thumbnail: '/api/placeholder/300/200'
      },
      {
        id: '2',
        title: 'Customer Success Story',
        platform: 'TikTok',
        contentType: 'video',
        scheduledDate: '2024-01-16T14:30:00Z',
        status: 'scheduled',
        content: 'How our AI solution helped a startup grow 300% in 6 months...',
        hashtags: ['#SuccessStory', '#AI', '#StartupGrowth'],
        estimatedReach: 120000,
        thumbnail: '/api/placeholder/300/200'
      },
      {
        id: '3',
        title: 'Quick Tips Thread',
        platform: 'Twitter',
        contentType: 'story',
        scheduledDate: '2024-01-15T16:00:00Z',
        status: 'published',
        content: '5 AI tools that every marketer should know about...',
        hashtags: ['#AITools', '#MarketingTips', '#DigitalMarketing'],
        estimatedReach: 25000,
        thumbnail: '/api/placeholder/300/200',
        actualPerformance: {
          engagement: 1250,
          reach: 28000,
          engagementRate: 4.5
        }
      },
      {
        id: '4',
        title: 'Behind the Scenes',
        platform: 'YouTube',
        contentType: 'video',
        scheduledDate: '2024-01-17T12:00:00Z',
        status: 'scheduled',
        content: 'A day in the life of our AI development team...',
        hashtags: ['#BehindTheScenes', '#AITeam', '#TechLife'],
        estimatedReach: 35000,
        thumbnail: '/api/placeholder/300/200'
      },
      {
        id: '5',
        title: 'Industry Report',
        platform: 'LinkedIn',
        contentType: 'image',
        scheduledDate: '2024-01-14T09:00:00Z',
        status: 'published',
        content: '2024 AI Marketing Report: Key insights and predictions...',
        hashtags: ['#AIReport', '#MarketingInsights', '#IndustryTrends'],
        estimatedReach: 15000,
        thumbnail: '/api/placeholder/300/200',
        actualPerformance: {
          engagement: 890,
          reach: 18000,
          engagementRate: 5.2
        }
      }
    ]

    let filteredPosts = allPosts

    if (status !== 'all') {
      filteredPosts = allPosts.filter(post => post.status === status)
    }

    // Sort by scheduled date
    filteredPosts.sort((a, b) =>
      new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
    )

    const response = {
      posts: filteredPosts,
      summary: {
        total: allPosts.length,
        scheduled: allPosts.filter(p => p.status === 'scheduled').length,
        published: allPosts.filter(p => p.status === 'published').length,
        draft: allPosts.filter(p => p.status === 'draft').length
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching scheduled posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch scheduled posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, platform, contentType, content, hashtags, scheduledDate, thumbnail } = body

    // Mock scheduling a new post
    const newPost = {
      id: `post_${Date.now()}`,
      title,
      platform,
      contentType,
      content,
      hashtags: hashtags || [],
      scheduledDate,
      status: 'scheduled',
      thumbnail: thumbnail || '/api/placeholder/300/200',
      estimatedReach: Math.floor(Math.random() * 100000) + 10000,
      createdAt: new Date().toISOString()
    }

    return NextResponse.json(newPost)
  } catch (error) {
    console.error('Error scheduling post:', error)
    return NextResponse.json(
      { error: 'Failed to schedule post' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, action } = body

    if (action === 'cancel' && id) {
      // Mock canceling a scheduled post
      return NextResponse.json({
        success: true,
        message: 'Post canceled successfully',
        postId: id
      })
    }

    if (action === 'reschedule' && id) {
      const { newDate } = body
      // Mock rescheduling
      return NextResponse.json({
        success: true,
        message: 'Post rescheduled successfully',
        postId: id,
        newScheduledDate: newDate
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error updating scheduled post:', error)
    return NextResponse.json(
      { error: 'Failed to update scheduled post' },
      { status: 500 }
    )
  }
}