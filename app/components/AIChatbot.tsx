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
  const [leadId, setLeadId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

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
        body: JSON.stringify({ message: trimmed, leadId })
      })
      const data = await response.json()
      
      // Update session leadId for memory
      if (data.leadId) setLeadId(data.leadId)

      const reply: Message = {
        id: Date.now() + 2,
        role: 'assistant',
        text: data.text || 'Connection optimized. Ready for input.',
        quickActions: data.quickActions
      }
      setMessages((prev) => [...prev, reply])
    } catch (error) {
      console.error(error)
      const reply: Message = {
        id: Date.now() + 3,
        role: 'assistant',
        text: 'Neural link intermittent. Retrying synchronization...',
        quickActions: ['Retry connection']
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
        body: JSON.stringify({ message: action, leadId })
      })
      const data = await response.json()
      
      if (data.leadId) setLeadId(data.leadId)

      const reply: Message = {
        id: Date.now() + 2,
        role: 'assistant',
        text: data.text || 'Connection optimized. Ready for input.',
        quickActions: data.quickActions
      }
      setMessages((prev) => [...prev, reply])
    } catch (error) {
      console.error(error)
      const reply: Message = {
        id: Date.now() + 3,
        role: 'assistant',
        text: 'Neural link intermittent. Retrying synchronization...',
        quickActions: ['Retry connection']
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
    <div className="fixed right-6 bottom-6 z-[150] flex flex-col items-end">
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
