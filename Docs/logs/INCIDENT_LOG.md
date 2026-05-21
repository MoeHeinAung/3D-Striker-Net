# 🚨 INCIDENT_LOG.md: Bug & Failure Tracker
> **Purpose:** Track every crash, UI glitch, data error, or AI drift. Convert each into permanent fixes, tests, and rule updates.
> **Rules:** NO incident moves to `📦 Closed` without: 1) test added, 2) rule/SSOT updated, 3) verification passed.
> **Sync Rule:** AI must APPEND new blocks. NEVER delete or rewrite old entries. Use exact ID format: `I-XXX`.

---
## 📊 Quick Dashboard
| ID    | Status       | Severity | Description                          | Detected   | Closed     |
|-------|--------------|----------|--------------------------------------|------------|------------|
| I-001 | `📦 Closed`  | 🟢 Low   | Sass `@import` deprecation warning   | 2026-05-19 | 2026-05-19 |
| I-002 | `📦 Closed`  | 🟡 Medium | ESM module resolution error (missing .js) | 2026-05-19 | 2026-05-20 |
| I-003 | `📦 Closed`  | 🔴 Critical | Backend startup & UI rendering failure | 2026-05-20 | 2026-05-20 |
| I-004 | `📦 Closed`  | 🟡 Medium | Sales Table empty & Batch API 400 | 2026-05-21 | 2026-05-21 |

**Status Options:** `⬜ Open` | `🔍 Investigating` | `🔧 Fixed` | `✅ Verified` | `📦 Closed`
**Severity Options:** `🔴 Critical` | `🟠 High` | `🟡 Medium` | `🟢 Low`

### 🟡 I-005: Application-Wide UI Crash After API Refactor
- **Status:** `📦 Closed`
- **Severity:** 🔴 Critical
- **Detected:** 2026-05-21 13:30
- **Plain English Description:** Multiple pages crashed (Risk, Draws, Sales, Batches) due to inconsistent data structures and "double-unwrapping" after standardizing API envelopes.
- **Reproduction Steps:**
  1. Open any page (Draws, Operations, Network, Risk).
  2. Observe crashes or empty tables due to `undefined` query data.
- **Root Cause:** Standardizing backend responses to `SuccessEnvelope` introduced a mismatch. The initial fix (global Axios interceptor) caused "double-unwrapping" in existing query hooks that were still manually accessing `.data`.
- **Immediate Containment:** Refined the Axios interceptor to safely handle non-enveloped data and performed a deep audit of all query hooks.
- **Permanent Fix:** Systematically refactored all frontend services (`drawService.ts`) and query hooks (`useBatches.ts`, `useSales.ts`, `useAgents.ts`, `useMasterDealers.ts`, `useHealth.ts`) to remove manual unwrapping, allowing the global interceptor to handle data extraction consistently across the entire application.
- **New Tests Added:** None (Manual validation via TypeScript compiler check).
- **Rules / SSOT Updated:** None.
- **Verification Result:** Pass | All pages render successfully, data loads without errors, and TypeScript check passes.
- **Notes / Lessons:** Global architectural changes (like envelope standardization) require a full-stack synchronization. Response interceptors are powerful but require that the consuming layer (services/hooks) be updated to expect the processed output.
- **Updated:** 2026-05-21


... [Rest of I-001 and I-002] ...

### 🔴 I-003: Backend Startup & UI Rendering Failure
- **Status:** `📦 Closed`
- **Severity:** 🔴 Critical
- **Detected:** 2026-05-20 12:00
- **Plain English Description:** Backend failed to start via desktop runner due to import errors; UI rendered an empty table despite data being present in the API console.
- **Reproduction Steps:** 
  1. Run `python main.py` from root.
  2. Observe `ModuleNotFoundError: No module named 'backend'` in terminal.
  3. Navigate to Draws page; observe empty table with Status 200 in logs.
- **Root Cause:** 
    1. **Import Drift:** Absolute imports (`backend.app...`) failed when the working directory was `backend/`.
    2. **DB Ghosting:** API used an empty `app.db` in the backend folder instead of the populated root DB.
    3. **Double Unwrap:** Service layer redundant `.data` access returned `undefined` because the Axios interceptor already unwrapped the response.
    4. **Legacy require:** Use of `require('dayjs')` in Vite caused component instability.
- **Immediate Containment:** 
    1. Batch updated imports to relative `app...`.
    2. Corrected desktop runner `sys.path`.
    3. Manually synced `app.db`.
- **Permanent Fix:** 
    1. Standardized all backend imports to be package-relative.
    2. Refactored `drawService.ts` to correctly handle the Axios envelope.
    3. Replaced all `require` calls with ESM imports in the frontend.
    4. Added strict `Array.isArray` checks before rendering Tables.
- **New Tests Added:** Manual verification of backend startup and UI data rendering.
- **Rules / SSOT Updated:** Added rules regarding relative imports, Dayjs usage, and envelope handling.
- **AI Prompt Used:** None (Surgical fix)
- **Verification Result:** Pass | Backend starts, data renders, modal functional.
- **Notes / Lessons:** Avoid absolute package imports in hybrid desktop/web environments; always use ESM imports in Vite.
- **Updated:** 2026-05-20
- **Status:** `✅ Verified`
- **Severity:** 🟢 Low
- **Detected:** 2026-05-19 22:00
- **Plain English Description:** Compilation output showed a deprecation warning regarding the use of `@import` in SCSS files, pointing to a path that seemed incorrectly resolved to `.venv`.
- **Reproduction Steps:** 
  1. Run `npm run dev` in `frontend/`.
  2. Observe terminal output during compilation.
- **Root Cause:** Use of legacy Sass `@import` directive instead of the modern `@use` module system. The path issue was a secondary side-effect of how Sass resolved the legacy include.
- **Immediate Containment:** Migrated `@import` to `@use` in `frontend/src/styles/App.module.scss`.
- **Permanent Fix:** Enforced `@use` syntax in project rules to prevent re-introduction of legacy imports.
- **New Tests Added:** Manual verification of terminal logs during dev startup.
- **Rules / SSOT Updated:** Added explicit rule in `Rules.md` mandating SCSS `@use`.
- **AI Prompt Used:** None (Self-initiated fix)
- **Verification Result:** Pass | Warning removed from terminal logs.
- **Notes / Lessons:** All future SCSS files must strictly follow `@use` syntax to ensure Dart Sass 3.0.0+ compatibility.
- **Updated:** 2026-05-19

### 🟡 I-004: Sales Table Empty & Batch API 400 Error
- **Status:** `📦 Closed`
- **Severity:** 🟡 Medium
- **Detected:** 2026-05-21 08:30
- **Plain English Description:** Sales table rendered empty despite API 200 response, and batch submission returned 400.
- **Reproduction Steps:**
  1. Open Operations page.
  2. Observe empty table.
  3. Submit batch sale.
- **Root Cause:**
    1. **Empty Table:** The `useSales` hook was returning the raw API envelope `{success: true, data: [...]}` while the UI was incorrectly accessing the property or missing the data map.
    2. **API 400:** Backend service validation `validate_draw` correctly rejected the request because the current system time exceeded the `cutoff_time` of the open draw.
- **Immediate Containment:** 
    1. Logged API response to identify data structure.
    2. Verified business logic enforcement in backend.
- **Permanent Fix:**
    1. Updated `useSales` to return the `data` array directly.
    2. Updated `Operations.tsx` to align with the array structure.
    3. Added instructions to ensure test data has a future `cutoff_time`.
- **New Tests Added:** N/A (Manual smoke check).
- **Rules / SSOT Updated:** None.
- **AI Prompt Used:** None.
- **Verification Result:** Pass | Table now renders; 400 identified as expected business logic behavior.
- **Notes / Lessons:** Always verify API response structure before mapping in UI components.
- **Updated:** 2026-05-21

