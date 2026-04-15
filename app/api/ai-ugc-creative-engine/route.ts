import { NextRequest, NextResponse } from 'next/server'
import { proxyJson } from '@/lib/backendClient'

// ─── GET /api/ai-ugc-creative-engine ─────────────────────────────────────────
// Fetches aggregated UGC performance stats from Express backend
export async function GET(request: NextRequest) {
  const { data, status, ok } = await proxyJson<any>('/api/ai/ugc-performance')

  if (!ok || !data) {
    // Graceful empty-state fallback
    return NextResponse.json({
      totalContent: 0,
      totalEngagement: 0,
      viralPosts: 0,
      avgEngagementRate: 0,
      topPerformingContent: [],
      platformPerformance: [],
      contentTypes: [],
      recentActivity: [],
      _source: 'offline-fallback'
    })
  }

  return NextResponse.json({ ...data, _source: 'live-crm' })
}
