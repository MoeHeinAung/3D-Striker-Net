# SSOT.md — Architectural Facts

This document is the **only authoritative reference** for structural facts about the project.
It is read-only: no constraints, no enforcement rules, no process guidance.

---

## Codebase Intelligence
This project uses GitNexus for code knowledge graph. Key commands:
- `gitnexus analyze --drop-embeddings` - Re-index codebase
- `gitnexus query "search term"` - Search knowledge graph
- `gitnexus context SymbolName` - Get symbol context

## 1. Stack

### Frontend

| Layer | Technology |
|---|---|
| Framework | React + TypeScript + Vite |
| Styling | SCSS + CSS Modules |
| UI Component Library | Ant Design |
| Routing | React Router DOM |
| UI State | Zustand |
| Server State | TanStack Query |
| Forms | React Hook Form |
| HTTP Client | Axios |
| Unit/Component Tests | Vitest + React Testing Library |

### Backend

| Layer | Technology |
|---|---|
| Language | Python 3.11+ |
| Framework | FastAPI |
| Validation | Pydantic |
| Database | SQLite |
| ORM | SQLAlchemy |
| External HTTP | HTTPX |
| Tests | Pytest |

### Desktop Shell
cls
| Layer | Technology |
|---|---|
| Shell | pywebview |

### Tooling

| Tool | Purpose |
|---|---|
| Ruff | Backend linting |
| Black | Backend formatting |
| ESLint | Frontend linting |
| pre-commit | Commit gate |

---

## 2. Canonical Directory Structure

```
my-app/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── features/
│   │   ├── store/
│   │   ├── queries/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── forms/
│   │   ├── utils/
│   │   ├── styles/
│   │   └── main.tsx
│   ├── vite.config.ts
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   │   ├── router.py
│   │   │   └── routes/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── db/
│   │   ├── core/
│   │   └── external/
│   ├── tests/
│   └── pyproject.toml
│
├── desktop/
│   ├── main.py
│   └── window.py
│
├── shared/
│   ├── contracts/
│   ├── types/
│   └── constants/
│
├── scripts/
└── .env
```

---

## 3. Layer Definitions

| Layer | Canonical Path | Responsibility by Architecture |
|---|---|---|
| Frontend (UI) | `frontend/src/` | Render UI, handle user interactions, own local UI state, call the API layer |
| Backend API | `backend/app/api/` | HTTP ingress/egress only; route requests to the service layer |
| Backend Services | `backend/app/services/` | Business logic and orchestration |
| Backend Repositories | `backend/app/repositories/` | SQLite read/write access via SQLAlchemy |
| Backend Models | `backend/app/models/` | ORM definitions |
| Backend Schemas | `backend/app/schemas/` | Pydantic input/output validation |
| Backend External | `backend/app/external/` | Third-party API calls via HTTPX |
| Desktop Shell | `desktop/` | Window lifecycle, backend bootstrap, frontend load |
| Shared Contracts | `shared/` | Types, API contracts, constants only |

---

## 4. Data Flow

### Read path

```
UI (React)
  → TanStack Query cache
  → Axios request
  → FastAPI route
  → Service layer
  → Repository layer
  → SQLite
  → Pydantic schema
  → Frontend cache update
```

### Write path

```
React Form
  → React Hook Form validation
  → Axios mutation
  → FastAPI route
  → Pydantic validation
  → Service logic
  → Repository update
  → SQLite commit
  → TanStack Query cache invalidate
  → UI re-render
```

### UI-only state path

```
Component → Zustand store → UI update
```

---

## 5. API Contract

### Success response

```json
{
  "success": true,
  "data": {},
  "message": ""
}
```

### Error response

```json
{
  "success": false,
  "error": {
    "code": "",
    "message": "",
    "details": {}
  }
}
```

### HTTP verb mapping

| Verb | Purpose |
|---|---|
| GET | Read |
| POST | Create |
| PUT | Full update |
| PATCH | Partial update |
| DELETE | Remove |

### Validation

All request and response payloads must be defined with Pydantic schemas. Trusted input types between frontend and backend must be kept in sync via shared contracts or matching Pydantic/TypeScript definitions.

---

## 6. Environment Variables

### Frontend (`frontend/.env` / `.env`)

```
VITE_API_URL=http://127.0.0.1:8000
```

### Backend (`.env`, loaded via python-dotenv)

```
DATABASE_URL=sqlite:///app.db
DEBUG=true
APP_NAME=3D-Striker-Net
```

### Desktop (`.env`)

```
APP_MODE=desktop
WINDOW_SIZE=fullscreen
```

### Config source conventions

- No hardcoded URLs.
- No secrets stored in the frontend bundle.
- Backend owns all secrets.
- `shared/constants` holds non-sensitive values only.
- Environment variables are loaded via `python-dotenv` in the backend entry point (`backend/app/main.py`).

---

## 7. Startup Health Checks

| Check | Pass Condition |
|---|---|
| Backend health | `/health` returns `200` |
| Database connection | SQLAlchemy engine acquires and releases a connection without error |
| Frontend loads | Vite dev server responds; root route renders without console errors |
