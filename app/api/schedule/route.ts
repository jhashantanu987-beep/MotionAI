import { NextResponse } from 'next/server'

const schedule = [
  {
    id: 1,
    time: '9:00 AM',
    title: 'Team Standup',
    type: 'meeting',
    avatar: 'TS'
  },
  {
    id: 2,
    time: '10:00 AM',
    title: 'Client Onboarding',
    type: 'meeting',
    avatar: 'CO'
  },
  {
    id: 3,
    time: '11:00 AM',
    title: 'Contract Review',
    type: 'document',
    avatar: 'CR'
  },
  {
    id: 4,
    time: '1:00 PM',
    title: 'Proposal Draft',
    type: 'document',
    avatar: 'PD'
  },
  {
    id: 5,
    time: '2:00 PM',
    title: 'Quarterly Review',
    type: 'meeting',
    avatar: 'QR'
  },
  {
    id: 6,
    time: '3:00 PM',
    title: 'Product Demo',
    type: 'presentation',
    avatar: 'PD'
  },
  {
    id: 7,
    time: '4:30 PM',
    title: 'Email Follow-up',
    type: 'email',
    avatar: 'EF'
  },
  {
    id: 8,
    time: '5:00 PM',
    title: 'End of Day Review',
    type: 'meeting',
    avatar: 'ER'
  }
]

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))

  return NextResponse.json(schedule)
}