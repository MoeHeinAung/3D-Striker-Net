# 🚨 INCIDENT_LOG.md

## I-001: Database View Initialization Failure
- **Date:** 2026-05-23
- **Severity:** High
- **Description:** Application failed to start due to `sqlalchemy.exc.OperationalError: no such table: main.sales` and missing SQL views (`sales_by_ticket_per_draw`, `offloaded_amount_by_ticket_per_draw`). The manual database initialization (`Base.metadata.create_all()`) did not persist or create the views, and subsequent application runs failed because SQLAlchemy reflected the database state and found the views missing.
- **Solution:** 
    1. Temporarily dropped and recreated views manually via `sqlite3` to restore service.
    2. Decided to implement Alembic for robust schema/view management and migration automation.
- **Status:** `✅ Resolved (Workaround) -> 🛠 In Progress (Permanent Alembic Fix)`
