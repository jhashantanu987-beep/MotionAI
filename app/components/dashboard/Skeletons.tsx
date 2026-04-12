'use client'

import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string
  width?: string
  height?: string
}

export function Skeleton({ className = '', width = 'w-full', height = 'h-4' }: SkeletonProps) {
  return (
    <motion.div
      className={`bg-gradient-to-r from-gray-700/50 via-gray-600/50 to-gray-700/50 rounded ${width} ${height} ${className}`}
      animate={{
        background: [
          'linear-gradient(90deg, rgba(55,65,81,0.5) 0%, rgba(75,85,99,0.5) 50%, rgba(55,65,81,0.5) 100%)',
          'linear-gradient(90deg, rgba(75,85,99,0.5) 0%, rgba(55,65,81,0.5) 50%, rgba(75,85,99,0.5) 100%)',
          'linear-gradient(90deg, rgba(55,65,81,0.5) 0%, rgba(75,85,99,0.5) 50%, rgba(55,65,81,0.5) 100%)'
        ]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  )
}

export function MetricCardSkeleton() {
  return (
    <div className="premium-card p-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton width="w-12" height="h-12" className="rounded-2xl" />
        <Skeleton width="w-5" height="h-5" />
      </div>
      <Skeleton width="w-24" height="h-8" className="mb-1" />
      <Skeleton width="w-32" height="h-4" className="mb-2" />
      <Skeleton width="w-20" height="h-4" />
    </div>
  )
}

export function ActivityFeedSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-4 p-4 rounded-xl border border-slate-700/40 bg-slate-900/50"
        >
          <Skeleton width="w-10" height="h-10" className="rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton width="w-3/4" height="h-4" />
            <Skeleton width="w-1/2" height="h-3" />
          </div>
          <Skeleton width="w-16" height="h-6" className="rounded-full" />
        </motion.div>
      ))}
    </div>
  )
}

export function FunnelSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton width="w-24" height="h-4" />
            <div className="flex gap-2">
              <Skeleton width="w-12" height="h-6" />
              <Skeleton width="w-8" height="h-4" />
            </div>
          </div>
          <Skeleton width="w-full" height="h-12" className="rounded-2xl" />
        </div>
      ))}
    </div>
  )
}