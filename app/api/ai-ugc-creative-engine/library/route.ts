import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const platform = searchParams.get('platform')
    const contentType = searchParams.get('contentType')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    // Mock content library data
    const allContent = [
      {
        id: '1',
        title: 'AI Product Demo - Quick Start Guide',
        platform: 'TikTok',
        contentType: 'video',
        status: 'published',
        engagement: 125000,
        engagementRate: 8.5,
        createdAt: '2024-01-15T10:30:00Z',
        publishedAt: '2024-01-15T14:00:00Z',
        thumbnail: '/api/placeholder/300/200',
        tags: ['tutorial', 'demo', 'quick-start'],
        performance: {
          views: 450000,
          likes: 113760,
          comments: 2340,
          shares: 8900,
          saves: 1200
        }
      },
      {
        id: '2',
        title: 'Customer Success Story - Tech Startup',
        platform: 'Instagram',
        contentType: 'video',
        status: 'published',
        engagement: 89000,
        engagementRate: 6.2,
        createdAt: '2024-01-14T14:20:00Z',
        publishedAt: '2024-01-14T16:30:00Z',
        thumbnail: '/api/placeholder/300/200',
        tags: ['success-story', 'testimonial', 'case-study'],
        performance: {
          views: 320000,
          likes: 81410,
          comments: 1890,
          shares: 5600,
          saves: 800
        }
      },
      {
        id: '3',
        title: 'Behind-the-Scenes: Product Development',
        platform: 'YouTube',
        contentType: 'video',
        status: 'published',
        engagement: 67000,
        engagementRate: 5.8,
        createdAt: '2024-01-13T16:45:00Z',
        publishedAt: '2024-01-13T18:00:00Z',
        thumbnail: '/api/placeholder/300/200',
        tags: ['behind-scenes', 'development', 'process'],
        performance: {
          views: 280000,
          likes: 62370,
          comments: 1230,
          shares: 3400,
          saves: 600
        }
      },
      {
        id: '4',
        title: 'Industry Trends 2024 Infographic',
        platform: 'Instagram',
        contentType: 'image',
        status: 'scheduled',
        engagement: 0,
        engagementRate: 0,
        createdAt: '2024-01-15T09:15:00Z',
        publishedAt: null,
        thumbnail: '/api/placeholder/300/200',
        tags: ['trends', '2024', 'industry', 'infographic'],
        performance: null
      },
      {
        id: '5',
        title: 'Quick Tips Thread',
        platform: 'Twitter',
        contentType: 'story',
        status: 'draft',
        engagement: 0,
        engagementRate: 0,
        createdAt: '2024-01-15T08:30:00Z',
        publishedAt: null,
        thumbnail: '/api/placeholder/300/200',
        tags: ['tips', 'thread', 'quick-wins'],
        performance: null
      }
    ]

    // Apply filters
    let filteredContent = allContent

    if (platform) {
      filteredContent = filteredContent.filter(item =>
        item.platform.toLowerCase() === platform.toLowerCase()
      )
    }

    if (contentType) {
      filteredContent = filteredContent.filter(item =>
        item.contentType.toLowerCase() === contentType.toLowerCase()
      )
    }

    if (status) {
      filteredContent = filteredContent.filter(item =>
        item.status.toLowerCase() === status.toLowerCase()
      )
    }

    if (search) {
      filteredContent = filteredContent.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedContent = filteredContent.slice(startIndex, endIndex)

    const response = {
      content: paginatedContent,
      pagination: {
        page,
        limit,
        total: filteredContent.length,
        totalPages: Math.ceil(filteredContent.length / limit)
      },
      filters: {
        platform: platform || null,
        contentType: contentType || null,
        status: status || null,
        search: search || null
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching content library:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content library' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, contentId } = body

    // Mock content actions
    if (action === 'delete' && contentId) {
      // In a real app, this would delete from database
      return NextResponse.json({ success: true, message: 'Content deleted successfully' })
    }

    if (action === 'duplicate' && contentId) {
      // Mock duplication
      const newContent = {
        id: `content_${Date.now()}`,
        ...body,
        status: 'draft',
        createdAt: new Date().toISOString()
      }
      return NextResponse.json(newContent)
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error performing content action:', error)
    return NextResponse.json(
      { error: 'Failed to perform content action' },
      { status: 500 }
    )
  }
}