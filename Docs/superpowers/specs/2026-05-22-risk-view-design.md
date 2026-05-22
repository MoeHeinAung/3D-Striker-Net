# Design: Database View for Risk Assessment

## Overview
This design covers the implementation of an aggregated SQLite view to calculate total ticket sales per draw, and its integration into the frontend's Risk dashboard.

## Architecture
- **Database:** SQLite View `sales_by_ticket_per_draw` (aggregated by `draw_id` and `ticket`).
- **Backend:**
    - New model for the view.
    - New repository method for efficient reading.
    - New service method to orchestrate business logic.
    - New FastAPI endpoint for data retrieval.
- **Frontend:**
    - New TanStack Query hook `useDrawRisk`.
    - UI update to `Risk.tsx` displaying the aggregated totals.

## Data Model
- **SQL View:** `SELECT draw_id, ticket, SUM(amount) as total_amount FROM sales GROUP BY draw_id, ticket;`
- **SQLAlchemy Model:** Read-only class `SalesByTicketPerDraw`.

## Implementation Steps
1. Create and apply the SQL view migration.
2. Define the new model in `backend/app/models/`.
3. Expose repository and service methods.
4. Add API route.
5. Implement frontend hook and UI component.
