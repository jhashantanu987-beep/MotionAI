import { NextResponse } from 'next/server'

interface RevenueData {
  total: number
  monthly: number
  growth: number
  breakdown: {
    subscriptions: number
    oneTime: number
    upsells: number
  }
  chart: Array<{
    month: string
    revenue: number
    target: number
  }>
}

// In-memory storage (in production, use a real database)
let revenueData: RevenueData = {
  total: 45162,
  monthly: 12450,
  growth: 12.5,
  breakdown: {
    subscriptions: 32000,
    oneTime: 8500,
    upsells: 4662
  },
  chart: [
    { month: 'Jan', revenue: 35000, target: 40000 },
    { month: 'Feb', revenue: 42000, target: 42000 },
    { month: 'Mar', revenue: 38000, target: 45000 },
    { month: 'Apr', revenue: 45162, target: 48000 },
  ]
}

function updateRevenueData() {
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

  // Update total revenue
  const revenueChange = Math.round((Math.random() - 0.4) * 500 * totalMultiplier)
  revenueData.total = Math.max(25000, revenueData.total + revenueChange)

  // Update monthly revenue
  const monthlyChange = Math.round((Math.random() - 0.45) * 200 * totalMultiplier)
  revenueData.monthly = Math.max(8000, revenueData.monthly + monthlyChange)

  // Update growth percentage
  revenueData.growth = Number(((Math.random() - 0.3) * 20 + 10).toFixed(1))

  // Update breakdown
  const totalBreakdown = revenueData.breakdown.subscriptions + revenueData.breakdown.oneTime + revenueData.breakdown.upsells
  const breakdownRatio = revenueData.total / totalBreakdown

  revenueData.breakdown.subscriptions = Math.round(revenueData.breakdown.subscriptions * breakdownRatio)
  revenueData.breakdown.oneTime = Math.round(revenueData.breakdown.oneTime * breakdownRatio)
  revenueData.breakdown.upsells = revenueData.total - revenueData.breakdown.subscriptions - revenueData.breakdown.oneTime

  // Update chart data
  const currentMonth = new Date().toLocaleString('default', { month: 'short' })
  const lastEntry = revenueData.chart[revenueData.chart.length - 1]

  if (lastEntry.month !== currentMonth) {
    revenueData.chart.push({
      month: currentMonth,
      revenue: revenueData.total,
      target: lastEntry.target + Math.round((Math.random() - 0.3) * 5000)
    })

    // Keep only last 6 months
    if (revenueData.chart.length > 6) {
      revenueData.chart.shift()
    }
  } else {
    lastEntry.revenue = revenueData.total
  }
}

export async function GET() {
  try {
    updateRevenueData()
    return NextResponse.json(revenueData)
  } catch (error) {
    console.error('Error fetching revenue data:', error)
    return NextResponse.json({ error: 'Failed to fetch revenue data' }, { status: 500 })
  }
}