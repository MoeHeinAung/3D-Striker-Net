# 📋 Current Tasks

This document tracks active and upcoming tasks. Completed tasks are moved to `IMPLEMENTATION_LOGS.md`.

### 🟦 T-018: API Canonical Path Migration
- **Status:** 📝 To Do
- **Priority:** High
- **Phase:** Stabilization
- **Plain English Goal:** Establish `/api` as the single canonical path for all backend endpoints and remove root-mount endpoints.
- **Dependencies:** None
- **Allowed Files:** 
  - `backend/app/api/router.py`
  - `backend/app/main.py`
  - `frontend/src/services/api.ts`
- **Definition of Done (DoD):**
  - [ ] All traffic routed through `/api`.
  - [ ] Warning logs implemented for legacy endpoints.
  - [ ] Frontend client uses canonical path.
  - [ ] All tests passing.
- **Notes/Blockers:** Requires dual-mount during transition.
- **Updated:** 2026-05-21
