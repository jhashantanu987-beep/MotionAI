import { NextRequest, NextResponse } from 'next/server'
import { proxyJson } from '@/lib/backendClient'

// ─── GET /api/ai-ugc-creative-engine/library ──────────────────────────────
export async function GET(request: NextRequest) {
  const { data, status, ok } = await proxyJson<any>('/api/ai/ugc-library')

  if (!ok) {
    return NextResponse.json({ content: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } })
  }

  // The frontend expects pagination, so we wrap the Express array
  // If the backend eventually supports ?page=1, we can just pass params through
  const page = 1
  const limit = 20
  
  return NextResponse.json({
    content: data,
    pagination: {
      page,
      limit,
      total: data?.length || 0,
      totalPages: Math.ceil((data?.length || 0) / limit)
    },
    filters: {}
  })
}

// ─── POST /api/ai-ugc-creative-engine/library ─────────────────────────────
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { action, contentId } = body

  // Forward deletion to Express
  if (action === 'delete') {
    const { status, ok } = await proxyJson<any>(`/api/ai/ugc-library/${contentId}`, { method: 'DELETE' })
    return NextResponse.json({ success: ok }, { status })
  }

  return NextResponse.json({ error: 'Action not supported yet' }, { status: 400 })
}