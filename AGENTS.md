# AGENTS.md — UGAC Website

This file is read automatically by Codex on every session. Follow these rules exactly when editing this project.

## Project Overview

Official website for the **Undergraduate Academic Council (UGAC), IIT Bombay** — Tenure 2025–26.
Built with **Create React App + Framer Motion**. No CSS frameworks. All styling is hand-written.

```
src/
├── App.js              # Routes, custom cursor (event delegation), hash scroll
├── App.css             # ALL component styles (single source of truth)
├── index.css           # Global reset, CSS variables, dark mode, cursor, fonts
├── components/
│   ├── Navbar.js       # 3 floating elements: logo left, pill center, CTA right
│   ├── Hero.js         # Scroll-triggered 8-slide background + Ken Burns
│   ├── Features.js     # About section with hover-statement
│   ├── HoverPostStatement.js # Per-word hover triggers floating posters
│   ├── Divisions.js    # Accordion rows with card pile on hover
│   ├── Stats.js        # Animated counters (Framer Motion animate)
│   ├── Team.js         # 4-col grid with photo, tab filter, initials fallback
│   ├── Contact.js      # 2-col: headline + clickable contact rows
│   ├── Footer.js       # Giant UGAC wordmark SVG, nav links, live Mumbai clock
│   ├── SplitTextReveal.js  # Per-char stagger reveal animation
│   ├── Preloader.js    # ClipPath wipe loading screen
│   └── Marquee.js      # Infinite marquee strip
├── data/
│   ├── clubs.js        # 10 club definitions
│   └── sessions.js     # TSC session data + quick links + contacts
├── pages/
│   ├── ClubPage.js     # Scroll-driven frame scrubbing (canvas)
│   └── WikiPage.js     # Tabbed SSS wiki with search + pagination + calendar
└── hooks/
    └── useInView.js    # IntersectionObserver hook
```

---

## Design System — DO NOT DEVIATE

### Inspiration
Studio Namma (studionamma.com), dropship.io, patternbreak.ing, lessestudio.com — warm editorial, condensed black type, monospaced labels, glass-morphism nav pill, hover fill animations.

### CSS Variables (defined in `index.css`)
```css
--bg: #edece8            /* warm off-white page background */
--bg-card: #e4e3de       /* hover/card states */
--fg: #0d0d0c            /* near-black text */
--fg-muted: rgba(13,13,12,0.42)
--fg-subtle: rgba(13,13,12,0.18)
--border: rgba(13,13,12,0.1)
--accent-blue: #1a56f0   /* calendar session dots, links */
--font-display: 'Barlow Condensed', sans-serif
--font-body: 'Barlow', sans-serif
--font-mono: 'Space Mono', monospace
--nav-h: 52px            /* navbar height for content offset */
--ease-out: cubic-bezier(0.22, 1, 0.36, 1)
```

### UGAC Brand Colors (from Footer SVG per-letter hover)
```
U → #1A3A52  (dark navy)
G → #2F5E7C  (steel blue)
A → #1E8B8B  (teal)
C → #4DB8A8  (mint)
```
Diagonal gradient: `linear-gradient(135deg, #1A3A52, #2F5E7C, #1E8B8B, #4DB8A8)`

### Dark Mode
Toggled via `body.dark` class. Overrides in `index.css`:
```css
body.dark { --bg: #111110; --bg-card: #1c1c1a; --fg: #f0efea; --fg-muted: rgba(240,239,234,0.42); --border: rgba(240,239,234,0.09); }
```

### Typography Rules
- **Display headlines**: `var(--font-display)`, `font-weight: 900`, `text-transform: uppercase`, `letter-spacing: -0.02em`
- **Section labels** (`.s-label`): Space Mono, `clamp(0.78rem, 0.85vw, 0.95rem)`, 0.22em spacing, muted
- **Body text**: Barlow, `clamp(0.9rem, 1vw, 1rem)`, line-height 1.65, muted
- **All caps UI labels**: Space Mono, `clamp(0.55rem, 0.65vw, 0.7rem)`, uppercase

### Headline sizes (always use `clamp`)
- Hero headline: `clamp(4rem, 11vw, 10rem)`
- Section titles: `clamp(3rem, 8vw, 7rem)`
- Row/Item names: `clamp(1.1rem, 2vw, 1.5rem)`
- Statement text: `clamp(2.2rem, 5.5vw, 5.5rem)`

### Layout
- All sections: `padding: 5rem 0`, `border-bottom: 1px solid var(--border)`
- Horizontal padding: `1.75rem`
- Grid with 1px gaps: `background: var(--border)` on container, items: `background: var(--bg)`
- **When a grid has unfilled cells** (e.g. 5 items in 2 columns): use individual item `border-right` + `border-bottom` instead of grid gap, with `:nth-child(even)` and `:nth-last-child(-n+2)` selectors to remove redundant borders

### Animations (Framer Motion)
- Standard fade-up: `initial={{ opacity: 0, y: 32 }}` → `whileInView={{ opacity: 1, y: 0 }}`
- Duration: `0.5–0.9s`, ease: `[0.22, 1, 0.36, 1]`
- Stagger children: `0.035–0.1s` delay per item
- Always use `viewport={{ once: true }}`

---

## Navbar — 3 Separate Floating Elements (Lesse Studio style)

```
[UGAC]            [About | Divisions | Team | Contact | Wiki | ☾]           [Get Involved]
 ^ top-left pill          ^ centered pill (glass, blur)                 ^ top-right FAB
```

### Desktop structure
```html
<Link to="/" className="nav-logo">UGAC</Link>
<nav className="nav-fill">
  <div className="nav-fill-links">
    <button className="nav-fill-link">About</button> ...
  </div>
  <button className="nav-fill-dark">☾</button>
</nav>
<button className="nav-cta-fab">Get Involved</button>
```

### CSS
- `.nav-logo`: fixed top-left, `rgba(13,13,12,0.5)` pill with `backdrop-filter: blur(10px)`
- `.nav-fill`: fixed top-center (`translateX(-50%)`), `rgba(13,13,12,0.85)` pill, `backdrop-filter: blur(16px)`, border-radius: 999px
- `.nav-cta-fab`: fixed top-right, `#f0efea` white pill, `color: #0d0d0c`
- All nav text white (`#f0efea`), links use `.nav-fill-link` with hover `color: #f0efea`
- Mobile (≤900px): logo goes to top-left solid bar, pill shifts to right, CTA hidden

### Links are contextual
- Home page: About, Divisions, Team, Contact, SSS Wiki
- Wiki page: Resources, Calendar, Upcoming, Archive, Contact
- Hash links call `scrollTo(id)` which finds `document.getElementById(id)` and clicks it if it's a `<button>` or scrolls to it if it's a section

---

## Components

### Hero
- 600vh scroll container, sticky inner panel
- 8 background slides with AnimatePresence crossfade + Ken Burns motion
- Film grain overlay (`feTurbulence` noise, animated)
- Progress dots (right), counter (top-right), slide caption (bottom-left)
- Scroll hint (bottom center)
- Headline: `SplitTextReveal` with "We Bridge / Students & / Faculty"

### Divisions
- Accordion rows with hover card pile (fixed-position, cursor-following)
- Auto-cycles images on hover via `setInterval`
- Muting: non-hovered rows dim to `opacity: 0.15`
- Click navigates to `/divisions/:slug`

### Team
- 4-col grid with 1px gaps
- Each card: avatar (photo or initials) + info column (name, role, links)
- Tabs: All / Core Leadership / Division Heads / Web Team
- AnimatePresence mode="wait" for tab transitions

### Stats
- 4-col grid with animated counters (Framer Motion `animate()` + `useInView`)
- Each cell: big number + bold label + sub-text description

### Contact
- 2-col grid layout: left = headline + desc, right = clickable rows
- Each row: mono label (left) + value with ↗ (right), hover background

### Footer
- Top: horizontal nav links row
- Giant SVG "UGAC" wordmark with scroll-driven `scaleY` stretch
- Per-letter hover color (U→navy, G→steel, A→teal, C→mint)
- Bottom: copyright | Mumbai live clock | "Built by UGAC Web Team"

---

## Wiki Page Pattern (Tabbed + Search + Pagination)

Used for `/wiki` — the SSS Academic Support page.

### Structure
```
Hero (SSS watermark + title)
Tab bar (sticky): Resources | Calendar | Upcoming | Archive | Reach Out
Body panel (max-width: 960px, centered)
```

### Tabs
- `justify-content: center` in tab bar
- Each tab button has `id="wiki-{key}"` so navbar links can `.click()` them
- Active tab: `color: var(--fg)`, `border-bottom: 2px solid var(--fg)`
- Hover: `background: var(--bg-card)`
- Content switches via `AnimatePresence mode="wait"`

### Session List (Upcoming / Archive tabs)
- Live search input: filters by course code, name, tutors, tags, description
- `matchesSearch()` function: `q.toLowerCase()` against all fields
- Pagination: `PAGE_SIZE = 4`, prev/next buttons + numbered page buttons
- Results count: "N sessions matching 'query'"
- Clear button on search input

### Calendar
- Monthly grid, full-width within panel (no max-width constraint)
- Navigation arrows (prev/next month)
- Day cells: `min-height: 5rem`, `justify-content: flex-start`
- **Multiple sessions per day**: shows first course code + `+N` badge
- Selected date: `background: var(--fg)`, text white
- Today: outline ring on number
- Click date → detail panel slides down with all sessions + "Add to Calendar" buttons

---

## Professional Design Patterns

### Card/Grid Anatomy
```
Label (mono, small, muted)
Title (display, bold, uppercase)
Description (body, small, muted)
Action/Metric (right-aligned: arrow, count, or CTA)
```
- Cards: padding `1.5rem 1.25rem`
- Hover: `background: var(--bg-card)` with 0.25s transition

### Row-Based Components
```
[Badge]  Name of the thing          Tutors →    ← clickable
         Date · Time · Duration
─────────────────────────────────
Description text                              ← AnimatePresence
Tutors: name (email), name (email)
Resources: [PDF] [PDF] [Link]
[tag] [tag] [tag]
[+ Add to Calendar]
```
- Row padding: `1.15rem 1.5rem` top, `1.5rem` body bottom
- Hover fill: `::before` pseudo-element with `scaleY(0→1)` + `transform-origin: top`
- Arrow rotates 180° on open

### Calendar Patterns
- Full-width in panel
- Cells: `min-height: 5rem`, flex column (number + course codes)
- Dot replaced by course code text + optional `+N` counter
- Selected: filled `--fg` background, white text

### Responsive Strategy
```
Desktop (1200+):  4-col grids, full layouts
Tablet (900):     2-col grids, stacked content, nav becomes solid
Mobile (600):     1-col grids, hidden secondary info, compact padding
```

### Micro-Interactions
- Card hover: background shift
- Row hover: fill wipe (scaleY animation)
- Button hover: bg/fg swap (btn-primary), border color shift (btn-ghost)
- Cursor: expands on any `a, button` via **event delegation** (`document.addEventListener('mouseover', ...)`)
- All transitions: 0.2–0.35s, `var(--ease-out)`

---

## Editing Rules

1. **All styles go in `App.css`** — no inline styles except one-off positioning/dynamic values
2. **Never use Tailwind, Bootstrap, or any CSS framework**
3. **Never change fonts** — only Barlow Condensed, Barlow, Space Mono
4. **Never change the color palette** — all colors via CSS variables only
5. **All content changes** in component data arrays at top of each file
6. **Dark mode** must work for every new element — test both modes
7. **Responsive**: 900px (tablet) and 600px (mobile) breakpoints
8. **Text sizes always use `clamp()`** — never hardcoded `rem` values for visible text
9. **`--nav-h` in `index.css`** controls top offset for content beneath the floating nav

## Dev Commands

```bash
npm start      # dev server at localhost:3000
npm run build  # production build
```

## Git Workflow

Never push directly to `main`. Always:
1. `git checkout -b feat/...`
2. Commit changes
3. `git push -u origin <branch>`
4. `gh pr create`
