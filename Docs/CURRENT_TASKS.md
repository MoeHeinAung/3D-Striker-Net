# CURRENT_TASKS.md

## 🚨 Active Development

### 🟦 T-018: Global Table Sorting
- **Status:** `⬜ Not Started`
- **Priority:** Medium
- **Phase:** UX/Core
- **Plain English Goal:** Implement a global sorting feature for all data tables, allowing users to sort columns in ascending/descending order with visual indicators.
- **Dependencies:** None
- **Allowed Files:**
  - `frontend/src/components/` (or common table components)
  - `backend/app/services/` (if server-side)
  - `backend/app/repositories/` (if server-side)
  - `Docs/Business_Logic.md`
- **AI Prompt:** To be generated.
- **Rollback Plan:** Revert UI changes to table components.
- **Definition of Done (DoD):**
  - [ ] All tables support sortable column headers.
  - [ ] Visual indicators (arrows) reflect sort state (None, Asc, Desc).
  - [ ] Performance strategy (Client-side vs Server-side) implemented per table size.
  - [ ] UI Safety checks (Array.isArray, Null-safety) maintained.

---

## 📅 Backlog

### 🟦 T-015: Master Dealer Performance View
- **Status:** `⬜ Not Started`
- **Priority:** Medium
- **Phase:** Core
- **Plain English Goal:** Create a dashboard view to track Master Dealer performance based on offloaded sales.
- **Dependencies:** T-014
- **Allowed Files:**
  - `backend/app/api/routes/master_dealer.py`
  - `frontend/src/pages/Network.tsx`
- **AI Prompt Used:** TBD
- **Rollback Plan:** Revert UI and API changes.
