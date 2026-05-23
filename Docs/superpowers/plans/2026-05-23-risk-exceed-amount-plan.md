# Implementation Plan: T-016 Add Exceed Amount to Risk View

## Overview
Add "Exceed Amount" column to the `Risk` page, calculated as `Total Amount - (Holding + Offloaded)`.

## Architecture Decisions
- Logic already exists in `SaleRepository.get_sales_by_ticket` and `RiskSummary` Pydantic model.
- Risk page UI already has "Exceed Amount" column.
- Goal is to formalize and finalize this implementation with database migration management via Alembic.

## Task List

### Phase 1: Database Migration Setup
- [ ] Task 1: Initialize Alembic in `backend/` and verify existing tables and views are captured.
- [ ] Task 2: Create a new migration to ensure the `SalesByTicketPerDraw` view is properly managed.

### Checkpoint: Foundation
- [ ] Alembic initialized and migrations working.

### Phase 2: Verification and Cleanup
- [ ] Task 3: Verify "Exceed Amount" calculation in `backend/app/repositories/sale.py` and ensure tests pass.
- [ ] Task 4: Confirm frontend correctly displays the calculated "Exceed Amount" and update types if necessary.

### Checkpoint: Complete
- [ ] All acceptance criteria met
- [ ] Ready for review

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Alembic migration failure | High | Backup database before running migrations |

## Open Questions
- None.
