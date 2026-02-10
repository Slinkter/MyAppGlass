---
name: software-architecture
description: Guide for quality focused software architecture. This skill should be used when users want to write code, design architecture, analyze code, in any case that relates to software development.
---

# Software Architecture Development Skill

This skill provides guidance for quality focused software development and architecture. It is based on Clean Architecture and Domain Driven Design principles.

## Code Style Rules

### General Principles

- **Early return pattern**: Always use early returns when possible, over nested conditions for better readability
- Avoid code duplication through creation of reusable functions and modules
- Decompose long (more than 80 lines of code) components and functions into multiple smaller components and functions. If they cannot be used anywhere else, keep it in the same file. But if file longer than 200 lines of code, it should be split into multiple files.
- Use arrow functions instead of function declarations when possible

### Best Practices

#### Library-First Approach

- **ALWAYS search for existing solutions before writing custom code**
  - Check npm for existing libraries that solve the problem
  - Evaluate existing services/SaaS solutions
  - Consider third-party APIs for common functionality
- Use libraries instead of writing your own utils or helpers. For example, use `cockatiel` instead of writing your own retry logic.
- **When custom code IS justified:**
  - Specific business logic unique to the domain
  - Performance-critical paths with special requirements
  - When external dependencies would be overkill
  - Security-sensitive code requiring full control
  - When existing solutions don't meet requirements after thorough evaluation

#### Architecture and Design

- **Clean Architecture & DDD Principles:**
  - Follow domain-driven design and ubiquitous language
  - Separate domain entities from infrastructure concerns
  - Keep business logic independent of frameworks
  - Define use cases clearly and keep them isolated
- **Naming Conventions:**
  - **AVOID** generic names: `utils`, `helpers`, `common`, `shared`
  - **USE** domain-specific names: `OrderCalculator`, `UserAuthenticator`, `InvoiceGenerator`
  - Follow bounded context naming patterns
  - Each module should have a single, clear purpose
- **Separation of Concerns:**
  - Do NOT mix business logic with UI components
  - Keep database queries out of controllers
  - Maintain clear boundaries between contexts
  - Ensure proper separation of responsibilities

#### Anti-Patterns to Avoid

- **NIH (Not Invented Here) Syndrome:**
  - Don't build custom auth when Auth0/Supabase exists
  - Don't write custom state management instead of using Redux/Zustand
  - Don't create custom form validation instead of using established libraries
- **Poor Architectural Choices:**
  - Mixing business logic with UI components
  - Database queries directly in controllers
  - Lack of clear separation of concerns
- **Generic Naming Anti-Patterns:**
  - `utils.js` with 50 unrelated functions
  - `helpers/misc.js` as a dumping ground
  - `common/shared.js` with unclear purpose
- Remember: Every line of custom code is a liability that needs maintenance, testing, and documentation

#### Code Quality

- Proper error handling with typed catch blocks
- Break down complex logic into smaller, reusable functions
- Avoid deep nesting (max 3 levels)
- Keep functions focused and under 50 lines when possible
- Keep files focused and under 200 lines of code when possible

#### Frontend-Specific Architecture (React)

- **Logic vs. Presentation**: Extract complex UI logic into custom hooks. Keep components focused on rendering and layout.
- **Component Composition**: Prefer composition over large, complex props. Use children or specialized sub-components.
- **State Locality**: Keep state as close as possible to where it's used. Avoid global state if a local or lifted-up state suffices.
- **Prop Drilling**: Use React Context or state management libraries (Context, Zustand) only when prop drilling becomes unmanageable (typically > 3 levels).
- **Barrel Exports**: Use `index.js` files in feature directories to control the public API of a module, preventing deep imports into internal implementation details.

#### Performance & Optimization

- **Route-Level Splitting**: Use `React.lazy()` and `Suspense` for all top-level routes to minimize initial bundle size.
- **Resource Optimization**:
  - Implement aggressive image optimization (WebP, responsive sizes).
  - Use `fetchPriority` and `loading="eager"` for LCP candidates.
  - Implement skeleton loaders or progressive loading for better perceived performance.
- **Memoization Strategy**:
  - Use `React.memo` for components with expensive renders and stable props.
  - Use `useMemo` for heavy computations.
  - Use `useCallback` when passing functions to memoized child components to prevent unnecessary re-renders.

#### Modern Design System & Aesthetics

- **Theme-First Approach**: Use Chakra UI (or similar) theme tokens for colors, spacing, and typography. Avoid hardcoded hex codes.
- **Glassmorphism & Rich UI**:
  - Use `backdropFilter` and semi-transparent backgrounds for premium "Glass" effects.
  - Implement subtle micro-animations (Framer Motion) for state transitions and scroll reveals.
- **Responsive-First**: Design for mobile first, then scale up using responsive object notation or media queries.

#### Documentation & Maintainability

- **JSDoc Standards**: Follow the `jsdoc-best-practices` skill religiously. Every component, hook, and service should have a clear preamble and typed props/returns.
- **Self-Documenting Code**: Prefer clear naming and small functions over long comments explaining "what" the code does. Use comments to explain the "why" (rationale).
- **README driven**: Each major feature or package should have a local `README.md` explaining its purpose, architecture, and usage.
