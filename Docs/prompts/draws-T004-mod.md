# Implementation Prompt: Add House Holding Amount to Draws

## 1. Goal
Add a new column `house_holding_amount` (type: Decimal or Float) to the `draws` table in the database and expose it through the API, and update the UI draw creation/editing form to support this new field.

## 2. Allowed Files/Folders
- `backend/app/models/draw.py`
- `backend/app/schemas/draw.py`
- `backend/app/repositories/draw.py` (if custom query logic exists)
- `backend/app/services/draw.py` (if validation/logic exists)
- `frontend/src/pages/Draws.tsx`
- `frontend/src/types/draw.ts`

## 3. Approved Patterns
- Follow established Pydantic schema updates.
- Use SQLAlchemy `Column(Float)` or `Column(Numeric)` for monetary values.
- Keep frontend/backend in sync.
- Use Ant Design `InputNumber` for the new field in the UI.

## 4. Strict Anti-Patterns
- NO business logic in `Draws.tsx`.
- NO direct database access in the frontend.
- Do not add columns without updating the Pydantic schema.

## 5. Definition of Done (DoD)
- [ ] Database schema updated (add migration or alter table if needed).
- [ ] Backend Pydantic models updated to include `house_holding_amount`.
- [ ] Frontend type definition `Draw` updated.
- [ ] UI Form updated with `InputNumber` for `house_holding_amount`.
- [ ] Test cases updated in `backend/tests/test_draw.py` to cover the new field.
- [ ] All tests passing.
- [ ] Linting and type checking passing.
