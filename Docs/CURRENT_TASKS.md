# CURRENT_TASKS.md

## 📅 Backlog

### 🟦 T-019-V2: Real Dashboard Components Implementation
- **Status:** `✅ Done`
- **Priority:** High
- **Phase:** UX
- **Plain English Goal:** Replace placeholder Nightingale chart and Countdown timer with real, data-driven components using ECharts and a new backend metrics endpoint.
- **Dependencies:** T-019-R
- **Allowed Files:** 
  - `backend/app/api/routes/dashboard.py`
  - `backend/app/services/dashboard.py`
  - `frontend/src/components/NightingaleChart.tsx`
  - `frontend/src/components/CountdownTimer.tsx`
  - `frontend/src/queries/dashboardQueries.ts`
- **AI Prompt Used:** `Docs/prompts/dashboard-dashboard-components-v2.md`
- **Rollback Plan:** Revert to placeholders if implementation fails.

#### 🛠️ Engineering Standards
- **Approved Patterns:**
  - **Frontend:** Apache ECharts for Rose chart, TanStack Query for data, dayjs for time.
  - **Backend:** aggregate RiskSummary in Service layer, SuccessEnvelope in API.
- **Strict Anti-Patterns:**
  - ❌ No inline styles.
  - ❌ No logic in frontend components.
  - ❌ No raw SQL in Service.
- **Definition of Done (DoD):**
  - [x] Backend `/api/dashboard/metrics` returns aggregated risk data.
  - [x] Nightingale Chart renders with real-time distribution.
  - [x] Countdown Timer displays time to next draw cutoff.
  - [x] Visuals match professional high-tech sci-fi aesthetic.
  - [x] All components pass mounting tests.
- **Test Results:** ✅ Passed | Logs: Build successful.
- **Notes/Blockers:** Requires adding `echarts` and `echarts-for-react` to frontend.
- **Updated:** 2026-05-25
