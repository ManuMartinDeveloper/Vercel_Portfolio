# Manu Martin Portfolio - Design System

## Design Philosophy

This portfolio follows a **Google Stitch-inspired aesthetic** - clean, minimal, warm, and editorial with a trust-forward feel. The design emphasizes generous whitespace, subtle glassmorphism, and smooth micro-interactions.

---

## Color Palette

### Primary Colors
| Token | Morning | Afternoon | Evening | Night |
|-------|---------|-----------|---------|-------|
| `--primary` | `#FF8C69` | `#3B82F6` | `#FB923C` | `#8B5CF6` |
| `--accent` | `#FF6B45` | `#2563EB` | `#F97316` | `#A78BFA` |
| `--background` | `#FFFAF5` | `#F5FAFF` | `#1A141E` | `#0A0A0F` |

### Neutral Colors
- **Light Surface**: `#FFFFFF`, `#FAFAFA`, `#F5F5F5`
- **Dark Surface**: `#1A1A1A`, `#2D2D2D`, `#404040`
- **Muted Text**: `#737373` (light), `#A1A1A1` (dark)

### Guidelines
- Maximum 5 colors per view
- 60-30-10 rule: Background (60%), Secondary (30%), Primary (10%)
- No gradients on primary UI elements unless for decorative purposes

---

## Typography

### Font Stack
```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Scale
| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| Hero Title | 72px / 4.5rem | 700 | 1.1 | -0.02em |
| Section Title | 48px / 3rem | 700 | 1.2 | -0.015em |
| Card Title | 24px / 1.5rem | 600 | 1.3 | -0.01em |
| Body Large | 18px / 1.125rem | 400 | 1.6 | 0 |
| Body | 16px / 1rem | 400 | 1.6 | 0 |
| Caption | 14px / 0.875rem | 500 | 1.5 | 0.01em |
| Small | 12px / 0.75rem | 500 | 1.4 | 0.02em |

### Guidelines
- Use `text-balance` for headings
- Use `text-pretty` for body paragraphs
- Maximum 2 font families

---

## Spacing System

Based on 4px base unit:
```
4px   = 0.25rem  (xs)
8px   = 0.5rem   (sm)
12px  = 0.75rem  (md)
16px  = 1rem     (base)
24px  = 1.5rem   (lg)
32px  = 2rem     (xl)
48px  = 3rem     (2xl)
64px  = 4rem     (3xl)
96px  = 6rem     (4xl)
```

### Section Spacing
- Section padding: `96px` vertical (desktop), `64px` (mobile)
- Card gap: `24px`
- Content max-width: `1280px`

---

## Border Radius

| Element | Radius |
|---------|--------|
| Cards | `16px` / `1rem` |
| Buttons | `9999px` (pill) or `12px` |
| Input Fields | `12px` |
| Tags/Badges | `9999px` |
| Images | `16px` |
| Avatars | `50%` |

---

## Shadows & Effects

### Elevation Levels
```css
/* Level 1 - Cards at rest */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.06);

/* Level 2 - Cards on hover */
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 20px rgba(0, 0, 0, 0.08);

/* Level 3 - Modals, Dropdowns */
--shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.08), 0 20px 48px rgba(0, 0, 0, 0.1);
```

### Glassmorphism
```css
/* Navigation blur */
backdrop-filter: blur(12px);
background: rgba(255, 255, 255, 0.8);
border: 1px solid rgba(255, 255, 255, 0.2);
```

---

## Animation & Motion

### Timing Functions
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Duration
| Type | Duration |
|------|----------|
| Micro (hover, focus) | 150ms |
| Small (tooltips, badges) | 200ms |
| Medium (cards, modals) | 300ms |
| Large (page transitions) | 500ms |

### Hover Effects
- Cards: `translateY(-4px)` + shadow increase
- Buttons: scale(1.02) + background shift
- Links: underline reveal with color shift

---

## Component Patterns

### Cards
```
- Background: rgba(var(--card), 0.8)
- Border: 1px solid rgba(var(--primary), 0.1)
- Border-radius: 16px
- Padding: 24px
- Hover: translateY(-4px) + shadow-md
```

### Buttons
```
Primary:
- Background: rgb(var(--primary))
- Text: white
- Padding: 12px 24px
- Border-radius: 9999px (pill)

Secondary/Outline:
- Background: transparent
- Border: 1px solid rgba(var(--primary), 0.2)
- Hover border: rgba(var(--primary), 0.5)
```

### Navigation (Sticky with blur)
```
- Position: fixed top
- Background: rgba(var(--background), 0.8)
- Backdrop-filter: blur(12px)
- Border-bottom: 1px solid rgba(var(--border), 0.5)
```

### Tags/Badges
```
- Background: rgba(var(--primary), 0.1)
- Text: rgb(var(--primary))
- Padding: 4px 12px
- Border-radius: 9999px
- Font-size: 12px
- Font-weight: 500
```

---

## Layout Guidelines

### Grid System
- 12-column grid for desktop
- Gap: 24px
- Max content width: 1280px
- Padding: 24px (mobile), 48px (tablet), 64px (desktop)

### Flexbox Priority
1. Use flexbox for most layouts
2. CSS Grid only for 2D complex layouts
3. Never use floats

### Responsive Breakpoints
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

## Accessibility

- Focus rings: `ring-2 ring-primary ring-offset-2`
- Color contrast: WCAG AA minimum (4.5:1 for text)
- Touch targets: minimum 44x44px
- Semantic HTML elements
- ARIA labels for interactive elements
- `sr-only` class for screen reader text

---

## Smart Characters Integration

The animated "Smart" characters at bottom-right corner:
- Fixed position with `z-index: 50`
- Mat platform with theme-adaptive coloring
- Environmental elements (sun/moon/stars) based on theme
- Eye tracking follows cursor position
- Emotion states: happy, sad, excited, curious, surprised, focused, playful
- Themes button integrated below mat

---

## File Structure
```
components/
  ui/          # shadcn/ui components
  hero.tsx
  education.tsx
  skills.tsx
  experience.tsx
  projects.tsx
  contact.tsx
  mobile-nav.tsx
  smart-characters.tsx
  ...
```

---

## Version History
- v1.0 - Initial Stitch-inspired redesign (April 2026)
