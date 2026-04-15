import { NextRequest, NextResponse } from 'next/server'
import { proxyJson } from '@/lib/backendClient'

// ─── POST /api/ai-ugc-creative-engine/generate ────────────────────────────────
// Calls the Express AI route which uses Gemini to generate real viral content
// and saves it to the UGC library (file database)
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { platform, contentType, topic, tone, length } = body

  if (!topic) {
    return NextResponse.json(
      { error: 'Topic is required to generate content.' },
      { status: 400 }
    )
  }

  // Map Next.js frontend params to the Express backend schema
  const payload = {
    topic,
    platform: platform || 'Instagram',
    type: contentType || 'video',
    tone: tone || 'professional',
    targetAudience: 'business owners and entrepreneurs',
  }

  const { data, status, ok } = await proxyJson<any>('/api/ai/ugc-generate', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  if (!ok) {
    return NextResponse.json(
      { error: 'AI content generation failed. Check that the CRM backend is running.' },
      { status }
    )
  }

  // Normalize the Express response shape to match what the UI expects
  const normalized = {
    id: data?.data?._id || `content_${Date.now()}`,
    platform,
    contentType,
    topic,
    tone,
    length,
    title: data?.data?.title || topic.substring(0, 50),
    content: data?.data?.content || '',
    hashtags: data?.data?.hashtags || [],
    estimatedEngagement: data?.data?.engagementPotential || 0,
    hooks: data?.data?.hooks || [],
    createdAt: data?.data?.createdAt || new Date().toISOString(),
    status: 'generated',
    _source: 'live-ai'
  }

  return NextResponse.json(normalized, { status: 201 })
}