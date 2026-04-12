import { NextResponse } from 'next/server'

const pricingResponse = 'Our packages start at $2,500 setup plus $4,500/month. Enterprise and performance tiers scale with volume, ROI tracking, and priority onboarding.'
const bookingResponse = 'Your bookable pipeline is active: clients are scheduling calls, follow-ups are queued, and the next open slots are in the early afternoon. Keep the sequence moving to reduce no-shows.'

export async function POST(request: Request) {
  const body = await request.json()
  const message = typeof body?.message === 'string' ? body.message.trim().toLowerCase() : ''

  let text = 'I can help with business growth, lead velocity, and campaign efficiency. Ask me about pricing, growth, or booking performance.'
  let quickActions = ['Show metrics', 'Review funnel', 'Send follow-up']

  if (message.includes('price') || message.includes('pricing') || message.includes('cost')) {
    text = pricingResponse
    quickActions = ['View pricing', 'Compare plans', 'Talk to sales']
  } else if (message.includes('lead') || message.includes('pipeline') || message.includes('prospect')) {
    text = 'The current funnel is converting leads steadily. Your latest traffic generated a healthy lead volume, and the AI recommends prioritizing inactive contacts with a follow-up sequence.'
    quickActions = ['Show lead status', 'Send re-engagement', 'Review conversion']
  } else if (message.includes('booking') || message.includes('appointment') || message.includes('call')) {
    text = bookingResponse
    quickActions = ['View calendar', 'Confirm bookings', 'Optimize slots']
  } else if (message.includes('help') || message.includes('support') || message.includes('optimize')) {
    text = 'To maximize growth, focus on lead response speed, follow-up cadence, and conversion optimization. I can fetch the latest metrics or recommend your next best action.'
    quickActions = ['Latest metrics', 'Next best action', 'Review funnel']
  }

  return NextResponse.json({ text, quickActions })
}
