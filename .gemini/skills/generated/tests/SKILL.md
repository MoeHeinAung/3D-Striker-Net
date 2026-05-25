---
name: tests
description: "Skill for the Tests area of 3D-Striker-Net. 5 symbols across 2 files."
---

# Tests

5 symbols | 2 files | Cohesion: 100%

## When to Use

- Working with code in `backend/`
- Understanding how test_create_batch_with_sales, test_delete_batch_cascades_to_sales, test_cutoff_time_validation_date_aware work
- Modifying tests-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `backend/tests/test_batch.py` | test_create_batch_with_sales, test_delete_batch_cascades_to_sales, test_cutoff_time_validation_date_aware |
| `backend/app/services/batch.py` | create_batch_with_sales, delete_batch |

## Entry Points

Start here when exploring this area:

- **`test_create_batch_with_sales`** (Function) — `backend/tests/test_batch.py:33`
- **`test_delete_batch_cascades_to_sales`** (Function) — `backend/tests/test_batch.py:55`
- **`test_cutoff_time_validation_date_aware`** (Function) — `backend/tests/test_batch.py:75`
- **`create_batch_with_sales`** (Method) — `backend/app/services/batch.py:19`
- **`delete_batch`** (Method) — `backend/app/services/batch.py:57`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `test_create_batch_with_sales` | Function | `backend/tests/test_batch.py` | 33 |
| `test_delete_batch_cascades_to_sales` | Function | `backend/tests/test_batch.py` | 55 |
| `test_cutoff_time_validation_date_aware` | Function | `backend/tests/test_batch.py` | 75 |
| `create_batch_with_sales` | Method | `backend/app/services/batch.py` | 19 |
| `delete_batch` | Method | `backend/app/services/batch.py` | 57 |

## How to Explore

1. `gitnexus_context({name: "test_create_batch_with_sales"})` — see callers and callees
2. `gitnexus_query({query: "tests"})` — find related execution flows
3. Read key files listed above for implementation details
