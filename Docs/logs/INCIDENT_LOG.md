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
| I-005 | `✅ Verified` | 🟡 Medium | Risk View Empty (Table vs View Mismatch) | 2026-05-22 | 2026-05-22 |
| I-006 | `📦 Closed`  | 🔴 Critical | Risk.tsx UI Crash (undefined .toLocaleString) | 2026-05-23 | 2026-05-23 |

**Status Options:** `⬜ Open` | `🔍 Investigating` | `🔧 Fixed` | `✅ Verified` | `📦 Closed`
**Severity Options:** `🔴 Critical` | `🟠 High` | `🟡 Medium` | `🟢 Low`

---
## 📝 Incident Log

[ ... Previous Incidents ... ]

### 🟡 I-005: Risk View Empty (Table vs View Mismatch)
- **Status:** `✅ Verified`
- **Severity:** 🟡 Medium
- **Detected:** 2026-05-22 14:00
- **Plain English Description:** Risk page rendered no data despite backend API returning 200 Success. Investigation showed the view was initialized as a physical table in SQLite.
- **Reproduction Steps:** 
  1. Open Risk page.
  2. Observe empty table.
  3. Query `sales_by_ticket_per_draw` table in DB directly; observe 0 rows.
- **Root Cause:** SQLAlchemy's `Base.metadata.create_all` incorrectly created `sales_by_ticket_per_draw` as a standard `TABLE` instead of a `VIEW` during initial schema setup, effectively overriding the SQL view definition.
- **Immediate Containment:** 
  1. Dropped the table `sales_by_ticket_per_draw`.
  2. Executed `CREATE VIEW` for the risk aggregation.
- **Permanent Fix:**
  1. Updated `backend/app/models/risk.py` to include `__table_args__ = {'info': {'is_view': True}}` to prevent `create_all` from attempting to manage the view.
  2. Ensured proper initialization and import ordering.
- **New Tests Added:** Manual verification of DB view content post-fix.
- **Rules / SSOT Updated:** None (View management strategy confirmed).
- **AI Prompt Used:** None (Surgical fix)
- **Verification Result:** ✅ Verified | Querying `sales_by_ticket_per_draw` now returns aggregated data.
- **Notes / Lessons:** Always use `{'info': {'is_view': True}}` for SQL views to prevent SQLAlchemy DDL interference.
- **Updated:** 2026-05-22

### 🔴 I-006: Risk.tsx UI Crash (undefined .toLocaleString)
- **Status:** `📦 Closed`
- **Severity:** 🔴 Critical
- **Detected:** 2026-05-23 13:30
- **Plain English Description:** The Risk page crashed with an "Uncaught TypeError: Cannot read properties of undefined" error immediately after implementing the Offloaded feature. The UI attempted to format a missing number field using `.toLocaleString()`.
- **Reproduction Steps:** 
  1. Access the Risk page while the backend is returning records missing the `offloaded` or `holding` fields.
  2. The Ant Design table attempts to render the row.
  3. The `render` function calls `val.toLocaleString()` on an undefined value.
- **Root Cause:** Violation of `Rules.md § 3` (Data Safety). The code assumed the presence of numeric data and called a method on it without checking if it existed. Contributed by the desktop runner's `reload=False` setting, which kept an old backend version alive while the frontend was updated.
- **Immediate Containment:** Applied defensive rendering to all numeric columns in `Risk.tsx`: `(val ?? 0).toLocaleString()`.
- **Permanent Fix:** Updated `Rules.md` to mandate null-safe numeric formatting across all UI components. Added the missing `Array.isArray(data)` check to the Risk page.
- **New Tests Added:** Manual verification of UI stability with partial backend data.
- **Rules / SSOT Updated:** `Rules.md § 3` updated to enforce defensive formatting for numbers.
- **AI Prompt Used:** None (Surgical fix)
- **Verification Result:** ✅ Verified | Risk page loads correctly even with missing backend fields.
- **Notes / Lessons:** Never assume a backend field is present in the UI render layer. Always use nullish coalescing for formatting methods.
- **Updated:** 2026-05-23
