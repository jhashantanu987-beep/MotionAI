import { NextRequest, NextResponse } from 'next/server'
import { proxyJson } from '@/lib/backendClient'
import { API_CONFIG } from './services/ugcApi';

export const dynamic = 'force-dynamic'

// ─── GET /api/ai-ad-performance-engine/performance ────────────────────────────
// Fetches real ad performance analytics from Express backend
export async function GET(request: NextRequest) {
  const { data, status, ok } = await proxyJson<any>('/api/campaigns/performance')

  if (!ok || !data) {
    // Graceful fallback so the dashboard still renders when backend is starting up
    const fallbackData = {
      platformBreakdown: [
        { platform: 'Google Ads',   spend: 0, impressions: 0, clicks: 0, conversions: 0, ctr: 0, cpc: 0, roas: 0 },
        { platform: 'Facebook Ads', spend: 0, impressions: 0, clicks: 0, conversions: 0, ctr: 0, cpc: 0, roas: 0 },
        { platform: 'LinkedIn Ads', spend: 0, impressions: 0, clicks: 0, conversions: 0, ctr: 0, cpc: 0, roas: 0 },
        { platform: 'TikTok Ads',   spend: 0, impressions: 0, clicks: 0, conversions: 0, ctr: 0, cpc: 0, roas: 0 },
      ],
      dailyPerformance: [],
      topPerformingAds: [],
      _source: 'offline-fallback'
    }
    return NextResponse.json(fallbackData, { status: 200 })
  }

  return NextResponse.json(data)
}
