'use client'

import { useState, useEffect } from 'react'
import Column from './Column'

interface WorkflowColumn {
  id: number
  title: string
  color: string
}

interface WorkflowTask {
  id: number
  columnId: number
  title: string
  avatar: string
  priority: 'low' | 'medium' | 'high' | 'critical'
}

interface WorkflowBoardProps {
  onAddTaskClick?: () => void
}

export default function WorkflowBoard({ onAddTaskClick }: WorkflowBoardProps) {
  const [columns, setColumns] = useState<WorkflowColumn[]>([])
  const [tasks, setTasks] = useState<WorkflowTask[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWorkflowData = async () => {
      try {
        setLoading(true)
        const [columnsRes, tasksRes] = await Promise.all([
          fetch('/api/workflow-columns'),
          fetch('/api/workflow-tasks')
        ])

        if (!columnsRes.ok || !tasksRes.ok) {
          throw new Error('Failed to fetch workflow data')
        }

        const [columnsData, tasksData] = await Promise.all([
          columnsRes.json(),
          tasksRes.json()
        ])

        setColumns(columnsData)
        setTasks(tasksData)
      } catch (err) {
        console.error('Error fetching workflow data:', err)
        setError('Failed to load workflow data')
      } finally {
        setLoading(false)
      }
    }

    fetchWorkflowData()
  }, [])

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl p-6 mb-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Workflow Board</h2>
        <p className="text-gray-600">Manage and track all your cases across different stages</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="flex gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-80 h-96 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <p className="text-gray-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Workflow Board */}
      {!loading && !error && (
        <div className="overflow-x-auto pb-4">
          {columns.length > 0 ? (
            <div className="flex gap-6">
              {columns.map((column) => {
                const columnTasks = tasks.filter((task) => task.columnId === column.id)
                return (
                  <Column
                    key={column.id}
                    title={column.title}
                    colorGradient={column.color}
                    tasks={columnTasks}
                    onAddTask={onAddTaskClick}
                  />
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No workflow columns yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
