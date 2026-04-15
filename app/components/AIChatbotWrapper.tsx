'use client'

import { usePathname } from 'next/navigation'
import AIChatbot from './AIChatbot'

export default function AIChatbotWrapper() {
  const pathname = usePathname()
  
  // Only show the chatbot on dashboard routes
  if (!pathname?.startsWith('/dashboard')) {
    return null
  }

  return <AIChatbot />
}
