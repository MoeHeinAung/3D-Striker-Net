### 🟦 T-007: Master Dealer Management & Network Redesign
- **Status:** `⬜ Not Started`
- **Priority:** High
- **Phase:** Core
- **Plain English Goal:** Create Master Dealer DB table, implement CRUD, and redesign Network page with a two-section layout (left: tabbed lists for Agents/Master Dealers; right: details).
- **Dependencies:** T-006
- **Allowed Files:** Auto-generated via file scanner
- **AI Prompt Used:** `prompts/dealers-T007.md`
- **Rollback Plan:** Revert `backend/` and `frontend/` changes to last stable commit.

#### 🛠️ Engineering Standards
- **Approved Patterns:**
  - **Frontend:** TanStack Query, Zustand, Ant Design Tabs/Table/Layout, CSS Modules.
  - **Backend:** Standard 5-layer architecture, Pydantic validation.
- **Strict Anti-Patterns:**
  - ❌ **No UI Logic in Backend.**
  - ❌ **No hardcoded layouts.**
- **Related Rules:**
  - `Rules.md § 2.1` (Thin components), `Rules.md § 2.2` (Thin routes).

- **Definition of Done (DoD):**
  - [ ] Tests pass (`pytest -q && npm test -- --run`)
  - [ ] Agents and Master Dealers tabbed successfully in Network page left section.
  - [ ] Right section shows dynamic details of active selection.
  - [ ] Master Dealer CRUD functional.
  - [ ] Layout matches "Futuristic Precision" design system.
- **Test Results:** ⬜ Pending
- **Notes/Blockers:** None
- **Updated:** 2026-05-20