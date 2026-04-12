'use client'

import React from 'react'

/**
 * Premium SaaS Card Component with Neon Glow Effects
 * 
 * Features:
 * - Futuristic dark UI with neon glows
 * - Radial gradient spotlight effect
 * - Multiple glow layers (outer + inner)
 * - Smooth hover animations with scale & lift
 * - Fully reusable sub-components
 * 
 * @example
 * <Card variant="featured">
 *   <Card.Spotlight />
 *   <Card.Icon icon={StarIcon} glow="green" />
 *   <Card.Title>Premium Feature</Card.Title>
 *   <Card.Description>Beautiful description here</Card.Description>
 * </Card>
 */

interface CardProps {
  children: React.ReactNode
  variant?: 'glass' | 'featured' | 'orange' | 'premium' | 'soft'
  className?: string
  href?: string
  onClick?: () => void
}

interface CardIconProps {
  icon: React.ComponentType<{ className?: string }>
  glow?: 'cyan' | 'green' | 'orange' | 'none'
  className?: string
}

interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

interface CardDescriptionProps {
  children: React.ReactNode
  className?: string
}

interface CardBadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning'
  className?: string
}

interface CardPriceProps {
  amount: string | number
  period?: string
  className?: string
}

interface CardFeaturesProps {
  items: string[]
  icon?: string
}

/* ===== MAIN CARD COMPONENT ===== */

export function Card({
  children,
  variant = 'glass',
  className = '',
  href,
  onClick
}: CardProps) {
  const baseClasses = {
    glass: 'glass-card',
    featured: 'glass-card-featured',
    orange: 'glass-card-orange',
    premium: 'premium-card',
    soft: 'soft-card'
  }

  const containerClass = `${baseClasses[variant]} p-6 sm:p-8 ${className}`

  const content = (
    <div className="group relative z-10 space-y-4 h-full flex flex-col">
      {children}
    </div>
  )

  if (href) {
    return (
      <a href={href} className={containerClass}>
        {content}
      </a>
    )
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${containerClass} w-full text-left hover:cursor-pointer`}
      >
        {content}
      </button>
    )
  }

  return <div className={containerClass}>{content}</div>
}

/* ===== SPOTLIGHT EFFECT (Inner gradient overlay) ===== */

export function CardSpotlight({
  color = 'cyan',
  className = ''
}: {
  color?: 'cyan' | 'green' | 'orange'
  className?: string
}) {
  const colorMap = {
    cyan: 'rgba(56, 189, 248, 0.2)',
    green: 'rgba(34, 197, 94, 0.2)',
    orange: 'rgba(249, 115, 22, 0.2)'
  }

  return (
    <div
      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle at 20% 20%, ${colorMap[color]} 0%, transparent 50%)`
      }}
    />
  )
}

/* ===== CARD SUBCOMPONENTS ===== */

export function CardIcon({
  icon: Icon,
  glow = 'cyan',
  className = ''
}: CardIconProps) {
  const glowColors = {
    cyan: {
      bg: 'bg-cyan-500/20',
      text: 'text-cyan-300',
      hover: 'group-hover:bg-cyan-500/40 group-hover:text-cyan-200',
      glow: 'group-hover:shadow-lg group-hover:shadow-cyan-500/50'
    },
    green: {
      bg: 'bg-emerald-500/20',
      text: 'text-emerald-300',
      hover: 'group-hover:bg-emerald-500/40 group-hover:text-emerald-200',
      glow: 'group-hover:shadow-lg group-hover:shadow-emerald-500/50'
    },
    orange: {
      bg: 'bg-orange-500/20',
      text: 'text-orange-300',
      hover: 'group-hover:bg-orange-500/40 group-hover:text-orange-200',
      glow: 'group-hover:shadow-lg group-hover:shadow-orange-500/50'
    },
    none: {
      bg: 'bg-white/10',
      text: 'text-white',
      hover: 'group-hover:bg-white/20',
      glow: ''
    }
  }

  const colors = glowColors[glow]

  return (
    <div
      className={`relative inline-flex h-14 w-14 items-center justify-center rounded-2xl 
        ${colors.bg} ${colors.text} transition-all duration-300 ${colors.hover} ${colors.glow} ${className}`}
    >
      {/* Inner glow layer */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.15] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon */}
      <div className="relative z-10">
        <Icon className="h-7 w-7" />
      </div>
    </div>
  )
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3
      className={`text-lg md:text-xl font-bold text-white group-hover:text-cyan-100 
        transition-colors duration-300 ${className}`}
    >
      {children}
    </h3>
  )
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p
      className={`text-sm md:text-base text-slate-300 leading-6 group-hover:text-slate-100 
        transition-colors duration-300 ${className}`}
    >
      {children}
    </p>
  )
}

export function CardBadge({
  children,
  variant = 'default',
  className = ''
}: CardBadgeProps) {
  const variantStyles = {
    default: 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300',
    success: 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300',
    warning: 'bg-orange-500/20 border-orange-400/40 text-orange-300'
  }

  return (
    <span
      className={`inline-block px-3 py-1.5 rounded-lg border 
        ${variantStyles[variant]} text-xs font-semibold uppercase tracking-wide ${className}`}
    >
      {children}
    </span>
  )
}

export function CardPrice({ amount, period, className = '' }: CardPriceProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          ${amount}
        </span>
        {period && <span className="text-slate-400 text-sm md:text-base">{period}</span>}
      </div>
    </div>
  )
}

export function CardFeatures({ items, icon = '✓' }: CardFeaturesProps) {
  return (
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex gap-3 text-sm text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
          <span className="text-emerald-400 font-bold flex-shrink-0 mt-0.5">{icon}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function CardDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`border-t border-white/[0.08] group-hover:border-white/[0.12] transition-colors duration-300 ${className}`} />
  )
}

export function CardButton({
  children,
  variant = 'primary',
  className = ''
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outlined'
  className?: string
}) {
  const variants = {
    primary:
      'w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5',
    secondary:
      'w-full px-6 py-3 rounded-lg bg-white/[0.05] hover:bg-white/[0.10] text-white font-semibold text-sm transition-all duration-300 border border-white/[0.10] hover:border-white/[0.20]',
    outlined:
      'w-full px-6 py-3 rounded-lg border border-cyan-400/40 text-cyan-300 font-semibold text-sm transition-all duration-300 hover:bg-cyan-500/[0.05] hover:border-cyan-400/60'
  }

  return (
    <button className={`${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

/* ===== STATS COMPONENT ===== */

export function CardStat({
  label,
  value,
  color = 'cyan'
}: {
  label: string
  value: string | number
  color?: 'cyan' | 'green' | 'orange' | 'white'
}) {
  const colorMap = {
    cyan: 'text-cyan-300',
    green: 'text-emerald-300',
    orange: 'text-orange-300',
    white: 'text-white'
  }

  return (
    <div className="space-y-1">
      <p className="text-xs text-slate-400 uppercase tracking-wide">{label}</p>
      <p className={`text-2xl font-bold ${colorMap[color]}`}>{value}</p>
    </div>
  )
}

/* ===== COMPLETE CARD EXAMPLE ===== */

/**
 * Example: Feature Card Component
 * 
 * export function FeatureCard() {
 *   return (
 *     <Card variant="glass">
 *       <Card.Spotlight color="cyan" />
 *       <Card.Icon icon={FeatureIcon} glow="cyan" />
 *       <Card.Title>Advanced Analytics</Card.Title>
 *       <Card.Description>
 *         Real-time insights into user behavior and system performance
 *       </Card.Description>
 *       <Card.Divider className="my-4" />
 *       <Card.Button variant="primary">Learn More</Card.Button>
 *     </Card>
 *   )
 * }
 * 
 * Example: Premium Pricing Card
 * 
 * export function PricingCard() {
 *   return (
 *     <Card variant="featured">
 *       <Card.Spotlight color="green" />
 *       <Card.Badge variant="success">Most Popular</Card.Badge>
 *       <Card.Title>Professional</Card.Title>
 *       <Card.Price amount={99} period="/month" />
 *       <Card.Description>Everything you need to grow</Card.Description>
 *       <Card.Button>Get Started</Card.Button>
 *       <Card.Divider className="my-6" />
 *       <Card.Features
 *         items={[
 *           'Unlimited projects',
 *           '24/7 support',
 *           'Advanced analytics'
 *         ]}
 *       />
 *     </Card>
 *   )
 * }
 */
