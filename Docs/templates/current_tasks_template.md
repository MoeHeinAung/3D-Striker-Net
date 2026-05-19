<!-- Use following template for CURRENT_TASKS.md -->

### 🟦 T-XXX: [Feature Name]
- **Status:** `⬜ Not Started` | `🟡 In Progress` | `🧪 Testing` | `✅ Done` | `🚫 Blocked`
- **Priority:** High/Med/Low
- **Phase:** Foundation / Core / UX / Stabilization
- **Plain English Goal:** [1-2 sentences]
- **Dependencies:** [T-XXX or "None"]
- **Allowed Files:** [List or "Auto-generated via file scanner"]
- **AI Prompt Used:** `prompts/[type]-TXXX.md`
- **Rollback Plan:** [1-sentence fallback if this breaks]

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
  - Unit tests required for Services; Integration tests for API routes.

- **Definition of Done (DoD):**
  - [ ] Tests pass (`pytest -q && npm test -- --run`)
  - [ ] UI shows explicit context banner
  - [ ] Errors match SSOT format
  - [ ] No unapproved dependencies
  - [ ] Pre-commit hooks pass
- **Test Results:** [Pass/Fail] | [Error log or "None"]
- **Notes/Blockers:** [AI drift, missing files, test failures, etc.]
- **Updated:** [DATE]