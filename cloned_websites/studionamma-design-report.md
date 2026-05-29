# Studio Namma — Design & Animation Scrape Report
> Scraped: 2026-05-10 | URL: https://studionamma.com/

---

## 1. Design Identity

### Typography
| Role | Font |
|---|---|
| Display / Hero headings | **Mixtape Extra Condensed** (custom) |
| Body / UI | **Mixtape** (custom) |
| Monospaced labels | **GT Pressura Mono** |
| Fallbacks | Lato, Times New Roman, sans-serif |

**CSS Type Scale (custom properties):**
```css
--_responsive---font-size--h1: 13rem;
--_responsive---line-height--h1: 10.5rem;
--_responsive---font-size--h2: 10rem;
--_responsive---line-height--h2: 8.6rem;
--_responsive---font-size--h3: 3.5rem;
--_responsive---line-height--h3: 3.2rem;
--_responsive---font-size--h4: 1.9rem;
--_responsive---line-height--h4: 2rem;
--_responsive---font-size--main: 1.4rem;
--_responsive---font-size--mono: 0.9rem;
```

### Color Palette (Light Mode Default)
| Token | Value | Usage |
|---|---|---|
| `--background` / `--light` | `#e4e4e4` | Page background |
| `--text` / `--dark` | `#111111` | Primary text |
| `--black` | `#000` | Strong elements |
| `--yellow` | `#f9fe02` | Accent (hover/CTA) |
| `--blue` | `blue` | Link accent |
| `--transparent` | `#fff0` | Overlays |
| Light grey fill | `#fafafa` | Secondary surfaces |
| Error/alert fill | `rgb(255,222,222)` | Form error state |

**Theme switching:** `html.theme-toggling` triggers `background-color 0.3s, color 0.3s` across `body`, `.preloader`, `.nav-menu`.

---

## 2. Animation Stack

### Libraries Detected
| Library | Version | Notes |
|---|---|---|
| **GSAP** | 3.15.0 | Core animation engine |
| **ScrollTrigger** | bundled w/ GSAP | All scroll-driven animations |
| **Lenis** | present | Smooth scroll inertia |
| **Webflow IX2** | present | Interaction triggers (hover, page load) |

---

## 3. CSS Animations (Keyframes)

### `spin` — loading spinner
```css
@keyframes spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
/* Applied to: .w-lightbox-spinner */
/* Duration: 0.8s linear infinite */
```

### `eYuqoB` — pulse/breathe (overlay element)
```css
@keyframes eYuqoB {
  0%   { opacity: 0.4; }
  100% { opacity: 1; }
}
/* Applied to: .iPjsPC::before */
/* Duration: 1.5s ease-in-out infinite alternate */
```

### `fYAlao` — WhatsApp typing dots
```css
@keyframes fYAlao {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.75; }
}
/* Applied to 3 dots with staggered delays: 0ms, 100ms, 200ms */
/* Duration: 1.2s linear infinite */
```

---

## 4. CSS Transitions (UI Micro-interactions)

| Selector | Transition | Effect |
|---|---|---|
| `.visual_wrapper.hover-effect` | `0.4s cubic-bezier(0.175, 0.885, 0.327, 1.41)` | Bouncy scale on project card hover |
| `.visual_wrapper-big.hover-effect` | `0.4s cubic-bezier(0.175, 0.885, 0.327, 1.41)` | Same bounce on large cards |
| `.custom-cursor` | `width 0.15s, height 0.15s, transform 0.1s linear, background 0.4s` | Cursor morphs on hover targets |
| `.home_intro_hover` | `0.4s` | Intro section hover state |
| `.contact_submit` | `0.2s ease-in-out` | Button feedback |
| `.skill_item` | `0.2s` | Skills list item hover |
| `.blue-link` | `color 0.3s` | Link color fade |
| `.related-articles_visual` | `opacity 0.3s` | Article thumbnail fade |
| `.vimeo-bg__placeholder` | `opacity 0.3s linear` | Video placeholder fade |
| Dark mode toggle | `background-color 0.3s, color 0.3s` | Theme switch |

**Signature easing:** `cubic-bezier(0.175, 0.885, 0.327, 1.41)` — overshoot/spring feel on card hovers.

---

## 5. GSAP ScrollTrigger Animations

**27 active tweens/timelines** on page load. All scroll animations use scroll position ranges (px from top).

### Animation Classes & Patterns

| Class | GSAP Ease | Scroll Range | Effect |
|---|---|---|---|
| `.heading-appear` | `power4.out` | viewport-relative | Headlines slide+fade in from below |
| `.text-appear` | none (Webflow IX?) | staggered across ~700px | Body text fade-in line by line |
| `.mono-appear` | none | staggered ~22px apart | Monospaced label lines appear one-by-one |
| `.grow-appear` | `latestVisualAppear` (custom ease) | ~760px range | Project visuals scale up from small |
| `.visual_wrapper.is-home-video` | `latestVisualAppear` | 88→1279px | Hero video reveal on scroll |
| `.visual_overlay` | `customElementAppear` | 103→1279px | Overlay fades in over hero |
| `.line-appear` (services) | none | staggered ~107px apart | 7 service items reveal sequentially |
| `.simple-appear` | `power4.out` | 920→2407px | Single element clean fade-in |
| `.text-mono_wrapper` | custom | 5 instances across page | Mono text blocks slide in |
| `.small-link_arrow` | custom | 2 instances | Arrow icons animate into place |
| `.cta_visual` | custom | 5544→6366px | CTA media element entrance |
| `.footer_logo_fill` (SVG) | none, `scrub: 0.05` | 6368→6693px | Footer NAMMA wordmark draws/fills on scroll |
| `H2.line-appear` | none | 5242→6227px | Final section H2 reveals |

### Custom Named Easings
- `latestVisualAppear` — used for image/video grow reveals
- `customElementAppear` — used for overlay entrance
- `custom` — several instances (likely registered GSAP CustomEase)

---

## 6. Page Sections & Layout (Scroll Journey)

| Scroll Position | Section | Key Design Detail |
|---|---|---|
| 0px | **Hero** | "WE THINK CRAFT AND DESIGN" — 13rem Mixtape Extra Condensed, full-bleed |
| ~800px | **Intro statement** | "IT'S NEVER 'JUST A WEBSITE.' EVERY DETAIL MATTERS." — scroll-driven text reveal |
| ~2500px | **Selected Projects** | "PLAYGROUND" project — full-width typographic title |
| ~4000px | **Services** | "ART DIRECTION / BRANDING / WEBFLOW / DESIGN" in 10rem+ stacked type |
| ~6000px | **CTA** | "LET'S WORK TOGETHER" + project thumbnail filmstrip |
| ~7000px | **Footer** | Nav links left, contact right, giant "NAMMA" SVG wordmark scroll-fill at bottom |

---

## 7. Custom Cursor
CSS rule: `.custom-cursor { transition: width 0.15s, height 0.15s, transform 0.1s linear, background 0.4s }`
— Cursor scales and changes color depending on hover target type (standard Webflow cursor override pattern).

---

## 8. Other Notable Details
- **Real-time location + clock** in footer bar (Barcelona, Hong Kong, Los Angeles, Paris — rotating)
- **Dark mode toggle** in nav — smooth theme swap via `html.theme-toggling` class
- **Webflow Nominee badge** — right-edge fixed element
- **WhatsApp floating button** (bottom-right) with animated typing dots
- **Page built on Webflow** — confirmed by `window.Webflow` and Webflow IX2

---

## Output Files
| File | Contents |
|---|---|
| `studionamma-hero.png` | Hero viewport screenshot |
| `studionamma-section2.png` | Intro tagline section |
| `studionamma-section3.png` | Selected Projects / PLAYGROUND |
| `studionamma-section4.png` | Services section |
| `studionamma-section5.png` | CTA + project thumbnails |
| `studionamma-footer.png` | Footer + NAMMA wordmark |
| `studionamma-design-tokens.json` | Full CSS tokens, fonts, colors, keyframes, transitions |
| `studionamma-animations.json` | Live Web Animations API snapshot + library detection |
| `studionamma-gsap-details.json` | All 50+ ScrollTrigger instances with triggers/ranges/easings |
