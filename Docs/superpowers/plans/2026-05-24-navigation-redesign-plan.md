# Navigation Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the navigation bar and perform system-wide refactoring of routes, labels, and related page/API mappings to align with new terminology (Draws, Partners, Settings, etc.).

**Architecture:** Frontend (React) and Backend (FastAPI). Changes are confined to the navigation component, frontend routes, and relevant page/API route naming conventions.

**Tech Stack:** React, TypeScript, Vite, FastAPI, SCSS.

---

## Task 1: Navigation Component Refactor

**Files:**
- Modify: `frontend/src/components/Navbar.tsx`
- Modify: `frontend/src/styles/Navbar.module.scss`
- Test: `frontend/src/__tests__/Navbar.test.tsx`

- [ ] **Step 1: Write test case for new navigation structure**

```typescript
import { render, screen } from '@testing-library/react';
import { Navbar } from '../components/Navbar';
import { BrowserRouter } from 'react-router-dom';

test('renders new navigation structure', () => {
  render(<BrowserRouter><Navbar /></BrowserRouter>);
  expect(screen.getByText(/Draws/i)).toBeInTheDocument();
  expect(screen.getByText(/Partners/i)).toBeInTheDocument();
  expect(screen.getByText(/Settings/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Update `Navbar.tsx` logic**

Replace `leftItems` and `rightItems` definitions to match new labels. Update logo to act as a `<Link to="/">`.

- [ ] **Step 3: Update `Navbar.module.scss`**

Remove `pointer-events: none` from `.logoContainer` to enable click interaction.

- [ ] **Step 4: Verify test passes**

Run: `npm run test`

---

## Task 2: Page Route & Label Refactoring

**Files:**
- Modify: `frontend/src/pages/` (All files)
- Modify: `frontend/src/queries/` (Update usages)

- [ ] **Step 1: Systematic Renaming**

Rename components, file references, and internal labels as follows:
- `Overview` -> `Dashboard`
- `Operations` -> `Draws`
- `Network` -> `Partners`
- `System` -> `Settings`

- [ ] **Step 2: Typecheck & Lint**

Run: `npm run lint` and `npm run typecheck`

---

## Task 3: Backend API Route Refactoring

**Files:**
- Modify: `backend/app/api/routes/`

- [ ] **Step 1: Rename Route Definitions**

Rename API endpoints in `backend/app/api/routes/` to mirror frontend terminology (e.g., `/network` -> `/partners`). Ensure all service/repo references remain intact.

- [ ] **Step 2: Verify Backend Routes**

Run: `pytest backend/tests/` (Ensure no breakage in existing business logic tests).

---

## Task 4: Final Verification

- [ ] **Step 1: Integration Test**

Verify all UI paths are reachable via the new navigation links and clicking the logo routes to `Dashboard`.

- [ ] **Step 2: Commit All Changes**

```bash
git add .
git commit -m "feat: redesign navigation and rename routes to match new labels"
```
