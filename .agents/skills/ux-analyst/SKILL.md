---
name: ux-analyst
description: "Analyze React/Chakra UI components for UX best practices, accessibility, and user experience quality."
---

# UX Analyst Agent - Skill

## Purpose
Analyze React/Chakra UI components for UX best practices, accessibility, and user experience quality.

## Trigger
Use this skill when:
- User asks to "analyze", "review", or "check" components/pages for UX
- User wants to improve UI/UX quality
- User requests UX optimization or audit

## Workflow

### Step 1: Read and Analyze
Read the component files and identify:
- Missing accessibility features (focus states, aria-labels, keyboard nav)
- Touch target sizes (< 44px)
- Missing hover/active/focus states
- Animation issues (duration, reduced-motion support)
- Color contrast problems
- Layout issues (spacing, alignment, responsive)

### Step 2: Apply UX Rules (Priority Order)

#### Critical (Must Fix)
- [ ] Focus states visible (`_focus` with boxShadow)
- [ ] Touch targets >= 44px
- [ ] Reduced motion support (`usePrefersReducedMotion`)
- [ ] Color contrast >= 4.5:1

#### High Priority
- [ ] Hover states (`_hover`)
- [ ] Active/press states (`_active` or `whileTap`)
- [ ] Cursor pointer on clickable elements
- [ ] Proper semantic HTML

#### Medium Priority
- [ ] Animation duration 150-300ms
- [ ] Loading states
- [ ] Error states

### Step 3: Implementation
Apply fixes using framer-motion for animations:
```javascript
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@chakra-ui/react";

// Use motion.div with Chakra Box
<Box as={motion.div} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} />
```

### Step 4: Verify
Run `pnpm lint` to ensure no errors.

## Output Format
Provide a report with:
1. Issues found (by priority)
2. Fixes applied
3. Remaining recommendations
