'use client'

import { FileText, Target } from 'lucide-react'

export default function SummarySection() {
  return (
    <div className="space-y-6">
      {/* Recent Documents */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Recent Documents
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl border border-slate-200 hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-102">
            <FileText className="w-5 h-5 text-[#a3e635]" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">Proposal.pdf</p>
              <p className="text-xs text-slate-500">2.4 MB • 5 min ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl border border-slate-200 hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-102">
            <FileText className="w-5 h-5 text-green-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">Contract.docx</p>
              <p className="text-xs text-slate-500">1.8 MB • 1 hour ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl border border-slate-200 hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-102">
            <FileText className="w-5 h-5 text-purple-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">Report.xlsx</p>
              <p className="text-xs text-slate-500">3.2 MB • 2 hours ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Goals */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <Target className="w-4 h-4" />
          Today's Goals
        </h4>
        <div className="bg-gradient-to-br from-lime-50 to-lime-100 border border-lime-200 rounded-2xl p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-lime-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-sm font-medium text-slate-900">Close 3 deals</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-lime-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-sm font-medium text-slate-900">Follow up with 5 leads</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-slate-300 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-sm text-slate-600">Schedule team meeting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}