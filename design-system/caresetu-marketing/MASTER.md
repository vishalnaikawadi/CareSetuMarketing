# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.
>
> **Contributor rules** (what not to change, the form contract, how to add features, mocks and sections) are in [`AGENTS.md`](../../AGENTS.md) at the repo root. Change a rule here only on purpose, and update `AGENTS.md` in the same commit.
>
> **Source of truth in code:** tokens are in `tailwind.config.js`, component classes in `src/styles.css`. If this file and the code disagree, fix whichever one is wrong. Don't leave them out of sync.

---

**Project:** CareSetu Marketing
**Generated:** 2026-10-01 17:05:37
**Updated:** 2026-10-22 (warm & human redesign)
**Category:** Healthcare App

---

## Global Rules

### Color Palette

| Role | Hex | Tailwind token |
|------|-----|----------------|
| Background (paper) | `#F2F4EE` | `paper` |
| Surface | `#FFFFFF` | `white` |
| Foreground | `#1E2B25` | `ink` |
| Muted text | `#5B6B62` | `muted` |
| Structure / primary | `#2F4A3E` | `forest` |
| Sage tints | `#EEF2EB` – `#3E5A4B` | `sage-50` … `sage-700` |
| Accent / CTA | `#B5563A` (hover `#9A4630`) | `clay-500` / `clay-600` |
| Pending / caution | `#D9A23B` on `#F6E7C4` | `turmeric-*` |
| Border | `#D8DFD3` | `line` |
| Focus ring | `#B5563A`, 3px | — |

**Color Notes:** Warm & human. Forest green carries structure, headings on dark sections and selected states. Brick terracotta is reserved for primary actions, focus rings and clinical flags, and never used as decoration. Paper is sage-tinted, not cream. Turmeric only marks pending or caution states inside product mocks.

### Typography

- **Display Font:** Bricolage Grotesque (600, optical sizing on): headings and mock numerals
- **Body Font:** Atkinson Hyperlegible Next (400/700): body, UI and forms; chosen for legibility
- **Scale:** h1 2.6rem → 4.5rem, h2 1.9rem → 2.6rem, body 17px / 1.6, small 15px
- **Rules:** sentence case everywhere; no uppercase eyebrow labels; no single-word colour or italic accents in headlines
- **Loading:** `<link>` in `index.html` (Google Fonts)

### Motif

*Setu* means bridge. The arch (logo, hero background, bridge network diagram) is the one recurring visual idea. Supporting illustrations are simple line drawings with flat sage/clay/turmeric fills: audience avatars and a cutting-chai glass.

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

### Shadows and radii

- `shadow-lift` only on the hero mock and patient phone; `shadow-tag` for small pills. Other surfaces use borders, not shadows.
- Radii follow hierarchy: buttons and chips are pills; product mock windows 18px; tiles inside mocks 10px; large panels (form, specialties) 28px.

### Product mocks

Seven fictional screens, all in `src/components/mocks.tsx`. Keep them all unless the product changes.

| Mock | Section | Notes |
|------|---------|-------|
| `ChartAssistantMock` | Hero | Interactive; prompts and answers come from `assistantPrompts` in `content.ts`. The only mock with `shadow-lift` besides the phone. |
| `RecordTimelineMock` + `LabTrendsMock` | For care teams | Stacked in the right column; they scroll normally. |
| `SharedReportsMock` | Full-width block after care teams | Patient app and clinician panel side by side. |
| `PatientPortalMock` | For patients | Phone frame, 460px wide, sticky. |
| `HospitalOverviewMock` + `FacilityRolesMock` | For hospitals | Stacked in the right column. |

Every mock: a `.mock` window, a `MockBar` showing "Fictional data", `.mock-tile` inner surfaces, text no smaller than `text-xs`, an `aria-label` on the `<figure>`, and decorative buttons rendered as `<span>`.

### Components

Defined in `src/styles.css`: `.btn-primary` (clay pill), `.btn-quiet` (forest outline pill), `.path-pill` (audience label with avatar), `.mock` / `.mock-bar` / `.mock-tile`, `.input`, `.choice`, `.chip` (selected = forest fill; exclude = clay tint).

---

## Style Guidelines

**Style:** Accessible & Ethical

**Keywords:** High contrast, large text (16px+), keyboard navigation, screen reader friendly, WCAG compliant, focus state, semantic

**Best For:** Government, healthcare, education, inclusive products, large audience, legal compliance, public

**Key Effects:** Clear focus rings (3-4px), ARIA labels, skip links, responsive design, reduced motion, 44x44px touch targets

### Page Pattern

**Pattern Name:** Two-audience product concept page (buyers and the people who use it)

- **Conversion Strategy:** One action, "Join the waitlist", in the nav, hero and the form section. Features are grouped by who they serve, so buyers and clinicians/patients each find their path.
- **Section Order:** 1. Hero + interactive chart-assistant mock, 2. Bridge network + hospital value and pilot measures, 3. For care teams, then the full-width shared reports block, 4. For patients and caregivers, 5. For hospitals (+ care settings), 6. Specialty candidates, 7. Care workflow (6 steps), 8. Pilot: roadmap, guardrails, pricing models, 9. Waitlist wizard (3 steps), 10. FAQ (holds the AI, OCR, QR and guideline caveats), 11. Footer disclaimer.
- **Motion:** only the hero arch drawing in on load, plus responses to user actions (assistant answers, FAQ, wizard steps).

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
- [ ] Only design tokens are used: no raw hex in class names, no `slate`/`gray`/`teal` defaults
- [ ] Clay is used only for actions, focus, errors and flags
- [ ] No uppercase eyebrow labels, monospace labels or new fonts
- [ ] Page wrapper still uses `overflow-x-clip` (sticky panels depend on it)
- [ ] Mocks show fictional data and say so
- [ ] `npm run build` passes
