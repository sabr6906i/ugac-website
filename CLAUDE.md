# CLAUDE.md — UGAC Website

This file is read automatically by Claude Code on every session. Follow these rules exactly when editing this project.

## Project Overview

Official website for the **Undergraduate Academic Council (UGAC), IIT Bombay** — Tenure 2025–26.
Built with **Create React App + Framer Motion**. No CSS frameworks. All styling is hand-written.

```
src/
├── App.js              # Root layout, custom cursor, marquee strips
├── App.css             # ALL component styles (single source of truth)
├── index.css           # Global reset, CSS variables, dark mode, cursor, fonts
└── components/
    ├── Navbar.js       # Fixed nav, live city clock, dark mode toggle, fullscreen menu
    ├── Hero.js         # Division grid strip + massive headline + stats
    ├── Features.js     # About/statement section (imported as <About />)
    ├── Divisions.js    # Studio Namma services-style accordion rows
    ├── Stats.js        # Animated counting numbers grid
    ├── Achievements.js # Bold numbers grid (12 items, 4-col)
    ├── Team.js         # 4-col grid with real photos, tab filter
    ├── Contact.js      # 2-col layout with clickable contact rows
    └── Footer.js       # Big UGAC wordmark + nav links + live Mumbai clock
```

---

## Design System — DO NOT DEVIATE

### Inspiration
Studio Namma (studionamma.com) — warm editorial, condensed black type, monospaced labels, hover fill animations.

### CSS Variables (defined in `index.css`)
```css
--bg: #edece8          /* warm off-white page background */
--bg-card: #e4e3de     /* slightly darker for hover/card states */
--fg: #0d0d0c          /* near-black text and fills */
--fg-muted: rgba(13,13,12,0.42)  /* secondary text */
--fg-subtle: rgba(13,13,12,0.08) /* giant watermark text */
--border: rgba(13,13,12,0.1)     /* all dividers and outlines */
--nav-h: 3.5rem        /* navbar height, used for padding-top on hero */
--font-display: 'Barlow Condensed', sans-serif
--font-body: 'Barlow', sans-serif
--font-mono: 'Space Mono', monospace
--ease-out: cubic-bezier(0.22, 1, 0.36, 1)
```

### Dark Mode
Toggled via `body.dark` class in Navbar.js. Dark overrides are in `index.css`:
```css
body.dark { --bg: #0d0d0c; --bg-card: #161614; --fg: #f0efea; ... }
```

### Typography Rules
- **Display headlines**: `font-family: var(--font-display)`, `font-weight: 900`, `text-transform: uppercase`, `letter-spacing: -0.02em`
- **Section labels**: `.s-label` class — Space Mono, 0.65rem, 0.12em letter-spacing, uppercase, muted color
- **Body text**: Barlow, 0.9rem, line-height 1.65, muted color
- **All caps UI labels** (badges, chips, tags): Space Mono, 0.6–0.68rem, uppercase

### Headline sizes (always use `clamp`)
- Giant section titles: `clamp(3rem, 8vw, 7rem)`
- Hero headline: `clamp(4rem, 11vw, 10rem)`
- Division rows: `clamp(1.6rem, 3.5vw, 3rem)`
- Giant about statement: `clamp(2.2rem, 5.5vw, 5.5rem)`

### Layout
- All sections: `padding: 5rem 0`, `border-bottom: 1px solid var(--border)`
- All horizontal padding: `1.75rem` (never use `.container` class for full-bleed sections)
- Grid gaps: `1px` with `background: var(--border)` for cell-grid layouts

### Animations (Framer Motion)
- Standard fade-up: `initial={{ opacity: 0, y: 32 }}` → `whileInView={{ opacity: 1, y: 0 }}`
- Duration: `0.5–0.9s`, ease: `[0.22, 1, 0.36, 1]`
- Stagger children: `0.04–0.1s` delay per item
- Menu overlay: `clipPath: 'inset(0 0 100% 0)'` → `inset(0 0 0% 0)`
- Always use `viewport={{ once: true }}`

---

## Asset Sources — External URLs (do not download locally)

| Asset | URL |
|-------|-----|
| UGAC Logo (PNG) | `https://ugac-iitb.github.io/UGAC-IITB/images/ugac.png` |
| UGAC Illustration (SVG) | `https://ugac-iitb.github.io/UGAC-IITB/_next/static/media/UGAC%20V1%20illustration.83f2f1f2.svg` |
| Club logos 1–10 | `https://ugac-iitb.github.io/UGAC-IITB/images/clubs/{1-10}.png` |
| Team photos | `https://ugac-iitb.github.io/UGAC-IITB/images/team/{Name}.png` (URL-encoded) |

Club logo mapping: 1=Analytics, 2=Consult, 3=Finance, 4=EnPoWER, 5=Career Cell, 6=Student Support, 7=CCG, 8=Investment Team, 9=DAV Team, 10=ISIR

---

## Component Rules

### Navbar
- Logo: UGAC icon image + text + sub label
- Center: `<LiveClock>` cycles Mumbai → Delhi → London → New York every 4s
- Right: Dark Mode toggle (pill), MENU button, GET INVOLVED! CTA
- Menu overlay: full-screen dark bg, giant Barlow Condensed links with clipPath wipe animation
- Scroll lock on body when menu is open

### Hero
- Top: 4-column grid strip with 8 division logos + names (`.hero-grid-strip`)
- Middle: eyebrow label + massive "WE BRIDGE / STUDENTS & / FACULTY" headline
- Bottom row (border-top): desc text, two action buttons, three stats (10/17/6K+)

### Divisions
- Grid: `grid-template-columns: 3rem 2.2rem 1fr auto auto` (num | logo | name | badge | arrow)
- Hover: `.div-row-hover-bg` scaleY(0→1) fills row with `var(--fg)`, all text flips to `var(--bg)`
- Logo turns white on hover via `filter: brightness(10)`
- Expand: `AnimatePresence` height animation, shows desc + chip pills

### Team
- Card layout: horizontal flex (photo square + info column)
- Avatar: dark square (`border-radius: 4px`), `object-fit: cover`, `object-position: center top`
- Tabs: ALL / Core Leadership / Division Heads / Web Team
- Fallback: initials if no photo

### Stats
- Animated counters using Framer Motion `animate()` with `useInView`
- 4-column grid, each cell: big number + bold label + body sub-text

### Contact
- 2-col grid: left = big headline + desc, right = stacked clickable rows
- Each row: label (mono) + value (right-aligned) with hover background

### Footer
- Top: big `UGAC` wordmark (left) + nav link column (right)
- Bottom bar: copyright | Mumbai live clock | "Built by UGAC Web Team"

---

## Editing Rules

1. **All styles go in `App.css`** — never add inline styles except for one-off positioning or dynamic values
2. **Never use Tailwind, Bootstrap, or any CSS framework**
3. **Never change fonts** — only Barlow Condensed, Barlow, Space Mono
4. **Never change the color palette** — all colors via CSS variables only
5. **All content changes** (names, numbers, descriptions) go in the component data arrays at the top of each file
6. **Dark mode** must work for every new element — test both modes
7. **Responsive breakpoints**: 900px (tablet) and 600px (mobile) — already in App.css

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
