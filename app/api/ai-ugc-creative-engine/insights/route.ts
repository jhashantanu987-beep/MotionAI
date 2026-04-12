import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock AI insights data
    const insights = {
      trendingTopics: [
        'AI Product Demos',
        'Customer Success Stories',
        'Industry Trends 2024',
        'Behind-the-Scenes Content',
        'User-Generated Challenges'
      ],
      bestPostingTimes: [
        { day: 'Tuesday', hour: '2:00 PM', engagement: 35 },
        { day: 'Thursday', hour: '11:00 AM', engagement: 28 },
        { day: 'Friday', hour: '4:00 PM', engagement: 22 },
        { day: 'Monday', hour: '9:00 AM', engagement: 18 }
      ],
      contentSuggestions: [
        'Create a short video showing your product solving a common pain point',
        'Share a customer testimonial with before/after results',
        'Post about upcoming industry changes and how your solution helps',
        'Show the human side of your company with team culture content'
      ],
      performanceAlerts: [
        'TikTok engagement dropped 15% this week - consider changing posting times',
        'Instagram Stories have 40% lower engagement than usual'
      ],
      aiRecommendations: [
        {
          title: 'Increase Video Content',
          description: 'Videos are performing 3x better than images. Focus on short-form video content.',
          impact: 'high'
        },
        {
          title: 'Optimize Posting Schedule',
          description: 'Tuesday 2 PM shows 35% higher engagement. Schedule more content then.',
          impact: 'medium'
        },
        {
          title: 'Add More User Stories',
          description: 'Customer success stories have 25% higher conversion rates.',
          impact: 'medium'
        },
        {
          title: 'Test New Hashtags',
          description: 'Current hashtags are saturated. Try trending industry-specific tags.',
          impact: 'low'
        }
      ]
    }

    return NextResponse.json(insights)
  } catch (error) {
    console.error('Error fetching UGC insights:', error)
    return NextResponse.json(
      { error: 'Failed to fetch UGC insights' },
      { status: 500 }
    )
  }
}