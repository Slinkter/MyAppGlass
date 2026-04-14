# Changelog

All notable changes to this project will be documented in this file.

## [2026-04-14] - Chakra UI v3 Final Migration & Stabilization

### Fixed
- **Critical Crash (DOMTokenList)**: Fixed the `"DOMTokenList.remove: The token can not contain whitespace"` error triggered by `next-themes` and `ChakraProvider`. Updated the `ColorModeProvider` to use `attribute="data-theme"` instead of `class` to properly isolate Chakra UI's theme variables. 
- **Missing Icon Components**: Restored the `Icon` import from `@chakra-ui/react` in `StoreSection.jsx` which caused a crash when attempting to render Lucide-React icons (`MapPin` & `Clock`).
- **CSS-in-JS Syntax Adherence**: Fixed internal Chakra DOM warnings by replacing all instances of standard CSS kebab-case properties `"-ms-overflow-style": "none"` with their valid camelCase representations `msOverflowStyle: "none"` in `GalleryThumbnails.jsx` and `ServicePageLayout.jsx`.
- **DOM Prop Standardization**: Prevented React reconciliation warnings by swapping `fetchPriority` (camelCase) to `fetchpriority` (lowercase standard HTML attribute) on underlying `img` tags across `GalleryViewer.jsx` and `LandingPageSection.jsx`.

### Added
- **Global Component Error Boundary (`ComponentErrorBoundary.jsx`)**: Added a global boundary wrapper across `Layout.jsx`. It locally isolates and catches sub-component React tree crashes allowing the application header/footer framework to stay alive instead of throwing a blank white screen, and exposes the specific `componentStack` trace back to the developer in Dev Mode.
- **Developer Error Overlay (`DevErrorOverlay.jsx`)**: Engineered a fixed bottom overlay panel that actively registers global DOM events like `window.onerror`, unhandled promise rejections (`unhandledrejection`), and custom `console.error` logs.

### Changed
- **Mass Codebase Linting Cleanup**: Deployed a target cleanup script eliminating un-used `useColorMode`, `Box` and `Link` imports over 23 files generated during the preceding V2 -> V3 migration. This enforced a zero-warning successful build output.
- **Deprecated Motion hooks**: Removed direct usage of Chakra's `usePrefersReducedMotion` per v3 migration protocols.

### Performance
- **Successful Production Build**: Ensured a successful Vite `pnpm run build` with `exit code 0`, optimizing heavy gallery / module assets yielding a total bundle size reduction and valid HTML generation for hoisting.
