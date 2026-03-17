# AGENTS.md - Developer Guide for MyAppGlass

## Project Overview

This is a React 18 + Vite application using Chakra UI for the UI framework. It includes Firebase
backend functions for email sending and Firestore for data storage. The project uses pnpm as
the package manager.

## Available Commands

### Development
```bash
pnpm dev          # Start development server on port 5173
pnpm build        # Production build to dist/
pnpm preview      # Preview production build locally
```

### Linting & Code Quality
```bash
pnpm lint         # Run ESLint with all rules, fail on warnings
```

### Deployment
```bash
pnpm deploy:hosting    # Build and deploy to Firebase Hosting
pnpm deploy:functions  # Deploy Firebase Cloud Functions
pnpm predeploy         # Build before deployment
```

### Utilities
```bash
pnpm clean       # Remove node_modules, dist, and functions/node_modules
pnpm analyze     # Build with bundle visualization (outputs dist/bundle-report.html)
```

## Code Style Guidelines

### General Principles

- Use ESM (ES Modules) with `import`/`export` syntax
- Follow ESLint rules defined in `eslint.config.js`
- Write self-documenting code; avoid unnecessary comments
- Use TypeScript-like patterns in JSDoc comments for complex functions

### Formatting

- Use 2 spaces for indentation
- Use double quotes for strings in JSX, single quotes elsewhere
- Add trailing commas in multi-line objects and arrays
- Maximum line length: 100 characters (soft limit)
- Use semicolons to end statements
- Use PascalCase for components and camelCase for variables/functions

### Imports

**Order imports as follows:**
1. React/core libraries (react, react-dom, react-router-dom)
2. External UI libraries (chakra-ui, framer-motion, etc.)
3. Firebase/config imports
4. Internal modules using path aliases (`@/`, `@features/`, `@shared/`, `@layout/`)
5. Relative imports (local components/utils)
6. Type imports (if using TypeScript)

**Example:**
```javascript
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Layout } from "@layout/MainLayout";
import LoadingFallback from "@shared/components/common/LoadingFallback";
import { useAuth } from "@features/auth/hooks/useAuth";
import "./styles/global.css";
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `HomePage`, `ProductCard`, `LoadingFallback` |
| Hooks | camelCase starting with `use` | `useAuth`, `useScrollPosition`, `useFetchProducts` |
| Utilities | camelCase | `scrollToTop`, `formatDate`, `validateEmail` |
| Constants | UPPER_SNAKE_CASE | `MAX_UPLOAD_SIZE`, `API_BASE_URL` |
| Files (components) | PascalCase | `HomePage.jsx`, `ProductCard.jsx` |
| Files (hooks/utils) | camelCase | `useAuth.js`, `scrollToTop.js` |
| CSS variables | kebab-case | `--primary-color`, `--spacing-md` |

### File Organization

```
src/
├── api/           # API service functions
├── assets/        # Static assets (images, fonts, icons)
├── config/        # Configuration files (theme, Firebase, etc.)
├── data/          # Static data files
├── docs/         # Documentation
├── features/     # Feature-based modules
├── layout/       # Layout components
├── pages/        # Page components
├── routes/       # Routing configuration
├── shared/       # Shared components, hooks, utilities
├── styles/       # Global styles
└── utils/        # Utility functions
```

### Component Structure

Follow this template for React components:

```javascript
/**
 * @file ComponentName.jsx
 * @description Brief description of what this component does.
 * @module feature-name
 */

import { useState, useEffect } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";

/**
 * @component ComponentName
 * @description Detailed description of component behavior.
 * @param {Object} props
 * @param {string} props.title - Component title
 * @param {boolean} props.isLoading - Loading state
 * @returns {JSX.Element}
 */
function ComponentName({ title, isLoading = false }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Effect logic here
  }, []);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <Heading>{title}</Heading>
    </Box>
  );
}

export default ComponentName;
```

### Error Handling

- Use try-catch blocks for async operations
- Provide user-friendly error messages in UI
- Log errors to console with context in development
- Use error boundaries for component-level error handling

```javascript
// Example: API call with error handling
async function fetchProducts() {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to load products. Please try again.");
  }
}
```

### React Best Practices

- Use functional components with hooks
- Memoize expensive computations with `useMemo`
- Memoize callback functions with `useCallback` when passing to child components
- Use lazy loading for routes: `const HomePage = lazy(() => import("./pages/HomePage"));`
- Keep components small and focused on a single responsibility
- Extract reusable logic into custom hooks
- Use the `key` prop correctly in lists
- Avoid inline styles; use Chakra UI props or theme tokens

### Firebase & Firestore

- Initialize Firebase in `src/config/` directory
- Use Firestore for real-time data
- Structure: `collection(db, "collectionName")` -> `doc(db, "collectionName", id)`
- Use real-time listeners with `onSnapshot` when data should update live
- Use one-time reads with `getDocs` for static data

### Accessibility (a11y)

- Use semantic HTML elements
- Include alt text for images
- Ensure keyboard navigation works
- Use Chakra UI's accessible components
- Run a11y checks via ESLint plugin (`jsx-a11y`)

### Performance Guidelines

- Lazy load routes with `React.lazy()` and `Suspense`
- Optimize images using the Vite image optimizer plugin
- Code split with manual chunks in Vite config
- Avoid re-renders by properly using dependencies in useEffect/useMemo
- Use production mode for performance testing

## Path Aliases

The following aliases are available for imports:

| Alias | Path |
|-------|------|
| `@` | `src/` |
| `@features` | `src/features/` |
| `@shared` | `src/shared/` |
| `@layout` | `src/layout/` |

## Firebase Functions

Firebase Cloud Functions are in the `functions/` directory. They use CommonJS and have separate
dependencies. Deploy with `pnpm deploy:functions`.

## Testing

This project does not currently have a test framework configured. When adding tests, use Vitest
(see `.agents/skills/vitest/SKILL.md` for setup guidelines).
