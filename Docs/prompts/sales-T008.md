# 💰 Sales Management Implementation (T-008)

**Role:** Backend Architect (`Docs/agents/backend_architect.md`) & Frontend Specialist (`Docs/agents/frontend_specialist.md`)

## 🎯 Objective
Implement the `Sales` table and management interface in the 'Operation' page, including:
1.  **CRUD Functionality:** Create, Read, Update, Delete for sales.
2.  **Bulk Ticket Entry:** Support multi-line input (e.g., `123 - 10000`).
3.  **Active Draw Restriction:** Sales disabled if Draw status is not `OPEN` or past `cutoff_time`.
4.  **Data Integrity:** Tickets must be strictly 3-digit numeric strings.

## 📂 Allowed Files & Folders
- `backend/app/models/sale.py`
- `backend/app/schemas/sale.py`
- `backend/app/repositories/sale.py`
- `backend/app/services/sale.py`
- `backend/app/api/routes/sale.py`
- `frontend/src/pages/Operations.tsx`
- `frontend/src/queries/useSales.ts`

## 🏗️ Approved Patterns (Mandatory)
- **Backend:** 
  - Use Pydantic regex `^\d{3}$` for ticket validation.
  - Service layer logic to check draw state before persisting sales.
- **Frontend:**
  - TanStack Query for state.
  - Ant Design `Table` and `Form` with a large `TextArea` for bulk inputs.

## 🚫 Strict Anti-Patterns (Forbidden)
- ❌ **No Logic in Routes:** API routes must NOT check draw status; services handle this.
- ❌ **No UI Logic in Backend:** Keep business logic separated from HTTP handling.
- ❌ **No non-numeric tickets:** Validation must strictly prevent invalid formats.

## ✅ Definition of Done (Verification Checklist)
1. [ ] **DB Model:** Table `Sales` matches spec (id, draw_id, agent_id, ticket [000-999], amount, note, created_at).
2. [ ] **Validation:** 3-digit numeric ticket string strictly enforced.
3. [ ] **Business Logic:** Sale creation rejected if Draw is not `OPEN` or after `cutoff_time`.
4. [ ] **Bulk Processing:** Multi-line "ticket - amount" input parsed and saved as individual records.
5. [ ] **Frontend:** Operations page shows CRUD UI, functional bulk entry, and restricted state.
6. [ ] **Compliance:** Linting/Typecheck pass; all backend tests pass.
