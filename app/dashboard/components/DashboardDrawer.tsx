'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface DashboardDrawerProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function DashboardDrawer({ isOpen, onClose, title, children }: DashboardDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#050505] border-l border-white/5 shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
              <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/5 transition-colors text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {children}
            </div>
            
            {/* Footer shadow fade */}
            <div className="h-6 w-full bg-gradient-to-t from-[#050505] to-transparent pointer-events-none sticky bottom-0" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
