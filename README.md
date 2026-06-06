# Velocity Atelier

Velocity Atelier is an immersive editorial landing experience for a private hypercar atelier. It presents a cinematic, high-performance brand surface with scroll-driven motion, magnetic interactions, custom cursor treatment, and a refined visual system built around luxury automotive storytelling.

## GitHub Description

Immersive TanStack Start landing page for a fictional private hypercar atelier, built with React, Tailwind CSS, GSAP, Lenis, and Cloudflare Workers.

## Features

- Cinematic full-screen hero with responsive image treatment
- Scroll-triggered animation and horizontal specification marquee
- Smooth scrolling powered by Lenis
- GSAP-powered motion details and custom cursor interactions
- Responsive editorial sections for collection, metrics, atelier story, and footer
- SSR-ready TanStack Start setup
- Cloudflare Workers deployment configuration with static assets

## Tech Stack

- React 19
- TanStack Start
- TanStack Router
- TanStack Query
- Vite
- Tailwind CSS 4
- GSAP
- Lenis
- Radix UI primitives
- Bun
- Cloudflare Workers

## Getting Started

Install dependencies:

```bash
bun install --frozen-lockfile
```

Start the development server:

```bash
bun run dev
```

Build for production:

```bash
bun run build
```

Preview the production build:

```bash
bun run preview
```

Run linting:

```bash
bun run lint
```

## Cloudflare Deployment

This project includes a `wrangler.toml` file for Cloudflare Workers deployment.

The Worker entry is generated at:

```text
dist/server/server.js
```

Static browser assets are generated at:

```text
dist/client
```

The Cloudflare Worker uses:

```toml
compatibility_flags = ["nodejs_compat"]
```

This is required because the TanStack Start server bundle uses Node-compatible APIs in the Cloudflare runtime.

Deploy with Wrangler:

```bash
npx wrangler deploy
```

## Project Structure

```text
src/
  assets/          Image assets used by the experience
  components/      Reusable UI and motion components
  hooks/           Shared React hooks
  lib/             Server config, error handling, and helpers
  routes/          TanStack Router routes
  router.tsx       Router setup
  server.ts        Cloudflare-compatible SSR server entry
  start.ts         TanStack Start instance
  styles.css       Global styles and Tailwind theme

dist/
  client/          Production browser assets
  server/          Production server bundle
```

## Notes

- The app is optimized for a polished, visual-first brand presentation.
- Use Bun for installs so the committed `bun.lock` remains the source of truth.
- The Cloudflare deployment should be treated as a Worker with static assets, not as a static-only Pages deployment.

