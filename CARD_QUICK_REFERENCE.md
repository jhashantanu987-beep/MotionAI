# Quick Reference - Premium Card Components

## Card Variants

```tsx
<Card variant="glass" />       /* Default - cyan glow */
<Card variant="featured" />    /* Green glow - "Most Popular" */
<Card variant="orange" />      /* Orange glow - promotional */
<Card variant="premium" />     /* Ultra luxury - hero sections */
<Card variant="soft" />        /* Minimal - secondary content */
```

## Icon Glows

```tsx
<Card.Icon icon={Icon} glow="cyan" />      /* Blue glow */
<Card.Icon icon={Icon} glow="green" />     /* Green glow */
<Card.Icon icon={Icon} glow="orange" />    /* Orange glow */
<Card.Icon icon={Icon} glow="none" />      /* No glow */
```

## Spotlight Colors

```tsx
<Card.Spotlight color="cyan" />    /* Blue spotlight */
<Card.Spotlight color="green" />   /* Green spotlight */
<Card.Spotlight color="orange" />  /* Orange spotlight */
```

## Buttons

```tsx
<Card.Button variant="primary">Primary</Card.Button>         /* Gradient blue + glow */
<Card.Button variant="secondary">Secondary</Card.Button>     /* Glass effect */
<Card.Button variant="outlined">Outlined</Card.Button>       /* Border style */
```

## Badges

```tsx
<Card.Badge variant="default">New</Card.Badge>       /* Cyan */
<Card.Badge variant="success">Most Popular</Card.Badge>  /* Green */
<Card.Badge variant="warning">Limited Time</Card.Badge>   /* Orange */
```

## Complete Card Structure

```tsx
<Card variant="featured">
  {/* Spotlight effect (optional but recommended) */}
  <Card.Spotlight color="green" />
  
  {/* Icon with glow (optional) */}
  <Card.Icon icon={StarIcon} glow="green" />
  
  {/* Badge for status (optional) */}
  <Card.Badge variant="success">Most Popular</Card.Badge>
  
  {/* Main title */}
  <Card.Title>Title Here</Card.Title>
  
  {/* Price (optional, for pricing cards) */}
  <Card.Price amount={99} period="/month" />
  
  {/* Description text */}
  <Card.Description>Description here</Card.Description>
  
  {/* Primary CTA button */}
  <Card.Button variant="primary">Get Started</Card.Button>
  
  {/* Visual divider (optional) */}
  <Card.Divider className="my-6" />
  
  {/* Feature list (optional) */}
  <Card.Features items={['Feature 1', 'Feature 2', 'Feature 3']} />
</Card>
```

## Stats Display

```tsx
<Card.Stat label="Monthly Revenue" value="$245K" color="green" />
<Card.Stat label="Growth" value="+24.5%" color="cyan" />
<Card.Stat label="Users" value="12.3K" color="orange" />
```

## Files to Know

| File | Purpose |
|------|---------|
| `app/globals.css` | CSS card styles |
| `app/components/Card.tsx` | Main Card component + subcomponents |
| `app/components/CardShowcase.tsx` | 8 example cards |
| `PREMIUM_CARD_DESIGN.md` | Detailed design guide |
| `PREMIUM_CARDS_IMPLEMENTATION.md` | Implementation summary |

## Glow Effects Summary

- **glass-card:** Subtle cyan glow + soft spotlight
- **glass-card-featured:** Strong green glow + radial overlay
- **glass-card-orange:** Warm orange glow + spotlight
- **premium-card:** Maximum intensity + multiple layers
- **soft-card:** Minimal glow + quiet appearance

## Hover Behavior

All cards:
- ↑ Lift up 6px
- 📈 Scale up 1.02-1.04x
- 💫 Double to 2.5x glow intensity
- 🎨 Text colors brighten
- ⏱️ All transitions 0.3s smooth

## CSS Classes Used

```css
.glass-card              /* Base card style */
.glass-card-featured     /* Green featured variant */
.glass-card-orange       /* Orange accent variant */
.premium-card            /* Ultra premium variant */
.soft-card               /* Minimal variant */
.glow-button             /* Enhanced button glow */
```

## Important Notes

✅ Use `Card.Spotlight` for better visual depth  
✅ Match icon glow to card variant when possible  
✅ Prefer featured cards for 20-30% of content  
✅ Use soft cards for secondary information  
✅ Buttons work outside Card component too  

❌ Don't overuse glow on every card  
❌ Don't mix too many glow colors in same area  
❌ Don't remove spotlight for design consistency  

## Responsive Sizes

| Element | Mobile | Desktop |
|---------|--------|---------|
| Title | text-lg | text-xl |
| Description | text-sm | text-base |
| Price | text-4xl | text-5xl |
| Padding | p-6 | p-8 |
| Icon | h-14 w-14 | h-14 w-14 |

## Color Codes

```
Cyan:   #38bdf8  (56, 189, 248)
Green:  #22c55e  (34, 197, 94)
Orange: #f97316  (249, 115, 22)
White:  #ffffff  (high opacity for borders)
```

## Animation Timing

- **Transition:** 0.3s ease-out
- **Scale:** 1.02 - 1.04 (variant dependent)
- **Lift:** -6px translateY
- **Glow Duration:** 0.3s (matches transition)

## Browser Support

Chrome 90+, Firefox 89+, Safari 15+, Edge 90+, Mobile (iOS 15+, Android 13+)

---

**Quick Copy Snippets:**

Pricing Card:
```tsx
<Card variant="featured">
  <Card.Spotlight color="green" />
  <Card.Badge variant="success">Popular</Card.Badge>
  <Card.Title>Pro</Card.Title>
  <Card.Price amount={99} period="/month" />
  <Card.Button>Get Started</Card.Button>
</Card>
```

Feature Card:
```tsx
<Card variant="glass">
  <Card.Spotlight />
  <Card.Icon icon={Icon} glow="cyan" />
  <Card.Title>Feature</Card.Title>
  <Card.Description>Description</Card.Description>
</Card>
```

Stats Card:
```tsx
<Card variant="soft">
  <Card.Stat label="Revenue" value="$245K" color="green" />
  <Card.Stat label="Growth" value="+24.5%" color="cyan" />
</Card>
```
