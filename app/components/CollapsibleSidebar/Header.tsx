'use client'

interface HeaderProps {
  isExpanded: boolean
  toggleSidebar: () => void
}

export default function Header({ isExpanded, toggleSidebar }: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100"
          aria-label="Toggle sidebar"
        >
          <span className="text-xl">☰</span>
        </button>

        <div>
          <p className="text-sm text-slate-500">Welcome back</p>
          <h1 className="text-xl font-semibold text-slate-900">Collapsible sidebar demo</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-slate-600">
          <span className="text-slate-400">Mode:</span>
          <span className="font-medium">{isExpanded ? 'Expanded' : 'Collapsed'}</span>
        </div>
      </div>
    </header>
  )
}
