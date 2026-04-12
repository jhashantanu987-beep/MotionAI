'use client'

import { forwardRef, type ComponentType, useState } from "react"
import { motion } from "framer-motion"

// Generate random color
const randomColor = () => {
  const colors = [
    "#0099FF", "#FF0099", "#00FF99", "#FF9900", "#9900FF",
    "#00FFFF", "#FFFF00", "#FF0000", "#00FF00", "#0000FF"
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export function withRotate(Component: ComponentType<any>) {
  return forwardRef((props: any, ref: any) => {
    return (
      <motion.div
        animate={{ rotate: 90 }}
        transition={{ duration: 2 }}
      >
        <Component {...props} ref={ref} />
      </motion.div>
    )
  })
}

export function withHover(Component: ComponentType<any>) {
  return forwardRef((props: any, ref: any) => {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
      >
        <Component {...props} ref={ref} />
      </motion.div>
    )
  })
}

export function withRandomColor(Component: ComponentType<any>) {
  return forwardRef((props: any, ref: any) => {
    const [backgroundColor, setBackgroundColor] = useState("#0099FF")

    return (
      <motion.div
        animate={{
          backgroundColor: backgroundColor,
        }}
        transition={{ duration: 0.3 }}
        onClick={() => {
          setBackgroundColor(randomColor())
        }}
        style={{ cursor: 'pointer' }}
      >
        <Component {...props} ref={ref} />
      </motion.div>
    )
  })
}

// Export standalone motion components for direct use
export const MotionDiv = motion.div
export const MotionButton = motion.button
export const MotionSpan = motion.span
