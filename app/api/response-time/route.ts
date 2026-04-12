import { NextResponse } from 'next/server'

interface ResponseTimeData {
  average: number
  fastest: number
  slowest: number
  today: number
  trend: 'improving' | 'stable' | 'declining'
  breakdown: {
    email: number
    chat: number
    phone: number
  }
  history: Array<{
    date: string
    average: number
    count: number
  }>
}

// In-memory storage (in production, use a real database)
let responseTimeData: ResponseTimeData = {
  average: 2.3,
  fastest: 0.8,
  slowest: 8.2,
  today: 2.1,
  trend: 'improving',
  breakdown: {
    email: 3.2,
    chat: 1.8,
    phone: 2.9
  },
  history: [
    { date: '2024-03-18', average: 2.8, count: 45 },
    { date: '2024-03-19', average: 2.5, count: 52 },
    { date: '2024-03-20', average: 2.3, count: 48 },
    { date: '2024-03-21', average: 2.3, count: 51 },
  ]
}

function updateResponseTimeData() {
  const hour = new Date().getHours()
  const dayOfWeek = new Date().getDay()

  // Business hours affect response times
  const businessHourMultiplier = (hour >= 9 && hour <= 17) ? 0.8 : 1.2

  // Weekend slower responses
  const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.3 : 1.0

  // Random factors
  const randomFactor = Math.random()
  let performanceMultiplier = 1.0
  if (randomFactor < 0.2) performanceMultiplier = 0.7 // Good performance
  else if (randomFactor < 0.5) performanceMultiplier = 1.1 // Normal
  else performanceMultiplier = 1.4 // Slower

  const totalMultiplier = businessHourMultiplier * weekendMultiplier * performanceMultiplier

  // Update average response time
  const timeChange = (Math.random() - 0.5) * 0.3 * totalMultiplier
  responseTimeData.average = Number(Math.max(1.2, Math.min(4.8, responseTimeData.average + timeChange)).toFixed(1))

  // Update today's response time
  responseTimeData.today = Number(Math.max(1.0, Math.min(5.0, responseTimeData.average + (Math.random() - 0.5) * 0.5)).toFixed(1))

  // Update fastest/slowest
  responseTimeData.fastest = Number(Math.max(0.5, responseTimeData.average * 0.3 + Math.random() * 0.5).toFixed(1))
  responseTimeData.slowest = Number(Math.max(responseTimeData.average * 2, responseTimeData.average * 1.5 + Math.random() * 2).toFixed(1))

  // Update trend
  const recentHistory = responseTimeData.history.slice(-3)
  const avgRecent = recentHistory.reduce((sum, h) => sum + h.average, 0) / recentHistory.length
  const avgOlder = responseTimeData.history.slice(0, -3).reduce((sum, h) => sum + h.average, 0) / Math.max(1, responseTimeData.history.length - 3)

  if (avgRecent < avgOlder * 0.95) {
    responseTimeData.trend = 'improving'
  } else if (avgRecent > avgOlder * 1.05) {
    responseTimeData.trend = 'declining'
  } else {
    responseTimeData.trend = 'stable'
  }

  // Update breakdown
  responseTimeData.breakdown.email = Number(Math.max(2.0, Math.min(6.0, responseTimeData.breakdown.email + (Math.random() - 0.5) * 0.4)).toFixed(1))
  responseTimeData.breakdown.chat = Number(Math.max(1.0, Math.min(4.0, responseTimeData.breakdown.chat + (Math.random() - 0.5) * 0.3)).toFixed(1))
  responseTimeData.breakdown.phone = Number(Math.max(1.5, Math.min(5.0, responseTimeData.breakdown.phone + (Math.random() - 0.5) * 0.4)).toFixed(1))

  // Update history
  const today = new Date().toISOString().split('T')[0]
  const lastEntry = responseTimeData.history[responseTimeData.history.length - 1]

  if (lastEntry.date !== today) {
    responseTimeData.history.push({
      date: today,
      average: responseTimeData.average,
      count: Math.floor(Math.random() * 20) + 30
    })

    // Keep only last 7 days
    if (responseTimeData.history.length > 7) {
      responseTimeData.history.shift()
    }
  } else {
    lastEntry.average = responseTimeData.average
    lastEntry.count = Math.floor(Math.random() * 20) + 30
  }
}

export async function GET() {
  try {
    updateResponseTimeData()
    return NextResponse.json(responseTimeData)
  } catch (error) {
    console.error('Error fetching response time data:', error)
    return NextResponse.json({ error: 'Failed to fetch response time data' }, { status: 500 })
  }
}