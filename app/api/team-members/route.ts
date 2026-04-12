import { NextResponse } from 'next/server'

interface TeamMember {
  id: number
  initial: string
  name: string
  color: string
}

const teamMembers: TeamMember[] = [
  { id: 1, initial: 'A', name: 'Alice Johnson', color: 'bg-red-400' },
  { id: 2, initial: 'B', name: 'Bob Smith', color: 'bg-blue-400' },
  { id: 3, initial: 'C', name: 'Carol Davis', color: 'bg-green-400' },
  { id: 4, initial: 'D', name: 'David Wilson', color: 'bg-yellow-400' },
  { id: 5, initial: 'E', name: 'Emma Brown', color: 'bg-purple-400' },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))

    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error('Error fetching team members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}