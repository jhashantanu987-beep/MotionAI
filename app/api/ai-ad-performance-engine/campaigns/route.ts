import { NextRequest, NextResponse } from 'next/server'
import { proxyJson, proxyFetch } from '@/lib/backendClient'

// ─── GET /api/ai-ad-performance-engine/campaigns ──────────────────────────────
// Fetches real campaign data from Express backend
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const platform = searchParams.get('platform') || 'all'

  const { data, status, ok } = await proxyJson<any>(
    `/api/campaigns?platform=${platform}`
  )

  if (!ok) {
    return NextResponse.json(
      { error: 'CRM backend unreachable. Ensure Express server is running on port 5000.' },
      { status }
    )
  }

  return NextResponse.json(data)
}

// ─── POST /api/ai-ad-performance-engine/campaigns ─────────────────────────────
// Creates a real campaign, persisted to the file database
export async function POST(request: NextRequest) {
  const body = await request.json()

  const { data, status, ok } = await proxyJson<any>('/api/campaigns', {
    method: 'POST',
    body: JSON.stringify(body),
  })

  return NextResponse.json(data, { status: ok ? 201 : status })
}

// ─── PUT /api/ai-ad-performance-engine/campaigns ──────────────────────────────
// Toggle status or update budget — forwards PATCH to Express /api/campaigns/:id
export async function PUT(request: NextRequest) {
  const body = await request.json()
  const { id, action, ...updates } = body

  if (!id) {
    return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 })
  }

  const { data, status, ok } = await proxyJson<any>(`/api/campaigns/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  })

  return NextResponse.json(data, { status: ok ? 200 : status })
}
