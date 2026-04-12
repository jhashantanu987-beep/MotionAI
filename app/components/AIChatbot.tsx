'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles, TrendingUp, Users, DollarSign, Target } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

type Message = {
  id: number
  role: 'user' | 'assistant'
  text: string
  quickActions?: string[]
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'assistant',
    text: 'Hi! I\'m your AI assistant. Ask me about leads, revenue, or how to optimize your pipeline.',
    quickActions: ['Show my leads', 'Revenue stats', 'Optimize ads']
  }
]

const quickActions = [
  { label: 'Show my leads', icon: Users, action: 'leads' },
  { label: 'Revenue stats', icon: DollarSign, action: 'revenue' },
  { label: 'Optimize ads', icon: TrendingUp, action: 'optimize' },
  { label: 'Improve conversion', icon: Target, action: 'conversion' }
]

export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isSending, setIsSending] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const classifyIntent = (query: string) => {
    const lowerQuery = query.toLowerCase()

    // Business questions
    if (lowerQuery.includes('lead') || lowerQuery.includes('prospect')) return 'leads'
    if (lowerQuery.includes('revenue') || lowerQuery.includes('money') || lowerQuery.includes('sales')) return 'revenue'
    if (lowerQuery.includes('booking') || lowerQuery.includes('appointment') || lowerQuery.includes('call')) return 'bookings'
    if (lowerQuery.includes('conversion') || lowerQuery.includes('funnel')) return 'conversion'
    if (lowerQuery.includes('optimize') || lowerQuery.includes('improve') || lowerQuery.includes('ads')) return 'optimize'
    if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('pricing')) return 'pricing'
    if (lowerQuery.includes('help') || lowerQuery.includes('support') || lowerQuery.includes('how')) return 'help'

    // Unrelated questions
    if (lowerQuery.includes('ronaldo') || lowerQuery.includes('messi') ||
        lowerQuery.includes('football') || lowerQuery.includes('soccer') ||
        lowerQuery.includes('weather') || lowerQuery.includes('food') ||
        lowerQuery.includes('movie') || lowerQuery.includes('music')) return 'unrelated'

    return 'general'
  }

  const generateResponse = (query: string) => {
    const intent = classifyIntent(query)

    switch (intent) {
      case 'leads':
        return {
          text: `You have 1,542 leads this month (+18%). Top sources: Meta (45%), Google (32%), TikTok (23%). 23 are high-intent and ready for follow-up.`,
          quickActions: ['Show lead details', 'Create campaign', 'Export leads']
        }

      case 'revenue':
        return {
          text: `Revenue is strong and trending higher. Breakdown: Monthly retainer $30k, Performance $12.8k, Setup fees $2.5k.`,
          quickActions: ['Revenue breakdown', 'Growth forecast', 'Client profitability']
        }

      case 'bookings':
        return {
          text: `18 active clients, 3 services running. Next available slots: 10 AM, 11:30 AM, 2 PM. 5 follow-ups scheduled this week.`,
          quickActions: ['Book consultation', 'View calendar', 'Client pipeline']
        }

      case 'conversion':
        return {
          text: `67% lead-to-client conversion rate. Funnel: 2,450 visits → 1,542 leads → 184 qualified → 18 clients. Top drop-off at qualification stage.`,
          quickActions: ['Optimize funnel', 'Lead scoring', 'Follow-up automation']
        }

      case 'optimize':
        return {
          text: `Cost per lead: $12.50 (-8%). ROAS: 4.2x. AI recommends: Increase TikTok budget by 25%, optimize Meta targeting for enterprise accounts.`,
          quickActions: ['Run optimization', 'Ad performance', 'Budget allocation']
        }

      case 'pricing':
        return {
          text: `Plans start at $2,500 setup + $4,500/month. Custom enterprise options available. ROI typically 3-5x within 6 months.`,
          quickActions: ['View pricing', 'Calculate ROI', 'Start free trial']
        }

      case 'help':
        return {
          text: `I can help with: Lead management, Revenue tracking, Conversion optimization, Ad performance, Client onboarding, and System automation.`,
          quickActions: ['Dashboard tour', 'Setup guide', 'Contact support']
        }

      case 'unrelated':
        const casualResponses = [
          "Interesting question, but let's focus on your business. You have 1,542 leads waiting - want me to prioritize the high-intent ones?",
          "I can chat about anything, but I'm best at growing your revenue. Your conversion rate is at 67% - want to push it higher?",
          "That's outside my expertise, but I excel at lead generation. You have 23 hot leads ready to convert right now.",
          "Fun topic! But let's talk business - your MRR is up 28%. Want to see what's driving that growth?"
        ]
        return {
          text: casualResponses[Math.floor(Math.random() * casualResponses.length)],
          quickActions: ['Show leads', 'Revenue stats', 'Optimize pipeline']
        }

      default:
        return {
          text: `I'm here to help with your business growth. Ask about leads, revenue, conversions, or optimization.`,
          quickActions: ['Show my leads', 'Revenue stats', 'Optimize ads']
        }
    }
  }

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const userMessage: Message = {
      id: Date.now() + 1,
      role: 'user',
      text: trimmed
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsSending(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed })
      })
      const data = await response.json()
      const reply: Message = {
        id: Date.now() + 2,
        role: 'assistant',
        text: data.text || 'Sorry, I could not fetch a response.',
        quickActions: data.quickActions || ['Show metrics', 'Review funnel']
      }
      setMessages((prev) => [...prev, reply])
    } catch (error) {
      console.error(error)
      const fallback = generateResponse(trimmed)
      const reply: Message = {
        id: Date.now() + 3,
        role: 'assistant',
        text: fallback.text,
        quickActions: fallback.quickActions
      }
      setMessages((prev) => [...prev, reply])
    } finally {
      setIsSending(false)
    }
  }

  const handleQuickAction = async (action: string) => {
    const actionMessage: Message = {
      id: Date.now() + 1,
      role: 'user',
      text: action
    }

    setMessages((prev) => [...prev, actionMessage])
    setIsSending(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: action })
      })
      const data = await response.json()
      const reply: Message = {
        id: Date.now() + 2,
        role: 'assistant',
        text: data.text || 'Sorry, I could not fetch a response.',
        quickActions: data.quickActions || ['Show metrics', 'Review funnel']
      }
      setMessages((prev) => [...prev, reply])
    } catch (error) {
      console.error(error)
      const fallback = generateResponse(action)
      const reply: Message = {
        id: Date.now() + 3,
        role: 'assistant',
        text: fallback.text,
        quickActions: fallback.quickActions
      }
      setMessages((prev) => [...prev, reply])
    } finally {
      setIsSending(false)
    }
  }

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.scrollTop = containerRef.current.scrollHeight
  }, [messages])

  const unreadCount = useMemo(() => messages.filter((msg) => msg.role === 'assistant').length, [messages])

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="mb-4 w-[380px] max-w-full rounded-3xl border border-slate-700/60 bg-slate-950/95 backdrop-blur-2xl shadow-[0_35px_90px_rgba(15,23,42,0.45)]"
          >
            <div className="flex items-center justify-between gap-3 rounded-t-3xl bg-slate-900/90 px-4 py-4 border-b border-slate-700/70">
              <div>
                <p className="text-sm font-semibold text-white">AI Assistant</p>
                <p className="text-xs text-slate-400">Business-focused, always ready</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={containerRef} className="max-h-96 space-y-3 overflow-y-auto px-4 py-4 chat-scrollbar">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`${message.role === 'user' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-100'} max-w-[84%] rounded-3xl px-4 py-3 shadow-xl shadow-slate-950/20`}>
                    <p className="text-sm leading-6">{message.text}</p>

                    {message.quickActions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.quickActions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickAction(action)}
                            className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300 hover:bg-slate-700 hover:text-white transition"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-slate-700/70 px-4 py-3 bg-slate-900/90 rounded-b-3xl">
              <div className="flex items-center gap-3">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => { if (event.key === 'Enter') handleSend() }}
                  placeholder="Ask about leads, revenue, or optimization"
                  className="w-full rounded-2xl border border-slate-700/70 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                />
                <button
                  onClick={handleSend}
                  disabled={isSending}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20 hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  {isSending ? (
                    <span className="text-xs uppercase tracking-[0.2em]">...</span>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {quickActions.map((action, idx) => {
                  const Icon = action.icon
                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuickAction(action.label)}
                      className="inline-flex items-center gap-1 rounded-full bg-slate-800/50 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 hover:text-white transition"
                    >
                      <Icon className="h-3 w-3" />
                      {action.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((value) => !value)}
        className="group inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-2xl shadow-cyan-500/30 transition hover:scale-105"
        aria-label="Open AI chat"
      >
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-slate-950/90">
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-400 text-[10px] font-semibold text-slate-950">{unreadCount}</span>
        </div>
      </button>
    </div>
  )
}
