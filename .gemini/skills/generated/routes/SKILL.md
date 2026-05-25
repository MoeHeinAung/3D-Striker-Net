---
name: routes
description: "Skill for the Routes area of 3D-Striker-Net. 18 symbols across 8 files."
---

# Routes

18 symbols | 8 files | Cohesion: 100%

## When to Use

- Working with code in `backend/`
- Understanding how get_metrics, get_next_draw, create_draw work
- Modifying routes-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `backend/app/api/routes/draw.py` | create_draw, update_draw, get_draws, delete_draw |
| `backend/app/services/draw.py` | create_draw, update_draw, list_draws, delete_draw |
| `backend/app/api/routes/dashboard.py` | get_metrics, get_next_draw |
| `backend/app/services/dashboard.py` | get_dashboard_metrics, get_next_cutoff_time |
| `backend/app/api/routes/offloaded.py` | create_offloaded, get_all_offloaded |
| `backend/app/repositories/offloaded.py` | create, get_all |
| `backend/app/api/routes/health.py` | check_health |
| `backend/app/services/health_service.py` | get_health |

## Entry Points

Start here when exploring this area:

- **`get_metrics`** (Function) — `backend/app/api/routes/dashboard.py:11`
- **`get_next_draw`** (Function) — `backend/app/api/routes/dashboard.py:16`
- **`create_draw`** (Function) — `backend/app/api/routes/draw.py:10`
- **`update_draw`** (Function) — `backend/app/api/routes/draw.py:16`
- **`get_draws`** (Function) — `backend/app/api/routes/draw.py:22`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `get_metrics` | Function | `backend/app/api/routes/dashboard.py` | 11 |
| `get_next_draw` | Function | `backend/app/api/routes/dashboard.py` | 16 |
| `create_draw` | Function | `backend/app/api/routes/draw.py` | 10 |
| `update_draw` | Function | `backend/app/api/routes/draw.py` | 16 |
| `get_draws` | Function | `backend/app/api/routes/draw.py` | 22 |
| `delete_draw` | Function | `backend/app/api/routes/draw.py` | 28 |
| `check_health` | Function | `backend/app/api/routes/health.py` | 8 |
| `create_offloaded` | Function | `backend/app/api/routes/offloaded.py` | 10 |
| `get_all_offloaded` | Function | `backend/app/api/routes/offloaded.py` | 16 |
| `get_dashboard_metrics` | Method | `backend/app/services/dashboard.py` | 11 |
| `get_next_cutoff_time` | Method | `backend/app/services/dashboard.py` | 33 |
| `create_draw` | Method | `backend/app/services/draw.py` | 9 |
| `update_draw` | Method | `backend/app/services/draw.py` | 17 |
| `list_draws` | Method | `backend/app/services/draw.py` | 14 |
| `delete_draw` | Method | `backend/app/services/draw.py` | 33 |
| `get_health` | Method | `backend/app/services/health_service.py` | 4 |
| `create` | Method | `backend/app/repositories/offloaded.py` | 7 |
| `get_all` | Method | `backend/app/repositories/offloaded.py` | 14 |

## How to Explore

1. `gitnexus_context({name: "get_metrics"})` — see callers and callees
2. `gitnexus_query({query: "routes"})` — find related execution flows
3. Read key files listed above for implementation details
