import type { Metadata } from 'next'
import './globals.css'
import AIChatbot from './components/AIChatbot'
import { LeadsProvider } from './contexts/LeadsContext'
import { ToastProvider } from './contexts/ToastContext'
import ToastContainer from './components/ToastContainer'
import QueryProvider from './components/QueryProvider'

export const metadata: Metadata = {
  title: 'Klara AI',
  description: 'A premium AI lead generation and CRM SaaS dashboard',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <ToastProvider>
            <LeadsProvider>
              <div className="min-h-screen bg-slate-950 text-slate-100">
                {children}
                <AIChatbot />
                <ToastContainer />
              </div>
            </LeadsProvider>
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
