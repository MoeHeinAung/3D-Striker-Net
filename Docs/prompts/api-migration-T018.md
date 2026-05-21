# API Canonical Path Migration Strategy Prompt

## Goal
Establish `/api` as the single canonical path for all backend endpoints and decommission legacy root-mount endpoints.

## Allowed Files
- `backend/app/api/router.py` (Configure routes)
- `backend/app/main.py` (App lifecycle / Middleware for warnings)
- `frontend/src/services/api.ts` (Client base URL update)

## Approved Patterns
- **Dual-Mount Transition:** Keep root-mount handlers alive but add logging/deprecation warnings.
- **Middleware Warnings:** Implement a FastAPI middleware in `backend/app/main.py` to log requests to non-prefixed paths with `WARNING` level.
- **Canonical API Service:** Update `frontend/src/services/api.ts` to use `VITE_API_URL + '/api'`.

## Anti-Patterns
- Removing root mounts before verifying frontend migration (causes downtime).
- Hardcoding URLs in business logic.
- Ignoring legacy endpoint telemetry.

## Definition of Done (DoD)
- [ ] Backend middleware logs requests to legacy paths with `[DEPRECATION]` tag.
- [ ] Frontend base URL points to `/api`.
- [ ] No regressions in core functional test suites.
- [ ] Documentation updated to reflect the canonical `/api` prefix.
