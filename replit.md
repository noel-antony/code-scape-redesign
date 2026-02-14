# CODESCAPE - Technology Engineering Company Website

## Overview

CODESCAPE is a premium multi-page responsive website for a technology engineering company. It serves as a digital presence communicating reliability, scalability, and engineering expertise. The site features a dark professional theme with subtle blue accents, smooth animations, and an enterprise/SaaS feel. Pages include Home, Services, About, Case Studies, Careers, Blog, and Contact, with functional contact form and newsletter subscription backed by a PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, bundled via Vite
- **Routing**: Wouter (lightweight client-side router) with animated page transitions via Framer Motion
- **State Management**: TanStack React Query for server state (mutations for forms)
- **UI Components**: shadcn/ui component library (new-york style) built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming. Dark mode is the default and only theme. Custom color palette uses HSL variables defined in `client/src/index.css`
- **Forms**: react-hook-form with Zod validation via @hookform/resolvers
- **Animations**: Framer Motion for page transitions, scroll reveals, magnetic buttons, number counters. Canvas-confetti for celebration effects. Custom particle cursor effect on desktop
- **Fonts**: Inter (sans-serif) and JetBrains Mono (monospace), loaded via Google Fonts
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript, executed via tsx in development
- **API Pattern**: REST endpoints defined in `server/routes.ts`, with a shared route definition contract in `shared/routes.ts` that includes Zod schemas for input validation and response types
- **Build**: Custom build script (`script/build.ts`) using Vite for client and esbuild for server. Production output goes to `dist/` (server as `dist/index.cjs`, client as `dist/public/`)
- **Dev Server**: Vite dev server runs as middleware inside Express during development (`server/vite.ts`), with HMR support
- **Static Serving**: In production, Express serves the built client files from `dist/public/` with SPA fallback

### Shared Layer
- **Location**: `shared/` directory, imported by both client and server
- **Schema**: `shared/schema.ts` defines database tables and Zod validation schemas using Drizzle ORM and drizzle-zod
- **Routes**: `shared/routes.ts` defines API contract (paths, methods, input/output schemas) used by both client hooks and server handlers

### Data Storage
- **Database**: PostgreSQL via `DATABASE_URL` environment variable
- **ORM**: Drizzle ORM with PostgreSQL dialect (`drizzle-orm/node-postgres`)
- **Connection**: pg Pool in `server/db.ts`
- **Schema Push**: `npm run db:push` uses drizzle-kit to push schema changes
- **Migrations**: Output to `./migrations` directory
- **Tables**:
  - `contact_messages`: id (serial), name (text), email (text), company (text, nullable), message (text), created_at (timestamp)
  - `newsletter_subscribers`: id (serial), email (text, unique), created_at (timestamp)

### API Endpoints
- `POST /api/contact` - Submit contact form (name, email, company, message)
- `POST /api/newsletter` - Subscribe to newsletter (email). Uses `onConflictDoNothing` for duplicate emails

### Storage Pattern
- `server/storage.ts` implements `IStorage` interface with `DatabaseStorage` class
- This abstraction allows swapping storage implementations if needed

## External Dependencies

### Database
- **PostgreSQL** - Required. Must be provisioned and `DATABASE_URL` environment variable set

### Key NPM Packages
- **drizzle-orm** + **drizzle-kit** - ORM and migration tooling for PostgreSQL
- **express** - HTTP server framework
- **@tanstack/react-query** - Async state management on the client
- **framer-motion** - Animation library for page transitions and micro-interactions
- **wouter** - Lightweight React router
- **zod** - Schema validation shared between client and server
- **react-hook-form** - Form state management
- **shadcn/ui** (Radix UI primitives) - Full component library including dialog, toast, form, select, tabs, etc.
- **canvas-confetti** - Confetti animation effects
- **connect-pg-simple** - PostgreSQL session store (available but not currently used for sessions)
- **lucide-react** - Icon library

### Replit-specific
- **@replit/vite-plugin-runtime-error-modal** - Runtime error overlay in development
- **@replit/vite-plugin-cartographer** - Dev tooling (dev only)
- **@replit/vite-plugin-dev-banner** - Dev banner (dev only)