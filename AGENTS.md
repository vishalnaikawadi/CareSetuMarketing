# Working on the Care Setu marketing site

Read this before changing anything in `src/`. These rules apply to every contributor, human or AI (Codex, Claude Code, Copilot and others).

The visual system is documented in [`design-system/caresetu-marketing/MASTER.md`](design-system/caresetu-marketing/MASTER.md). This file covers how to change the site without breaking that system, the waitlist form or the Google Sheet.

## File map

| What | Where |
|------|-------|
| All page copy, features, FAQ, workflow, pilot, form options | `src/config/content.ts` |
| Page layout and sections | `src/App.tsx` |
| Product mocks (fictional screens) | `src/components/mocks.tsx` |
| Logo, bridge diagram, avatars, chai glass | `src/components/illustrations.tsx` |
| Waitlist wizard and Sheet submission | `src/components/WaitlistWizard.tsx` |
| Component classes (`.btn-primary`, `.chip`, `.mock`, …) | `src/styles.css` |
| Colour, font and shadow tokens | `tailwind.config.js` |
| Sheet columns and server-side checks | `google-apps-script/Code.gs` |

## Design rules: do not break these

### Colour
- Use only the tokens in `tailwind.config.js`: `paper`, `ink`, `muted`, `forest`, `sage-*`, `clay-*`, `turmeric-*`, `line`, `white`.
- No raw hex values in class names, and no Tailwind default palettes (`slate-*`, `gray-*`, `teal-*`, `red-*`, `blue-*`). The old `teal`, `navy` and `mist` tokens were deliberately removed; don't add them back.
- The one exception is SVG `fill` and `stroke` attributes in `illustrations.tsx`, `mocks.tsx` and the hero arch. These may use hex, but only palette values from `MASTER.md` or the skin tones already used in the avatars.
- **Clay (terracotta) is reserved** for primary actions, focus rings, errors and clinical flags. Don't use it for decoration, icons or headings.
- **Turmeric** only marks pending or caution states inside mocks.
- Forest carries structure: selected chips, dark sections, timeline dots.
- The background is sage-tinted `paper`, not cream or white. Keep it.

### Typography
- Headings use `font-display` (Bricolage Grotesque); it's applied to `h1`–`h4` automatically. Body and UI text use Atkinson Hyperlegible Next, the default `font-sans`.
- Don't add fonts. Never use a monospace face for labels or numbers.
- Use `.display-xl` (hero only), `.display-lg` (section headings) and `.lede` (section intro). Don't invent new heading sizes.
- **Sentence case everywhere.** No ALL-CAPS or letter-spaced eyebrow labels above headings.
- Don't highlight a single word in a headline with colour, italics or bold.
- Body text stays at least 15px. Don't use `text-[10px]` or `text-[11px]` for readable content, even in mocks; the minimum is `text-xs`.

### Shape, depth and layout
- Buttons and chips are pills (`rounded-full`). Mock windows are 18px (`.mock`), tiles inside mocks are 10px (`.mock-tile`), and large panels are 28px.
- `shadow-lift` is only for the hero mock and the patient phone. Everything else uses a border, not a shadow.
- **Don't add grids of identical cards.** Lists of features or values use top-border rows (see `FeatureList` and the hospital values row).
- Use `.shell` for the page container. Use `.btn-primary` for the one main action and `.btn-quiet` for secondary ones.
- The page wrapper uses `overflow-x-clip`. **Never change it to `overflow-x-hidden`**, because that silently breaks every `position: sticky` panel.

### Motif and illustrations
- *Setu* means bridge. The arch (logo, favicon, hero background, bridge diagram) is the one recurring idea. Don't add competing motifs such as gradients, blobs, grids or glows.
- Illustrations are simple line drawings in forest with flat sage, clay or turmeric fills. Don't use stock photos, emoji or 3D art.
- Icons come only from `lucide-react`.

### Motion
- The only automatic animation is the hero arch drawing in on load.
- Everything else animates only in response to a user action (assistant answers, FAQ, wizard steps). Don't add scroll-triggered fade-ins or hover lifts on cards.
- Transitions are 150–300ms. `prefers-reduced-motion` is handled globally in `styles.css`; keep that block.

## Content rules

- **Copy lives in `src/config/content.ts`.** Don't hard-code new marketing copy in components unless it's a one-off heading.
- **Every feature needs a `group`** (`'care'`, `'patient'` or `'hospital'`). It decides which audience path shows the feature and how the form groups it.
- **Don't rename a feature's `shortLabel`** without telling the Sheet owner. That exact text is what's saved in the Sheet, and renaming it splits the data.
- **Mocks use fictional data only** and must say so (`MockBar` shows "Fictional data"). No real patient names, UHIDs or hospital names.
- **Claims to avoid:** don't say Care Setu is clinically validated, compliant with any regulation, launching on a date, or priced at a figure. Pricing questions are for discovery only.
- **AI wording:** the chart assistant is "retrieval support"; it never diagnoses, prescribes or recommends treatment. Keep that caveat next to any AI mock.
- Long caveats (OCR, QR, guideline flags, AI) go in the FAQ (`faqs` in `content.ts`), not as small print under every mock.
- Voice: plain verbs, active voice, sentence case. Buttons say what happens ("Join the waitlist", not "Submit"). Errors say what went wrong and how to fix it, without apologising.

## Waitlist form contract: do not break

The wizard posts to Google Apps Script, which writes one row per response.

- **The keys in the `URLSearchParams` payload (`name`, `email`, `role`, `careSettings`, `interestLevel`, `featuresSelected`, `featuresToExclude`, `serviceModels`, `serviceModelOther`, `willingnessToPay`, `missingFeatures`, `generalFeedback`, `website`) must match the `data.*` keys read in `google-apps-script/Code.gs`.** `HEADERS` in `Code.gs` holds the Sheet column titles; never reorder it, because existing rows depend on the order. If you add, rename or remove a field, update `Code.gs`, `src/types.ts` and the README header list in the same change, and redeploy the Apps Script.
- Keep these as they are: the honeypot field (`website`), the 30-second cooldown, `mode: 'no-cors'`, and the 6-second settle timeout. The README explains why each one exists.
- Multi-select values are joined with `' | '`. Keep that separator, because the Sheet relies on it.
- Steps validate one at a time (`validateStep`). Required fields are email (step 1), plus interest and at least one feature (step 2).
- Pricing questions are hidden when the only roles selected are Patient and/or Caregiver (`PATIENT_ROLES`).
- Don't send test submissions to the production Sheet. Use a separate Apps Script deployment in `.env.local`.

## Common changes

**Add a feature.** Add an entry to `features` in `content.ts` with a `group`, `shortLabel`, `title`, `benefit`, `description` and `icon`. It appears automatically in its audience path and in the form.

**Add or change a mock.** Build it in `mocks.tsx` using `.mock`, `MockBar` and `.mock-tile`, with fictional data and an `aria-label` on the `<figure>`. Mark decorative buttons inside mocks as `<span>`, not `<button>`, so they don't take keyboard focus. Pass it to `AudiencePath` as `mock={<X />}` for one sticky mock, or as `mock={[<A key="a" />, <B key="b" />]}` to stack several (these scroll normally).

**Current mocks (keep them all unless the product changes):** chart assistant (hero, interactive), patient timeline and lab trends (care teams), shared reports (full-width, after care teams), patient phone (patients), hospital overview and facility roles (hospitals).

**Add a section.** Use `<section id="…" aria-labelledby="…">` with `.shell` inside, an `h2` using `.display-lg`, and alternate the background (`paper` → `white` → `paper`, or `forest` for one emphasis band). If it belongs in the nav, add it to `navigation` in `content.ts`.

## Before you merge

1. `npm run build` passes with no type errors.
2. Check the page at 375px, 768px, 1024px and 1440px: no horizontal scroll, and no text hidden behind the fixed header.
3. Tab through the page: every interactive element shows the clay focus ring, and the wizard works with the keyboard alone.
4. Text contrast is at least 4.5:1. `muted` on `paper` or `white` passes; lighter sage text on light backgrounds does not.
5. You haven't introduced raw hex values, default Tailwind colours, uppercase labels, new fonts or new shadows.
6. If you touched the form payload, `Code.gs` and the README columns match.
7. If you changed a design rule on purpose, update `MASTER.md` and this file in the same commit.
