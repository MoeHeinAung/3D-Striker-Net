# 🎲 Draws Management Implementation (T-004)

**Role:** Backend Architect (`Docs/agents/backend_architect.md`) & Frontend Specialist (`Docs/agents/frontend_specialist.md`)

## 🎯 Objective
Create the `Draws` database table, implement core CRUD logic with strict state transition rules, and build a UI for managing active draws.

## 📂 Allowed Files & Folders
- `backend/app/models/draw.py`
- `backend/app/schemas/draw.py`
- `backend/app/repositories/draw.py`
- `backend/app/services/draw.py`
- `backend/app/api/routes/draw.py`
- `frontend/src/pages/Draws.tsx`

## 🏗️ Approved Patterns (Mandatory)
- **Constraint:** Only one draw can have the status `OPEN` at any given time.
- **State Machine:**
  - `OPEN` (Initial state, before cutoff)
  - `CLOSED` (Triggered after cutoff-time)
  - `SETTLED` (Triggered upon winning ticket input and report generation)
- **Backend:** 
  - Use Pydantic for validation.
  - Thin routes, service layer for business/state-transition logic, repository for DB access.
- **Frontend:**
  - TanStack Query for data fetching.
  - Ant Design components for the CRUD form/table.

## 🚫 Strict Anti-Patterns (Forbidden)
- ❌ **No Logic in Routes:** API routes must NOT check status; services must handle the `Only One Active Draw` validation.
- ❌ **No Duplicate Logic:** Status logic must exist only in the service layer.
- ❌ **No Direct DB Access:** Use the Repository pattern strictly.

## ✅ Definition of Done (Verification Checklist)
1. [ ] **DB Model:** Table `Draws` matches specs (id, open-date, cutoff-time, status, note, created_at).
2. [ ] **Active Constraint:** Trying to create a second `OPEN` draw raises a clear validation error.
3. [ ] **CRUD:** Create, Read, List, Update operations are fully functional.
4. [ ] **Frontend:** Draws page provides a clean UI for adding draws and shows the current status.
5. [ ] **Tests:** Backend unit tests verify service logic, particularly the `Only One Active Draw` rule.
6. [ ] **Compliance:** SCSS Modules follow `@use` syntax; Linting/Typecheck pass.
