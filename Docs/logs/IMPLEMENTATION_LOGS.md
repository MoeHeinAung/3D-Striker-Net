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
| T-012 | `✅ Done`      | Risk Management Feature  | High     | Core         | 2026-05-21|
| T-014 | `✅ Done`      | Risk API Response Standardisation | High     | Core         | 2026-05-21|
| T-015 | `✅ Done`      | Frontend API Client Refactoring | High     | Core         | 2026-05-21|

---
## 📝 Task Log

### 🟦 T-015: Frontend API Client Refactoring
- **Status:** `✅ Done`
- **Priority:** High
- **Phase:** Core
- **Plain English Goal:** Refactor the frontend API client to return full Axios responses and explicitly unwrap the standard SuccessEnvelope, preventing double-unwrapping bugs.
- **Dependencies:** None
- **Allowed Files:** 
  - `frontend/src/services/api.ts`
  - `frontend/src/services/drawService.ts`
  - `frontend/src/queries/use*.ts`
- **AI Prompt Used:** `prompts/api-client-refactor-T015.md`
- **Rollback Plan:** Revert `frontend/src/services/api.ts` and `frontend/src/queries/` to previous state.
- **Definition of Done (DoD):**
  - [x] Axios interceptor returns full response.
  - [x] SuccessEnvelope<T> defined and exported.
  - [x] All service functions and hooks updated to explicit unwrapping.
  - [x] Typecheck passes in `frontend`.
- **Test Results:** ✅ Pass | Typecheck passed, all modules updated.
- **Notes/Blockers:** Eliminated fragile response unwrapping in the interceptor.
- **Updated:** 2026-05-21

### 🟦 T-014: Risk API Response Standardisation
- **Status:** `✅ Done`
- **Priority:** High
- **Phase:** Core
- **Plain English Goal:** Refactor Risk API responses to use the system-wide SuccessEnvelope wrapper for consistency.
- **Dependencies:** T-012
- **Allowed Files:** `backend/app/api/routes/risk.py`
- **AI Prompt Used:** `prompts/risk-api-refactor.md`
- **Rollback Plan:** Revert `backend/app/api/routes/risk.py` to previous state.
- **Definition of Done (DoD):**
  - [x] Risk endpoints wrapped in SuccessEnvelope.
  - [x] Pydantic response_model updated.
  - [x] Global adminMaxHold state persisted via Zustand.
  - [x] Tests pass.
- **Test Results:** ✅ Pass | Backend tests passed, frontend persistence verified.
- **Notes/Blockers:** Standardized API responses and fixed state persistence for risk calculations.
- **Updated:** 2026-05-21

- **Status:** `✅ Done`
- **Priority:** High
- **Phase:** Core
- **Plain English Goal:** Implement a Risk Management system with an "Admin Max Hold" setting and automated offloading logic.
- **Dependencies:** T-009
- **Allowed Files:**
  - `backend/app/models/offloaded.py`
  - `backend/app/schemas/offloaded.py`
  - `backend/app/repositories/offloaded.py`
  - `backend/app/services/risk_service.py`
  - `backend/app/api/routes/risk.py`
  - `frontend/src/pages/Risk.tsx`
  - `frontend/src/queries/useRisk.ts`
- **AI Prompt Used:** `prompts/backend-implementation.md`, `prompts/frontend-implementation.md`
- **Rollback Plan:** Revert `backend/` and `frontend/` changes to last stable commit.
- **Definition of Done (DoD):**
  - [x] Database `Offloaded` table successfully created.
  - [x] Risk Page renders admin input field and calculation table.
  - [x] Calculations (`house_holding`, `offloaded`, `pending`) match business rules.
  - [x] Tests pass (`pytest backend/tests/test_risk.py`)
  - [x] Lint, format, and typecheck gates green (ignoring pre-existing lint issues).
- **Test Results:** ✅ Pass | Backend tests passed, core functionality verified.
- **Notes/Blockers:** Implemented core risk service and UI.
- **Updated:** 2026-05-21

### 🟦 T-011: Batch Grouping & Relationship Optimization
- **Status:** `✅ Done`
...
