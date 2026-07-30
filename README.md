# Noir Vert — Coffee House

A cinematic, immersive single-page website for a fictional luxury coffee
brand. Built with React, Vite, React Three Fiber, GSAP, Framer Motion, and
Lenis smooth scrolling. Plain CSS only — no CSS frameworks.

## Stack

- **React 18 + Vite** — app shell and dev/build tooling
- **React Three Fiber + drei + Three.js** — the animated 3D coffee cup scene
  in the hero (procedurally built from primitive geometry, no external
  model files, so it loads instantly)
- **GSAP + ScrollTrigger** — scroll-triggered reveals, counters, parallax
- **Framer Motion** — mobile nav, lightbox, testimonial transitions
- **Lenis** — smooth, inertia-based scrolling synced to ScrollTrigger
- **React Icons** — iconography

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    Loader/       animated bean logo + progress screen
    Cursor/       custom ambient cursor (desktop only)
    Navbar/       transparent → blurred sticky nav
    Hero/         hero copy + Hero/Scene.jsx (the R3F canvas)
    Menu/         glass menu cards with 3D pointer tilt
    About/        animated counters, timeline, parallax image
    Gallery/      grid gallery + lightbox
    Rewards/      membership tiers
    Testimonials/ quote carousel
    Locations/    stylised map + store list
    Contact/      validated contact form
    Footer/       newsletter + sitemap + socials
  hooks/
    useLenis.js     sets up smooth scrolling, syncs GSAP ScrollTrigger
    useMagnetic.js  magnetic hover effect for buttons
    useReveal.js    scroll-triggered fade/slide-in for `.reveal` elements
  styles/
    variables.css   design tokens (color, type, spacing, motion)
  index.css         global styles, layout utilities, buttons
```

## Design tokens

| Token | Value | Use |
|---|---|---|
| `--c-bg` | `#07120D` | Page background |
| `--c-green-dark` | `#103326` | Deep panels |
| `--c-emerald` | `#2E8B57` | Accent, timeline |
| `--c-gold` | `#D9B66F` | Primary accent, CTAs |
| `--c-cream` | `#F6F2E8` | Body text on dark |
| `--f-display` | Fraunces | Headings |
| `--f-body` | Manrope | Body copy |

## Notes

- The 3D scene is entirely procedural (spheres, cylinders, tori) so there
  are no binary asset dependencies — swap in your own `.glb` model in
  `Hero/Scene.jsx` if you have one.
- Respects `prefers-reduced-motion`: Lenis falls back to instant scroll and
  global CSS shortens/removes animations.
- All interactive elements have visible focus states and ARIA labels for
  keyboard and screen-reader users.
- Gallery, menu, and location imagery use CSS gradients as placeholders —
  drop real photography into the relevant components when ready.
