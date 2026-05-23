# Ticket Tables Design Specification - 2026-05-23

## Overview
Implement two new database tables: `BlacklistTicket` and `WinningTicket` to manage specialized ticket categories, payouts, and liability exclusions.

## Database Schema (SQLAlchemy Models)

### WinningTicket
```python
class WinningTicket(Base):
    __tablename__ = "winning_tickets"
    id = Column(Integer, primary_key=True, index=True)
    draw_id = Column(Integer, ForeignKey("draws.id"), nullable=False)
    ticket = Column(String(3), nullable=False)
    type = Column(String, nullable=False) # 'JACKPOT' or 'MINOR'
```

### BlacklistTicket
```python
class BlacklistTicket(Base):
    __tablename__ = "blacklist_tickets"
    id = Column(Integer, primary_key=True, index=True)
    draw_id = Column(Integer, ForeignKey("draws.id"), nullable=False)
    ticket = Column(String(3), nullable=False)
    type = Column(String, nullable=False) # 'HALF' or 'BLOCK'
```

## Logic
- **Payouts:** Use Agent factor * Ticket amount.
- **Blacklist:**
  - `HALF`: Reduce payout by 50%.
  - `BLOCK`: Move from `Holding` to `Offloaded` if exists; reject payouts.

## DoD
- [ ] Schema migrated and verified.
- [ ] Pydantic schemas created.
- [ ] Service layer logic implemented in `backend/app/services/`.
- [ ] UI tables added to `Operations` page with modal CRUD.
- [ ] Unit/Component tests pass.
