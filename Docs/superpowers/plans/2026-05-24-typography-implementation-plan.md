# Typographic Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the Tektur, Instrument Sans, and JetBrains Mono typographic system into the `3D-Striker-Net` frontend.

**Architecture:** We will update `frontend/src/styles/theme.scss` with CSS variables for the scale and replace legacy font mixins to enforce the new visual language.

**Tech Stack:** SCSS, TypeScript/React (Vite project)

---

### Task 1: Update Variables & Mixins in `theme.scss`

**Files:**
- Modify: `frontend/src/styles/theme.scss`

- [ ] **Step 1: Replace font variable definitions**
Modify the top section of `frontend/src/styles/theme.scss`:
```scss
// Quantum Admin Typography System
$font-header: 'Tektur', sans-serif;
$font-body: 'Instrument Sans', sans-serif;
$font-data: 'JetBrains Mono', monospace;

// Add typography tokens
$scale-ratio: 1.25;
// ... (Define map or variables for scale if needed for programmatic access)
```

- [ ] **Step 2: Update `hud-text` mixin**
```scss
@mixin hud-text { 
  font-family: $font-header; 
  text-transform: uppercase; 
  letter-spacing: 0.05em; 
}
```

- [ ] **Step 3: Commit**
```bash
git add frontend/src/styles/theme.scss
git commit -m "style: update typography system variables and hud-text mixin"
```

---

### Task 2: Implement Typography Utility Classes

**Files:**
- Create: `frontend/src/styles/typography.module.scss`
- Modify: `frontend/src/styles/theme.scss` (export utility)

- [ ] **Step 1: Define typography classes**
Create `frontend/src/styles/typography.module.scss`:
```scss
@use 'theme.scss' as *;

.h1 { font-family: $font-header; font-size: 48px; font-weight: 700; line-height: 1.1; letter-spacing: 0.05em; text-transform: uppercase; }
.body-m { font-family: $font-body; font-size: 16px; font-weight: 400; line-height: 1.5; }
.data { font-family: $font-data; font-size: 14px; font-weight: 500; line-height: 1.4; }
```

- [ ] **Step 2: Commit**
```bash
git add frontend/src/styles/typography.module.scss
git commit -m "style: add typography utility classes"
```

---

### Task 3: Verify Integration & Refactor Navbar

**Files:**
- Modify: `frontend/src/components/Navbar.tsx`
- Modify: `frontend/src/styles/Navbar.module.scss`

- [ ] **Step 1: Update Navbar typography**
Apply the new typography utility classes to the Navbar component to demonstrate the shift.

- [ ] **Step 2: Commit**
```bash
git add frontend/src/components/Navbar.tsx frontend/src/styles/Navbar.module.scss
git commit -m "style: refactor navbar typography"
```
