import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { platform, contentType, topic, tone, length } = body

    // Mock AI content generation
    const generatedContent = {
      id: `content_${Date.now()}`,
      platform,
      contentType,
      topic,
      tone,
      length,
      title: generateTitle(platform, topic, contentType),
      content: generateContent(platform, contentType, topic, tone, length),
      hashtags: generateHashtags(topic, platform),
      estimatedEngagement: Math.floor(Math.random() * 5000) + 1000,
      createdAt: new Date().toISOString(),
      status: 'generated'
    }

    return NextResponse.json(generatedContent)
  } catch (error) {
    console.error('Error generating content:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}

function generateTitle(platform: string, topic: string, contentType: string): string {
  const titles = {
    tiktok: [
      `POV: ${topic} Just Got 10x Easier`,
      `This ${topic} Hack Changed Everything`,
      `${topic} Before vs After`,
      `The ${topic} Secret No One Talks About`
    ],
    instagram: [
      `Transform Your ${topic} Game`,
      `${topic} Success Story`,
      `Why ${topic} Matters in 2024`,
      `The Ultimate ${topic} Guide`
    ],
    youtube: [
      `Complete Guide to ${topic}`,
      `${topic} Tutorial for Beginners`,
      `Top 10 ${topic} Tips`,
      `${topic} Explained Simply`
    ],
    twitter: [
      `${topic} Thread: What You Need to Know`,
      `Breaking: ${topic} Trends`,
      `${topic} in 280 Characters`,
      `The Future of ${topic}`
    ]
  }

  const platformTitles = titles[platform.toLowerCase() as keyof typeof titles] || titles.instagram
  return platformTitles[Math.floor(Math.random() * platformTitles.length)]
}

function generateContent(platform: string, contentType: string, topic: string, tone: string, length: string): string {
  const contentTemplates = {
    video: {
      short: `Quick ${topic} tip: [Action step] → [Result]. Try it today! #${topic.replace(/\s+/g, '')}`,
      medium: `Hey everyone! Today I'm sharing how ${topic} can transform your workflow. Here's what you need to know: [Key points]. The results speak for themselves!`,
      long: `Welcome back! In this video, we're diving deep into ${topic}. We'll cover everything from basics to advanced techniques. By the end, you'll have a complete understanding of how to implement ${topic} effectively. Let's get started...`
    },
    image: {
      short: `Visual guide to ${topic}: [Key visual elements]`,
      medium: `Infographic: ${topic} Best Practices - [List of tips]`,
      long: `Complete ${topic} Framework: Step-by-step visual guide covering [comprehensive steps]`
    },
    story: {
      short: `Swipe up for ${topic} tips! 💡`,
      medium: `${topic} hack that works: [Quick tip]`,
      long: `Your ${topic} journey: From struggle to success in [timeframe]`
    }
  }

  const typeContent = contentTemplates[contentType.toLowerCase() as keyof typeof contentTemplates] || contentTemplates.video
  const lengthContent = typeContent[length.toLowerCase() as keyof typeof typeContent] || typeContent.medium

  return lengthContent
}

function generateHashtags(topic: string, platform: string): string[] {
  const baseHashtags = [
    `#${topic.replace(/\s+/g, '')}`,
    `#${topic.replace(/\s+/g, '')}Tips`,
    `#${topic.replace(/\s+/g, '')}Hacks`,
    `#BusinessTips`,
    `#Entrepreneurship`,
    `#Success`
  ]

  const platformHashtags = {
    tiktok: ['#TikTokTips', '#Viral', '#Trending', '#LearnOnTikTok'],
    instagram: ['#InstagramTips', '#ContentCreation', '#Marketing', '#BusinessGrowth'],
    youtube: ['#YouTubeTips', '#Tutorial', '#Education', '#LearnWithMe'],
    twitter: ['#TwitterTips', '#Thread', '#Discussion', '#Insights']
  }

  const platformTags = platformHashtags[platform.toLowerCase() as keyof typeof platformHashtags] || []
  return [...baseHashtags, ...platformTags].slice(0, 8)
}