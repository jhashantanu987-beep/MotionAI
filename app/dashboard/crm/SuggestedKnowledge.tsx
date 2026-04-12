'use client'

import { useState, useEffect } from 'react'
import { Eye, ChevronRight } from 'lucide-react'

interface SuggestedKnowledgeItem {
  id: number
  title: string
  category: string
  views: number
}

export default function SuggestedKnowledge() {
  const [knowledge, setKnowledge] = useState<SuggestedKnowledgeItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchKnowledge = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/suggested-knowledge')
        if (!response.ok) {
          throw new Error('Failed to fetch knowledge')
        }
        const data = await response.json()
        setKnowledge(data)
      } catch (err) {
        console.error('Error fetching suggested knowledge:', err)
        setError('Failed to load knowledge')
      } finally {
        setLoading(false)
      }
    }

    fetchKnowledge()
  }, [])

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Suggested Knowledge</h3>
          <p className="text-sm text-gray-600">Articles relevant to your workflow</p>
        </div>
        <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <p className="text-gray-500">{error}</p>
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="overflow-x-auto">
          {knowledge.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {knowledge.map((article) => (
                  <tr
                    key={article.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer"
                  >
                    <td className="py-4 px-4">
                      <p className="text-sm font-medium text-gray-900">{article.title}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {article.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Eye className="w-4 h-4" />
                        {article.views}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No knowledge articles yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
