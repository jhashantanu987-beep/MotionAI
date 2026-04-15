'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bot, User, Shield, Zap, Send } from 'lucide-react'
import { API_CONFIG } from '@/app/config/api'

interface Message {
  role: 'ai' | 'user' | 'system'
  content: string
  timestamp: string | Date
}

interface AIConversationPanelProps {
  isOpen: boolean
  onClose: () => void
  leadId: string
  leadName: string
  conversation: Message[]
  conversionScore: number
  analysisReason?: string
}

export default function AIConversationPanel({ isOpen, onClose, leadId, leadName, conversation: initialConversation, conversionScore, analysisReason }: AIConversationPanelProps) {
  const [conversation, setConversation] = useState<Message[]>(initialConversation)
  const [inputText, setInputText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [showIntelligence, setShowIntelligence] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setConversation(initialConversation)
  }, [initialConversation, isOpen])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [conversation])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim() || isSending) return

    const newMsg: Message = { role: 'user', content: inputText, timestamp: new Date() }
    setConversation(prev => [...prev, newMsg])
    setInputText('')
    setIsSending(true)

    try {
      const res = await fetch(`${API_CONFIG.baseUrl}/leads/${leadId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMsg.content })
      })
      const data = await res.json()
      if (data.success && data.data.conversation) {
        setConversation(data.data.conversation)
      }
    } catch (err) {
      console.error('Failed to send text to AI', err)
    } finally {
      setIsSending(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-[#0c0c14]/95 backdrop-blur-2xl border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-[110] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Bot className="w-6 h-6 text-[#0077F5]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">{leadName}</h3>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">AI Agent Active</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="px-4 py-2 hover:bg-red-500/20 bg-white/5 border border-white/10 rounded-xl transition-all flex items-center gap-2 group"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
            <span className="text-xs font-bold text-gray-400 group-hover:text-red-400 uppercase tracking-widest transition-colors">Hide Chat</span>
          </button>
        </div>

        {/* Lead Intelligence Card */}
        <div className="p-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-b border-white/5">
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">AI Intelligence</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-2 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                      <Zap className="w-3 h-3 text-[#0077F5]" />
                      <span className="text-[10px] font-bold text-[#0077F5]">Gemini Pro Engine</span>
                  </div>
                  <button 
                    onClick={() => setShowIntelligence(!showIntelligence)}
                    className="text-[10px] font-black uppercase tracking-widest text-[#0077F5] bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/10 px-2.5 py-1 rounded-md transition-all shadow-[0_0_15px_rgba(0,119,245,0.05)]"
                  >
                    {showIntelligence ? 'Minimize' : 'Show Details'}
                  </button>
                </div>
            </div>
            
            <AnimatePresence>
              {showIntelligence && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-6 pt-2">
                      <div>
                          <div className="text-3xl font-black text-white">{conversionScore}%</div>
                          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Conversion probability</div>
                      </div>
                      <div className="h-10 w-px bg-white/10"></div>
                      <div className="flex-1">
                          <div className="text-sm font-bold text-green-400 line-clamp-2 leading-snug mb-1">
                            {analysisReason || 'Legacy lead. No AI intent data available.'}
                          </div>
                          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">AI Determination Reason</div>
                      </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {conversation.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 mt-12">
              <Shield className="w-12 h-12 mb-4" />
              <p className="text-sm font-medium">Awaiting Activity</p>
              <p className="text-xs mt-2 w-64 mx-auto leading-relaxed">No AI conversation history exists for this lead. System is monitoring for future messages.</p>
            </div>
          ) : (
            conversation.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'ai' ? 'items-start' : 'items-end'}`}>
                <div className={`flex items-center gap-2 mb-2 ${msg.role === 'ai' ? 'flex-row' : 'flex-row-reverse'}`}>
                    {msg.role === 'ai' ? (
                        <div className="w-6 h-6 rounded-md bg-[#0077F5]/20 flex items-center justify-center border border-[#0077F5]/30">
                            <Bot className="w-3 h-3 text-[#0077F5]" />
                        </div>
                    ) : (
                        <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center border border-white/10">
                            <User className="w-3 h-3 text-white/60" />
                        </div>
                    )}
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                        {msg.role === 'ai' ? 'Klara AI' : 'Lead'}
                    </span>
                </div>
                <div 
                  className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed font-medium ${
                    msg.role === 'ai' 
                      ? 'bg-white/5 border border-white/10 text-white rounded-tl-none' 
                      : 'bg-[#0077F5] text-white rounded-tr-none shadow-lg shadow-blue-500/20'
                  }`}
                >
                  {msg.content}
                </div>
                <div className="mt-1 text-[8px] font-bold text-white/10 uppercase tracking-widest">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))
          )}
          {isSending && (
            <div className="flex flex-col items-start">
               <div className="flex items-center gap-2 mb-2">
                 <div className="w-6 h-6 rounded-md bg-[#0077F5]/20 flex items-center justify-center border border-[#0077F5]/30">
                     <Bot className="w-3 h-3 text-[#0077F5]" />
                 </div>
                 <span className="text-[10px] font-bold text-[#0077F5] uppercase tracking-widest animate-pulse">
                     Klara AI is typing...
                 </span>
               </div>
               <div className="w-16 p-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-none flex items-center justify-center gap-1">
                 <span className="w-1.5 h-1.5 border border-white/30 rounded-full animate-bounce"></span>
                 <span className="w-1.5 h-1.5 border border-white/30 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                 <span className="w-1.5 h-1.5 border border-white/30 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
               </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white/[0.02] border-t border-white/5 flex gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Simulate a reply from the lead..."
              className="flex-1 bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#0077F5] transition-colors"
              disabled={isSending}
            />
            <button 
              type="submit" 
              disabled={isSending || !inputText.trim()}
              className="bg-[#0077F5] hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl px-4 flex items-center justify-center transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
        </form>

      </motion.div>
    </AnimatePresence>
  )
}
