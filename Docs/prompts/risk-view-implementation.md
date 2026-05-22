# Implementation Prompt: T-013 Add Holding column to Risk View

## 1. Goal
Add a `Holding` column to the `Risk` table, positioned adjacent to the `Total Amount` column. This column should represent the amount held by Admin/House for each ticket, calculated as `min(House Holding Amount, Total Amount)`.

## 2. Allowed Files
- `backend/app/db/migrations/001_create_risk_view.sql`
- `backend/app/models/risk.py`
- `backend/app/schemas/risk.py`
- `backend/app/repositories/risk.py`
- `frontend/src/pages/Risk.tsx`
- `frontend/src/types/risk.ts`

## 3. Approved Patterns
- Use SQLAlchemy/SQLite migration logic to update the `Risk` view.
- Follow existing Pydantic schema structure for `Risk`.
- Follow TanStack Query pattern in frontend for data fetching.
- Use Ant Design `Table` columns definition in `Risk.tsx`.

## 4. Anti-patterns (Strictly Forbidden)
- DO NOT perform risk calculation in the frontend. The backend MUST calculate this value.
- DO NOT hardcode constants.
- DO NOT modify the database structure directly without updating the SQL migration file.

## 5. Definition of Done Checklist
- [ ] Database migration for Risk View updated.
- [ ] Pydantic models updated for Risk.
- [ ] Repository logic updated to include the `Holding` calculation.
- [ ] Frontend UI Table updated to include `Holding` column.
- [ ] Tests covering risk calculation and holding logic added.
- [ ] All tests passing.
- [ ] Linting and type checking passing.
