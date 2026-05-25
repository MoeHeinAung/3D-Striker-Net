---
name: pages
description: "Skill for the Pages area of 3D-Striker-Net. 6 symbols across 3 files."
---

# Pages

6 symbols | 3 files | Cohesion: 100%

## When to Use

- Working with code in `frontend/`
- Understanding how getPermutations, permute, expandTicketPermutations work
- Modifying pages-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `frontend/src/utils/ticketFormatter.ts` | getPermutations, permute, expandTicketPermutations |
| `frontend/src/pages/Draws.tsx` | handleDelete, render |
| `frontend/src/pages/Sales.tsx` | handleFinish |

## Entry Points

Start here when exploring this area:

- **`getPermutations`** (Function) — `frontend/src/utils/ticketFormatter.ts:88`
- **`permute`** (Function) — `frontend/src/utils/ticketFormatter.ts:92`
- **`expandTicketPermutations`** (Function) — `frontend/src/utils/ticketFormatter.ts:108`
- **`handleFinish`** (Function) — `frontend/src/pages/Sales.tsx:55`
- **`handleDelete`** (Function) — `frontend/src/pages/Draws.tsx:41`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `getPermutations` | Function | `frontend/src/utils/ticketFormatter.ts` | 88 |
| `permute` | Function | `frontend/src/utils/ticketFormatter.ts` | 92 |
| `expandTicketPermutations` | Function | `frontend/src/utils/ticketFormatter.ts` | 108 |
| `handleFinish` | Function | `frontend/src/pages/Sales.tsx` | 55 |
| `handleDelete` | Function | `frontend/src/pages/Draws.tsx` | 41 |
| `render` | Function | `frontend/src/pages/Draws.tsx` | 56 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `HandleFinish → Permute` | intra_community | 4 |

## How to Explore

1. `gitnexus_context({name: "getPermutations"})` — see callers and callees
2. `gitnexus_query({query: "pages"})` — find related execution flows
3. Read key files listed above for implementation details
