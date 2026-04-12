'use client'

import { Bell, Settings } from 'lucide-react'

export default function DashboardNavbar() {
  return (
    <nav className="w-full bg-[#0f172a] border-b border-[#1e293b] px-2 h-16 flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 flex items-center justify-center rounded-full bg-[#111827] text-[#8b5cf6] text-sm font-bold">
          K
        </div>
        <span className="text-sm font-semibold text-[#e5e7eb] tracking-wide">KLARA</span>

        <div className="flex items-center gap-3">
          <a href="#" className="text-sm text-[#9ca3af] hover:text-[#e5e7eb] transition">Workspace</a>
          <a href="#" className="text-sm text-[#9ca3af] hover:text-[#e5e7eb] transition">Calendar</a>
          <a href="#" className="text-sm text-[#9ca3af] hover:text-[#e5e7eb] transition">Reports</a>
          <a href="#" className="text-sm text-[#9ca3af] hover:text-[#e5e7eb] transition">Documents</a>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* Icons */}
        <button className="p-2 hover:bg-[#1e293b] rounded-full transition-colors">
          <Bell className="w-5 h-5 text-[#9ca3af]" />
        </button>

        <button className="p-2 hover:bg-[#1e293b] rounded-full transition-colors">
          <Settings className="w-5 h-5 text-[#9ca3af]" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
          JD
        </div>

      </div>
    </nav>
  )
}
