import { NextResponse } from 'next/server'

interface WorkflowColumn {
  id: number
  title: string
  color: string
}

const workflowColumns: WorkflowColumn[] = [
  {
    id: 1,
    title: 'Case Allocation',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    title: 'Issue Identification',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 3,
    title: 'Technical Resolution',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 4,
    title: 'New Tasks',
    color: 'from-orange-500 to-orange-600',
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))

    return NextResponse.json(workflowColumns)
  } catch (error) {
    console.error('Error fetching workflow columns:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workflow columns' },
      { status: 500 }
    )
  }
}