# RULES.md — Guardrails & Constraints

Enforcement rules for both humans and AI agents. All code must satisfy every rule before merge.

## 1. Non-Negotiable Guardrails

### 1.1 Mandatory Compliance
All code — human or AI-generated — must pass every rule below. Violations are **defects**, not style preferences.

### 1.2 No-Exceptions Rule
The following are **not accepted** as justification for breaking a rule:
- "temporary shortcut"
- "faster implementation"
- "just for testing"
- "vibe coding simplicity"

### 1.3 Architecture Stability
The architecture has exactly five layers. No new layers, and no collapsing layers together.
- Frontend (React)
- Backend API (FastAPI)
- Backend Core (Services / Repositories)
- Database (SQLite)
- Desktop Shell (pywebview)

### 1.4 Architectural Anti-Patterns
The following patterns are **always forbidden**:
- React → SQLite: Frontend accessing the database directly
- React → Business logic: UI components containing business logic
- API → UI logic: Routes importing React/Frontend code
- Duplicate logic: Same business logic in more than one layer
- DB outside repository: SQLAlchemy or raw SQL used outside `backend/app/repositories/`

### 1.5 Documentation First
Agents and humans must read the latest official documentation for every library, framework, or package before writing code. If a new version or feature is utilized, the documentation must be referenced to avoid deprecated patterns, unnecessary overhead, or common pitfalls.

## 2. Layer Behavior Rules

### 2.1 Frontend (React)
- Components render UI and manage user interactions only.
- All data mutations go through Axios events.
- Server state fetched **only** via TanStack Query.
- Local UI state managed **only** via Zustand.
- No `fetch()` calls in components; Axios-only.
- Styling uses SCSS + CSS Modules; no global CSS pollution. **All SCSS files must use the modern `@use` syntax instead of legacy `@import`.**
- **All local TypeScript/JavaScript file imports in the frontend must include the explicit `.js` extension to satisfy ESM module resolution.**

### 2.2 Backend (FastAPI)
- API routes contain **no business logic**; they delegate to the service layer.
- All business logic must exist under `backend/app/services/`.
- All database queries must exist under `backend/app/repositories/`.
- All request/response validation must use Pydantic schemas in `backend/app/schemas/`.
- **All backend internal imports must use the `app.` prefix (e.g., `from app.core...`) instead of `backend.app.` to ensure compatibility when running from the `backend/` directory or as a module.**

### 2.3 Shared Layer (`shared/`)
Contains **types, API contracts, and constants only**.

### 2.4 Desktop Shell (`desktop/`)
Responsible for window lifecycle, backend bootstrap, and frontend load only. No business logic.
- **The desktop runner must explicitly add the `backend` folder to `sys.path` and use the module path `app.main:app` for uvicorn to match the project's internal import structure.**

## 3. AI Agent Constraints
- Follow canonical directory structure exactly.
- No hidden business logic in React components.
- No imports crossing layer boundaries.
- **Frontend Logic:** Always use standard ESM imports (e.g., `import dayjs from 'dayjs'`) instead of `require()`.
- **Data Safety:** UI Tables must always include an `Array.isArray(data)` check before rendering to prevent crashes on `undefined` or object responses. Numeric fields must use null-safe formatting (e.g., `(val ?? 0).toLocaleString()`) to prevent crashes on missing or malformed data flow.
- **Service Layer Awareness:** Frontend services must match the Axios response interceptor behavior (avoid double-unwrapping the `SuccessEnvelope`).

## 4. Code Quality Gates
- Backend lint: `ruff check .`
- Backend format: `black app/ tests/`
- Frontend lint: `npm run lint`
- Type correctness: `npm run typecheck`
- **Frontend Runtime Verification:** All UI tasks must include a Vitest mounting test to verify the component renders and the module graph resolves successfully.
- Commit gate: `pre-commit run --all-files`

## 5. Definition of Done (DoD)
- Tests pass.
- Errors match SSOT format.
- No unapproved dependencies.
- Lint, format, and typecheck gates green.

## 6. Final Override
If a feature cannot be implemented without violating these rules, the design is wrong. Stop and raise a design review.
