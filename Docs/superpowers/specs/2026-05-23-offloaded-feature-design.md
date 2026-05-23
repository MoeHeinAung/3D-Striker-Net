# Spec: Offloaded Feature Implementation

## Objective
Implement an "Offloaded" feature to track sales amounts offloaded from the house to Master Dealers. This feature provides visibility into the house's risk exposure after accounting for offloaded sales.

## Tech Stack
- Backend: Python, FastAPI, SQLAlchemy, SQLite
- Frontend: React, TypeScript, Vite, TanStack Query

## Commands
- Backend: `pytest`
- Backend Migration: (via SQLAlchemy)
- Frontend: `npm run lint`

## Project Structure
- `backend/app/models/offloaded.py`: New model for offloaded records.
- `backend/app/models/risk.py`: Add `OffloadedAmountByTicketPerDraw` model.
- `backend/app/repositories/offloaded.py`: New repository for offloaded CRUD.
- `backend/app/services/offloaded.py`: New business logic service.
- `backend/app/api/routes/offloaded.py`: New API endpoints.
- `frontend/src/queries/useOffloaded.ts`: TanStack Query hook.
- `frontend/src/types/offloaded.ts`: TypeScript interface.

## Code Style
Follow existing patterns (e.g., repository pattern, Pydantic schemas, Service-Repository delegation).

## Testing Strategy
- Add unit tests for `OffloadedService`.
- Add integration tests for new API endpoints.
- Add Vitest test to verify the Risk table rendering with the new Offloaded column.

## Boundaries
- Always: Run tests before commits, follow existing naming conventions.
- Ask first: Schema changes (if beyond the plan), adding new dependencies.
- Never: Hardcode logic in frontend, store secrets in frontend.

## Success Criteria
- [ ] `offloaded` table created in database.
- [ ] New SQL view `offloaded_amount_by_ticket_per_draw` integrated.
- [ ] Risk summary API response includes offloaded amounts.
- [ ] UI correctly displays "Offloaded" column in the Risk view.
- [ ] All existing risk calculations remain accurate.

## Open Questions
- None.
