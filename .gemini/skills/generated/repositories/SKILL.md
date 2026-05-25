---
name: repositories
description: "Skill for the Repositories area of 3D-Striker-Net. 15 symbols across 4 files."
---

# Repositories

15 symbols | 4 files | Cohesion: 100%

## When to Use

- Working with code in `backend/`
- Understanding how test_create_winning_ticket, test_delete_winning_ticket, test_get_winning_by_draw work
- Modifying repositories-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `backend/app/repositories/ticket.py` | get_all_winning, get_all_winning_by_draw, create_winning, delete_winning, get_all_blacklist (+2) |
| `backend/tests/test_tickets.py` | test_create_winning_ticket, test_delete_winning_ticket, test_get_winning_by_draw, test_create_blacklist_ticket, test_delete_blacklist_ticket (+1) |
| `backend/app/repositories/sale.py` | get_sales_by_ticket |
| `backend/tests/test_exceed_amount.py` | test_get_sales_by_ticket_exceed_amount |

## Entry Points

Start here when exploring this area:

- **`test_create_winning_ticket`** (Function) — `backend/tests/test_tickets.py:33`
- **`test_delete_winning_ticket`** (Function) — `backend/tests/test_tickets.py:45`
- **`test_get_winning_by_draw`** (Function) — `backend/tests/test_tickets.py:70`
- **`test_create_blacklist_ticket`** (Function) — `backend/tests/test_tickets.py:54`
- **`test_delete_blacklist_ticket`** (Function) — `backend/tests/test_tickets.py:64`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `test_create_winning_ticket` | Function | `backend/tests/test_tickets.py` | 33 |
| `test_delete_winning_ticket` | Function | `backend/tests/test_tickets.py` | 45 |
| `test_get_winning_by_draw` | Function | `backend/tests/test_tickets.py` | 70 |
| `test_create_blacklist_ticket` | Function | `backend/tests/test_tickets.py` | 54 |
| `test_delete_blacklist_ticket` | Function | `backend/tests/test_tickets.py` | 64 |
| `test_get_blacklist_by_draw` | Function | `backend/tests/test_tickets.py` | 79 |
| `test_get_sales_by_ticket_exceed_amount` | Function | `backend/tests/test_exceed_amount.py` | 5 |
| `get_all_winning` | Method | `backend/app/repositories/ticket.py` | 11 |
| `get_all_winning_by_draw` | Method | `backend/app/repositories/ticket.py` | 14 |
| `create_winning` | Method | `backend/app/repositories/ticket.py` | 17 |
| `delete_winning` | Method | `backend/app/repositories/ticket.py` | 24 |
| `get_all_blacklist` | Method | `backend/app/repositories/ticket.py` | 33 |
| `get_all_blacklist_by_draw` | Method | `backend/app/repositories/ticket.py` | 36 |
| `create_blacklist` | Method | `backend/app/repositories/ticket.py` | 39 |
| `get_sales_by_ticket` | Method | `backend/app/repositories/sale.py` | 10 |

## How to Explore

1. `gitnexus_context({name: "test_create_winning_ticket"})` — see callers and callees
2. `gitnexus_query({query: "repositories"})` — find related execution flows
3. Read key files listed above for implementation details
