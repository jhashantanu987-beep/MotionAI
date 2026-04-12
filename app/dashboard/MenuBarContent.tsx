'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import MenuBar from './workspace/MenuBar'

export default function MenuBarContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Determine active tab based on current route
  const activeTab = useMemo(() => {
    const view = searchParams.get('view')
    if (view) return view

    if (pathname?.includes('revenue-analytics')) return 'revenue'
    if (pathname?.includes('ai-ad-performance-engine')) return 'ads'
    if (pathname?.includes('ai-ugc-creative-engine')) return 'ugc'
    if (pathname?.includes('/workspace')) return 'workspace'
    if (pathname?.includes('/crm')) return 'crm'

    return 'home'
  }, [pathname, searchParams])

  return <MenuBar activeTab={activeTab} />
}
