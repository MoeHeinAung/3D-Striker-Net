# Risk Assessment View Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a database view aggregating sales by ticket per draw and expose it through the API for the Risk dashboard.

**Architecture:** Add an SQLite view via migration, map it to a read-only SQLAlchemy model, expose it via repository/service layers, and integrate with TanStack Query in the frontend.

**Tech Stack:** FastAPI, SQLAlchemy, SQLite, TanStack Query (React).

---

### Task 1: Create Database View Migration
**Files:**
- Create: `backend/app/db/migrations/001_create_risk_view.sql`

- [ ] **Step 1: Write SQL for view**
```sql
CREATE VIEW sales_by_ticket_per_draw AS
SELECT draw_id, ticket, SUM(amount) as total_amount
FROM sales
GROUP BY draw_id, ticket;
```
- [ ] **Step 2: Run migration**
*(Assuming a manual apply via a migration script or `sqlite3` CLI for this environment)*

### Task 2: Create Model
**Files:**
- Create: `backend/app/models/risk.py`

- [ ] **Step 1: Define Read-Only Model**
```python
from sqlalchemy import Column, Integer, String, Float
from app.db.base import Base

class SalesByTicketPerDraw(Base):
    __tablename__ = "sales_by_ticket_per_draw"
    
    draw_id = Column(Integer, primary_key=True)
    ticket = Column(String(3), primary_key=True)
    total_amount = Column(Float)
```

### Task 3: Repository and Service
**Files:**
- Modify: `backend/app/repositories/sale.py`
- Modify: `backend/app/services/sale.py`

- [ ] **Step 1: Add Repository Method**
```python
def get_sales_by_ticket(db: Session, draw_id: int):
    return db.query(SalesByTicketPerDraw).filter(SalesByTicketPerDraw.draw_id == draw_id).all()
```
- [ ] **Step 2: Add Service Method**
```python
def get_draw_risk_summary(db: Session, draw_id: int):
    return sale_repo.get_sales_by_ticket(db, draw_id)
```

### Task 4: API Endpoint
**Files:**
- Modify: `backend/app/api/routes/sale.py`

- [ ] **Step 1: Add Route**
```python
@router.get("/risk/{draw_id}")
def get_risk_summary(draw_id: int, db: Session = Depends(get_db)):
    return {"success": True, "data": sale_service.get_draw_risk_summary(db, draw_id)}
```

### Task 5: Frontend Integration
**Files:**
- Create: `frontend/src/queries/useRisk.ts`
- Modify: `frontend/src/pages/Risk.tsx`

- [ ] **Step 1: Create Hook**
```typescript
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export const useDrawRisk = (drawId: number) => {
  return useQuery({
    queryKey: ['risk', drawId],
    queryFn: () => api.get(`/sales/risk/${drawId}`).then(res => res.data.data),
  });
};
```
- [ ] **Step 2: Update Page**
```tsx
const { data: riskData } = useDrawRisk(currentDrawId);
// Render table logic...
```
