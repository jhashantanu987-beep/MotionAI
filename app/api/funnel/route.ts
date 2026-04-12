import { NextResponse } from 'next/server'

export function GET() {
  // This endpoint is no longer used - funnel data is calculated from client data in the dashboard
  return NextResponse.json({
    adClicks: 0,
    landingPage: 0,
    leadCapture: 0,
    qualifiedLead: 0,
    bookedCall: 0,
    closedDeal: 0,
    updatedAt: Date.now()
  })
}
