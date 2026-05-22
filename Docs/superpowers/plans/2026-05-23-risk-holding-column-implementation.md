# Risk Holding Column Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `Holding` column to the `Risk` table, which is calculated as `min(house_holding_amount, total_amount)`.

**Architecture:** The calculation will be performed in the `get_sales_by_ticket` repository method by joining the `SalesByTicketPerDraw` view with the `Draws` model.

**Tech Stack:** FastAPI, SQLAlchemy, Pydantic, React (Zustand/TanStack Query).

---

### Task 1: Update Backend Pydantic Schema

**Files:**
- Modify: `backend/app/schemas/risk.py`

- [ ] **Step 1: Update `RiskSummary` schema**

```python
from pydantic import BaseModel, Field

class RiskSummary(BaseModel):
    draw_id: int
    ticket: str
    total_amount: float
    holding: float = Field(..., alias="holding")

    class Config:
        from_attributes = True
        populate_by_name = True
```

- [ ] **Step 2: Commit**

```bash
git add backend/app/schemas/risk.py
git commit -m "feat: update RiskSummary schema to include holding"
```

### Task 2: Update Repository Logic

**Files:**
- Modify: `backend/app/repositories/sale.py`
- Modify: `backend/app/models/draw.py`

- [ ] **Step 1: Update `get_sales_by_ticket` in `SaleRepository`**

```python
from sqlalchemy import func
from app.models.draw import Draw

def get_sales_by_ticket(self, draw_id: int):
    # Join view with Draws model to get house_holding_amount
    results = self.db.query(
        SalesByTicketPerDraw,
        Draw.house_holding_amount
    ).join(
        Draw, SalesByTicketPerDraw.draw_id == Draw.id
    ).filter(
        SalesByTicketPerDraw.draw_id == draw_id
    ).all()

    formatted_results = []
    for row in results:
        view, house_holding = row
        holding = min(house_holding, view.total_amount)
        formatted_results.append({
            "draw_id": view.draw_id,
            "ticket": view.ticket,
            "total_amount": view.total_amount,
            "holding": holding
        })
    return formatted_results
```

- [ ] **Step 2: Commit**

```bash
git add backend/app/repositories/sale.py
git commit -m "feat: update get_sales_by_ticket to calculate holding"
```

### Task 3: Update Frontend Type Definition

**Files:**
- Modify: `frontend/src/types/risk.ts`

- [ ] **Step 1: Add `holding` field to `Risk` interface**

```typescript
export interface Risk {
  draw_id: number;
  ticket: string;
  total_amount: number;
  holding: number;
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/types/risk.ts
git commit -m "feat: update Risk interface to include holding"
```

### Task 4: Update Frontend UI Table

**Files:**
- Modify: `frontend/src/pages/Risk.tsx`

- [ ] **Step 1: Update Ant Design Table columns**

```tsx
const columns = [
  { title: 'Ticket', dataIndex: 'ticket', key: 'ticket' },
  { title: 'Total Amount', dataIndex: 'total_amount', key: 'total_amount' },
  { title: 'Holding', dataIndex: 'holding', key: 'holding' },
];
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/pages/Risk.tsx
git commit -m "feat: update Risk UI table to display holding"
```
