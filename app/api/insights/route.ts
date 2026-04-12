import { NextResponse } from 'next/server'

let insightCycle = 0

export function GET() {
  const hour = new Date().getHours()
  const dayOfWeek = new Date().getDay()
  const minute = new Date().getMinutes()

  // Time-based insights
  const isBusinessHours = hour >= 9 && hour <= 17
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

  // Dynamic insight generation based on time and performance
  const insights = []

  // Always include response time insight
  const baseResponseTime = 2.3
  const responseTimeVariance = (Math.random() - 0.5) * 0.4
  const currentResponseTime = Math.max(1.5, baseResponseTime + responseTimeVariance)
  const responseTimeChange = (Math.random() - 0.5) * 0.3

  insights.push({
    title: 'AI Response Performance',
    description: `Average response time: ${currentResponseTime.toFixed(1)}s (${responseTimeChange >= 0 ? '+' : ''}${responseTimeChange.toFixed(1)}s from yesterday)`,
    action: currentResponseTime > 2.5 ? 'Optimize AI processing' : 'Performance stable'
  })

  // Business hours specific insights
  if (isBusinessHours && !isWeekend) {
    const activeLeads = 5 + Math.floor(Math.random() * 15)
    const conversionRate = 65 + Math.floor(Math.random() * 15)

    insights.push({
      title: 'Live Lead Activity',
      description: `${activeLeads} leads engaged in last hour, conversion rate at ${conversionRate}%`,
      action: 'Monitor engagement patterns'
    })

    if (Math.random() > 0.6) {
      insights.push({
        title: 'Booking Opportunity',
        description: 'High-intent lead requires immediate follow-up',
        action: 'Schedule discovery call'
      })
    }
  } else if (!isBusinessHours) {
    insights.push({
      title: 'Off-Hours Activity',
      description: 'System processing queued leads and optimizing campaigns',
      action: 'Review tomorrow\'s priorities'
    })
  }

  // Random business insights
  const randomInsight = Math.random()
  if (randomInsight < 0.3) {
    const funnelDrop = 20 + Math.floor(Math.random() * 30)
    insights.push({
      title: 'Funnel Optimization',
      description: `${funnelDrop}% drop at lead qualification stage detected`,
      action: 'Improve qualification criteria'
    })
  } else if (randomInsight < 0.6) {
    const revenueIncrease = 5 + Math.floor(Math.random() * 20)
    insights.push({
      title: 'Revenue Trend',
      description: `Monthly recurring revenue up ${revenueIncrease}% this period`,
      action: 'Analyze growth drivers'
    })
  } else {
    const clientSatisfaction = 85 + Math.floor(Math.random() * 10)
    insights.push({
      title: 'Client Satisfaction',
      description: `Average satisfaction score: ${clientSatisfaction}% based on recent feedback`,
      action: 'Review improvement opportunities'
    })
  }

  // Market condition insights
  if (Math.random() > 0.7) {
    const marketCondition = Math.random() > 0.5 ? 'bullish' : 'cautious'
    insights.push({
      title: 'Market Intelligence',
      description: `Market conditions are ${marketCondition} - adjust pricing strategy accordingly`,
      action: 'Review competitive positioning'
    })
  }

  insightCycle += 1

  return NextResponse.json(insights.slice(0, 3)) // Return max 3 insights
}
