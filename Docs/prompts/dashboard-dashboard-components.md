# 🎨 Frontend Implementation: Dashboard Nightingale Chart & Countdown Timer

**Role:** Frontend Specialist (`Docs/agents/frontend_specialist.md`)

## 1. Task Description
Develop a professional, futuristic Nightingale Chart for the `Dashboard` page using data from Total Sale Amount, Total House Holding Amount, Pending Amount, and Offloaded Amount. 
- **Grid Layout**: `grid-column: 4/10`, `grid-row: 1/7`

Develop a futuristic countdown timer widget for the `Dashboard` page tracking time until draw cutoff.
- **Grid Layout**: `grid-column: 1/4`, `grid-row: 7/8`

## 2. Allowed Files/Folders
- `frontend/src/pages/Dashboard.tsx` (Update)
- `frontend/src/components/NightingaleChart.tsx` (New)
- `frontend/src/components/CountdownTimer.tsx` (New)
- `frontend/src/styles/Dashboard.module.scss` (Update/New)
- `frontend/src/queries/dashboardQueries.ts` (New/Update)

## 3. Approved Patterns
- Use **TanStack Query** for fetching metrics.
- Use **SCSS Modules** for all styling.
- Follow **Ant Design** integration if applicable or standard component structure.
- Adhere to the sci-fi/futuristic aesthetic defined in the design system.
- Use `import type` for interface-only imports.
- Explicit `.js` extensions for local file imports in the frontend.

## 4. Strict Anti-Patterns (Forbidden)
- NO hardcoded data or logic within components.
- NO `useEffect` for data fetching (use TanStack Query).
- NO global CSS usage (use CSS Modules only).
- NO `import { Interface }` (use `import type`).
- NO business logic in the UI layer.

## 5. Definition of Done (DoD)
- [ ] Component renders correctly in the `Dashboard` page.
- [ ] Metrics are fetched asynchronously via TanStack Query.
- [ ] Grid layout applied exactly as specified (`grid-column`/`grid-row`).
- [ ] Component passes `npm run lint` and `npm run typecheck`.
- [ ] Vitest component test created and passing.
- [ ] Aesthetic matches sci-fi/futuristic design system.
- [ ] Numeric fields null-safe (e.g., `(val ?? 0)`).
- [ ] Data array check `Array.isArray(data)` included.
- [ ] Modal/form reset logic used if applicable (though these are display components).
