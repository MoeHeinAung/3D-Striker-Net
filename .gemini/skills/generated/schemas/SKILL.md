---
name: schemas
description: "Skill for the Schemas area of 3D-Striker-Net. 24 symbols across 8 files."
---

# Schemas

24 symbols | 8 files | Cohesion: 100%

## When to Use

- Working with code in `backend/`
- Understanding how AgentBase, AgentCreate, AgentResponse work
- Modifying schemas-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `backend/app/schemas/agent.py` | AgentBase, AgentCreate, AgentResponse |
| `backend/app/schemas/batch.py` | BatchBase, BatchCreate, BatchResponse |
| `backend/app/schemas/blacklist_ticket.py` | BlacklistTicketBase, BlacklistTicketCreate, BlacklistTicketResponse |
| `backend/app/schemas/draw.py` | DrawBase, DrawCreate, DrawResponse |
| `backend/app/schemas/master_dealer.py` | MasterDealerBase, MasterDealerCreate, MasterDealerResponse |
| `backend/app/schemas/offloaded.py` | OffloadedBase, OffloadedCreate, OffloadedResponse |
| `backend/app/schemas/sale.py` | SaleBase, SaleCreate, SaleResponse |
| `backend/app/schemas/winning_ticket.py` | WinningTicketBase, WinningTicketCreate, WinningTicketResponse |

## Entry Points

Start here when exploring this area:

- **`AgentBase`** (Class) — `backend/app/schemas/agent.py:4`
- **`AgentCreate`** (Class) — `backend/app/schemas/agent.py:11`
- **`AgentResponse`** (Class) — `backend/app/schemas/agent.py:14`
- **`BatchBase`** (Class) — `backend/app/schemas/batch.py:5`
- **`BatchCreate`** (Class) — `backend/app/schemas/batch.py:11`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `AgentBase` | Class | `backend/app/schemas/agent.py` | 4 |
| `AgentCreate` | Class | `backend/app/schemas/agent.py` | 11 |
| `AgentResponse` | Class | `backend/app/schemas/agent.py` | 14 |
| `BatchBase` | Class | `backend/app/schemas/batch.py` | 5 |
| `BatchCreate` | Class | `backend/app/schemas/batch.py` | 11 |
| `BatchResponse` | Class | `backend/app/schemas/batch.py` | 14 |
| `BlacklistTicketBase` | Class | `backend/app/schemas/blacklist_ticket.py` | 7 |
| `BlacklistTicketCreate` | Class | `backend/app/schemas/blacklist_ticket.py` | 12 |
| `BlacklistTicketResponse` | Class | `backend/app/schemas/blacklist_ticket.py` | 15 |
| `DrawBase` | Class | `backend/app/schemas/draw.py` | 5 |
| `DrawCreate` | Class | `backend/app/schemas/draw.py` | 11 |
| `DrawResponse` | Class | `backend/app/schemas/draw.py` | 21 |
| `MasterDealerBase` | Class | `backend/app/schemas/master_dealer.py` | 4 |
| `MasterDealerCreate` | Class | `backend/app/schemas/master_dealer.py` | 11 |
| `MasterDealerResponse` | Class | `backend/app/schemas/master_dealer.py` | 14 |
| `OffloadedBase` | Class | `backend/app/schemas/offloaded.py` | 3 |
| `OffloadedCreate` | Class | `backend/app/schemas/offloaded.py` | 11 |
| `OffloadedResponse` | Class | `backend/app/schemas/offloaded.py` | 14 |
| `SaleBase` | Class | `backend/app/schemas/sale.py` | 4 |
| `SaleCreate` | Class | `backend/app/schemas/sale.py` | 12 |

## How to Explore

1. `gitnexus_context({name: "AgentBase"})` — see callers and callees
2. `gitnexus_query({query: "schemas"})` — find related execution flows
3. Read key files listed above for implementation details
