### 🟦 T-006: Agents Management
- **Status:** `⬜ Not Started`
- **Priority:** High
- **Phase:** Core
- **Plain English Goal:** Create Agents database table (id [3 letters], name, commission, jp_factor, sp_factor, note, created_at) and implement CRUD in the Network page.
- **Dependencies:** None
- **Allowed Files:** Auto-generated via file scanner
- **AI Prompt Used:** `prompts/agents-T006.md`
- **Rollback Plan:** Revert `backend/` and `frontend/` changes to last stable commit.

#### 🛠️ Engineering Standards
- **Approved Patterns:**
  - **Frontend:** TanStack Query for server state, Zustand for UI state, Axios for HTTP, SCSS Modules for styling.
  - **Backend:** FastAPI thin routes, Business logic in Services, DB access in Repositories (SQLAlchemy).
  - **Contracts:** JSON success/error envelopes as defined in `SSOT.md § 5`.
- **Strict Anti-Patterns:**
  - ❌ **No UI Logic in Backend:** Routes must not import frontend code.
  - ❌ **No DB in UI:** Frontend must never access SQLite directly.
  - ❌ **No Logic in Routes:** API handlers must delegate all business logic to Services.
  - ❌ **No Raw SQL outside Repositories:** Keep SQLAlchemy usage isolated.
  - ❌ **No `fetch()`:** Use Axios in Frontend and HTTPX in Backend.
- **Related Rules:**
  - Follow 5-layer architecture: Frontend -> API -> Service -> Repository -> DB.
  - All request/response validation must use Pydantic schemas.

- **Definition of Done (DoD):**
  - [ ] Tests pass (`pytest -q && npm test -- --run`)
  - [ ] Agents table rendered correctly in Network page.
  - [ ] Errors match SSOT format
  - [ ] No unapproved dependencies
  - [ ] Pre-commit hooks pass
- **Test Results:** ⬜ Pending
- **Notes/Blockers:** None
- **Updated:** 2026-05-20