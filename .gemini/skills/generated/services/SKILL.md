---
name: services
description: "Skill for the Services area of 3D-Striker-Net. 9 symbols across 2 files."
---

# Services

9 symbols | 2 files | Cohesion: 100%

## When to Use

- Working with code in `backend/`
- Understanding how test_generate_permutations_single_mapping, test_generate_permutations_dual_mapping, create_batch work
- Modifying services-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `backend/app/services/sale.py` | create_batch, validate_draw, create, update, delete (+2) |
| `backend/tests/test_sale.py` | test_generate_permutations_single_mapping, test_generate_permutations_dual_mapping |

## Entry Points

Start here when exploring this area:

- **`test_generate_permutations_single_mapping`** (Function) — `backend/tests/test_sale.py:3`
- **`test_generate_permutations_dual_mapping`** (Function) — `backend/tests/test_sale.py:17`
- **`create_batch`** (Method) — `backend/app/services/sale.py:53`
- **`validate_draw`** (Method) — `backend/app/services/sale.py:60`
- **`create`** (Method) — `backend/app/services/sale.py:84`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `test_generate_permutations_single_mapping` | Function | `backend/tests/test_sale.py` | 3 |
| `test_generate_permutations_dual_mapping` | Function | `backend/tests/test_sale.py` | 17 |
| `create_batch` | Method | `backend/app/services/sale.py` | 53 |
| `validate_draw` | Method | `backend/app/services/sale.py` | 60 |
| `create` | Method | `backend/app/services/sale.py` | 84 |
| `update` | Method | `backend/app/services/sale.py` | 88 |
| `delete` | Method | `backend/app/services/sale.py` | 100 |
| `generate_permutations` | Method | `backend/app/services/sale.py` | 15 |
| `parse_line` | Method | `backend/app/services/sale.py` | 30 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Create_batch → Validate_draw` | intra_community | 3 |

## How to Explore

1. `gitnexus_context({name: "test_generate_permutations_single_mapping"})` — see callers and callees
2. `gitnexus_query({query: "services"})` — find related execution flows
3. Read key files listed above for implementation details
