# Implementation Prompt: Navigation Redesign

## 1. Scope
Redesign the application navigation bar and perform a system-wide refactor of related routes, page names, and API mappings to reflect the new structure:
- **Draws** (`/draws`)
- **Partners** (`/network`)
- **Sales** (`/sale`)
- **Dashboard** (`/` - via clickable logo)
- **Risk** (`/risk`)
- **Report** (`/report`)
- **Settings** (`/settings`)

## 2. Allowed Files/Folders
- `frontend/src/components/Navbar.tsx`
- `frontend/src/styles/Navbar.module.scss`
- `frontend/src/pages/`
- `frontend/src/queries/`
- `backend/app/api/routes/`

## 3. Approved Patterns
- **Frontend**: Update React components, CSS Modules, and routing logic consistently.
- **Backend**: Refactor route naming and API endpoints to match the new terminology without breaking existing service/repository layers.
- **Consistency**: All references (labels, file names, routes) must be aligned with the new `Business_Logic.md` table.
- **Architectural**: Maintain strict separation of layers; no business logic in UI; no direct DB access from frontend.

## 4. Anti-Patterns (Forbidden)
- Hardcoded URLs or paths.
- Breaking API contracts or modifying service logic during the renaming process.
- Leaving "dead" code/routes after renaming.
- Violating the 5-layer architectural rule.

## 5. Definition of Done (DoD)
- [ ] Navigation bar correctly reflects the new labels and sections.
- [ ] Clicking the logo redirects to `/` (Dashboard).
- [ ] All pages (Draws, Partners, Sales, Risk, Report, Settings) are reachable via the updated navigation.
- [ ] All file names, routes, and internal references are renamed according to the new labels.
- [ ] `npm run lint` and `npm run typecheck` are green.
- [ ] Vitest component tests pass for the updated `Navbar`.
- [ ] Backend API routes are renamed and functioning (smoke test).
- [ ] `Business_Logic.md` requirements are fully met.
