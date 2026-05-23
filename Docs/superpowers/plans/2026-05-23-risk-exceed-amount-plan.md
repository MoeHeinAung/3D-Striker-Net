# Add Exceed Amount to Risk View Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add "Exceed Amount" column to the `Risk` page, calculated as `Total Amount - (Holding + Offloaded)`.

**Architecture:** Extend the backend data model and repository logic to include the calculated field, update the Pydantic schema for serialization, and render the new column in the frontend React table.

**Tech Stack:** FastAPI (Python), SQLAlchemy, React (TypeScript), AntDesign.

---

### Task 1: Update Backend Risk Schema

**Files:**
- Modify: `backend/app/schemas/risk.py`

- [ ] **Step 1: Add `exceed_amount` field to `RiskSummary`**

```python
class RiskSummary(BaseModel):
    draw_id: int
    ticket: str
    total_amount: float
    holding: float = Field(..., alias="holding")
    offloaded: float = 0.0
    exceed_amount: float = 0.0  # Added field

    class Config:
        from_attributes = True
        populate_by_name = True
```

- [ ] **Step 2: Commit**

```bash
git add backend/app/schemas/risk.py
git commit -m "feat: add exceed_amount field to RiskSummary schema"
```

---

### Task 2: Update Backend Repository Logic

**Files:**
- Modify: `backend/app/repositories/sale.py`

- [ ] **Step 1: Update `get_sales_by_ticket` calculation**

```python
    def get_sales_by_ticket(self, draw_id: int):
        # ... existing join logic ...
        formatted_results = []
        for row in results:
            view, house_holding, total_offloaded = row
            total_offloaded = total_offloaded or 0
            holding = min(house_holding, view.total_amount)
            exceed_amount = view.total_amount - (holding + total_offloaded)
            formatted_results.append({
                "draw_id": view.draw_id,
                "ticket": view.ticket,
                "total_amount": view.total_amount,
                "holding": holding,
                "offloaded": total_offloaded,
                "exceed_amount": exceed_amount
            })
        return formatted_results
```

- [ ] **Step 2: Commit**

```bash
git add backend/app/repositories/sale.py
git commit -m "feat: add exceed_amount calculation to SaleRepository"
```

---

### Task 3: Update Frontend Risk Type

**Files:**
- Modify: `frontend/src/types/risk.ts`

- [ ] **Step 1: Update `RiskSummary` type**

```typescript
export interface RiskSummary {
  draw_id: number;
  ticket: string;
  total_amount: number;
  holding: number;
  offloaded: number;
  exceed_amount: number; // Added field
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/types/risk.ts
git commit -m "feat: update frontend RiskSummary type"
```

---

### Task 3: Update Frontend Risk UI

**Files:**
- Modify: `frontend/src/pages/Risk.tsx`

- [ ] **Step 1: Add "Exceed Amount" column to `columns` array**

```tsx
    {
      title: 'Exceed Amount',
      dataIndex: 'exceed_amount',
      key: 'exceed_amount',
      render: (amount?: number) => (amount ?? 0).toLocaleString(),
    },
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/pages/Risk.tsx
git commit -m "feat: add Exceed Amount column to Risk page"
```
