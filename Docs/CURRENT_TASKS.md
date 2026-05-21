### 🟦 T-008: Sales Management Implementation
- **Status:** `✅ Done`
- **Priority:** High
- **Phase:** Core
- **Plain English Goal:** Implement Sale table (id, draw_id, agent_id, ticket [000-999], amount, notes, created_at) with CRUD, active draw validation, and bulk ticket entry support.
- **Dependencies:** T-004, T-006
- **Allowed Files:** Auto-generated via file scanner
- **AI Prompt Used:** `prompts/sales-T008.md`
- **Rollback Plan:** Revert `backend/` and `frontend/` changes to last stable commit.

#### 🛠️ Engineering Standards
- **Approved Patterns:**
  - **Frontend:** TanStack Query, Ant Design `Table`, `Form` (with bulk text area), `Modal`.
  - **Backend:** FastAPI (Service/Repository), Pydantic validation (3-digit ticket string constraint).
  - **Contracts:** JSON success/error envelopes as defined in `SSOT.md § 5`.
- **Strict Anti-Patterns:**
  - ❌ **No Sales after Cutoff:** Service must reject any sale if draw is expired.
  - ❌ **No non-numeric tickets:** Input validation must enforce 3-digit string format.
  - ❌ **No logic in API routes:** Keep business logic in `SaleService`.
- **Related Rules:**
  - `Rules.md § 2.1` (Thin components), `Rules.md § 2.2` (Thin routes).
  - Refer to `Docs/Business_Logic.md` for specific sale validation rules.

- **Definition of Done (DoD):**
  - [ ] Tests pass (`pytest -q && npm test -- --run`)
  - [ ] Sale CRUD operations fully operational.
  - [ ] Active Draw validation correctly enforces cutoff times.
  - [ ] Bulk ticket entry parsing works for multi-line inputs.
  - [ ] Errors match SSOT format.
  - [ ] Pre-commit hooks pass.
- **Test Results:** ⬜ Pending
- **Notes/Blockers:** None
- **Updated:** 2026-05-20