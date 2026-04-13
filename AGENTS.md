# AGENTS.md - Developer Guide for MyAppGlass

Next.js 15 + React 19 app using Chakra UI v3, Firebase, and pnpm.

## Commands

```bash
pnpm dev          # Dev server (port 3000)
pnpm build        # Production build (.next/)
pnpm start        # Production server
pnpm py           # Build + Python preview (port 5000)
pnpm lint         # Next.js lint (ESLint)
pnpm clean        # Remove node_modules, .next, functions/node_modules
pnpm deploy:hosting    # Build + Firebase Hosting
pnpm deploy:functions # Deploy Cloud Functions (CommonJS)
```

## Structure

```
app/                    # Next.js App Router
├── layout.tsx          # Root layout (RSC)
├── page.tsx            # Home page
└── providers.tsx       # Chakra/Theme providers (client)
src/
├── features/           # Feature domains (home, projects, services, reclamation-book)
├── shared/             # Reusable components, hooks
├── theme/              # Chakra v3 tokens
└── lib/                # Firebase config
functions/              # Cloud Functions (CommonJS)
```

## Conventions

- Use `'use client'` only when needed (hooks, interactivity)
- Use Chakra theme tokens (`bg.page`, `text.accent`) over hardcoded colors
- Import path aliases: `@/` → `src/`, `@features`, `@shared`, `@lib`
- React version in eslint.config.js: 18.2
- Firebase initialized in `src/lib/firebase.ts`

## Firebase

- Firestore for data; use `onSnapshot` for real-time, `getDocs` for one-time
- Auth via `onAuthStateChanged`
- Cloud Functions: CommonJS, deploy with `pnpm deploy:functions`

## Linting

ESLint includes React, React Hooks, and jsx-a11y rules. Some rules adjusted:
- `react/prop-types`: off
- `react/react-in-jsx-scope`: off
- Functions directory has relaxed rules for CommonJS