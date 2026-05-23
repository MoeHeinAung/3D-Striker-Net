# 📋 implementation_logs.md: Project & Code Tracker
> **Purpose:** Single ledger for tracking features, code changes, AI prompts, and test results.
> **Rules:** Follows `Rules.md` DoD. No task moves to `✅ Done` without tests passing.
> **Sync Rule:** AI must APPEND new tasks. NEVER delete or rewrite old blocks.

---
## 📊 Quick Dashboard
| ID   | Status       | Feature                  | Priority | Phase        | Updated  |
|------|--------------|--------------------------|----------|--------------|----------|
| T-001| `✅ Done`      | Foundation Setup         | High     | Foundation   | 2026-05-19|
| T-002| `✅ Done`      | Desktop Shell Integration | High     | Foundation   | 2026-05-19|
| T-003| `✅ Done`      | Navigation & Page Setup  | High     | UX           | 2026-05-19|
| T-005| `✅ Done`      | Draws Table Rendering Fix | High     | Stabilization | 2026-05-20|
| T-010 | `✅ Done`      | Advanced Ticket Formatting | High     | Core         | 2026-05-21|
| T-011 | `✅ Done`      | Batch Grouping & Relationship Optimization | High     | Core         | 2026-05-21|
| T-012 | `✅ Done`      | Add House Holding Amount to Draws | High     | Core         | 2026-05-23|
| T-013 | `✅ Done`      | Add Holding column to Risk View | High     | Core         | 2026-05-23|
| T-017 | `✅ Done`      | Alembic DB Migration Setup   | High     | Foundation   | 2026-05-23|

### 🟦 T-016: Add Exceed Amount to Risk View
- **Status:** `✅ Done`
- **Priority:** High
- **Phase:** Core
- **Plain English Goal:** Add "Exceed Amount" column to the `Risk` page, calculated as `Total Amount - (Holding + Offloaded)`.
- **Dependencies:** T-014, I-001 (Alembic Setup)
- **Allowed Files:**
  - `backend/app/repositories/sale.py`
  - `backend/app/schemas/risk.py`
  - `frontend/src/pages/Risk.tsx`
  - `frontend/src/types/risk.ts`
  - `Docs/Business_Logic.md`
- **AI Prompt:** Generated during session.
- **Rollback Plan:** Revert `backend/` and `frontend/` changes to last stable commit.
- **Definition of Done (DoD):**
  - [x] Repository `get_sales_by_ticket` calculation updated.
  - [x] `RiskSummary` Pydantic model updated.
  - [x] Frontend `RiskPage` table columns updated.
  - [x] "Exceed Amount" calculation verified.
  - [x] Tests updated/passing.
  - [x] Database views managed via Alembic.
- **Test Results:** ✅ Pass | Calculation verified in Risk View.
- **Notes/Blockers:** Implementation complete.
- **Updated:** 2026-05-23
- **Status:** `✅ Done`
- **Priority:** High
- **Phase:** Foundation/Core
- **Plain English Goal:** Setup Alembic to manage database schema and views reliably, ensuring consistency between application data and view-based reporting.
- **Dependencies:** None
- **Allowed Files:** 
  - `backend/alembic/`
  - `backend/alembic.ini`
  - `backend/app/db/database.py`
  - `backend/app/main.py`
- **AI Prompt Used:** N/A
- **Rollback Plan:** Restore manual `init_db` logic; remove Alembic integration.
- **Definition of Done (DoD):**
  - [x] Alembic installed and initialized.
  - [x] Root database correctly targeted via `alembic.ini`.
  - [x] Autogenerate configuration fixed to support views.
  - [x] Startup sequence uses `alembic upgrade head`.
  - [x] Views created and verified in project-root `app.db`.
- **Test Results:** ✅ Pass | Database views verified in production database.
- **Notes/Blockers:** Resolved circular import crashes and environment-mismatch issues.
- **Updated:** 2026-05-23


### 🟦 T-018: Global Table Sorting (Risk Page)
- **Status:** `✅ Done`
- **Priority:** Medium
- **Phase:** UX/Core
- **Plain English Goal:** Implement sorting for the `Risk` page table.
- **Allowed Files:** `frontend/src/pages/Risk.tsx`, `frontend/src/types/risk.ts`
- **Definition of Done (DoD):**
  - [x] Column headers support sorting (Asc/Desc).
  - [x] Visual indicators correctly update.
  - [x] Type safety ensured with `Risk` interface.
  - [x] `npm run lint` and `tsc -b` pass.
- **Test Results:** ✅ Pass | Verified existing tests and type safety.
- **Notes/Blockers:** Initial implementation on `RiskPage` serves as a blueprint for other tables.
- **Updated:** 2026-05-23

### 🟦 T-018: Global Table Sorting (Network, Operations, Sale Pages)
- **Status:** `✅ Done`
- **Priority:** Medium
- **Phase:** UX/Core
- **Plain English Goal:** Implement sorting for `Network`, `Operations`, and `Sale` page tables.
- **Allowed Files:** `frontend/src/pages/Network.tsx`, `frontend/src/pages/Operations.tsx`, `frontend/src/pages/Sale.tsx`
- **Definition of Done (DoD):**
  - [x] All tables support sortable column headers (Asc/Desc).
  - [x] Visual indicators correctly update.
  - [x] Type safety ensured with model interfaces.
  - [x] `npm run lint` and `tsc -b` pass.
- **Test Results:** ✅ Pass | Verified type safety and functional sorting.
- **Notes/Blockers:** Sorting successfully applied to main and nested tables.
- **Updated:** 2026-05-23

### 🟦 T-014: Offloaded Feature Implementation
- **Status:** `✅ Done`
- **Priority:** High
- **Phase:** Core
- **Plain English Goal:** Implement tracking of offloaded amounts to Master Dealers across the full stack, including a global batch process for offloading.
- **Dependencies:** T-013
- **Allowed Files:** 
  - `backend/app/db/migrations/001_create_risk_view.sql`
  - `backend/app/models/offloaded.py`
  - `backend/app/models/risk.py`
  - `backend/app/schemas/offloaded.py`
  - `backend/app/schemas/risk.py`
  - `backend/app/repositories/offloaded.py`
  - `backend/app/repositories/sale.py`
  - `backend/app/api/routes/offloaded.py`
  - `backend/app/api/router.py`
  - `frontend/src/pages/Risk.tsx`
  - `frontend/src/components/OffloadModal.tsx`
  - `frontend/src/queries/useOffloaded.ts`
  - `frontend/src/types/offloaded.ts`
  - `frontend/src/types/risk.ts`
  - `Docs/Business_Logic.md`
- **AI Prompt Used:** Generated during session
- **Rollback Plan:** Revert changes to backend and frontend.
- **Definition of Done (DoD):**
  - [x] Database table `offloaded` and view `offloaded_amount_by_ticket_per_draw` created.
  - [x] Backend models, schemas, and repositories implemented.
  - [x] `SaleRepository.get_sales_by_ticket` updated to include offloaded amounts.
  - [x] API routes registered and functional.
  - [x] Frontend types updated.
  - [x] Risk UI updated with "Offloaded" column.
  - [x] Individual offload button replaced with global "Offload Batch" button.
  - [x] Batch processing logic implemented: filter eligible, sort by exceed amount, apply per-ticket limit.
  - [x] `OffloadModal` collects Master Dealer, Max Amount, and Max Ticket.
  - [x] All tests passing.
- **Test Results:** ✅ Pass | View creation, schema updates, and batch logic verified.
- **Notes/Blockers:** Implementation complete and refactored for global batch operations.
- **Updated:** 2026-05-23

### 🟦 T-013: Add Holding column to Risk View
- **Status:** `✅ Done`
- **Priority:** High
- **Phase:** Core
- **Plain English Goal:** Add `Holding` column to the `Risk` table, adjacent to `Total Amount`.
- **Dependencies:** None
- **Allowed Files:** 
  - `backend/app/db/migrations/001_create_risk_view.sql`
  - `backend/app/models/risk.py`
  - `backend/app/schemas/risk.py`
  - `backend/app/repositories/risk.py`
  - `frontend/src/pages/Risk.tsx`
  - `frontend/src/types/risk.ts`
- **AI Prompt Used:** `Docs/prompts/risk-view-implementation.md`
- **Rollback Plan:** Revert `backend/` and `frontend/` changes to last stable commit.
- **Definition of Done (DoD):**
  - [x] Database migration for Risk View updated.
  - [x] Pydantic models updated for Risk.
  - [x] Repository logic updated to include the `Holding` calculation.
  - [x] Frontend UI Table updated to include `Holding` column.
  - [x] Tests covering risk calculation and holding logic added.
  - [x] All tests passing.
  - [x] Linting and type checking passing.
- **Test Results:** ✅ Pass | All tests passed.
- **Notes/Blockers:** Implementation complete and verified.
- **Updated:** 2026-05-23

### 🟦 T-012: Add House Holding Amount to Draws
- **Status:** `✅ Done`
- **Priority:** High
- **Phase:** Core
- **Plain English Goal:** Add `house_holding_amount` column to the `draws` table, API, and UI.
- **Dependencies:** None
- **Allowed Files:** 
  - `backend/app/models/draw.py`
  - `backend/app/schemas/draw.py`
  - `frontend/src/pages/Draws.tsx`
  - `frontend/src/types/draw.ts`
- **AI Prompt Used:** `Docs/prompts/draws-T004-mod.md`
- **Rollback Plan:** Revert `backend/` and `frontend/` changes to last stable commit.
- **Definition of Done (DoD):**
  - [x] Database schema updated (add migration or alter table if needed).
  - [x] Backend Pydantic models updated to include `house_holding_amount`.
  - [x] Frontend type definition `Draw` updated.
  - [x] UI Form updated with `InputNumber` for `house_holding_amount`.
  - [x] Test cases updated in `backend/tests/test_draw.py` to cover the new field.
  - [x] All tests passing.
  - [x] Linting and type checking passing.
- **Test Results:** ✅ Pass | All tests passed.
- **Notes/Blockers:** Implementation complete and verified.
- **Updated:** 2026-05-23

### 🟦 T-011: Batch Grouping & Relationship Optimization
- **Status:** `✅ Done`
- **Priority:** High
- **Phase:** Core
- **Plain English Goal:** Implement a batch-based grouping system for sales with expandable rows and optimize the DB relationship.
- **Dependencies:** T-010
- **Allowed Files:** 
  - `frontend/src/pages/Operations.tsx`
  - `frontend/src/utils/ticketFormatter.ts`
  - `backend/app/repositories/batch.py`
  - `backend/app/services/batch.py`
- **AI Prompt Used:** `Manual Refactor`
- **Rollback Plan:** Revert `frontend/` and `backend/` changes to last stable commit.
- **Definition of Done (DoD):**
  - [x] Tests pass (`pytest backend/tests/test_batch.py`)
  - [x] UI shows batches with expandable rows.
  - [x] Ticket preview correctly handles shorthand formats.
  - [x] Deleting a batch deletes all associated sales.
- **Test Results:** ✅ Pass | All batch relationship tests passed.
- **Notes/Blockers:** Implemented nested table UI and optimized backend eager loading.
- **Updated:** 2026-05-21

### 🟦 T-010: Advanced Ticket Formatting & Batch Processing
- **Status:** `✅ Done`
- **Priority:** High
- **Phase:** Core
- **Plain English Goal:** Integrate advanced ticket formatting logic (permutations, R-indicator, dual-mapping) into the frontend Sale Form with real-time validation and batch submission.
- **Dependencies:** T-009
- **Allowed Files:** 
  - `frontend/src/pages/Operations.tsx`
  - `backend/app/services/sale.py`
  - `backend/app/schemas/sale.py`
- **AI Prompt Used:** `prompts/sales-T008.md`
- **Rollback Plan:** Revert `frontend/` and `backend/` changes to last stable commit.
- **Definition of Done (DoD):**
  - [x] Tests pass (`pytest backend/tests/test_sale.py`)
  - [x] Real-time warning system active on Sale Form.
  - [x] All format rules (Single, Dual, R-indicator) correctly parsed.
  - [x] Batch processing works end-to-end.
- **Test Results:** ✅ Pass | All permutation tests passed.
- **Notes/Blockers:** Implemented advanced ticket formatting and batch submission.
- **Updated:** 2026-05-21
