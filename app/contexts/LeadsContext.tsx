'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { leadsData as initialLeadsData } from '../data/business-mock'
import { useToast } from './ToastContext'

export type Lead = {
  id: number
  name: string
  company: string
  email: string
  score: number
  status: 'hot' | 'warm' | 'cold' | 'contacted'
  lastActive: number
}

type LeadsContextType = {
  leads: Lead[]
  updateLead: (id: number, updates: Partial<Lead>) => void
  sendFollowUp: () => Promise<void>
  inactiveLeadsCount: number
  isSendingFollowUp: boolean
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined)

export function LeadsProvider({ children }: { children: ReactNode }) {
  const { addToast } = useToast()
  const [leads, setLeads] = useState<Lead[]>(initialLeadsData as Lead[])
  const [isSendingFollowUp, setIsSendingFollowUp] = useState(false)

  const updateLead = (id: number, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(lead =>
      lead.id === id ? { ...lead, ...updates } : lead
    ))
  }

  const sendFollowUp = async () => {
    setIsSendingFollowUp(true)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Update inactive leads (lastActive > 3 days)
    const inactiveLeads = leads.filter(lead => lead.lastActive > 3)

    inactiveLeads.forEach(lead => {
      updateLead(lead.id, { status: 'contacted', lastActive: 0 })
    })

    // Show success toast
    addToast(`Follow-up sent to ${inactiveLeads.length} lead${inactiveLeads.length === 1 ? '' : 's'}`, 'success')

    setIsSendingFollowUp(false)
  }

  const inactiveLeadsCount = leads.filter(lead => lead.lastActive > 3).length

  return (
    <LeadsContext.Provider value={{
      leads,
      updateLead,
      sendFollowUp,
      inactiveLeadsCount,
      isSendingFollowUp
    }}>
      {children}
    </LeadsContext.Provider>
  )
}

export function useLeads() {
  const context = useContext(LeadsContext)
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadsProvider')
  }
  return context
}