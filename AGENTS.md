# AGENTS.md - Developer Guide for MyAppGlass

React 18 + Vite application using Chakra UI, Firebase (Firestore + Cloud Functions), and pnpm.

## Available Commands

### Development
```bash
pnpm dev          # Start dev server on port 5173
pnpm build        # Production build to dist/
pnpm preview      # Preview production build locally
```

### Linting & Code Quality
```bash
pnpm lint         # ESLint with all rules, fail on warnings
```

### Testing
No test framework configured. Install Vitest first: `pnpm add -D vitest @vitest/ui`
```bash
pnpm vitest run --grep "pattern"         # Run tests matching pattern
pnpm vitest run --testNamePattern "name" # Run specific test by name
```

### Deployment
```bash
pnpm deploy:hosting    # Build and deploy to Firebase Hosting
pnpm deploy:functions # Deploy Firebase Cloud Functions
pnpm predeploy         # Build before deployment
```

### Utilities
```bash
pnpm clean       # Remove node_modules, dist, functions/node_modules
pnpm analyze     # Build with bundle visualization
```

## Code Style Guidelines

### General Principles
- Use ESM with `import`/`export` syntax
- Follow ESLint rules in `eslint.config.js` (uses flat config)
- Write self-documenting code; avoid unnecessary comments
- Use TypeScript-like JSDoc patterns for complex functions

### Formatting
- 2 spaces for indentation
- Double quotes for JSX attributes/elements, single quotes elsewhere
- Trailing commas in multi-line objects/arrays
- Max line length: 100 characters (soft limit)
- Use semicolons
- PascalCase for components, camelCase for variables/functions

### Imports (order matters)
1. React/core (react, react-dom, react-router-dom)
2. External UI (chakra-ui, framer-motion)
3. Firebase/config
4. Path aliases (`@/`, `@features/`, `@shared/`, `@layout/`)
5. Relative imports
6. Type imports (use `import type` when only using types)

### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `HomePage`, `ProductCard` |
| Hooks | camelCase + `use` | `useAuth`, `useFetchProducts` |
| Utilities | camelCase | `scrollToTop`, `formatDate` |
| Constants | UPPER_SNAKE_CASE | `MAX_UPLOAD_SIZE` |
| Files (components) | PascalCase | `HomePage.jsx` |
| Files (hooks/utils) | camelCase | `useAuth.js` |

### File Organization
```
src/
├── api/           # API service functions
├── config/        # Configuration (theme, Firebase)
├── features/      # Feature-based modules
├── layout/        # Layout components
├── pages/         # Page components
├── routes/        # Routing configuration
├── shared/        # Shared components, hooks, utilities
├── styles/        # Global styles
└── utils/         # Utility functions
```

### Component Template
```javascript
/**
 * @file ComponentName.jsx
 * @description Brief description.
 * @module feature-name
 */

import { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";

function ComponentName({ title }) {
  const [state, setState] = useState(null);
  return <Box><Heading>{title}</Heading></Box>;
}

export default ComponentName;
```

### Error Handling
- Use try-catch for async operations
- Provide user-friendly error messages via Chakra toast/alert
- Log errors with context in development (use `console.error` with context)
- Use React error boundaries for component-level errors
- Handle Firebase errors with proper error codes

### React Best Practices
- Functional components with hooks only
- Memoize expensive computations with `useMemo`
- Memoize callbacks with `useCallback` when passing to child components
- Lazy load routes: `const HomePage = lazy(() => import("./pages/HomePage"));`
- Prefer small, focused components
- Extract reusable logic into custom hooks
- Use `key` prop correctly in lists (use stable IDs, not array indices)
- Avoid inline styles; use Chakra UI props/theme tokens

### Firebase & Firestore
- Initialize Firebase in `src/config/firebase.js`
- Use Firestore for real-time data
- Collection structure: `collection(db, "name")` -> `doc(db, "name", id)`
- Use `onSnapshot` for real-time listeners, `getDocs` for one-time fetches
- Always handle Firebase auth state with `onAuthStateChanged`
- Use Firebase Security Rules for data validation

### Path Aliases
| Alias | Path |
|-------|------|
| `@` | `src/` |
| `@features` | `src/features/` |
| `@shared` | `src/shared/` |
| `@layout` | `src/layout/` |

### Firebase Cloud Functions
`functions/` uses CommonJS. Deploy with `pnpm deploy:functions`

### Type Safety (JSDoc)
Use JSDoc annotations for better type inference:
```javascript
/**
 * @param {string} userId
 * @returns {Promise<User|null>}
 */
async function getUser(userId) { ... }
```
