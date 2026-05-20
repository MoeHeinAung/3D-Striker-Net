# 🏦 Master Dealer & Network UI Implementation (T-007)

**Role:** Backend Architect & Frontend Specialist

## 🎯 Objective
1. Create the `MasterDealers` database table (id [3 letters], name, commission, jp_factor, sp_factor, note, created_at).
2. Redesign `Network.tsx` to feature:
   - **Left Section (Fixed Width):** Tabbed navigation between `Agents` list and `Master Dealers` list.
   - **Right Section (Dynamic):** Displays details of the selected Agent or Master Dealer.

## 📂 Allowed Files & Folders
- `backend/app/models/master_dealer.py`
- `backend/app/schemas/master_dealer.py`
- `backend/app/repositories/master_dealer.py`
- `backend/app/services/master_dealer.py`
- `backend/app/api/routes/master_dealer.py`
- `frontend/src/pages/Network.tsx`
- `frontend/src/queries/useMasterDealers.ts`

## 🏗️ Approved Patterns (Mandatory)
- **Backend:** Pydantic validation (3-letter ID), Service/Repository pattern.
- **Frontend:** Ant Design `Layout`, `Tabs`, `Table`. Zustand for tracking "active selection" to update the right pane.

## 🚫 Strict Anti-Patterns (Forbidden)
- ❌ **No hardcoded layouts:** Use CSS Modules or Ant Layout components.
- ❌ **No UI Logic in routes:** Keep logic in the service layer.
- ❌ **No mixing of data flows:** Use distinct stores or TanStack states for Agents/Dealers.

## ✅ Definition of Done (Verification Checklist)
1. [ ] **DB Model:** Table `MasterDealers` matches spec (id [3 chars], name, commission, jp_factor, sp_factor, note, created_at).
2. [ ] **Validation:** 3-letter, no-number ID validation is strictly enforced.
3. [ ] **Layout:** Network page uses a 2-column layout (30/70 split).
4. [ ] **Interaction:** Tab switching works, and clicking a row in the table updates the detail pane on the right.
5. [ ] **CRUD:** Master Dealer CRUD is fully operational.
6. [ ] **Compliance:** Pass `npm run lint` and all backend tests.
