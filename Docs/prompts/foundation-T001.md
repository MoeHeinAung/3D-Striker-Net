# 🚀 Foundation & Connectivity Implementation (T-001)

Adopt the roles of **Backend Architect** and **Frontend Specialist** as defined in `Docs/agents/`.

## 🎯 Objective
Initialize the 3D-Striker-Net foundation. Create the core directory structure, a functional FastAPI backend with health checks, and a React frontend that consumes this data using the project's mandated patterns.

## 📂 Allowed Files & Folders
- **Backend:** `backend/app/` (entire tree including `main.py`, `api/`, `core/`, `schemas/`)
- **Frontend:** `frontend/src/` (entire tree including `components/`, `services/`, `styles/`, `queries/`)
- **Config:** `frontend/vite.config.ts`, `frontend/package.json`

## 🏗️ Approved Patterns (Mandatory)
- **Backend:** 
  - Success envelopes: `{"success": true, "data": {...}, "message": ""}`
  - Pydantic schemas for all I/O in `backend/app/schemas/`.
  - Routes in `backend/app/api/routes/` must be logic-free (call Services).
- **Frontend:**
  - **Axios** instance configured in `frontend/src/services/api.ts`.
  - **TanStack Query** for fetching health status.
  - **SCSS Modules** for styling in `frontend/src/styles/`.
  - **Ant Design** components for the UI layout.

## 🚫 Strict Anti-Patterns (Forbidden)
- ❌ No `fetch()` or `useEffect` for data fetching.
- ❌ No logic in `App.tsx`; keep it as a clean entry point.
- ❌ No hardcoded URLs (use `VITE_API_URL`).
- ❌ No business logic in API routes.

## ✅ Definition of Done (Verification Checklist)
1. [ ] **Structure:** `backend/app/` follows `SSOT.md § 2` exactly.
2. [ ] **Health Check:** `GET /health` returns a valid success envelope.
3. [ ] **Frontend Bridge:** `frontend/src/queries/useHealth.ts` successfully fetches and displays backend status.
4. [ ] **Aesthetics:** UI uses `#0A0B0E` background and "Striker Blue" (`#00F0FF`) accents per `design-system.md`.
5. [ ] **Architecture:** Zero business logic in components or API routes.
6. [ ] **Quality:** `pytest` and `npm run lint` pass without errors.
