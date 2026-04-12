'use client'

import { Mail, Phone, MapPin, Star, MoreVertical } from 'lucide-react'

export default function ClientsPage() {
  const clients = [
    {
      id: 1,
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      status: 'Active',
      revenue: '$45,200',
      rating: 4.8,
      avatar: 'AC',
      color: 'bg-blue-500',
      industry: 'Technology',
    },
    {
      id: 2,
      name: 'Global Solutions Inc',
      email: 'info@globalsolutions.com',
      phone: '+1 (555) 234-5678',
      location: 'New York, NY',
      status: 'Active',
      revenue: '$38,900',
      rating: 4.6,
      avatar: 'GS',
      color: 'bg-purple-500',
      industry: 'Consulting',
    },
    {
      id: 3,
      name: 'Innovation Labs',
      email: 'hello@innovationlabs.io',
      phone: '+1 (555) 345-6789',
      location: 'Austin, TX',
      status: 'Active',
      revenue: '$52,300',
      rating: 4.9,
      avatar: 'IL',
      color: 'bg-green-500',
      industry: 'R&D',
    },
    {
      id: 4,
      name: 'Digital Ventures',
      email: 'support@digitalventures.io',
      phone: '+1 (555) 456-7890',
      location: 'Seattle, WA',
      status: 'Pending',
      revenue: '$28,500',
      rating: 4.4,
      avatar: 'DV',
      color: 'bg-orange-500',
      industry: 'Startups',
    },
    {
      id: 5,
      name: 'Enterprise Systems',
      email: 'enterprise@systems.com',
      phone: '+1 (555) 567-8901',
      location: 'Chicago, IL',
      status: 'Active',
      revenue: '$61,800',
      rating: 4.7,
      avatar: 'ES',
      color: 'bg-red-500',
      industry: 'Enterprise',
    },
    {
      id: 6,
      name: 'Creative Agency Co',
      email: 'team@creativeagency.com',
      phone: '+1 (555) 678-9012',
      location: 'Los Angeles, CA',
      status: 'Active',
      revenue: '$34,200',
      rating: 4.5,
      avatar: 'CA',
      color: 'bg-pink-500',
      industry: 'Design/Marketing',
    },
  ]

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a]">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#39ff14] mb-2">Clients</h1>
            <p className="text-gray-600">Manage and track all your client accounts</p>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
            + Add Client
          </button>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div key={client.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`${client.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold`}>
                    {client.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-500">{client.industry}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  client.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {client.status}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${client.email}`} className="hover:text-blue-600 truncate">
                    {client.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${client.phone}`} className="hover:text-blue-600">
                    {client.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {client.location}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Revenue</p>
                  <p className="text-xl font-bold text-gray-900">{client.revenue}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Rating</p>
                  <p className="text-lg font-bold text-gray-900 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {client.rating}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
