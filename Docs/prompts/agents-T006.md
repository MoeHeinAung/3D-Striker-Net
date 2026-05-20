# 🏛️ Agents Management Implementation (T-006)

**Role:** Backend Architect (`Docs/agents/backend_architect.md`) & Frontend Specialist (`Docs/agents/frontend_specialist.md`)

## 🎯 Objective
Create the `Agents` database table (id [3 letters, no numbers], name, commission, jp_factor, sp_factor, note, created_at) and implement CRUD operations with a UI inside the `Network` page.

## 📂 Allowed Files & Folders
- `backend/app/models/agent.py`
- `backend/app/schemas/agent.py`
- `backend/app/repositories/agent.py`
- `backend/app/services/agent.py`
- `backend/app/api/routes/agent.py`
- `frontend/src/pages/Network.tsx`
- `frontend/src/queries/useAgents.ts`

## 🏗️ Approved Patterns (Mandatory)
- **Backend:** 
  - Use Pydantic for validation.
  - Thin routes, service layer for business logic, repository for DB access.
- **Frontend:**
  - TanStack Query for data fetching.
  - Ant Design components for the CRUD form/table.
  - SCSS Modules following `@use` syntax.

## 🚫 Strict Anti-Patterns (Forbidden)
- ❌ **No Logic in Routes:** API routes must NOT check business logic; services must handle it.
- ❌ **No Duplicate Logic:** Business logic must exist only in the service layer.
- ❌ **No Direct DB Access:** Use the Repository pattern strictly.
- ❌ **No `require()`:** Use standard ESM imports for all dependencies.

## ✅ Definition of Done (Verification Checklist)
1. [ ] **DB Model:** Table `Agents` matches specs (id [3 chars], name, commission, jp_factor, sp_factor, note, created_at).
2. [ ] **Validation:** ID constraint (3 characters, no numbers) strictly enforced in Pydantic schema.
3. [ ] **CRUD:** Create, Read, List, Update operations are fully functional.
4. [ ] **Frontend:** Network page provides a clean UI for managing agents and shows the agent list.
5. [ ] **Tests:** Backend unit tests verify repository and service logic.
6. [ ] **Compliance:** SCSS Modules follow `@use` syntax; Linting/Typecheck pass.
