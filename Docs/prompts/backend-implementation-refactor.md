# Backend Implementation: Ticket Model and API Refactoring

**Role:** Backend Architect (`Docs/agents/backend_architect.md`)

**Task:** Refactor `WinningTicket` and `BlacklistTicket` models/schemas and standardize API routing.

**Requirements:**
1. **Winning Ticket:**
   - Model/Schema: Align to `type` (JACKPOT/MINOR). Keep `amount` for reporting only.
2. **Blacklist Ticket:**
   - Model/Schema: Include `draw_id` and `type`. Remove `reason` from schema.
3. **API Routing:**
   - Move `/tickets/winning` and `/tickets/blacklisted` to RESTful patterns (e.g., `/tickets/{ticket_id}/winning` or `/draws/{draw_id}/blacklisted` as appropriate for the domain).
4. **Constraints:**
   - All business logic in `backend/app/services/`.
   - All DB access in `backend/app/repositories/`.
   - All Request/Response validation in `backend/app/schemas/`.
   - Backend internal imports must use the `app.` prefix (e.g., `from app.core...`).

**Definition of Done (DoD):**
- [ ] Models/Schemas updated for `WinningTicket` and `BlacklistTicket`.
- [ ] API endpoints refactored to standard RESTful resource pattern.
- [ ] All related tests in `backend/tests/` updated and passing.
- [ ] `ruff` and `black` checks passed.
- [ ] No business logic in FastAPI routes.
- [ ] Documentation updated in `Business_Logic.md`.

**Files to touch:**
- `backend/app/models/winning_ticket.py`, `backend/app/models/blacklist_ticket.py`
- `backend/app/schemas/winning_ticket.py`, `backend/app/schemas/blacklist_ticket.py`
- `backend/app/api/routes/` (for endpoint routing)
- `backend/tests/` (for corresponding tests)
