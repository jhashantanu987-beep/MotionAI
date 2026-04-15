'use client'

import React from 'react'
import { CheckCircle2, AlertCircle, MessageSquare, Timer, ArrowUpRight } from 'lucide-react'

export default function NotificationsPanel() {
  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: CheckCircle2,
      title: 'Auto-Booking Confirmed',
      desc: 'Lead "John Doe" just booked a consultation via WhatsApp.',
      time: '2m ago',
      color: 'text-green-400',
      bg: 'bg-green-400/10'
    },
    {
      id: 2,
      type: 'alert',
      icon: AlertCircle,
      title: 'Low Budget Warning',
      desc: 'Campaign "Dental Recall" is at 90% of daily spend.',
      time: '15m ago',
      color: 'text-orange-400',
      bg: 'bg-orange-400/10'
    },
    {
      id: 3,
      type: 'lead',
      icon: MessageSquare,
      title: 'New High-Intent Lead',
      desc: 'AI identified "Sarah Miller" as a 9.5/10 quality prospect.',
      time: '1h ago',
      color: 'text-[#3B82F6]',
      bg: 'bg-[#3B82F6]/10'
    },
    {
      id: 4,
      type: 'system',
      icon: Timer,
      title: 'AI Update Complete',
      desc: 'KLARA Engine v2.4 successfully deployed to your instance.',
      time: '3h ago',
      color: 'text-purple-400',
      bg: 'bg-purple-400/10'
    }
  ]

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">
          Recent Activity
        </h3>
        <button className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="group relative p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-pointer"
          >
            <div className="flex gap-4">
              <div className={`w-10 h-10 rounded-xl ${n.bg} ${n.color} flex items-center justify-center border border-white/5`}>
                <n.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white tracking-tight leading-none">
                    {n.title}
                  </h4>
                  <span className="text-[10px] font-medium text-gray-600 whitespace-nowrap">
                    {n.time}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  {n.desc}
                </p>
                
                <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-blue-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  View Detail <ArrowUpRight className="w-2.5 h-2.5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-6 text-center">
        <button className="text-sm font-bold text-gray-500 hover:text-white transition-colors">
          View all notifications
        </button>
      </div>
    </div>
  )
}
