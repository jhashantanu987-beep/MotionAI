'use client'

import React, { useState, useEffect } from 'react'
import { Bot, Send } from 'lucide-react'

export default function PhoneMockup() {
  const [resetKey, setResetKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setResetKey(prev => prev + 1)
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div key={resetKey} className="relative flex justify-center lg:justify-end scale-90 sm:scale-100 origin-center lg:origin-right phone-wrap">
      <div className="phone-frame w-full max-w-[340px] aspect-[9/18.5] overflow-hidden flex flex-col bg-white text-[#1a1a1a]">
        {/* Hardware Elements */}
        <div className="dynamic-island"></div>
        <div className="side-btn btn-power"></div>
        <div className="side-btn btn-volume-up"></div>
        <div className="side-btn btn-volume-down"></div>

        {/* Phone Header */}
        <div className="px-6 pt-16 pb-4 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2d5bff] flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-[#1a1a1a] text-[11px] font-black leading-tight uppercase tracking-tight">KLARA AI Engine</h4>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Active Now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-5 space-y-4 overflow-y-auto bg-slate-50 relative">
          {/* Step 1: User 1 */}
          <div className="flex flex-col items-end">
            <div className="typing-indicator bg-[#2d5bff] text-white p-2 px-3 rounded-full step-1-typing">
              <span></span><span></span><span></span>
            </div>
            <div className="bg-[#2d5bff] text-white text-[11px] font-bold p-3.5 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm step-1-msg">
              Hi, I’m interested in your service. How much does it cost?
            </div>
          </div>

          {/* Step 2: AI 1 */}
          <div className="flex flex-col items-start">
            <div className="typing-indicator bg-white border border-slate-200 text-slate-400 p-2 px-3 rounded-full step-2-typing">
              <span></span><span></span><span></span>
            </div>
            <div className="bg-white border border-slate-200 text-slate-800 text-[11px] font-medium p-3.5 rounded-2xl rounded-tl-none max-w-[85%] shadow-sm step-2-msg">
              Great question. It depends on your goals — are you looking for more leads or more booked appointments?
            </div>
          </div>

          {/* Step 3: User 2 */}
          <div className="flex flex-col items-end">
            <div className="typing-indicator bg-[#2d5bff] text-white p-2 px-3 rounded-full step-3-typing">
              <span></span><span></span><span></span>
            </div>
            <div className="bg-[#2d5bff] text-white text-[11px] font-bold p-3.5 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm step-3-msg">
              More booked appointments.
            </div>
          </div>

          {/* Step 4: AI 2 */}
          <div className="flex flex-col items-start">
            <div className="typing-indicator bg-white border border-slate-200 text-slate-400 p-2 px-3 rounded-full step-4-typing">
              <span></span><span></span><span></span>
            </div>
            <div className="bg-white border border-slate-200 text-slate-800 text-[11px] font-medium p-3.5 rounded-2xl rounded-tl-none max-w-[85%] shadow-sm step-4-msg">
              Perfect. I can get you booked in for a quick strategy call. Here are available times today.
            </div>
          </div>

          {/* Options Bubble */}
          <div className="grid grid-cols-2 gap-2 mt-2 w-full max-w-[85%] step-5-options">
            <div className="bg-white border border-[#2d5bff] p-2.5 rounded-xl text-center text-[10px] font-black text-[#2d5bff] hover:bg-[#2d5bff] hover:text-white transition-colors cursor-pointer">2:30 PM</div>
            <div className="bg-white border border-[#2d5bff] p-2.5 rounded-xl text-center text-[10px] font-black text-[#2d5bff] hover:bg-[#2d5bff] hover:text-white transition-colors cursor-pointer">4:15 PM</div>
          </div>
        </div>

        {/* Input Mockup */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="h-10 bg-slate-100 rounded-full flex items-center px-4 justify-between">
            <span className="text-[10px] text-slate-400 font-bold">Type your response...</span>
            <Send className="w-4 h-4 text-[#2d5bff]" />
          </div>
        </div>
      </div>
    </div>
  )
}
