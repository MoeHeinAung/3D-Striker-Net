# CURRENT_TASKS.md

## 🚨 Active Development

### 🟦 T-013: Add Holding column to Risk View
- **Status:** `🕒 Planned`
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
- **AI Prompt Used:** `Docs/prompts/backend-implementation.md` / `Docs/prompts/frontend-implementation.md`
- **Rollback Plan:** Revert `backend/` and `frontend/` changes to last stable commit.
- **Definition of Done (DoD):**
  - [ ] Database migration for Risk View updated.
  - [ ] Pydantic models updated for Risk.
  - [ ] Repository logic updated to include the `Holding` calculation.
  - [ ] Frontend UI Table updated to include `Holding` column.
  - [ ] Tests covering risk calculation and holding logic added.
  - [ ] All tests passing.
  - [ ] Linting and type checking passing.
- **Test Results:** ? Pending
- **Notes/Blockers:** Requires risk calculation logic: `min(house_holding_amount, total_amount)`.
- **Updated:** 2026-05-23
