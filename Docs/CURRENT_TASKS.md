# CURRENT_TASKS.md

## 🚨 Active Development

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
- **Updated:** 2026-05-22
