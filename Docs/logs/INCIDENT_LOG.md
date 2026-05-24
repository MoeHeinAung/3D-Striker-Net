# 🚨 INCIDENT_LOG.md

## I-001: Database View Initialization Failure
- **Status:** `📦 Closed`
- **Severity:** High
- **Detected:** 2026-05-23
- **Description:** Application failed to start due to `sqlalchemy.exc.OperationalError: no such table: main.sales` and missing SQL views. The manual database initialization did not create views, and subsequent runs failed because SQLAlchemy reflected the database state and found the views missing.
- **Solution:** 
    1. Temporarily dropped and recreated views manually via `sqlite3` to restore service.
    2. Implemented Alembic for robust schema/view management and migration automation.
- **Updated:** 2026-05-23

## I-002: Circular Import Dependency Crash
- **Status:** `📦 Closed`
- **Severity:** 🔴 Critical
- **Detected:** 2026-05-23 20:30
- **Plain English Description:** Application failed to start with an `ImportError` citing a circular import involving `app.models.draw` and `app.db.base`.
- **Reproduction Steps:** 
  1. Start `python main.py`.
  2. Watch backend log for `ImportError`.
- **Root Cause:** Added top-level model imports in `backend/app/db/base.py` to support Alembic autogenerate, which created a circular dependency with models that were trying to import `Base` from `app.db.base`.
- **Immediate Containment:** Reverted top-level imports in `backend/app/db/base.py` to local imports in `init_db`.
- **Permanent Fix:** Moved model imports into `backend/alembic/env.py` where they can be safely loaded for autogenerate without impacting the application startup path.
- **New Tests Added:** Manual verification of server startup.
- **Rules / SSOT Updated:** Confirmed importance of `init_db` pattern.
- **Updated:** 2026-05-23

## I-003: Database Migration Targeting Wrong File
- **Status:** `📦 Closed`
- **Severity:** 🟠 High
- **Detected:** 2026-05-23 21:00
- **Plain English Description:** Risk page remained empty despite existing code logic. Investigations revealed views existed in `backend/app.db` but the application was using `app.db` in the project root.
- **Reproduction Steps:** 
  1. Check database via `sqlite3` for missing views in root `app.db`.
- **Root Cause:** Misconfiguration in `alembic.ini` pointed to `backend/app.db` instead of the project root `app.db`.
- **Immediate Containment:** Redirected Alembic to the root `app.db` and manually applied missing view DDL.
- **Permanent Fix:** Updated `alembic.ini` to use `./app.db` and wrote `fix_views.py` to ensure views exist in the primary database.
- **Verification Result:** Pass | Views present in root `app.db`.
- **Notes / Lessons:** Always verify the active database path before applying migrations or running SQL commands against `app.db`.
- **Updated:** 2026-05-23

## I-004: API Endpoint Routing and Schema Mismatch
- **Status:** `📦 Closed`
- **Severity:** 🟠 High
- **Detected:** 2026-05-24
- **Plain English Description:** Frontend received 404 and 500 errors when fetching ticket data due to incorrect endpoint pathing and missing database columns.
- **Reproduction Steps:** 
  1. Open the application.
  2. Observe console errors for `GET /api/winning-tickets/` and `GET /api/blacklist-tickets/`.
  3. Observe CORS and 500 errors after path fix.
- **Root Cause:** 
    1. Frontend requested `/api/winning-tickets/` while backend served `/api/tickets/winning`.
    2. Missing `created_at` column in `winning_tickets` and `blacklist_tickets` tables despite migration history.
- **Immediate Containment:** 
    1. Updated frontend `useTickets.ts` to use correct API paths.
    2. Manually added missing `created_at` column to SQLite tables.
- **Permanent Fix:** 
    1. Corrected frontend endpoint definitions.
    2. Updated `backend/alembic/versions/59c025d4895f_create_ticket_tables.py` to include `created_at` column and re-ran migration.
- **New Tests Added:** Backend unit tests verified via `pytest`.
- **Rules / SSOT Updated:** None.
- **Verification Result:** Pass | Verified API 200 OK responses.
- **Notes / Lessons:** Ensure endpoint paths match between frontend and backend router prefixing; verify table schemas post-migration.
- **Updated:** 2026-05-24
