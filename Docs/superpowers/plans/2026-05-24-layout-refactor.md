# Layout Refactor (Viewport Containment & Grid) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the entire application layout to enforce 100vh/100vw containment, implement a 12x8 CSS Grid, and ensure no body-level overflow.

**Architecture:** Utilize `App.tsx` as the grid root container, move layout styles to a dedicated module, and refactor page components to adhere to grid span requirements.

**Tech Stack:** React (TypeScript), SCSS Modules, CSS Grid.

---

### Task 1: Create Global Layout Styles

**Files:**
- Create: `frontend/src/styles/layout.module.scss`
- Modify: `frontend/src/app/App.tsx`

- [ ] **Step 1: Create the base layout styles**

```scss
/* frontend/src/styles/layout.module.scss */
.viewportContainer {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(8, 1fr);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.mainContent {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  overflow-y: auto;
}
```

- [ ] **Step 2: Update App.tsx to use new styles**

```tsx
/* frontend/src/app/App.tsx */
import styles from '../styles/layout.module.scss';

export const App = () => (
  <div className={styles.viewportContainer}>
    <main className={styles.mainContent}>
      {/* existing routes/content */}
    </main>
  </div>
);
```

- [ ] **Step 3: Commit**

```bash
git add frontend/src/styles/layout.module.scss frontend/src/app/App.tsx
git commit -m "feat: implement 12x8 CSS grid viewport containment"
```

### Task 2: Refactor Navigation Component

**Files:**
- Modify: `frontend/src/components/Navbar.tsx`

- [ ] **Step 1: Wrap Navbar in grid-friendly container**

```tsx
/* frontend/src/components/Navbar.tsx */
import styles from '../styles/navbar.module.scss';

export const Navbar = () => (
  <nav className={styles.navbar}>...</nav>
);
```

- [ ] **Step 2: Add styles for Navbar positioning**

```scss
/* frontend/src/components/navbar.module.scss */
.navbar {
  grid-column: span 12;
  grid-row: span 1;
}
```

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/Navbar.tsx frontend/src/components/navbar.module.scss
git commit -m "feat: refactor navbar for grid system"
```

### Task 3: Refactor Main Content Pages

**Files:**
- Modify: `frontend/src/pages/Dashboard.tsx`, `frontend/src/pages/Sales.tsx` (etc)

- [ ] **Step 1: Update page components to utilize grid rows**

Update each page component to explicitly set its grid row span. For example, content pages should occupy rows 2-8.

```tsx
// Example for pages/Dashboard.tsx
.pageContent {
  grid-column: span 12;
  grid-row: 2 / 9;
}
```

- [ ] **Step 2: Verify Vitest Rendering**

Run: `npm run test`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/
git commit -m "feat: update page components to span grid rows"
```

---

**Plan complete and saved to `docs/superpowers/plans/2026-05-24-layout-refactor.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
