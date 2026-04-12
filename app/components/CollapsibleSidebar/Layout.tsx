'use client'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return <div className="min-h-screen flex bg-slate-100 text-slate-900">{children}</div>
}
