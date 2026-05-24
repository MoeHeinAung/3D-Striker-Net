# 🚨 INCIDENT_LOG.md

## 📊 Quick Dashboard
| ID    | Status       | Severity | Description                                          | Detected   | Closed     |
|-------|--------------|----------|------------------------------------------------------|------------|------------|
| I-001 | 📦 Closed     | 🟠 High   | Database View Initialization Failure                 | 2026-05-23 | 2026-05-23 |
| I-002 | 📦 Closed     | 🔴 Critical | Circular Import Dependency Crash                    | 2026-05-23 | 2026-05-23 |
| I-003 | 📦 Closed     | 🟠 High   | Database Migration Targeting Wrong File              | 2026-05-23 | 2026-05-23 |
| I-004 | 📦 Closed     | 🟠 High   | API Endpoint Routing and Schema Mismatch             | 2026-05-24 | 2026-05-24 |
| I-005 | 📦 Closed     | 🔴 Critical | Database File Path Misalignment (Root vs Backend)     | 2026-05-24 | 2026-05-24 |
| I-006 | 📦 Closed     | 🟠 High   | Stale UI Form State Persistence (AntD Form)          | 2026-05-24 | 2026-05-24 |
| I-007 | 📦 Closed     | 🔴 Critical | ESM Module Resolution Error (Empty Interface Files)  | 2026-05-24 | 2026-05-24 |

---
## 📝 Incident Log

### 🟠 I-001: Database View Initialization Failure
- **Status:** `📦 Closed`
- **Severity:** High
- **Detected:** 2026-05-23
- **Description:** Application failed to start due to `sqlalchemy.exc.OperationalError: no such table: main.sales` and missing SQL views.
- **Permanent Fix:** Implemented Alembic for robust schema/view management and migration automation.

### 🔴 I-002: Circular Import Dependency Crash
- **Status:** `📦 Closed`
- **Severity:** 🔴 Critical
- **Detected:** 2026-05-23 20:30
- **Root Cause:** Added top-level model imports in `backend/app/db/base.py` for Alembic, creating circular dependency.
- **Permanent Fix:** Moved model imports into `backend/alembic/env.py`.

### 🟠 I-003: Database Migration Targeting Wrong File
- **Status:** `📦 Closed`
- **Severity:** 🟠 High
- **Detected:** 2026-05-23 21:00
- **Root Cause:** Misconfiguration in `alembic.ini` pointed to `backend/app.db` instead of the project root `app.db`.
- **Permanent Fix:** Updated `alembic.ini` and redirected all logic to root `./app.db`.

### 🟠 I-004: API Endpoint Routing and Schema Mismatch
- **Status:** `📦 Closed`
- **Severity:** 🟠 High
- **Detected:** 2026-05-24
- **Root Cause:** 1) Frontend requested incorrect paths. 2) Missing `created_at` column in ticket tables.
- **Permanent Fix:** Corrected frontend endpoint definitions and updated Alembic migrations.

### 🔴 I-005: Database File Path Misalignment
- **Status:** `📦 Closed`
- **Severity:** 🔴 Critical
- **Detected:** 2026-05-24
- **Plain English Description:** Application appeared to "lose" data after restart. Backend API was writing to one file while frontend/Alembic were reading from another.
- **Root Cause:** `backend/app/core/config.py` used `BACKEND_DIR` which resolved to `backend/app/app.db`, while `alembic.ini` and manual scripts used `./app.db` (root).
- **Permanent Fix:** Updated `Settings` to use `PROJECT_ROOT` ensuring all layers target the root `app.db`.
- **Rules / SSOT Updated:** Added DB path consistency rule to `Rules.md`.

### 🟠 I-006: Stale UI Form State Persistence
- **Status:** `📦 Closed`
- **Severity:** 🟠 High
- **Detected:** 2026-05-24
- **Plain English Description:** Form submissions failed with validation errors because hidden fields (from previous modal opens) were still being sent to the backend.
- **Root Cause:** Ant Design `Form` persists values by default. Deleting a field from the DOM does not remove it from the form data.
- **Permanent Fix:** Added `preserve={false}`, `destroyOnClose`, and explicit `form.resetFields()` in `useEffect`.
- **Rules / SSOT Updated:** Added UI state sanitization rule to `Rules.md`.

### 🔴 I-007: ESM Module Resolution Error
- **Status:** `📦 Closed`
- **Severity:** 🔴 Critical
- **Detected:** 2026-05-24
- **Plain English Description:** Frontend crashed with `SyntaxError: requested module does not provide an export named 'SuccessEnvelope'`.
- **Root Cause:** Files containing ONLY TypeScript interfaces are erased during transpilation. Browsers cannot resolve named imports from empty files.
- **Permanent Fix:** Used `import type` for all interface-only imports and added a dummy concrete export to `base.ts`.
- **Rules / SSOT Updated:** Hardened ESM import rules in `Rules.md`.
