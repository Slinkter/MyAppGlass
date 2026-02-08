# Task List - MyAppGlass Optimization Plan

**Project:** GYA Glass & Aluminum - Code Optimization  
**Created:** 2026-02-08  
**Total Estimated Time:** 13-19 hours

---

## 📋 Phase 1: Code Cleanup and Linting Fixes
**Priority:** 🔴 High | **Time:** 30-45 minutes

### Linting Fixes
- [x] Fix unused variable `bgColor` in `Franja.jsx`
- [x] Remove unused imports in `ClientsSection.jsx` (`useMemo`, `Box`, `Spinner`, `useIntersectionObserver`)
- [x] Fix unused variable `cardBorderColor` in `ServiceListSkeleton.jsx`
- [x] Remove unused imports and variables in `SpecItem.jsx` (`Box`, `Icon`, `icon`, `iconBg`)
- [x] Remove unused constants in `palmer.js` (`PALMER03`, `PALMER07`)
- [x] Run `pnpm run lint` and verify 0 warnings

---

## 📚 Phase 2: JSDoc Documentation Improvements
**Priority:** 🟡 Medium-High | **Time:** 2-3 hours

### Common Components
- [x] Update JSDoc in `Gallery.jsx` with `@typedef` and `@example`
- [x] Update JSDoc in `DataLoader.jsx` documenting render props pattern
- [x] Update JSDoc in `ScrollReveal.jsx` with animation props documentation
- [x] Update JSDoc in `GlassCard.jsx` with style variants documentation
- [x] Update JSDoc in `ErrorDisplay.jsx`
- [x] Update JSDoc in `FadingImage.jsx`
- [ ] Update JSDoc in `FormSection.jsx`

### Custom Hooks
- [ ] Improve JSDoc in `useGallery.js` with detailed `@typedef` for return object
- [ ] Update JSDoc in `useIntersectionObserver.js` with configuration options
- [ ] Update JSDoc in `useProjectModal.js` with usage examples
- [ ] Update JSDoc in `useReclamoForm.js` documenting validation logic
- [ ] Update JSDoc in `useIsMobile.js`

### Services
- [ ] Improve JSDoc in `reclamoService.js` with error documentation
- [ ] Update JSDoc in `projectService.js` with data structure documentation
- [ ] Update JSDoc in `serviceService.js` with response examples
- [ ] Update JSDoc in `clientService.js`
- [ ] Update JSDoc in `featureService.js`

### Components (Projects, Services, Home)
- [ ] Update JSDoc in `ProjectCard.jsx`
- [ ] Update JSDoc in `ProjectDetailModal.jsx`
- [ ] Update JSDoc in `ServiceCard.jsx`
- [ ] Update JSDoc in `ClientCard.jsx`
- [ ] Update JSDoc in `FeatureCard.jsx`

---

## ⚡ Phase 3: Performance Optimizations
**Priority:** 🟡 Medium | **Time:** 3-4 hours

### Re-render Optimization
- [ ] Wrap `ProjectCard.jsx` in `React.memo` and add `useCallback` for handlers
- [ ] Wrap `ServiceCard.jsx` in `React.memo` and add `useCallback` for handlers
- [ ] Wrap `ClientCard.jsx` in `React.memo` and add `useCallback` for handlers
- [ ] Review and optimize `FeatureCard.jsx` with memoization

### Bundle Size Optimization
- [ ] Install `rollup-plugin-visualizer`
- [ ] Update `vite.config.js` with bundle analyzer
- [ ] Improve manual chunks configuration in `vite.config.js`
- [ ] Separate icons into dedicated chunk
- [ ] Run `pnpm run analyze` and review bundle

### Lazy Loading
- [ ] Convert `ProjectDetailModal.jsx` to lazy loading
- [ ] Create `ModalSkeleton.jsx` component for fallback
- [ ] Verify lazy loading in `ReclamationForm.jsx`

### Image Optimization
- [ ] Add `loading="lazy"` to all images
- [ ] Add `decoding="async"` to all images
- [ ] Implement `srcset` for responsive images in gallery components

### Font Optimization
- [ ] Add font preload links to `index.html`
- [ ] Add preconnect for external font domains
- [ ] Verify font loading strategy

---

## 🧪 Phase 4: Testing Implementation
**Priority:** 🔴 High | **Time:** 4-6 hours

### Test Configuration
- [ ] Install testing dependencies (vitest, @testing-library/react, etc.)
- [ ] Create `vitest.config.js`
- [ ] Create `src/test/setup.js`
- [ ] Update `package.json` with test scripts

### Hook Tests
- [ ] Create `useGallery.test.js` with comprehensive tests
- [ ] Create `useIntersectionObserver.test.js`
- [ ] Create `useProjectModal.test.js`
- [ ] Create `useReclamoForm.test.js`
- [ ] Create `useIsMobile.test.js`

### Component Tests
- [ ] Create `Gallery.test.jsx`
- [ ] Create `DataLoader.test.jsx`
- [ ] Create `ScrollReveal.test.jsx`
- [ ] Create `ProjectCard.test.jsx`
- [ ] Create `ServiceCard.test.jsx`

### Service Tests
- [ ] Create `reclamoService.test.js`
- [ ] Create `projectService.test.js`
- [ ] Create `serviceService.test.js`

### Test Execution
- [ ] Run `pnpm run test:run` and verify all tests pass
- [ ] Run `pnpm run test:coverage` and verify >70% coverage
- [ ] Fix any failing tests

---

## ♿ Phase 5: Accessibility Improvements
**Priority:** 🟡 Medium | **Time:** 2-3 hours

### ESLint Configuration
- [ ] Install `eslint-plugin-jsx-a11y`
- [ ] Update `eslint.config.js` with accessibility rules
- [ ] Run lint and fix accessibility warnings

### Component Accessibility
- [ ] Add ARIA labels to `Gallery.jsx` navigation buttons
- [ ] Add keyboard navigation to `Gallery.jsx`
- [ ] Add `role="dialog"` and `aria-modal` to `ProjectDetailModal.jsx`
- [ ] Implement focus trap in `ProjectDetailModal.jsx`
- [ ] Add `aria-current` to `Navbar.jsx` active links
- [ ] Improve keyboard navigation in `Navbar.jsx`
- [ ] Add `aria-invalid` and `aria-describedby` to `ReclamationForm.jsx`
- [ ] Add skip link to `Layout.jsx`

### Accessibility Testing
- [ ] Test keyboard navigation on all interactive elements
- [ ] Run axe DevTools and fix critical issues
- [ ] Verify color contrast meets WCAG AA standards

---

## 📊 Phase 6: Monitoring and Analytics
**Priority:** 🟢 Low-Medium | **Time:** 1-2 hours

### Web Vitals
- [ ] Install `web-vitals` package
- [ ] Create `src/utils/webVitals.js`
- [ ] Update `main.jsx` to track Web Vitals
- [ ] Verify Web Vitals reporting in console

### Error Boundary
- [ ] Create `ErrorBoundary.jsx` component
- [ ] Update `App.jsx` to use ErrorBoundary
- [ ] Test error boundary with intentional error
- [ ] Verify error logging

### Bundle Analysis
- [ ] Add `analyze` script to `package.json`
- [ ] Run bundle analyzer and review results
- [ ] Document bundle size improvements

---

## ✅ Final Verification
**Priority:** 🔴 High | **Time:** 1 hour

### Automated Checks
- [ ] Run `pnpm run lint` - 0 errors, 0 warnings
- [ ] Run `pnpm run test:run` - all tests pass
- [ ] Run `pnpm run build` - successful build
- [ ] Run Lighthouse audit - Performance >90

### Manual Checks
- [ ] Verify JSDoc appears correctly in VSCode hover
- [ ] Test keyboard navigation throughout app
- [ ] Test screen reader compatibility
- [ ] Verify Web Vitals are being tracked
- [ ] Check bundle size reduction
- [ ] Test error boundary functionality

### Documentation
- [ ] Update README.md with new scripts
- [ ] Document testing approach
- [ ] Document accessibility features
- [ ] Create CHANGELOG.md entry

---

## 📊 Progress Tracking

**Overall Progress:** 12/100 tasks completed

### By Phase
- Phase 1 (Linting): 6/6 ✅
- Phase 2 (JSDoc): 5/20 📚

---

## 🎯 Priority Order for Execution

1. **Phase 1** - Quick wins, no dependencies
2. **Phase 4** - Create safety net before refactoring
3. **Phase 2** - Improve documentation
4. **Phase 3** - Optimize with tests as safety net
5. **Phase 5** - Incremental improvements
6. **Phase 6** - Final setup
7. **Verification** - Ensure everything works

---

## 📝 Notes

- Mark tasks as `[/]` when in progress
- Mark tasks as `[x]` when completed
- Update progress tracking after each task
- Create git commits after completing each phase
- Run verification checks after each phase