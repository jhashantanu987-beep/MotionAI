import { NextResponse } from 'next/server'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const metricsState = {
  revenue: 45162,
  clients: 21,
  conversionRate: 67.0,
  responseTime: 2.3,
  updatedAt: Date.now()
}

export function GET() {
  // Simulate real business fluctuations
  const hour = new Date().getHours()
  const dayOfWeek = new Date().getDay()

  // Business hours boost (9-17)
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

  metricsState.revenue = clamp(metricsState.revenue + Math.round((Math.random() - 0.4) * 500 * totalMultiplier), 25000, 120000)
  metricsState.clients = clamp(metricsState.clients + (Math.random() > 0.7 ? 1 : 0) + (Math.random() > 0.9 ? -1 : 0), 12, 45)
  metricsState.conversionRate = Number(clamp(metricsState.conversionRate + (Math.random() - 0.45) * 2.0, 35.0, 85.0).toFixed(1))
  metricsState.responseTime = Number(clamp(metricsState.responseTime + (Math.random() - 0.5) * 0.3, 1.2, 4.8).toFixed(1))
  metricsState.updatedAt = Date.now()

  return NextResponse.json(metricsState)
}
