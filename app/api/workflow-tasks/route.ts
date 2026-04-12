import { NextResponse } from 'next/server'

interface WorkflowTask {
  id: number
  columnId: number
  title: string
  avatar: string
  priority: 'low' | 'medium' | 'high' | 'critical'
}

const workflowTasks: WorkflowTask[] = [
  // Case Allocation
  { id: 1, columnId: 1, title: 'John Smith Account Setup', avatar: 'JS', priority: 'high' },
  { id: 2, columnId: 1, title: 'Budget Review for Q4', avatar: 'BR', priority: 'medium' },
  { id: 3, columnId: 1, title: 'Contract Renewal Discussion', avatar: 'CR', priority: 'high' },

  // Issue Identification
  { id: 4, columnId: 2, title: 'Server Performance Issue', avatar: 'SPI', priority: 'critical' },
  { id: 5, columnId: 2, title: 'API Integration Error', avatar: 'AIE', priority: 'high' },
  { id: 6, columnId: 2, title: 'Database Connection Timeout', avatar: 'DCT', priority: 'medium' },

  // Technical Resolution
  { id: 7, columnId: 3, title: 'Fix Login Flow Bug', avatar: 'FLB', priority: 'high' },
  { id: 8, columnId: 3, title: 'Optimize Image Loading', avatar: 'OIL', priority: 'medium' },
  { id: 9, columnId: 3, title: 'Update Security Headers', avatar: 'USH', priority: 'high' },

  // New Tasks
  { id: 10, columnId: 4, title: 'Feature Request Implementation', avatar: 'FRI', priority: 'medium' },
  { id: 11, columnId: 4, title: 'Documentation Update', avatar: 'DU', priority: 'low' },
  { id: 12, columnId: 4, title: 'Team Training Session', avatar: 'TTS', priority: 'medium' },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))

    return NextResponse.json(workflowTasks)
  } catch (error) {
    console.error('Error fetching workflow tasks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workflow tasks' },
      { status: 500 }
    )
  }
}