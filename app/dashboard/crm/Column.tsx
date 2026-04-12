'use client'

import TaskCard from './TaskCard'

interface ColumnProps {
  title: string
  colorGradient: string
  tasks: {
    id: number
    title: string
    avatar: string
    priority: 'low' | 'medium' | 'high' | 'critical'
  }[]
  onAddTask?: () => void
}

export default function Column({ title, colorGradient, tasks, onAddTask }: ColumnProps) {
  return (
    <div className="flex-shrink-0 w-72">
      {/* Column Header */}
      <div className={`bg-gradient-to-r ${colorGradient} rounded-2xl px-4 py-3 mb-4`}>
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">{title}</h2>
          <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Tasks Container */}
      <div className="space-y-3 pb-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            avatar={task.avatar}
            priority={task.priority}
          />
        ))}
      </div>

      {/* Add Task Button */}
      <button
        onClick={onAddTask}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition font-medium text-sm"
      >
        + Add Task
      </button>
    </div>
  )
}
