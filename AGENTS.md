# AGENTS.md - MyAppGlass (GYA Glass & Aluminum)

## Project Overview
Next.js 16 (App Router) + Chakra UI v3 corporate portal for Glass & Aluminum Company S.A.C. Feature-Sliced Design (FSD) architecture. Static export to Firebase Hosting. Backend: Firebase Functions v2 (Node.js 20), Firestore, Resend.

## Key Commands

| Command | Purpose |
|---------|---------|
| `pnpm install` | Install dependencies |
| `pnpm run dev` | Start dev server (Next.js on port 3000) |
| `pnpm run build` | Production build (static export to `out/`) |
| `pnpm run lint` | ESLint on `src/` |
| `pnpm run typecheck` | `tsc --noEmit -p tsconfig.build.json` |
| `pnpm run test:run` | Vitest unit tests |
| `pnpm run deploy:hosting` | Build + deploy to Firebase Hosting |
| `pnpm run deploy:functions` | Deploy Firebase Functions |
| `cd functions && pnpm run serve` | Start Firebase emulators (requires Java JDK) |

**CI Order:** `lint` → `typecheck` → `test:run` → `build`

## Architecture (FSD)

```
src/app/          # Next.js routes only (layout.tsx, page.tsx) — thin wrappers
src/screens/      # Page compositions (imports from widgets/features)
src/widgets/      # Structural blocks (Navbar, Footer, FloatingActions)
src/features/     # Business domains (home, projects, services, blog, contacto) with own /data
src/shared/       # Generic UI (Aura), utils, config, providers, API
functions/        # Firebase Functions v2 (Node 20) — frozen unless explicitly requested
```

**Path aliases** (tsconfig.json): `@/*`, `@features/*`, `@shared/*`, `@widgets/*`, `@screens/*`

## Design System Conventions

- **Phi tokens** for all spacing: `phi_xs` (8px), `phi_sm` (13px), `phi_md` (21px), `phi_lg` (34px), `phi_xl` (55px)
- **120Hz performance**: Use `translateZ(0)` + `will-change` on animated elements; zero CLS via skeleton synchronization
- **Logger**: Use `@shared/utils/logger` — no `console.log` in production
- **Micro-interactions**: Max 2 CSS properties per hover/active; no `transition: all`

## Environment Setup

**Root `.env.local`** (required for dev):
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:5001/gya-app-4c8a9/us-central1/submitReclamo
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...
NEXT_PUBLIC_FIREBASE_* (all 8 Firebase config vars)
```

**functions/.env** (required for emulators):
```
RESEND_API_KEY=...
ADMIN_EMAIL=...
```

## Constraints & Gotchas

- **Backend frozen**: Do not modify `functions/`, `firestore.rules`, `storage.rules`, `firebase.json` unless explicitly asked
- **Static export**: `output: 'export'` in next.config.js — no server-side features
- **36/36 routes** must compile in `pnpm run build`
- **Zero lint errors** required (warnings OK for legacy `any`)
- **Java OpenJDK** required for `firebase emulators:start`
- **Company name**: "Glass & Aluminum Company S.A.C." everywhere
- **Spanish terms**: "antirruido" (double r), "vidrio y aluminio" (singular)

## Deployment

- **Preview**: Auto-deploys on PR to `main` via GitHub Actions (Firebase Preview Channel)
- **Production**: Auto-deploys on push to `main` (Firebase Hosting Live)
- **Functions**: Separate deploy via `pnpm run deploy:functions` or GitHub Actions

## Testing

- **Vitest** with jsdom, React Testing Library
- Tests in `tests/unit/` and `src/**/*.test.{ts,tsx}`
- Setup: `tests/setup.ts`
- Aliases configured in `vitest.config.ts`

## Documentation References

- `docs/01_ARCHITECTURE.md` — Data flows, compound components
- `docs/02_AI_HANDOFF.md` — Current state, FSD rules, next steps
- `docs/06_DOCS_DEVELOPMENT.md` — Local setup, Phi tokens, SEO
- `docs/08_DOCS_SECURITY_BACKEND.md` — Backend security details