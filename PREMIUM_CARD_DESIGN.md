# Premium SaaS Card Components - Advanced Design Guide

**Updated:** April 11, 2026  
**Style:** Futuristic Dark UI with Neon Glow Effects  
**Reference:** Framer, Linear, Modern AI Tools

---

## Overview

Your card components have been completely redesigned with **premium neon glow effects**, **spotlight lighting**, and **futuristic dark UI** styling. The new design features multiple glow layers, inner gradient overlays, and smooth hover animations that create a visually rich, high-end SaaS look.

---

## Card Variants

### 1. **`.glass-card`** — Standard Premium Card

**Purpose:** Default choice for most card content  
**Visual Style:** Subtle cyan glow, clean dark background  

**Features:**
- ✨ Dark gradient background (near black)
- 💫 Subtle inner gradient overlay
- 🌟 Soft cyan glow (40px radius outer, 80px subtle inner)
- 🎯 Thin border with hover enhancement
- 🎬 Smooth hover: `-6px lift + 1.03 scale`
- 📦 24px rounded corners
- ⏱️ 0.3s transitions

**CSS Details:**
```css
/* Base glow - subtle cyan */
box-shadow:
  0 0 40px rgba(56, 189, 248, 0.08),    /* Outer glow */
  0 0 80px rgba(56, 189, 248, 0.04),    /* Diffused ambient */
  inset 0 0 30px rgba(255, 255, 255, 0.05),  /* Inner rim */
  inset 0 1px 0 rgba(255, 255, 255, 0.1);    /* Top edge light */

/* On hover - enhanced glow */
0 0 60px rgba(56, 189, 248, 0.2),
0 0 120px rgba(56, 189, 248, 0.1),
inset 0 0 40px rgba(255, 255, 255, 0.1),
inset 0 1px 0 rgba(255, 255, 255, 0.15);
```

**Usage:**
```tsx
<Card variant="glass">
  <Card.Spotlight color="cyan" />
  <Card.Icon icon={FeatureIcon} glow="cyan" />
  <Card.Title>Advanced Analytics</Card.Title>
  <Card.Description>Real-time insights</Card.Description>
</Card>
```

---

### 2. **`.glass-card-featured`** — Featured with Green Neon Glow

**Purpose:** Highlight featured items, "Most Popular" cards, premium options

**Visual Style:** Strong emerald/green neon glow with radial gradient overlay

**Features:**
- 🟢 Strong green neon glow (emerald highlight)
- ☀️ Radial gradient overlay at top-left (spotlight effect)
- 🌈 Layered gradient backgrounds for depth
- 🎯 Enhanced border color on hover
- 🎬 Hover: `-6px lift + 1.04 scale` (stronger lift)
- 💥 Intense glow on hover

**CSS Details:**
```css
/* Radial spotlight for depth */
radial-gradient(circle at 30% 0%, rgba(34, 197, 94, 0.15) 0%, transparent 50%),

/* Green glow - prominent */
box-shadow:
  0 0 60px rgba(34, 197, 94, 0.25),    /* Strong outer glow */
  0 0 100px rgba(34, 197, 94, 0.15),   /* Diffused bloom */
  inset 0 0 40px rgba(34, 197, 94, 0.08),
  inset 0 1px 0 rgba(255, 255, 255, 0.1);

/* On hover - much stronger */
0 0 80px rgba(34, 197, 94, 0.35),
0 0 140px rgba(34, 197, 94, 0.2),
inset 0 0 50px rgba(34, 197, 94, 0.12),
inset 0 1px 0 rgba(255, 255, 255, 0.15);
```

**Usage:**
```tsx
<Card variant="featured">
  <Card.Spotlight color="green" />
  <Card.Badge variant="success">Most Popular</Card.Badge>
  <Card.Icon icon={CrownIcon} glow="green" />
  <Card.Title>Premium Plan</Card.Title>
  <Card.Price amount={99} period="/month" />
  <Card.Button>Get Started</Card.Button>
</Card>
```

---

### 3. **`.glass-card-orange`** — Warm Orange Accent Glow

**Purpose:** Promotional cards, alternative CTAs, warning/alert cards

**Visual Style:** Warm orange neon glow with subtle radial overlay

**Features:**
- 🟠 Warm orange neon glow
- ☀️ Balanced radial gradient overlay
- 🎬 Hover: `-6px lift + 1.04 scale`
- 💥 Orange bloom effect on hover

**Usage:**
```tsx
<Card variant="orange">
  <Card.Spotlight color="orange" />
  <Card.Icon icon={RocketIcon} glow="orange" />
  <Card.Title>Limited Offer</Card.Title>
  <Card.Description>Special pricing available</Card.Description>
</Card>
```

---

### 4. **`.premium-card`** — Ultra-Luxury Showcase Card

**Purpose:** Hero sections, flagship features, premium pricing cards

**Visual Style:** Maximum glow intensity with layered radial gradients

**Features:**
- ✨ Multiple radial gradients for depth
- 🌟 Cyan spotlight at top-left
- 💎 Ultra premium appearance
- 🎬 Hover: `-6px lift + 1.04 scale`
- 📦 28px rounded corners (larger)
- 💫 Strongest glow effect

**CSS Details:**
```css
/* Multiple layered gradients */
radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.1) 0%, transparent 40%),
radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 30%),

/* Premium glow - strongest */
box-shadow:
  0 0 80px rgba(56, 189, 248, 0.15),
  0 0 120px rgba(56, 189, 248, 0.08),
  inset 0 0 60px rgba(255, 255, 255, 0.08),
  inset 0 1px 0 rgba(255, 255, 255, 0.12);
```

**Usage:**
```tsx
<Card variant="premium">
  <Card.Spotlight color="cyan" />
  <Card.Title>Enterprise Solutions</Card.Title>
  <Card.Description>Unlimited scale & power</Card.Description>
</Card>
```

---

### 5. **`.soft-card`** — Minimal Subtle Card

**Purpose:** Supporting content, secondary info, less prominent areas

**Visual Style:** Minimal glow, subdued appearance

**Features:**
- 🌙 Subtle glow (minimal intensity)
- 📦 20px rounded corners
- 🎬 Hover: `-6px lift + 1.02 scale`
- 🔇 Quiet appearance

**Usage:**
```tsx
<Card variant="soft">
  <Card.Icon icon={InfoIcon} glow="none" />
  <Card.Title>Additional Info</Card.Title>
</Card>
```

---

## Icon Component with Glow

### Enhanced Icon Styling

The new `CardIcon` component includes **gradient background + neon glow**:

```tsx
<Card.Icon icon={FeatureIcon} glow="green" />
```

**Glow Options:**
- `"cyan"` - Blue-cyan glow (default)
- `"green"` - Emerald neon glow
- `"orange"` - Warm orange glow
- `"none"` - No glow (subtle)

**Icon Features:**
- 📦 14x14px container (larger than before)
- 🎯 Rounded-2xl (squared circle)
- 💫 Inner gradient overlay on hover
- 🎬 Smooth color transitions
- 🌟 Shadow glow that follows icon color

**CSS for Icon Glow:**
```css
/* Example: Green icon glow */
background-color: rgba(34, 197, 94, 0.2);
color: rgb(34, 197, 94, 0.3);

/* On hover */
background-color: rgba(34, 197, 94, 0.4);
color: rgb(34, 197, 94, 0.2);
box-shadow: 0 0 ... rgba(34, 197, 94, 0.5);
```

---

## Spotlight Effect (Inner Gradient Overlay)

### `Card.Spotlight` - Radial Gradient Light

Creates a **lighting effect** inside the card (like a spotlight from top-left):

```tsx
<Card variant="featured">
  <Card.Spotlight color="green" />
  {/* Rest of content */}
</Card>
```

**How It Works:**
- Positioned absolutely at `inset-0` (fills card)
- Uses radial-gradient centered at `20% 20%` (top-left)
- Opacity `0` by default, transitions to `100` on hover
- Blends with card background for lighting effect

**Color Options:**
```css
cyan:   radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.2) 0%, transparent 50%)
green:  radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)
orange: radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.2) 0%, transparent 50%)
```

---

## Typography Hierarchy

Enhanced typography with better visual hierarchy:

### Title
```tsx
<Card.Title>Your Heading</Card.Title>
```
- Size: `text-lg md:text-xl` (responsive)
- Weight: `font-bold`
- Color: `text-white` (hover: `text-cyan-100`)
- Smooth color transition on hover

### Description
```tsx
<Card.Description>Your description text</Card.Description>
```
- Size: `text-sm md:text-base` (responsive)
- Weight: Normal
- Color: `text-slate-300` (hover: `text-slate-100`)
- Leading: `leading-6` (good line spacing)

### Badge
```tsx
<Card.Badge variant="success">Most Popular</Card.Badge>
```
- **Variants:**
  - `"default"` — Cyan badge
  - `"success"` — Green badge (for featured)
  - `"warning"` — Orange badge (for alerts)
- Size: `text-xs`
- Style: `uppercase tracking-wide`
- Padded: `px-3 py-1.5`

### Price (Gradient)
```tsx
<Card.Price amount={99} period="/month" />
```
- Amount: Gradient text (`from-cyan-400 to-blue-400`)
- Size: `text-4xl md:text-5xl`
- Normal text remains slate-400

---

## Button Styles

Three button variants included:

```tsx
// Primary (CTA)
<Card.Button variant="primary">Get Started</Card.Button>

// Secondary (Alternative)
<Card.Button variant="secondary">Learn More</Card.Button>

// Outlined (Subtle)
<Card.Button variant="outlined">Explore</Card.Button>
```

### Primary Button
- Cyan-to-blue gradient
- Strong shadow glow
- Hover: Enhanced shadow + slight lift

### Secondary Button
- Subtle glass effect
- Light background
- Hover: Slightly darker background + border

### Outlined Button
- Border-based style
- Cyan color
- Hover: Subtle background + enhanced border

---

## Features List

```tsx
<Card.Features
  items={[
    'Unlimited projects',
    '24/7 support',
    'Advanced analytics'
  ]}
  icon="✓"
/>
```

**Styling:**
- Icon: Emerald green color (`text-emerald-400`)
- Text: Slate-300 base, lighter on hover
- Spacing: `space-y-3`
- Smooth color transitions

---

## Badge Variants

```tsx
// Default (Cyan)
<Card.Badge>New Feature</Card.Badge>

// Success (Green)
<Card.Badge variant="success">Most Popular</Card.Badge>

// Warning (Orange)
<Card.Badge variant="warning">Limited Time</Card.Badge>
```

---

## Stats Component

```tsx
<Card.Stat label="Monthly Revenue" value="$45,200" color="green" />
```

**Color Options:**
- `"cyan"` — Cyan text
- `"green"` — Emerald text
- `"orange"` — Orange text
- `"white"` — White text

---

## Hover Animation Timings

All cards use smooth `0.3s` transitions with `ease-out` timing:

```css
transition: all 0.3s ease-out;
```

**Hover Effects:**
| Card Type | Lift | Scale | Glow Intensity |
|-----------|------|-------|-----------------|
| glass-card | -6px | 1.03 | Doubles |
| featured | -6px | 1.04 | 2.4x intensity |
| orange | -6px | 1.04 | 2.5x intensity |
| premium | -6px | 1.04 | 2x intensity |
| soft | -6px | 1.02 | 1.5x intensity |

---

## Color Palette Reference

```css
/* Backgrounds */
Near Black: rgb(15, 23, 42) - rgb(10, 15, 25)
Borders: rgba(255, 255, 255, 0.08) - rgba(255, 255, 255, 0.15)

/* Glows */
Cyan:   rgb(56, 189, 248)
Green:  rgb(34, 197, 94)  
Orange: rgb(249, 115, 22)

/* Text */
Primary: rgb(229, 231, 235) - #e5e7eb
Secondary: rgb(148, 163, 184) - #94a3b8
Muted: rgb(107, 114, 128) - #6b7280
```

---

## Production-Ready Examples

### Pricing Card (Featured Variant)
```tsx
export function PricingCard() {
  return (
    <Card variant="featured">
      <Card.Spotlight color="green" />
      <Card.Badge variant="success">Most Popular</Card.Badge>
      <Card.Title>Professional Plan</Card.Title>
      <Card.Price amount={99} period="/month" />
      <Card.Description>Everything you need to scale</Card.Description>
      <Card.Button>Get Started</Card.Button>
      <Card.Divider className="my-6" />
      <Card.Features
        items={[
          'Unlimited projects',
          '24/7 priority support',
          'Advanced analytics',
          'Custom integrations',
          'API access'
        ]}
      />
    </Card>
  )
}
```

### Feature Card (Standard Variant)
```tsx
export function FeatureCard() {
  return (
    <Card variant="glass">
      <Card.Spotlight color="cyan" />
      <Card.Icon icon={AnalyticsIcon} glow="cyan" />
      <Card.Title>Real-time Analytics</Card.Title>
      <Card.Description>
        Monitor performance metrics with real-time dashboards and instant alerts
      </Card.Description>
      <Card.Divider className="my-4" />
      <Card.Button variant="secondary">Learn More</Card.Button>
    </Card>
  )
}
```

### Stat Card
```tsx
export function StatCard() {
  return (
    <Card variant="soft">
      <Card.Stat label="Total Revenue" value="$245,120" color="green" />
      <Card.Stat label="Growth" value="+24.5%" color="cyan" />
    </Card>
  )
}
```

---

## Performance Tips

✅ **Optimized for:**
- 60fps smooth animations
- Hardware-accelerated transforms (translateY, scale)
- Efficient backdrop-filter with 12px blur
- Multiple box-shadows (optimized)

⚠️ **Best Practices:**
- Don't use spotlight on every card (visual noise)
- Prefer default glow for passive cards
- Use "featured" only for key items
- Keep animations at 0.3s or less

---

## Browser Support

✅ Chrome/Edge 90+  
✅ Firefox 89+  
✅ Safari 15+  
✅ Mobile (iOS 15+, Android Chrome)  

---

## Customization

To adjust glow intensity, edit `/app/globals.css`:

**Increase glow:**
```css
.glass-card:hover {
  box-shadow:
    0 0 100px rgba(56, 189, 248, 0.4),  /* Increased from 0.2 */
    ...
}
```

**Change colors:**
Replace RGB values in card definitions, e.g.:
```css
rgba(34, 197, 94, 0.25)  /* Green: change these values */
```

---

**Status:** ✨ Production Ready  
**Last Updated:** April 11, 2026  
**Design Inspiration:** Framer, Linear, Modern AI Tools
