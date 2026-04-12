'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Send, X } from 'lucide-react'

interface ChatMessage {
  id: number
  role: 'assistant' | 'user'
  text: string
}

const cannedResponses = [
  'I recommend confirming your hottest leads now and launching the follow-up automation.',
  'Your chatbot captures intent and books qualified prospects in under 5 seconds.',
  'Revenue growth is strongest when you keep conversations centralized in one dashboard.',
  'AI detected 12 new high-intent leads in the last 30 minutes. Should I prioritize them?',
  'The conversion funnel improved by 18% after the last optimization cycle.',
  'Pipeline value is now at $156k with 89 active opportunities.'
]

const initialMessages: ChatMessage[] = [
  { id: 1, role: 'assistant', text: 'Welcome to Klara AI — ready to optimize your lead flow?' },
  { id: 2, role: 'user', text: 'Yes, show me how to improve booking performance.' }
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [responseIndex, setResponseIndex] = useState(0)
  const [typing, setTyping] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing, isThinking])

  const lastResponse = cannedResponses[responseIndex % cannedResponses.length]

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = { id: Date.now(), role: 'user', text: input.trim() }
    setMessages((current) => [...current, userMessage])
    setInput('')
    setTyping(false)
    setIsThinking(true)

    setTimeout(() => {
      setIsThinking(false)
      setTyping(true)

      const typingDelay = Math.min(2000, lastResponse.length * 30)

      setTimeout(() => {
        setMessages((current: ChatMessage[]) => [
          ...current,
          { id: Date.now() + 1, role: 'assistant', text: lastResponse }
        ])
        setResponseIndex((value) => value + 1)
        setTyping(false)
      }, typingDelay)
    }, 800 + Math.random() * 1200)
  }

  const canSend = input.trim().length > 0

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="glass-panel w-[340px] border border-white/10 bg-slate-950/95 p-4 shadow-glow"
          >
            <div className="flex items-center justify-between pb-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">AI Chat</p>
                <p className="text-sm text-slate-300">Instant, intelligent lead guidance.</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-slate-700/80 p-2 text-slate-300 transition hover:border-white/20 hover:bg-slate-900/80"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex max-h-[320px] flex-col gap-3 overflow-y-auto pb-3 pr-1">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: message.role === 'assistant' ? 10 : -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className={`rounded-3xl px-4 py-3 text-sm shadow-sm ${
                      message.role === 'assistant'
                        ? 'bg-slate-900 text-slate-200 self-start'
                        : 'bg-cyan-500/15 text-cyan-100 self-end'
                    }`}
                  >
                    {message.text}
                  </motion.div>
                ))}
              </AnimatePresence>
              <AnimatePresence>
                {isThinking ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 rounded-3xl bg-slate-900/90 px-4 py-3 text-sm text-slate-300"
                  >
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: '0ms' }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: '150ms' }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span>AI is analyzing your pipeline data...</span>
                  </motion.div>
                ) : typing ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 rounded-3xl bg-slate-900/90 px-4 py-3 text-sm text-slate-300"
                  >
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                      <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" style={{ animationDelay: '0.2s' }} />
                      <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" style={{ animationDelay: '0.4s' }} />
                    </div>
                    <span>Klara is typing...</span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && handleSend()}
                placeholder="Ask about lead growth..."
                className="w-full rounded-3xl border border-slate-800/80 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400/70 focus:ring-1 focus:ring-cyan-400/30"
              />
              <button
                onClick={handleSend}
                disabled={!canSend}
                className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500 text-slate-950 transition disabled:cursor-not-allowed disabled:bg-slate-700"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <button
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-3 rounded-full bg-slate-900/95 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-slate-800"
      >
        <MessageCircle className="h-4 w-4 text-cyan-300" />
        {open ? 'Close chat' : 'Ask Klara'}
      </button>
    </div>
  )
}
