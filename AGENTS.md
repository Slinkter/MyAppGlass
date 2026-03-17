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
No test framework configured. When adding tests, use Vitest:
```bash
pnpm vitest              # Run all tests
pnpm vitest run          # Run once (CI mode)
pnpm vitest run --grep "pattern"  # Run tests matching pattern
pnpm vitest run --testNamePattern "name"  # Run specific test by name
```

### Deployment
```bash
pnpm deploy:hosting    # Build and deploy to Firebase Hosting
pnpm deploy:functions  # Deploy Firebase Cloud Functions
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
- Follow ESLint rules in `eslint.config.js`
- Write self-documenting code; avoid unnecessary comments
- Use TypeScript-like JSDoc patterns for complex functions

### Formatting
- 2 spaces for indentation
- Double quotes for JSX, single quotes elsewhere
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
6. Type imports

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
- Provide user-friendly error messages
- Log errors with context in development
- Use error boundaries for component-level errors

### React Best Practices
- Functional components with hooks
- Memoize expensive computations with `useMemo`
- Memoize callbacks with `useCallback` for child components
- Lazy load routes: `const HomePage = lazy(() => import("./pages/HomePage"));`
- Small, focused components
- Extract reusable logic into custom hooks
- Use `key` prop correctly in lists
- Avoid inline styles; use Chakra UI props/theme tokens

### Firebase & Firestore
- Initialize Firebase in `src/config/`
- Use Firestore for real-time data
- Structure: `collection(db, "name")` -> `doc(db, "name", id)`
- Use `onSnapshot` for real-time, `getDocs` for static data

### Path Aliases
| Alias | Path |
|-------|------|
| `@` | `src/` |
| `@features` | `src/features/` |
| `@shared` | `src/shared/` |
| `@layout` | `src/layout/` |

### Accessibility
- Semantic HTML, alt text for images
- Keyboard navigation
- Use Chakra UI's accessible components

### Performance
- Lazy load routes with `React.lazy()` + `Suspense`
- Optimize images with Vite image optimizer
- Avoid unnecessary re-renders with proper useEffect/useMemo deps

## Firebase Functions

`functions/` directory uses CommonJS. Deploy with `pnpm deploy:functions`.