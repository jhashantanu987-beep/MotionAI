import { NextResponse } from 'next/server'

interface ConversionData {
  rate: number
  totalConversions: number
  totalLeads: number
  funnel: {
    visitors: number
    leads: number
    qualified: number
    booked: number
    closed: number
  }
  trends: Array<{
    date: string
    rate: number
    conversions: number
  }>
}

// In-memory storage (in production, use a real database)
let conversionData: ConversionData = {
  rate: 67.0,
  totalConversions: 134,
  totalLeads: 200,
  funnel: {
    visitors: 1250,
    leads: 200,
    qualified: 150,
    booked: 45,
    closed: 134
  },
  trends: [
    { date: '2024-03-01', rate: 65.2, conversions: 120 },
    { date: '2024-03-08', rate: 68.1, conversions: 128 },
    { date: '2024-03-15', rate: 66.8, conversions: 132 },
    { date: '2024-03-22', rate: 67.0, conversions: 134 },
  ]
}

function updateConversionData() {
  const hour = new Date().getHours()
  const dayOfWeek = new Date().getDay()

  // Business hours boost
  const businessHourMultiplier = (hour >= 9 && hour <= 17) ? 1.2 : 0.8

  // Weekend slowdown
  const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.7 : 1.0

  // Random business events
  const randomEvent = Math.random()
  let eventMultiplier = 1.0
  if (randomEvent < 0.1) eventMultiplier = 1.5 // Big win
  else if (randomEvent < 0.3) eventMultiplier = 1.2 // Good day
  else if (randomEvent < 0.5) eventMultiplier = 0.9 // Slow day

  const totalMultiplier = businessHourMultiplier * weekendMultiplier * eventMultiplier

  // Update conversion rate
  const rateChange = (Math.random() - 0.45) * 2.0 * totalMultiplier
  conversionData.rate = Number(Math.max(35.0, Math.min(85.0, conversionData.rate + rateChange)).toFixed(1))

  // Update totals
  const conversionChange = Math.random() > 0.7 ? 1 : 0
  conversionData.totalConversions += conversionChange

  const leadChange = Math.random() > 0.6 ? 1 : 0
  conversionData.totalLeads += leadChange

  // Update funnel
  conversionData.funnel.visitors += Math.floor(Math.random() * 10 * totalMultiplier)
  conversionData.funnel.leads += Math.floor(Math.random() * 3 * totalMultiplier)
  conversionData.funnel.qualified += Math.floor(Math.random() * 2 * totalMultiplier)
  conversionData.funnel.booked += Math.random() > 0.8 ? 1 : 0
  conversionData.funnel.closed += conversionChange

  // Update trends
  const today = new Date().toISOString().split('T')[0]
  const lastEntry = conversionData.trends[conversionData.trends.length - 1]

  if (lastEntry.date !== today) {
    conversionData.trends.push({
      date: today,
      rate: conversionData.rate,
      conversions: conversionData.totalConversions
    })

    // Keep only last 7 days
    if (conversionData.trends.length > 7) {
      conversionData.trends.shift()
    }
  } else {
    lastEntry.rate = conversionData.rate
    lastEntry.conversions = conversionData.totalConversions
  }
}

export async function GET() {
  try {
    updateConversionData()
    return NextResponse.json(conversionData)
  } catch (error) {
    console.error('Error fetching conversion data:', error)
    return NextResponse.json({ error: 'Failed to fetch conversion data' }, { status: 500 })
  }
}