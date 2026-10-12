# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** CareSetu Marketing
**Generated:** 2026-10-01 17:05:37
**Category:** Healthcare App

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#0B7F79` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary | `#1EAAA1` | `--color-secondary` |
| Structure | `#0C2235` | `--color-structure` |
| Accent/CTA | `#0B7F79` | `--color-accent` |
| Background | `#F3F7F7` | `--color-background` |
| Foreground | `#102B3D` | `--color-foreground` |
| Muted | `#EFF9F7` | `--color-muted` |
| Border | `#DCE7E6` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| Ring | `#087F79` | `--color-ring` |

**Color Notes:** Midnight navy anchors structure and hero areas. White and soft aqua keep product surfaces bright and calm; a restrained, accessible teal marks actions, active states and key details.

### Typography

- **Display Font:** DM Serif Display
- **UI Heading Font:** Figtree
- **Body Font:** Noto Sans
- **Mood:** premium, calm, readable, accountable and healthcare-appropriate
- **Google Fonts:** DM Serif Display, Figtree and Noto Sans

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Figtree:wght@400;500;600;700&family=Noto+Sans:wght@400;500;600;700&display=swap');
```

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #0B7F79;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 200ms ease, box-shadow 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  background: #0C6864;
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #0B7F79;
  border: 1px solid #0B7F79;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: border-color 200ms ease, box-shadow 200ms ease;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  border-color: #BCE8E3;
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #087F79;
  outline: none;
  box-shadow: 0 0 0 3px #087F7920;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Accessible & Ethical

**Keywords:** High contrast, large text (16px+), keyboard navigation, screen reader friendly, WCAG compliant, focus state, semantic

**Best For:** Government, healthcare, education, inclusive products, large audience, legal compliance, public

**Key Effects:** Clear focus rings (3-4px), ARIA labels, skip links, responsive design, reduced motion, 44x44px touch targets

### Page Pattern

**Pattern Name:** Buyer-led product concept page

- **Conversion Strategy:** Explain hospital value, patient and clinician experience, role-specific workflows, safety guardrails and pilot path with concise copy and illustrative product screens.
- **CTA Placement:** Keep one primary discovery action visible in the hero and navigation; repeat it after the product and pilot explanation.
- **Section Order:** 1. Hero and clinician mock screen, 2. Hospital value, 3. Audience and patient portal, 4. Connected-care diagram and product mock screens, 5. Specialty candidates, 6. Care workflow, 7. Pilot and commercial questions, 8. Discovery form, 9. Concept disclaimer.

---

## Anti-Patterns (Do NOT Use)

- ❌ Bright neon colors
- ❌ Motion-heavy animations
- ❌ AI purple/pink gradients

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 390px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
