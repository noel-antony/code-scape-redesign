# 🚀 CodeScape — Company Website Redesign

**A modern, animated, fully responsive website for a software development agency.**  
Built with React, TypeScript, Tailwind CSS, and Framer Motion.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-EF008F?style=for-the-badge&logo=framer&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

---

## 📖 What Is This?

CodeScape is a **multi-page marketing website** for a software development agency. It showcases services, a blog, a careers section, and a contact page — all wrapped in a polished, animated UI with a dark theme, scroll-based animations, a custom cursor trail, and a responsive layout that works on all screen sizes.

This is a **frontend-only project** — there is no backend, no database, and no real form submission. All data (blog articles, job listings, team members) lives directly in the component files as TypeScript arrays.

---

## ✨ Features at a Glance

- 🎯 **Custom animated cursor trail** — fades out when the mouse stops moving
- 🎠 **Infinite logo marquee** — pauses on hover, no layout shift
- 📜 **Scroll-driven animations** — hero panels, cards, and text driven by `useScroll` + `useTransform`
- 🃏 **Services cards** — expand on hover, animated arrow direction change
- 💼 **Careers page** — click-to-expand job listings with staggered animations
- 📰 **Blog page** — featured article, category filter tabs, responsive card grid
- 🌐 **Page transitions** — smooth fade between routes via `PageTransition`
- 📱 **Fully responsive** — mobile, tablet, and desktop layouts throughout
- ♿ **Accessibility-aware** — ARIA labels, keyboard navigation, reduced-motion support

---

## 🖥️ Pages

| Route | File | Description |
|---|---|---|
| `/` | `pages/Home.tsx` | Hero, marquee, scroll panels, stats, CTA |
| `/services` | `pages/Services.tsx` | Service cards, process steps, CTA |
| `/blog` | `pages/Blog.tsx` | Featured post, category filters, article grid |
| `/careers` | `pages/Careers.tsx` | Culture section, job listings, perks |
| `/contact` | `pages/Contact.tsx` | Contact form, office info, map placeholder |
| `/about` | `pages/About.tsx` | Team, values, company story |

---

## 🗂️ Full Project Structure

```
code-scape-redesign/
│
├── client/                         # Everything that runs in the browser
│   ├── src/
│   │   ├── pages/                  # One file per route/page
│   │   │   ├── Home.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Blog.tsx
│   │   │   ├── Careers.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── About.tsx
│   │   │
│   │   ├── components/             # Reusable UI pieces
│   │   │   ├── Navbar.tsx          # Top navigation bar, mobile menu
│   │   │   ├── Footer.tsx          # Site footer with links
│   │   │   ├── Hero.tsx            # Animated landing hero section
│   │   │   ├── LogoMarquee.tsx     # Infinite scrolling client logos
│   │   │   ├── ParticleCursor.tsx  # Custom cursor trail effect
│   │   │   ├── PageTransition.tsx  # Fade wrapper between route changes
│   │   │   ├── FloatingIcons.tsx   # Ambient background icon animation
│   │   │   └── ui/                 # shadcn/ui primitives (Button, Card, etc.)
│   │   │
│   │   ├── hooks/                  # Custom React hooks
│   │   │   ├── use-contact.ts      # Fake contact form submit handler
│   │   │   ├── use-mobile.tsx      # Returns true if viewport is mobile
│   │   │   └── use-toast.ts        # Toast notification state manager
│   │   │
│   │   ├── lib/
│   │   │   └── utils.ts            # cn() helper — merges Tailwind classes safely
│   │   │
│   │   ├── App.tsx                 # Router setup, wraps all pages
│   │   ├── main.tsx                # React entry point, mounts <App /> to DOM
│   │   └── index.css               # Global styles, CSS variables, Tailwind base
│   │
│   └── index.html                  # HTML shell — Vite injects the bundle here
│
├── attached_assets/                # Source images used in the site
│   ├── CSArtboard_FULL_BG_LOGO_*.png   # Logo with background
│   ├── CSArtboard_NO_BG_LOGO_*.png     # Logo without background (transparent)
│   └── *.txt / *.pdf               # Original project brief documents
│
├── package.json                    # Project dependencies and npm scripts
├── package-lock.json               # Exact locked versions of every dependency
├── tsconfig.json                   # TypeScript compiler settings
├── vite.config.ts                  # Vite bundler config (aliases, plugins, port)
├── tailwind.config.ts              # Tailwind theme (colours, fonts, breakpoints)
├── postcss.config.js               # Runs Tailwind + Autoprefixer on CSS
├── components.json                 # shadcn/ui config (where to put generated components)
├── drizzle.config.ts               # DB config (unused — scaffolded but not wired up)
├── .gitignore                      # Tells git what NOT to commit
└── README.md                       # This file
```

---

## 🧠 Mental Models — How Everything Connects

### 1. How a page renders

```
main.tsx  →  App.tsx  →  <Route path="/services">  →  Services.tsx
                                                           ↓
                                               uses components from /components
                                               uses hooks from /hooks
                                               uses cn() from /lib/utils.ts
                                               styled by index.css + Tailwind
```

### 2. How styling works

There are **three layers** of styling that work together:

```
index.css                    →  defines CSS variables   e.g. --primary: 217 91% 60%
tailwind.config.ts           →  maps variables to names  e.g. primary: "hsl(var(--primary))"
Any component                →  uses Tailwind classes    e.g. className="bg-primary text-primary"
```

Changing `--primary` in `index.css` updates every single `bg-primary`, `text-primary`, and `border-primary` across the whole site instantly.

### 3. How routing works

```
App.tsx uses wouter (a tiny React router)

<Switch>
  <Route path="/"          component={Home} />
  <Route path="/services"  component={Services} />
  ...
</Switch>

Every page is wrapped in <PageTransition> which fades in/out on route change.
The Navbar and Footer live outside the Switch so they persist across all pages.
```

### 4. How animations work

Two tools are used depending on the type of animation:

| Tool | Used for |
|---|---|
| `framer-motion` `<motion.div>` | Element entrance animations, hover effects, stagger children |
| `framer-motion` `useScroll` + `useTransform` | Scroll-driven animations (parallax, cards entering on scroll) |

### 5. How shadcn/ui components work

shadcn/ui is **not a normal npm package**. When you add a component (e.g. Button), it copies the source code directly into `client/src/components/ui/`. This means:
- You own the code — edit it however you want
- It won't update automatically — that's intentional
- It uses Radix UI primitives under the hood for accessibility

### 6. How import aliases work

Instead of writing `../../components/Navbar`, you write `@/components/Navbar`.

```
vite.config.ts   →  "@/"      resolves to  "client/src/"
vite.config.ts   →  "@assets" resolves to  "attached_assets/"
tsconfig.json    →  mirrors the same aliases so TypeScript doesn't complain
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node)

### Install & Run

```bash
# 1. Install all dependencies
npm install

# 2. Start the local development server
npm run dev
```

Then open [http://localhost:5000](http://localhost:5000) in your browser.

### Other Commands

```bash
npm run build    # Compile to dist/ for production deployment
npm run preview  # Serve the dist/ build locally to test it
```

---

## 📦 Key Dependencies

| Package | Version | Why It's Here |
|---|---|---|
| `react` + `react-dom` | 18 | Core UI framework |
| `typescript` | 5 | Type safety across the whole codebase |
| `vite` | 5 | Dev server and production bundler |
| `tailwindcss` | 3 | Utility-first CSS — almost all styling |
| `framer-motion` | 11 | All animations (entrance, scroll, hover) |
| `wouter` | 3 | Client-side routing (lighter than React Router) |
| `@radix-ui/*` | various | Accessible headless UI primitives (via shadcn) |
| `lucide-react` | latest | Icon library — every icon in the site |
| `clsx` + `tailwind-merge` | latest | Power the `cn()` utility in `lib/utils.ts` |

---

## 🗑️ What You Can Safely Delete

| Path | Why it's safe |
|---|---|
| `node_modules/` | Regenerated by `npm install` |
| `dist/` | Regenerated by `npm run build` |
| `attached_assets/*.txt` | Original brief documents, not used in code |
| `attached_assets/*.pdf` | Same as above |
| `drizzle.config.ts` | DB config that was scaffolded but never used |

> ⚠️ **Do not delete** anything in `client/src/`, root config files, or logo images in `attached_assets/` — these cannot be regenerated.

---

## 🔌 Swapping in a Real Backend

Currently all data is hardcoded. To wire up a real API:

| Hook | File | What to replace |
|---|---|---|
| `useContact` | `hooks/use-contact.ts` | Replace the fake delay with a real `fetch()` POST |
| Blog articles | `pages/Blog.tsx` | Replace the `articles` array with a `useEffect` fetch |
| Job listings | `pages/Careers.tsx` | Replace the `roles` array with a `useEffect` fetch |

---

## 📄 License

This project is private. All rights reserved.
