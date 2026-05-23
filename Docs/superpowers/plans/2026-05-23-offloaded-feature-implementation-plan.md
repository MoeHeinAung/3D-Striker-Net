# Offloaded Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the 'Offloaded' feature to track sales amounts offloaded to Master Dealers, including database schema, backend services, and frontend UI updates.

**Architecture:** Add a new `offloaded` table, a SQL aggregation view, and integrate the calculated data into the existing Risk summary logic and frontend view.

**Tech Stack:** Python, FastAPI, SQLAlchemy, SQLite, React, TanStack Query

---

### Task 1: Database Schema & Views

**Files:**
- Modify: `backend/app/db/migrations/001_create_risk_view.sql`

- [ ] **Step 1: Add table and view definition to migration script**

```sql
CREATE TABLE offloaded (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    draw_id INTEGER NOT NULL,
    master_dealer_id VARCHAR(3) NOT NULL,
    page_no INTEGER,
    ticket VARCHAR(3) NOT NULL,
    amount FLOAT NOT NULL,
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(draw_id) REFERENCES draws(id),
    FOREIGN KEY(master_dealer_id) REFERENCES master_dealers(id)
);

CREATE VIEW offloaded_amount_by_ticket_per_draw AS
SELECT draw_id, ticket, SUM(amount) as total_offloaded
FROM offloaded
GROUP BY draw_id, ticket;
```

- [ ] **Step 2: Run DB initialization**

Run: `python -c "from app.db.database import init_db; init_db()"`

### Task 2: Backend Models

**Files:**
- Create: `backend/app/models/offloaded.py`
- Modify: `backend/app/models/risk.py`

- [ ] **Step 1: Create `Offloaded` model**

```python
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.base import Base

class Offloaded(Base):
    __tablename__ = "offloaded"

    id = Column(Integer, primary_key=True, index=True)
    draw_id = Column(Integer, ForeignKey("draws.id"), nullable=False)
    master_dealer_id = Column(String(3), ForeignKey("master_dealers.id"), nullable=False)
    page_no = Column(Integer)
    ticket = Column(String(3), nullable=False)
    amount = Column(Float, nullable=False)
    note = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
```

- [ ] **Step 2: Update `risk.py`**

```python
from sqlalchemy import Column, Integer, String, Float
from app.db.base import Base

class SalesByTicketPerDraw(Base):
    __tablename__ = "sales_by_ticket_per_draw"
    __table_args__ = {'info': {'is_view': True}}

    draw_id = Column(Integer, primary_key=True)
    ticket = Column(String(3), primary_key=True)
    total_amount = Column(Float)

class OffloadedAmountByTicketPerDraw(Base):
    __tablename__ = "offloaded_amount_by_ticket_per_draw"
    __table_args__ = {'info': {'is_view': True}}

    draw_id = Column(Integer, primary_key=True)
    ticket = Column(String(3), primary_key=True)
    total_offloaded = Column(Float)
```

### Task 3: Backend Repositories & Service

**Files:**
- Create: `backend/app/repositories/offloaded.py`
- Modify: `backend/app/repositories/sale.py`

- [ ] **Step 1: Create `OffloadedRepository`**

```python
from sqlalchemy.orm import Session
from app.models.offloaded import Offloaded

class OffloadedRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, data: dict) -> Offloaded:
        offloaded = Offloaded(**data)
        self.db.add(offloaded)
        self.db.commit()
        self.db.refresh(offloaded)
        return offloaded
```

- [ ] **Step 2: Update `SaleRepository.get_sales_by_ticket`**

```python
from app.models.risk import SalesByTicketPerDraw, OffloadedAmountByTicketPerDraw
# ... inside SaleRepository
    def get_sales_by_ticket(self, draw_id: int):
        results = self.db.query(
            SalesByTicketPerDraw,
            Draw.house_holding_amount,
            OffloadedAmountByTicketPerDraw.total_offloaded
        ).join(
            Draw, SalesByTicketPerDraw.draw_id == Draw.id
        ).outerjoin(
            OffloadedAmountByTicketPerDraw,
            (SalesByTicketPerDraw.draw_id == OffloadedAmountByTicketPerDraw.draw_id) &
            (SalesByTicketPerDraw.ticket == OffloadedAmountByTicketPerDraw.ticket)
        ).filter(
            SalesByTicketPerDraw.draw_id == draw_id
        ).all()

        formatted_results = []
        for row in results:
            view, house_holding, total_offloaded = row
            total_offloaded = total_offloaded or 0
            holding = min(house_holding, view.total_amount)
            formatted_results.append({
                "draw_id": view.draw_id,
                "ticket": view.ticket,
                "total_amount": view.total_amount,
                "holding": holding,
                "offloaded": total_offloaded
            })
        return formatted_results
```

### Task 4: API Endpoint

**Files:**
- Create: `backend/app/schemas/offloaded.py`
- Create: `backend/app/api/routes/offloaded.py`
- Modify: `backend/app/api/router.py`

- [ ] **Step 1: Create Schema**

```python
from pydantic import BaseModel
from datetime import datetime

class OffloadedCreate(BaseModel):
    draw_id: int
    master_dealer_id: str
    page_no: int
    ticket: str
    amount: float
    note: str | None = None

class OffloadedResponse(OffloadedCreate):
    id: int
    created_at: datetime
```

- [ ] **Step 2: Create API Route**

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.base import SuccessEnvelope
from app.schemas.offloaded import OffloadedCreate, OffloadedResponse
from app.repositories.offloaded import OffloadedRepository
from app.db.database import get_db

router = APIRouter()

@router.post("/", response_model=SuccessEnvelope[OffloadedResponse])
def create_offloaded(in_data: OffloadedCreate, db: Session = Depends(get_db)):
    return SuccessEnvelope(data=OffloadedRepository(db).create(in_data.model_dump()))
```

- [ ] **Step 3: Register route in `router.py`**

```python
from app.api.routes import agent, batch, draw, health, master_dealer, sale, offloaded
router.include_router(offloaded.router, prefix="/offloaded", tags=["offloaded"])
```

### Task 5: Frontend Integration

**Files:**
- Create: `frontend/src/types/offloaded.ts`
- Modify: `frontend/src/pages/Risk.tsx`

- [ ] **Step 1: Add type definition**

```typescript
export interface Offloaded {
    id: number;
    draw_id: number;
    master_dealer_id: string;
    page_no: number;
    ticket: string;
    amount: number;
    note?: string;
    created_at: string;
}
```

- [ ] **Step 2: Update `Risk.tsx` UI table**

(Add column for "Offloaded" and display `row.offloaded`)

### Task 6: Verification
- [ ] Run backend tests.
- [ ] Verify UI rendering.
