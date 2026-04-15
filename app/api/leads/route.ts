import { NextRequest, NextResponse } from 'next/server'
import { proxyJson } from '@/lib/backendClient'

// ─── GET /api/leads ───────────────────────────────────────────────────────────
// Fetches real leads from the Express CRM backend (localhost:5000/api/leads)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const source = searchParams.get('source')

  const query = new URLSearchParams()
  if (status) query.set('status', status)
  if (source) query.set('source', source)

  const path = `/api/leads${query.toString() ? `?${query.toString()}` : ''}`
  const { data, status: httpStatus, ok } = await proxyJson(path)

  if (!ok) {
    return NextResponse.json(
      { error: 'CRM backend unreachable. Is the Express server running on port 5000?' },
      { status: httpStatus }
    )
  }

  return NextResponse.json(data)
}

// ─── POST /api/leads ──────────────────────────────────────────────────────────
// Creates a new lead via Express backend — triggers Gemini AI scoring + first message
export async function POST(request: NextRequest) {
  const body = await request.json()

  const { data, status: httpStatus, ok } = await proxyJson('/api/leads', {
    method: 'POST',
    body: JSON.stringify(body),
  })

  return NextResponse.json(data, { status: ok ? 201 : httpStatus })
}