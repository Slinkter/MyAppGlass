# AGENTS.md

## Stack
- Create React App 5 (`react-scripts`), React 18, plain JS/JSX — no TypeScript
- MUI v5, Formik + Yup for forms, Redux Toolkit (`src/store/store.js`, slices in `src/redux/`)
- Firebase v9 modular SDK. All Firestore/Auth/Storage calls go through functions exported from `src/firebase/firebase.js` — don't initialize or call Firebase directly from components
- Firestore collections: `users`, `links` (legacy), `employers`, `products`, `listOrden`

## Commands
- Package manager is pnpm (`pnpm-lock.yaml`; `pnpm-workspace.yaml` has `allowBuilds` needed by Firebase deps). Use `pnpm install`, not npm/yarn
- `pnpm start` — dev server (port 3000)
- `pnpm run build` — production build to `build/`
- Deploy: `pnpm run build && firebase deploy` (Hosting serves `build/` with SPA rewrites; default project `projectmina-5acdc`)
- `pnpm test` runs CRA/Jest, but there are no test files in the repo
- No lint script. Prettier config: 4-space indent, double quotes, semicolons, `trailingComma: "es5"`

## Env
- `.env` is committed and holds the `REACT_APP_*` Firebase web client config read in `src/firebase/firebase.js`. CRA only exposes vars with the `REACT_APP_` prefix; restart the dev server after changing them

## Structure
- All routes are defined in `src/index.js` (react-router-dom v6)
- `src/page/` = top-level/auth views · `src/pagedashboard/` = dashboard views (route targets) · `src/pageDashboardUI/CD*.jsx` = dashboard UI components · `src/PageReports/UI/` = report UI. Directory casing is inconsistent — match existing import paths exactly
- Views gate content with `<AuthProvider onUserLoggedIn=... onUserNotRegister=... onUserNotLoggedIn=...>` callback props (`src/components/AuthProvider.jsx`)
- Reusable documentation for the inventory logic lives at `docs/inventario-firebase.md`

## Gotchas
- This is NOT a Next.js app even though `next` is installed. Never import `next/head` or `next/link` (`src/page/ErrorView.jsx` does this today — treat as a bug); use react-router-dom
- Stock mutations must stay atomic: use `updateStock`/`updatePlusStock` (`increment()`) or `saveOrderAndDecreaseStock` (`writeBatch`) — never read-modify-write `cantidad`
- `createdAt` is stored as a string (ISO in products, `"sv"` locale format in orders); order reports sort/filter on it, so keep each collection's format consistent
- UI text and comments are in Spanish — keep new user-facing text in Spanish
- `productsSlice.js` reducers are empty stubs in this repo — if building on it, populate `setProducts` so order forms receive products
- README is stale CRA boilerplate (including stray credential lines); this file is authoritative
