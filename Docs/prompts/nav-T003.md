# 🎨 Navigation & Page Setup (T-003)

**Role:** Frontend Specialist (`Docs/agents/frontend_specialist.md`)

## 🎯 Objective
Implement a main Navigation structure and create placeholder pages for the application.

## 📂 Allowed Files
- `frontend/src/components/Navbar.tsx`
- `frontend/src/pages/**` (Dashboard, Draws, Network, Sale, Risk, Report, Settings)
- `frontend/src/App.tsx`
- `frontend/src/styles/Navbar.module.scss`

## 🏗️ Approved Patterns (Mandatory)
- **Navigation:** Use `react-router-dom` for route management.
- **UI:** Ant Design `Layout` and `Menu` for the navigation bar.
- **Styling:** SCSS Modules only. Use colors from `design-system.md` (e.g., `#0A0B0E`, `#00F0FF`).
- **Pages:** Create a basic component for each page displaying the page name in an H1 tag.

## 🚫 Strict Anti-Patterns (Forbidden)
- ❌ Do not use `<a>` tags for navigation; use React Router `Link` components.
- ❌ No business logic in the Navbar or Page components.
- ❌ No global CSS styles; all styles must be scoped modules.

## ✅ Definition of Done (Verification Checklist)
1. [ ] **Navbar:** Functional Navbar present at the top of the dashboard.
2. [ ] **Routing:** Clicking a link correctly updates the URL and renders the target page.
3. [ ] **Completeness:** All 7 pages (Dashboard, Draws, Network, Sale, Risk, Report, Settings) are created and routable.
4. [ ] **Design:** Navigation bar uses "Futuristic Precision" aesthetic (e.g., dark theme, neon accents).
5. [ ] **Quality:** `npm run lint` and `npm run typecheck` pass.
