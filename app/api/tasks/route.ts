import { NextResponse } from 'next/server'

const tasks = [
  {
    id: 1,
    title: 'Google Meet Call',
    time: '2:00 PM',
    date: 'Today',
    status: 'upcoming',
    priority: 'high',
    type: 'meeting',
    description: 'Quarterly review with Sarah Johnson',
    isHighlighted: true
  },
  {
    id: 2,
    title: 'Email Follow-up',
    time: '4:30 PM',
    date: 'Today',
    status: 'pending',
    priority: 'medium',
    type: 'email',
    description: 'Send proposal to Michael Chen',
    isHighlighted: false
  },
  {
    id: 3,
    title: 'Contract Review',
    time: '11:00 AM',
    date: 'Tomorrow',
    status: 'completed',
    priority: 'high',
    type: 'document',
    description: 'Review terms with legal team',
    isHighlighted: false
  },
  {
    id: 4,
    title: 'Demo Presentation',
    time: '3:00 PM',
    date: 'Tomorrow',
    status: 'scheduled',
    priority: 'high',
    type: 'presentation',
    description: 'Product demo for Global Solutions',
    isHighlighted: false
  },
  {
    id: 5,
    title: 'Client Onboarding',
    time: '10:00 AM',
    date: 'Today',
    status: 'in-progress',
    priority: 'high',
    type: 'meeting',
    description: 'Welcome call with Lisa Rodriguez',
    isHighlighted: false
  },
  {
    id: 6,
    title: 'Proposal Draft',
    time: '1:00 PM',
    date: 'Today',
    status: 'pending',
    priority: 'medium',
    type: 'document',
    description: 'Prepare custom proposal for NextGen Tech',
    isHighlighted: false
  }
]

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))

  return NextResponse.json(tasks)
}