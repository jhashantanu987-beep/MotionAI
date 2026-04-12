'use client'

import { Star, Zap, Rocket, BarChart3, Shield, CheckCircle2 } from 'lucide-react'
import { 
  Card,
  CardSpotlight,
  CardIcon,
  CardTitle,
  CardDescription,
  CardButton,
  CardDivider
} from './Card'

/**
 * CARD COMPONENT SHOWCASE
 * 
 * This file demonstrates basic card examples.
 * See PREMIUM_CARDS_IMPLEMENTATION.md for full documentation.
 */

export function BasicFeatureCard() {
  return (
    <Card variant="glass">
      <CardSpotlight color="cyan" />
      <CardIcon icon={Zap} glow="cyan" />
      <CardTitle>Real-time Analytics</CardTitle>
      <CardDescription>
        Monitor performance metrics with real-time dashboards and instant alerts
      </CardDescription>
      <CardDivider className="my-4" />
      <CardButton variant="secondary">Learn More</CardButton>
    </Card>
  )
}

export default function CardShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <BasicFeatureCard />
    </div>
  )
}

/* ============================================
   (Remaining examples commented out - see PREMIUM_CARDS_IMPLEMENTATION.md)
   ============================================ */
