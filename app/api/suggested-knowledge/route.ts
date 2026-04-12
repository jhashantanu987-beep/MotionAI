import { NextResponse } from 'next/server'

interface SuggestedKnowledgeItem {
  id: number
  title: string
  category: string
  views: number
}

const suggestedKnowledge: SuggestedKnowledgeItem[] = [
  { id: 1, title: 'How to manage customer accounts', category: 'Account Management', views: 324 },
  { id: 2, title: 'Setting up payment processing', category: 'Payments', views: 287 },
  { id: 3, title: 'API documentation guide', category: 'Developer', views: 456 },
  { id: 4, title: 'Best practices for CRM workflow', category: 'Workflow', views: 189 },
  { id: 5, title: 'Customer onboarding strategies', category: 'Onboarding', views: 523 },
  { id: 6, title: 'Data security and compliance', category: 'Security', views: 298 },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))

    return NextResponse.json(suggestedKnowledge)
  } catch (error) {
    console.error('Error fetching suggested knowledge:', error)
    return NextResponse.json(
      { error: 'Failed to fetch suggested knowledge' },
      { status: 500 }
    )
  }
}