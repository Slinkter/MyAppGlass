# AGENTS.md

## Verified Commands

```bash
pnpm dev      # Dev server + image optimization
pnpm build    # Static build + image optimization
pnpm preview  # Serve dist/
pnpm lint     # ESLint
pnpm deploy:hosting   # build + firebase deploy --only hosting
pnpm deploy:functions # firebase deploy --only functions
```

## Stack

- Next.js 16 (static export) → `dist/`
- React 18 + Chakra UI v3 + Framer Motion
- Firebase (Hosting + Functions)
- pnpm

## Architecture

- Features: `src/features/[name]/` (projects, services, home, reclamation-book)
- Services: `src/features/*/services/*Service.ts` - data layer, no direct imports from src/data
- Shared: `src/shared/` (components, hooks, config)
- Path aliases: `@features`, `@shared`, `@layout`, `@`

## Image Pipeline

1. Place originals in `src/assets/`
2. Run `pnpm dev` or `node optimize-images.mjs`
3. Use `/images/*.webp` in code

## Build Notes

- `next.config.mjs`: output='export', distDir='./dist', images.unoptimized=true
- Static export requires `unoptimized: true` for images
- No Next.js server needed in production

## Testing

- No test framework configured
- Use `pnpm preview` to verify build locally at localhost:3000
- Firebase emulators: `firebase emulators:start` (if configured)