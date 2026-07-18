# SKILL.md — Techniques Learned Building the UGAC Website

A personal reference of non-obvious patterns discovered during this project.
Each entry has the problem, the wrong path, and the working solution.

---

## 1. Scroll-Driven SVG Wordmark Scale (Footer UGAC)

**What it does:** As the user scrolls into the footer section, the giant "UGAC" text
grows vertically from flat → full height, like Studio Namma's wordmark.

**The key insight:**
SVG with `preserveAspectRatio="none"` + Framer Motion `scaleY` stretches the letters
vertically without changing their width. This only works because the SVG stretches
independently of its CSS dimensions.

**Working code:**
```jsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const giantRef = useRef(null);

const { scrollYProgress } = useScroll({
  target: giantRef,
  offset: ['start end', 'end end'],  // tracks from entering viewport bottom → reaching bottom
});

// Start at basically 0, end at full scale. The tiny intermediate value
// avoids a jarring jump from 0 to visible.
const scaleY = useTransform(scrollYProgress, [0, 0.0000001, 1], [0, 0.0000000000001, 1]);

// In JSX:
<div ref={giantRef}>
  <motion.svg
    viewBox="0 0 1000 280"
    preserveAspectRatio="none"        // ← critical: allows Y-axis stretch
    style={{ scaleY, transformOrigin: '50% 0%' }}  // ← grows downward from top
  >
    <text
      x="0" y="260"
      textLength="970"                // ← forces text to fill full SVG width
      lengthAdjust="spacingAndGlyphs"
      fontFamily="'Barlow Condensed', sans-serif"
      fontWeight="600"
      fontSize="320"
      fill="currentColor"
    >
      UGAC
    </text>
  </motion.svg>
</div>
```

**CSS:**
```css
.footer-giant-svg {
  display: block;
  width: 100%;
  height: 36.4vw;   /* controls the full-height target size */
  color: var(--fg);
}
```

**Pitfalls:**
- `transformOrigin: '50% 100%'` grows upward (wrong). Use `'50% 0%'` to grow downward.
- Without `preserveAspectRatio="none"`, the SVG maintains aspect ratio and the effect doesn't work.
- The footer being the last element means there's no extra scroll distance. If the animation
  feels too fast, wrap the section in a taller container (e.g., `min-height: 120vh`) to
  give the scroll more room.

---

## 2. Per-Letter Hover Color on SVG Text

**What it does:** Hovering each letter of "UGAC" changes it to its corresponding
brand color, with a smooth transition.

**The key insight:**
Split one `<text>UGAC</text>` into four individual `<motion.text>` elements,
each positioned using `x = index * (totalWidth / 4)`. Track which letter is hovered
with a single `useState(null)`.

**Working code:**
```jsx
const [hoveredLetter, setHoveredLetter] = useState(null);

const letterColors = {
  U: '#1A3A52',
  G: '#2F5E7C',
  A: '#1E8B8B',
  C: '#4DB8A8',
};

const letters = ['U', 'G', 'A', 'C'];

// In JSX (inside the motion.svg):
{letters.map((letter, idx) => (
  <motion.text
    key={letter}
    x={idx * 242.5}          // 970 total width / 4 letters = 242.5 each
    y="260"
    textLength="242.5"
    lengthAdjust="spacingAndGlyphs"
    fill={hoveredLetter === letter ? letterColors[letter] : 'currentColor'}
    onMouseEnter={() => setHoveredLetter(letter)}
    onMouseLeave={() => setHoveredLetter(null)}
    animate={{ fill: hoveredLetter === letter ? letterColors[letter] : 'currentColor' }}
    transition={{ duration: 0.2 }}
    style={{ cursor: 'pointer' }}
    // ... same font props as before
  >
    {letter}
  </motion.text>
))}
```

**Pitfall:** `animate={{ fill }}` on `motion.text` works but the value must be a valid
CSS color string. Framer Motion interpolates between hex colors correctly.

---

## 3. Division Row Hover — Fill Wipe + Content Flip

**What it does:** Hovering a division row fills the background from bottom-to-top,
and all text/icons flip to the inverse color — like Studio Namma's service rows.

**The key insight:**
Overlay a `::before` pseudo-element (or a child div) that `scaleY(0→1)` on hover.
Set the row's children to use CSS `mix-blend-mode: difference` OR simply override
color in a `.div-row:hover` block. The second approach is simpler and more reliable.

**Working CSS:**
```css
.div-row {
  position: relative;
  overflow: hidden;
}
.div-row-hover-bg {
  position: absolute;
  inset: 0;
  background: var(--fg);
  transform: scaleY(0);
  transform-origin: bottom center;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 0;
}
.div-row:hover .div-row-hover-bg {
  transform: scaleY(1);
}
/* Flip all content on hover */
.div-row:hover .div-row-name,
.div-row:hover .div-row-arrow {
  color: var(--bg);
}
/* Logo goes white on hover */
.div-row:hover .div-logo {
  filter: brightness(10);
}
```

---

## 4. Smooth Scroll-Driven Video Scrubbing (The Hard Way vs The Right Way)

### The Wrong Way — `video.currentTime` on every scroll event

```js
// ❌ This causes lag — browser queues seeks faster than it can decode
window.addEventListener('wheel', (e) => {
  video.currentTime = progress * video.duration;
});
```

**Why it lags:** MP4/H.264 video stores full frames only at keyframes (typically every
2–5 seconds). Seeking between keyframes forces the browser to decode backwards from the
nearest keyframe. When wheel events fire at 60–120/s, seeks queue up faster than they
resolve → stutter.

### The Less Wrong Way — `fastSeek()` + RAF decoupling

```js
// Better, but still limited by keyframe interval
const targetRef = useRef(0);

// Wheel only writes a number — never seeks
window.addEventListener('wheel', (e) => {
  targetRef.current = clamp(targetRef.current + e.deltaY / 3000, 0, 1);
}, { passive: false });

// RAF reads it once per frame — max 60 seeks/second instead of 120+
const tick = () => {
  const t = targetRef.current * video.duration;
  if (video.fastSeek) video.fastSeek(t);  // nearest keyframe, faster
  else video.currentTime = t;
  requestAnimationFrame(tick);
};
```

**Still limited by keyframe interval.** If the video has keyframes every 5 seconds,
scrubbing will always stutter between them.

### The Right Way — Apple-Style Image Sequence on Canvas

Extract video frames as JPEGs, preload into memory, draw with `canvas.drawImage()`.
This is what apple.com uses for scroll-driven product animations.

**Step 1 — Extract frames with Python/OpenCV:**
```python
import cv2, os

src    = 'public/videos/analytics.mp4'
outdir = 'public/frames/analytics'
os.makedirs(outdir, exist_ok=True)

cap = cv2.VideoCapture(src)
i   = 0
while True:
    ret, frame = cap.read()
    if not ret: break
    cv2.imwrite(f'{outdir}/{i:04d}.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 65])
    i += 1
cap.release()
print(f'{i} frames extracted')
```

**Step 2 — Preload all frames in React:**
```js
const framesRef  = useRef([]);
const [loaded, setLoaded] = useState(false);

useEffect(() => {
  let done = 0;
  for (let i = 0; i < FRAME_COUNT; i++) {
    const img = new Image();
    img.src = `/frames/analytics/${String(i).padStart(4, '0')}.jpg`;
    img.onload = () => { done++; if (done === FRAME_COUNT) setLoaded(true); };
    framesRef.current.push(img);
  }
}, []);
```

**Step 3 — RAF draw loop:**
```js
const targetRef  = useRef(0);
const drawnIdx   = useRef(-1);

useEffect(() => {
  const canvas = canvasRef.current;
  const ctx    = canvas.getContext('2d');

  const tick = () => {
    const idx = Math.floor(targetRef.current * FRAME_COUNT);
    if (idx !== drawnIdx.current) {              // only draw if frame changed
      const img = framesRef.current[idx];
      if (img?.complete) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawnIdx.current = idx;
      }
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}, [loaded]);
```

**Step 4 — Wheel accumulator (unchanged):**
```js
window.addEventListener('wheel', (e) => {
  e.preventDefault();
  let dy = e.deltaY;
  if (e.deltaMode === 1) dy *= 32;   // lines → pixels
  if (e.deltaMode === 2) dy *= 600;  // pages → pixels
  targetRef.current = clamp(targetRef.current + dy / 3000, 0, 1);
}, { passive: false });
```

**Why this is smooth:**
- JPEG images are fully decoded into memory on preload
- `canvas.drawImage()` is a GPU blit — takes < 1ms
- No decode latency at all during scrubbing
- Works at true 60fps regardless of video encoding

**Trade-off:** Initial load time (frames must download first).
Show a loading screen and hide it when all frames are ready.

**Rule of thumb for frame size:**
- 24fps × video duration = frame count
- Target < 15MB total → use JPEG quality 60–70
- For 8s video: 192 frames × ~57KB = ~11MB ✓

---

## 5. deltaMode Normalisation for Cross-Device Scroll

Trackpads and mouse wheels report `deltaY` differently.
Always normalise before using scroll delta:

```js
const onWheel = (e) => {
  let dy = e.deltaY;
  if (e.deltaMode === 1) dy *= 32;   // Firefox line mode
  if (e.deltaMode === 2) dy *= 600;  // page mode (rare)
  // now dy is always in pixels
};
```

---

## 6. React Performance — Refs vs State in Hot Paths

The rule: **anything that changes on every scroll tick must live in a `useRef`, not `useState`.**

`useState` triggers a React re-render. Re-renders during scroll = jank.

```js
// ❌ causes re-render on every wheel event
const [progress, setProgress] = useState(0);
onWheel: setProgress(p + delta);

// ✅ zero re-renders, value still readable anywhere via ref
const progressRef = useRef(0);
onWheel: progressRef.current = clamp(progressRef.current + delta, 0, 1);
```

Only use `useState` for things that **must** cause a DOM update — like which section
label to display. And even then, guard with `prev !== next` to skip unnecessary renders.

---

## 7. Preloader — ClipPath Wipe Exit

A full-screen preloader that wipes upward to reveal the page beneath.

```jsx
<motion.div
  className="preloader"
  exit={{ clipPath: 'inset(0 0 100% 0)' }}   // top stays, bottom rises to meet it
  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
>
  ...
</motion.div>
```

```css
.preloader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  clip-path: inset(0 0 0% 0);   /* initial: fully visible */
}
```

The exit animation changes `inset(0 0 0% 0)` → `inset(0 0 100% 0)`,
which collapses the visible area upward — a clean editorial wipe.

---

## 8. Animated Big Text Reveal (Character-by-Character Wipe Up)

**What it does:** Large display headlines animate in letter-by-letter, each character
sliding up from behind a hidden overflow mask — like a theatrical curtain reveal.
Used on section titles throughout the site (`SplitTextReveal` component).

**The key insight:**
Three nested layers:
1. `.split-line` — `overflow: hidden` acts as the mask/clipping box
2. `.split-word` — groups characters into words so spaces don't break
3. `.split-char` — each individual character, animates `y: '92%' → '0%'`

Because `.split-line` clips everything below its baseline, the characters appear to
rise up from underneath — they're always there, just hidden until they animate up.

**Working component (full reusable version):**
```jsx
import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

function renderChars(text) {
  return Array.from(text).map((char, i) => (
    <motion.span
      key={`${char}-${i}`}
      className="split-char"
      aria-hidden="true"
      variants={{
        hidden: { y: '92%', opacity: 0 },
        show:   { y: '0%',  opacity: 1 },
      }}
      transition={{ duration: 0.85, ease }}
    >
      {char}
    </motion.span>
  ));
}

export default function SplitTextReveal({ as = 'div', text, className = '', delay = 0 }) {
  const Tag   = motion[as] || motion.div;
  const lines = String(text).split('\n');
  const label = lines.join(' ');

  return (
    <Tag
      className={`${className} split-text-reveal`}
      aria-label={label}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={{
        hidden: {},
        show:   { transition: { delay, staggerChildren: 0.035 } },
      }}
    >
      {lines.map((line, li) => (
        <span key={li} className="split-line" aria-hidden="true">
          {line.split(/(\s+)/).map((part, pi) =>
            /\s+/.test(part)
              ? <span key={pi} className="split-space">{part.replace(/ /g, ' ')}</span>
              : <span key={pi} className="split-word">{renderChars(part)}</span>
          )}
        </span>
      ))}
    </Tag>
  );
}
```

**Required CSS (must go at the top of your stylesheet):**
```css
.split-line {
  display: block;
  overflow: hidden;       /* ← the clipping mask */
  padding-bottom: 0.06em; /* prevents descenders (g, y, p) from being clipped */
  margin-bottom: -0.06em; /* cancels the extra spacing the padding adds */
}
.split-word {
  display: inline-block;
  white-space: nowrap;    /* keeps word together, space splits happen between words */
}
.split-char {
  display: inline-block;
  will-change: transform, opacity; /* hints GPU layer for smoother animation */
}
.split-space {
  display: inline-block;
}
```

**Usage:**
```jsx
<SplitTextReveal as="h2" className="section-title" text="We Are\nUGAC" />
<SplitTextReveal as="h1" text="Impact in Numbers" delay={0.2} />
```

**How `staggerChildren: 0.035` works:**
Framer Motion's parent `variants` propagates to all `motion.span` children.
Each child animates 35ms after the previous one — creates the cascading letter effect
without manually setting `delay` on every character.

**Accessibility note:**
The outer element gets `aria-label` with the full text. All inner spans get
`aria-hidden="true"`. Screen readers see only the label, not each individual character.

**Pitfall — descender clipping:**
Without `padding-bottom: 0.06em` + `margin-bottom: -0.06em` on `.split-line`,
letters like `g`, `y`, `p` get clipped at the bottom by `overflow: hidden`.
The padding creates breathing room; the negative margin cancels the layout shift.

**Pitfall — `opacity: 0` on hidden state:**
`y: '92%'` alone is enough visually, but without `opacity: 0` you may see a ghost
of the character outside the overflow clip region on some browsers. Always pair both.

---

## 9. Image Logo Extraction with Python

When you have a composite image of logos and need individual transparent PNGs:

```python
from PIL import Image
import numpy as np, os

img  = Image.open('logos-grid.png').convert('RGBA')
arr  = np.array(img)

# Find content (non-white) pixels
content = np.all(arr[:, :, :3] < 230, axis=2)

def save_logo(name, x1, y1, x2, y2, tolerance=230):
    crop = img.crop((x1, y1, x2, y2)).copy()
    data = crop.getdata()
    # Make white pixels transparent
    new_data = [
        (r, g, b, 0) if r > tolerance and g > tolerance and b > tolerance
        else (r, g, b, a)
        for r, g, b, a in data
    ]
    crop.putdata(new_data)
    bbox = crop.getbbox()           # auto-trim transparent border
    if bbox:
        crop = crop.crop(bbox)
    crop.save(f'{name}.png')
```

**Key lesson:** After cropping cells in a grid, there can be 1–2px bleed from adjacent
logos. Use numpy to detect non-white content columns/rows and set crop boundaries to
where actual content starts — don't just divide by column count.

---

## 10. Tabbed Page with Search + Pagination (Wiki/SSS Page)

A reusable pattern for content-heavy pages that replaces long-scroll sections with tab-based navigation.

### Structure
```jsx
<Tabs>       → sticky tab bar, justify-content: center
<Panel>      → AnimatePresence mode="wait" switches content
  <Search>   → live filter input
  <List>     → paginated session cards
  <Pagination> → prev / page numbers / next
</Panel>
```

### Search (Live Filter)
```jsx
function matchesSearch(session, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    session.course.toLowerCase().includes(q) ||
    session.name.toLowerCase().includes(q) ||
    session.takers.some(t => t.name.toLowerCase().includes(q)) ||
    session.tags.some(tag => tag.toLowerCase().includes(q)) ||
    session.desc.toLowerCase().includes(q)
  );
}
```
- Runs on every keystroke via `useMemo` over the full list
- `setPage(1)` on every search change to reset pagination

### Pagination
```jsx
const PAGE_SIZE = 4;
const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
```
- Prev/Next buttons with `:disabled` state
- Numbered buttons with `.wiki-page-btn--active` class
- Container: `justify-content: center`, `border-top` separator

### Connecting Nav Links to Tabs
Each tab button gets `id="wiki-{key}"`. The navbar `scrollTo()` function detects `<button>` elements and calls `.click()` instead of `scrollIntoView`:
```js
function scrollTo(hash) {
  const id = hash.replace('#', '');
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.tagName === 'BUTTON' || el.getAttribute('role') === 'tab') {
      el.click();              // ← switches tab
    } else {
      el.scrollIntoView({ behavior: 'smooth' });  // ← scrolls to section
    }
  }, 80);
}
```

---

## 11. Calendar with Multiple Sessions Per Day

### Display
- First course code shown on date cell
- `+N` badge for additional sessions
- Course code uses `text-overflow: ellipsis` for long names

```jsx
const codes = daySessions.map(s => s.course);
const extra = codes.length > 1 ? codes.length - 1 : 0;

<button className="cal-cell">
  <span className="cal-num">{d}</span>
  <div className="cal-codes-wrap">
    <span className="cal-codes">{codes[0]}</span>
    {extra > 0 && <span className="cal-extra">+{extra}</span>}
  </div>
</button>
```

```css
.cal-codes-wrap { display: flex; align-items: center; gap: 2px; max-width: 100%; }
.cal-codes { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
.cal-extra { font-size: 0.4rem; padding: 1px 3px; border-radius: 2px; background: var(--bg-card); flex-shrink: 0; }
```

### Selected + Today States
```css
.cal-cell--sel { background: var(--fg) !important; }
.cal-cell--sel .cal-num { color: var(--bg); }
.cal-cell--sel .cal-codes { color: rgba(240,239,234,0.7); }
.cal-cell--sel .cal-extra { color: rgba(240,239,234,0.5); background: rgba(240,239,234,0.12); }
.cal-cell--today .cal-num { box-shadow: inset 0 0 0 1.5px var(--fg); border-radius: 50%; }
```

---

## 12. Grid with Unfilled Cells — Avoiding Grey Patches

**Problem:** A 2-column grid with 5 items leaves an empty cell showing `var(--border)` background.

**Solution:** Replace `gap: 1px + background: var(--border)` with individual item borders.

```css
/* ❌ Bad — empty cell shows grey */
.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--border); }

/* ✅ Good — empty cell is white because grid bg is var(--bg) */
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  background: var(--bg);
  border: 1px solid var(--border);
  border-right: none;
  border-bottom: none;
}
.item {
  border-bottom: 1px solid var(--border);
  border-right: 1px solid var(--border);
}
.item:nth-child(even) { border-right: none; }
.item:nth-last-child(-n+2) { border-bottom: none; }
```

Works for any column count. The `:nth-child(even)` removes right border from 2nd column, and `:nth-last-child(-n+2)` removes bottom border from the last row.

---

## 13. Responsive Sizing Strategy with `clamp()`

Every visible text size uses `clamp(min, preferred, max)` to scale with viewport.

### Formula
```css
/*             min size   preferred (vw)   max size  */
font-size: clamp(0.82rem, 0.95vw,     0.95rem);
```

### Typical values
| Element | clamp |
|---------|-------|
| Hero title | `clamp(3rem, 8vw, 7rem)` |
| Section title | `clamp(2.5rem, 6vw, 5rem)` |
| Card name | `clamp(1.1rem, 1.8vw, 1.45rem)` |
| Body text | `clamp(0.85rem, 0.95vw, 0.95rem)` |
| Tab label | `clamp(0.62rem, 0.75vw, 0.78rem)` |
| Calendar num | `clamp(0.85rem, 1vw, 1.05rem)` |
| Status pill | `clamp(0.55rem, 0.6vw, 0.62rem)` |
| Calendar codes | `clamp(0.48rem, 0.6vw, 0.65rem)` |

### Counter-example (avoid)
```css
/* ❌ Too small on desktop, doesn't scale */
font-size: 0.82rem;

/* ✅ Scales from 0.82rem on mobile to 0.95rem on desktop */
font-size: clamp(0.82rem, 0.95vw, 0.95rem);
```

**Rule:** Never use bare `rem` for visible text. Always use `clamp()`.

---

## 14. Card Hover Fill Animation (Studio Namma style)

A `::before` pseudo-element slides in from the top on hover and reverses on mouse leave.

```css
.card {
  position: relative;
  background: var(--bg);
  transition: background 0.2s;
}
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background: var(--bg-card);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.4s var(--ease-out);
}
.card:hover::before,
.card--open::before { transform: scaleY(1); }
.card:hover,
.card--open { background: transparent; }  /* let pseudo-element show through */

/* All content sits above the pseudo-element */
.card-top { position: relative; z-index: 1; }
.card-body { position: relative; z-index: 1; }
```

### Why `transform-origin: top` instead of bottom?
Growing from top feels more natural for a list of cards — each card reveals downward as you hover, and the card below it is visually "pushed" by the expanding fill.

---

## 15. Navbar — 3 Separate Floating Elements (Lesse Studio style)

Three independent fixed-position elements that float above the page:

| Element | Position | Background |
|---------|----------|------------|
| `.nav-logo` | `top: 0.75rem; left: 1.25rem` | `rgba(13,13,12,0.5)`, `backdrop-filter: blur(10px)` |
| `.nav-fill` | `top: 0.75rem; left: 50%; transform: translateX(-50%)` | `rgba(13,13,12,0.85)`, `backdrop-filter: blur(16px)` |
| `.nav-cta-fab` | `top: 0.75rem; right: 1.25rem` | `#f0efea` (white) |

### Contextual Links
Links change based on the route. On the Wiki page, the nav shows tab-related links:
```jsx
const HOME_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Divisions', href: '#divisions' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
  { label: 'SSS Wiki', href: '/wiki' },
];

const WIKI_LINKS = [
  { label: 'Resources', href: '#wiki-resources' },
  { label: 'Calendar', href: '#wiki-calendar' },
  { label: 'Upcoming', href: '#wiki-upcoming' },
  { label: 'Archive', href: '#wiki-archive' },
  { label: 'Contact', href: '#wiki-contact' },
];
```

### No hamburger menu
All links are always visible inline. On mobile (≤900px), `.nav-cta-fab` is hidden, `.nav-logo` becomes a solid bar on the left, and `.nav-fill` shifts to the right with scrollable links.
