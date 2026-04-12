'use client'

interface SidebarProps {
  isExpanded: boolean
  activeItem: string
  onSelectItem: (item: string) => void
}

const menuItems = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'crm', label: 'CRM', icon: '👥' },
  { id: 'workspace', label: 'Workspace', icon: '🗂' },
  { id: 'calendar', label: 'Calendar', icon: '📅' },
  { id: 'reports', label: 'Reports', icon: '📊' },
  { id: 'documents', label: 'Documents', icon: '📄' },
  { id: 'messages', label: 'Messages', icon: '✉️' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'revenue', label: 'Revenue', icon: '💰' },
  { id: 'ads', label: 'Ad Performance', icon: '🎯' },
  { id: 'ugc', label: 'UGC Creative', icon: '🌟' },
  { id: 'settings', label: 'Settings', icon: '⚙️' }
]

export default function Sidebar({ isExpanded, activeItem, onSelectItem }: SidebarProps) {
  const widthClass = isExpanded ? 'w-64' : 'w-20'

  return (
    <aside className={`${widthClass} bg-slate-900 text-slate-100 transition-all duration-300 min-h-screen flex flex-col`}>
      <div className="px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-slate-800 p-2 rounded-xl text-lg">✨</div>
          {isExpanded && <span className="text-lg font-semibold">Klara UI</span>}
        </div>
      </div>

      <div className="mt-4 flex-1 px-2 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeItem === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSelectItem(item.id)}
              className={`group w-full flex items-center gap-3 rounded-2xl px-3 py-3 transition-all duration-300 ${
                isActive ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isExpanded && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          )
        })}
      </div>

      <div className="px-4 py-4">
        <div className="bg-slate-800 rounded-2xl p-3 text-sm text-slate-400">
          {isExpanded ? 'Expand your workspace and stay productive.' : 'Collapsed view'}
        </div>
      </div>
    </aside>
  )
}
