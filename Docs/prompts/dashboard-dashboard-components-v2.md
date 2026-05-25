# Implementation Prompt: Sci-Fi Dashboard Components (Nightingale Chart & Countdown Timer)

## 🎯 Objective
Implement a professional, futuristic Nightingale (Rose) chart and a countdown timer widget on the `Dashboard` page. These components must replace the current placeholders and use real data from the backend. The visual style must be high-tech/sci-fi, consistent with the existing 12x8 grid system.

## 🛠️ Allowed Files/Folders
- **Backend:**
  - `backend/app/api/routes/dashboard.py` (New file)
  - `backend/app/api/router.py` (To include the new router)
  - `backend/app/services/dashboard.py` (New file)
  - `backend/app/schemas/dashboard.py` (New file)
- **Frontend:**
  - `frontend/src/components/NightingaleChart.tsx`
  - `frontend/src/components/CountdownTimer.tsx`
  - `frontend/src/pages/Dashboard.tsx`
  - `frontend/src/styles/Dashboard.module.scss`
  - `frontend/src/queries/dashboardQueries.ts`
  - `frontend/src/__tests__/NightingaleChart.test.tsx`
  - `frontend/src/__tests__/CountdownTimer.test.tsx`

## 📐 Approved Patterns
- **Backend:**
  - Use `SuccessEnvelope` for all API responses.
  - Delegate all business logic to `DashboardService`.
  - Fetch metrics by aggregating data from `SaleRepository` (Risk Summary).
- **Frontend:**
  - Use **Apache ECharts** for the Nightingale chart (it provides superior sci-fi/rose chart capabilities).
  - Use `TanStack Query` for data fetching via `dashboardQueries.ts`.
  - Adhere to the `Dashboard.module.scss` grid layout:
    - Nightingale Chart: `grid-column: 4/10`, `grid-row: 1/7`.
    - Countdown Timer: `grid-column: 1/4`, `grid-row: 7/8`.
  - Use `dayjs` for time calculations in the `CountdownTimer`.
  - Ensure null-safe formatting for all numeric data.

## 🚫 Anti-Patterns to Avoid
- **No Inline Styles:** Use CSS Modules (`.module.scss`).
- **No Prop Drilling:** Use the custom hooks in `dashboardQueries.ts`.
- **No Direct DB Access:** Frontend must only talk to the API.
- **No Generic "AI Aesthetic":** Avoid purple gradients or overly rounded corners unless they match the specific sci-fi theme of the project.

## ✅ Definition of Done (DoD)
- [ ] Backend endpoint `/api/dashboard/metrics` returns aggregated data:
  - `totalSaleAmount`
  - `totalHouseHoldingAmount`
  - `pendingAmount` (Exceed)
  - `offloadedAmount`
- [ ] Backend endpoint `/api/dashboard/next-draw` returns the latest `OPEN` draw's cutoff time.
- [ ] `NightingaleChart` renders a high-quality rose chart using real metrics.
- [ ] `CountdownTimer` shows a real-time countdown to the next draw cutoff.
- [ ] Visual style is professional, high-tech, and futuristic.
- [ ] All components have passing Vitest mounting tests.
- [ ] `npm run lint` and `npm run typecheck` pass.

## 📖 Reference Data
- **Business Rules:** Refer to `Docs/Business_Logic.md` for risk calculation details.
- **Grid Layout:** 12 columns by 8 rows.
