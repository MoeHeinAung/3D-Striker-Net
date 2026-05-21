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

#### 🛠️ Engineering Standards
- **Approved Patterns:**
  - **Frontend:** Expandable Ant Design tables, utility-based display formatting.
  - **Backend:** Eager loading with `selectinload`, cascading deletes for relationships.
- **Strict Anti-Patterns:**
  - ❌ **No flat tables for nested data:** Use grouping where appropriate.
- **Related Rules:**
  - Refer to `Docs/Rules.md` for relationship standards.

- **Definition of Done (DoD):**
  - [x] Tests pass (`pytest backend/tests/test_batch.py`)
  - [x] UI shows batches with expandable rows.
  - [x] Ticket preview correctly handles shorthand formats.
  - [x] Deleting a batch deletes all associated sales.
- **Test Results:** ✅ Pass | All batch relationship tests passed.
- **Notes/Blockers:** None
- **Updated:** 2026-05-21
