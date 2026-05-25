# CURRENT_TASKS.md

## 📅 Backlog

### 🟦 T-018: Layout Refactor (Viewport Containment & Grid)
- **Status:** `✅ Done`
- **Priority:** High
- **Phase:** UI/UX
- **Plain English Goal:** Refactor app layout for strict viewport containment (100vh/100vw) and implement a 12x8 CSS Grid system.
- **Dependencies:** None
- **Allowed Files:**
  - `frontend/src/app/App.tsx`
  - `frontend/src/styles/`
  - `frontend/src/components/`
  - `frontend/src/pages/`
- **AI Prompt Used:** `Docs/prompts/frontend-implementation.md`
- **Rollback Plan:** Revert CSS and App component structural changes to pre-grid state.

#### 🛠️ Engineering Standards
- **Approved Patterns:** Design System 12x8 Grid, `.card` components, `.scroll-container` pattern.
- **Strict Anti-Patterns:** Body-level overflow, manual layout calculations in pages.

- **Definition of Done (DoD):**
  - [x] Tests pass (`npm run build`)
  - [x] UI utilizes grid-based layout
  - [x] Viewport overflow eliminated
  - [x] Ant Design deprecations resolved
- **Test Results:** Pass | Build logs: `npm run build` verified.
- **Notes/Blockers:** Resolved viewport overflow in `Risk.tsx` using flex-based `.scroll-container` and resolved AntD deprecation warnings.
- **Updated:** 2026-05-25
