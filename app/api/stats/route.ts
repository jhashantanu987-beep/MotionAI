import { NextResponse } from 'next/server'

const stats = {
  totalLeads: 24,
  activeTasks: 8,
  revenue: 45000,
  conversionRate: 89,
  growth: 23,
  meetingsToday: 5
}

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))

  return NextResponse.json(stats)
}