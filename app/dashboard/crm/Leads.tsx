'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Star, TrendingUp, MoreVertical, Plus, PhoneCall, MessageSquare, Edit, Trash2 } from 'lucide-react'

export default function LeadsPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [showActions, setShowActions] = useState<number | null>(null)

  const handleCall = (lead: any) => {
    // Simulate calling functionality
    alert(`Calling ${lead.name} at ${lead.phone}`)
  }

  const handleEmail = (lead: any) => {
    // Simulate email functionality
    window.open(`mailto:${lead.email}`)
  }

  const handleEdit = (lead: any) => {
    setSelectedLead(lead)
    // Could open edit modal here
    alert(`Editing ${lead.name}`)
  }

  const handleDelete = (lead: any) => {
    if (confirm(`Are you sure you want to delete ${lead.name}?`)) {
      // Simulate delete functionality
      alert(`${lead.name} deleted`)
    }
  }
  const leads = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      company: 'Tech Innovations Ltd',
      email: 'sarah@techinnovations.com',
      phone: '+1 (555) 111-2222',
      location: 'Boston, MA',
      source: 'Website',
      status: 'Hot',
      value: '$45,000',
      score: 92,
      avatar: 'SM',
      color: 'bg-pink-500',
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'Digital Growth Co',
      email: 'michael@digitalgrowth.com',
      phone: '+1 (555) 222-3333',
      location: 'San Francisco, CA',
      source: 'Referral',
      status: 'Warm',
      value: '$32,000',
      score: 78,
      avatar: 'MC',
      color: 'bg-cyan-500',
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      company: 'Cloud Solutions Inc',
      email: 'emma@cloudsolutions.io',
      phone: '+1 (555) 333-4444',
      location: 'Austin, TX',
      source: 'LinkedIn',
      status: 'Hot',
      value: '$58,000',
      score: 88,
      avatar: 'ER',
      color: 'bg-amber-500',
    },
    {
      id: 4,
      name: 'James Watson',
      company: 'Enterprise Systems Group',
      email: 'james@enterprisesystems.com',
      phone: '+1 (555) 444-5555',
      location: 'New York, NY',
      source: 'Email Campaign',
      status: 'Cool',
      value: '$28,000',
      score: 65,
      avatar: 'JW',
      color: 'bg-indigo-500',
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      company: 'Business Intelligence Plus',
      email: 'lisa@biplus.com',
      phone: '+1 (555) 555-6666',
      location: 'Chicago, IL',
      source: 'Trade Show',
      status: 'Warm',
      value: '$42,000',
      score: 81,
      avatar: 'LA',
      color: 'bg-teal-500',
    },
    {
      id: 6,
      name: 'Robert Kim',
      company: 'Management Consultants',
      email: 'robert@mgmtconsult.com',
      phone: '+1 (555) 666-7777',
      location: 'Los Angeles, CA',
      source: 'Website',
      status: 'Hot',
      value: '$65,000',
      score: 95,
      avatar: 'RK',
      color: 'bg-rose-500',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot':
        return 'bg-red-100 text-red-700'
      case 'Warm':
        return 'bg-orange-100 text-orange-700'
      case 'Cool':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a]">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#b537f2] mb-2">Leads</h1>
            <p className="text-gray-600">Track and manage all your active leads</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Add Lead
          </button>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Lead Name</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Company</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Contact</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Source</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Lead Score</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Value</th>
                  <th className="text-center py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`${lead.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                          {lead.avatar}
                        </div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{lead.company}</td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">{lead.email}</p>
                        <p className="text-sm text-gray-500">{lead.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-gray-700">{lead.score}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-gray-900">{lead.value}</p>
                    </td>
                    <td className="py-4 px-6 text-center relative">
                      <div className="relative">
                        <button
                          onClick={() => setShowActions(showActions === lead.id ? null : lead.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>

                        {showActions === lead.id && (
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  handleCall(lead)
                                  setShowActions(null)
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              >
                                <PhoneCall className="w-4 h-4" />
                                Call
                              </button>
                              <button
                                onClick={() => {
                                  handleEmail(lead)
                                  setShowActions(null)
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              >
                                <MessageSquare className="w-4 h-4" />
                                Email
                              </button>
                              <button
                                onClick={() => {
                                  handleEdit(lead)
                                  setShowActions(null)
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  handleDelete(lead)
                                  setShowActions(null)
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Lead Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Lead</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter lead name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert('Lead added successfully!')
                      setShowAddModal(false)
                    }}
                    className="flex-1 py-3 px-6 bg-blue-500 text-white rounded-2xl font-semibold hover:bg-blue-600 transition"
                  >
                    Add Lead
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
