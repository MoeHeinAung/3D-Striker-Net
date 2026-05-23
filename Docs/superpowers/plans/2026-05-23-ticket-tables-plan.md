# Ticket Tables Implementation Plan (Infrastructure Core)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement `WinningTicket` and `BlacklistTicket` database tables, Pydantic schemas, and frontend CRUD management on the Operations page.

**Architecture:** Database-first migration, followed by Pydantic schema definitions, and finally UI-integrated CRUD operations using modal-based forms.

**Tech Stack:** FastAPI, SQLAlchemy, SQLite, React, TanStack Query, Zustand, Ant Design.

---

### Task 1: Database Migration
**Files:**
- Create: `backend/alembic/versions/<timestamp>_create_ticket_tables.py`

- [ ] **Step 1: Generate migration**
Run: `alembic revision -m "create_ticket_tables"`
Edit migration file with table definitions for `winning_tickets` and `blacklist_tickets`.

- [ ] **Step 2: Run migration**
Run: `alembic upgrade head`

### Task 2: Backend Models and Schemas
**Files:**
- Create: `backend/app/models/winning_ticket.py`
- Create: `backend/app/models/blacklist_ticket.py`
- Create: `backend/app/schemas/winning_ticket.py`
- Create: `backend/app/schemas/blacklist_ticket.py`
- Modify: `backend/app/db/base.py` (register models)

- [ ] **Step 1: Implement Models**
Define `WinningTicket` and `BlacklistTicket` models inheriting from `Base`.

- [ ] **Step 2: Implement Schemas**
Define Pydantic `WinningTicketCreate` and `BlacklistTicketCreate` schemas.

- [ ] **Step 3: Register in base.py**
Add imports and registration for the new models in `init_db`.

### Task 3: API Routes (CRUD)
**Files:**
- Create: `backend/app/api/routes/tickets.py`
- Modify: `backend/app/api/router.py`

- [ ] **Step 1: Implement API endpoints**
Implement POST, GET, and DELETE routes for both ticket types.

- [ ] **Step 2: Register routes**
Add `tickets` router to the main API router.

### Task 4: Frontend CRUD Integration
**Files:**
- Create: `frontend/src/queries/useTickets.ts`
- Modify: `frontend/src/pages/Operations.tsx`
- Create: `frontend/src/components/TicketModal.tsx`

- [ ] **Step 1: Setup Queries**
Implement TanStack Query hooks for ticket management.

- [ ] **Step 2: Setup UI**
Create `TicketModal.tsx` for modal-based CRUD.

- [ ] **Step 3: Operations Page**
Update `Operations.tsx` to display lists and trigger modals.

### Task 5: Testing
**Files:**
- Create: `backend/tests/test_tickets.py`
- Create: `frontend/src/__tests__/Tickets.test.tsx`

- [ ] **Step 1: Write backend tests**
Verify database operations.

- [ ] **Step 2: Write frontend component tests**
Verify UI rendering and modal trigger.
