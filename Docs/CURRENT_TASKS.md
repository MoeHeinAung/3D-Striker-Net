# CURRENT_TASKS.md

## 🚨 Active Development

### T-016: Add Exceed Amount to Risk View
- **Status:** `🛠 Blocked (Alembic Migration Required)`
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
  - [ ] Database views managed via Alembic.

---

### T-017: Integrate Alembic for Database Migrations
- **Status:** `🛠 In Progress`
- **Priority:** High
- **Phase:** Foundation/Core
- **Plain English Goal:** Setup Alembic to manage database schema and views reliably.
- **Dependencies:** I-001
- **Allowed Files:**
  - `backend/alembic/`
  - `backend/alembic.ini`
  - `backend/app/db/database.py`
- **AI Prompt:** N/A
- **Rollback Plan:** Restore manual `init_db` logic.
- **Definition of Done (DoD):**
  - [ ] Alembic initialized.
  - [ ] Initial migration captures tables and views.
  - [ ] Startup sequence uses `alembic upgrade head`.


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
