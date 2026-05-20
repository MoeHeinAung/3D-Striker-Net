### 🟦 T-003: Navigation & Page Setup
- **Status:** `✅ Done`
- **Priority:** High
- **Phase:** UX
- **Plain English Goal:** Implement a main Navbar and create placeholder pages for Dashboard, Draws, Network, Sale, Risk, Report, and Settings using React Router.
- **Dependencies:** T-001, T-002
- **Allowed Files:** 
  - `frontend/src/components/Navbar.tsx`
  - `frontend/src/pages/**`
  - `frontend/src/App.tsx`
- **AI Prompt Used:** `prompts/nav-T003.md`
- **Rollback Plan:** Revert `frontend/src/` changes.

#### 🛠️ Engineering Standards
- **Approved Patterns:**
  - **Frontend:** `react-router-dom` for navigation, Ant Design `Menu` component for Navbar.
  - **Styles:** SCSS Modules for all components.
- **Strict Anti-Patterns:**
  - ❌ **No Hardcoded Links:** Use `react-router-dom` `Link` or `useNavigate`.
  - ❌ **No Logic in Routes:** UI logic stays in components.
- **Related Rules:**
  - `Rules.md § 2.1`: Components render UI only, styling via SCSS Modules.

- **Definition of Done (DoD):**
  - [x] Navbar exists and links are functional
  - [x] All 7 pages created and routable
  - [x] UI matches "Futuristic Precision" design system
  - [x] Tests pass
- **Test Results:** ✅ Pass | Linting clean
- **Notes/Blockers:** Implemented navigation using Ant Design and React Router.
- **Updated:** 2026-05-19

### 🟦 T-004: Draws Table & CRUD
- **Status:** `✅ Done`
- **Priority:** High
- **Phase:** Core
- **Plain English Goal:** Create 'Draws' database table, implement CRUD service/repository logic with 'Only One Active Draw' constraint, and build frontend interface to manage draws.
- **Dependencies:** T-001
- **Allowed Files:** 
  - `backend/app/models/draw.py`
  - `backend/app/schemas/draw.py`
  - `backend/app/repositories/draw.py`
  - `backend/app/services/draw.py`
  - `backend/app/api/routes/draw.py`
  - `frontend/src/pages/Draws.tsx`
- **AI Prompt Used:** `prompts/draws-T004.md`
- **Rollback Plan:** Revert DB migrations and delete Draw-related service/model files.

#### 🛠️ Engineering Standards
- **Approved Patterns:**
  - **Backend:** Pydantic schemas, Service-Repository pattern, SQLite/SQLAlchemy.
  - **Business Logic:** "Only One Active Draw" constraint in Service layer.
- **Strict Anti-Patterns:**
  - ❌ **No Logic in Routes:** API handlers must delegate all business logic to Services.
  - ❌ **No Direct DB Access:** Use the Repository pattern strictly.
- **Related Rules:**
  - `Rules.md § 2.2`: API routes are thin, logic in services, DB in repositories.

- **Definition of Done (DoD):**
  - [x] Draws table created with requested columns
  - [x] Business logic enforces only one "OPEN" draw at a time
  - [x] Draw CRUD operations are functional via API
  - [x] Frontend allows creating and viewing draws
  - [x] Tests pass for Service logic
- **Test Results:** ✅ Pass | Backend pytest: 2 passed
- **Notes/Blockers:** Initial backend CRUD logic implemented and verified with tests.
- **Updated:** 2026-05-19
