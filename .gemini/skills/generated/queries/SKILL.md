---
name: queries
description: "Skill for the Queries area of 3D-Striker-Net. 44 symbols across 24 files."
---

# Queries

44 symbols | 24 files | Cohesion: 88%

## When to Use

- Working with code in `frontend/`
- Understanding how useAgents, useCreateAgent, useUpdateAgent work
- Modifying queries-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `frontend/src/queries/useTickets.ts` | useWinningTickets, useCreateWinningTicket, useDeleteWinningTicket, useBlacklistTickets, useCreateBlacklistTicket (+1) |
| `frontend/src/queries/useAgents.ts` | useAgents, useCreateAgent, useUpdateAgent, useDeleteAgent |
| `frontend/src/queries/useMasterDealers.ts` | useMasterDealers, useCreateMasterDealer, useUpdateMasterDealer, useDeleteMasterDealer |
| `frontend/src/queries/useBatches.ts` | useBatches, useCreateBatch, useUpdateBatch, useDeleteBatch |
| `frontend/src/queries/useDraws.ts` | useDraws, useCreateDraw, useUpdateDraw, useDeleteDraw |
| `frontend/src/utils/ticketFormatter.ts` | parseTicketLine, formatParsedTicket |
| `frontend/src/pages/Sales.tsx` | SalesPage, runFormatter |
| `frontend/src/queries/dashboardQueries.ts` | useDashboardMetrics, useNextDraw |
| `frontend/src/pages/Network.tsx` | NetworkPage |
| `frontend/src/pages/Sale.tsx` | SalePage |

## Entry Points

Start here when exploring this area:

- **`useAgents`** (Function) — `frontend/src/queries/useAgents.ts:14`
- **`useCreateAgent`** (Function) — `frontend/src/queries/useAgents.ts:24`
- **`useUpdateAgent`** (Function) — `frontend/src/queries/useAgents.ts:32`
- **`useDeleteAgent`** (Function) — `frontend/src/queries/useAgents.ts:40`
- **`useMasterDealers`** (Function) — `frontend/src/queries/useMasterDealers.ts:14`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `useAgents` | Function | `frontend/src/queries/useAgents.ts` | 14 |
| `useCreateAgent` | Function | `frontend/src/queries/useAgents.ts` | 24 |
| `useUpdateAgent` | Function | `frontend/src/queries/useAgents.ts` | 32 |
| `useDeleteAgent` | Function | `frontend/src/queries/useAgents.ts` | 40 |
| `useMasterDealers` | Function | `frontend/src/queries/useMasterDealers.ts` | 14 |
| `useCreateMasterDealer` | Function | `frontend/src/queries/useMasterDealers.ts` | 24 |
| `useUpdateMasterDealer` | Function | `frontend/src/queries/useMasterDealers.ts` | 32 |
| `useDeleteMasterDealer` | Function | `frontend/src/queries/useMasterDealers.ts` | 40 |
| `NetworkPage` | Function | `frontend/src/pages/Network.tsx` | 8 |
| `useBatches` | Function | `frontend/src/queries/useBatches.ts` | 14 |
| `useCreateBatch` | Function | `frontend/src/queries/useBatches.ts` | 24 |
| `useUpdateBatch` | Function | `frontend/src/queries/useBatches.ts` | 32 |
| `useDeleteBatch` | Function | `frontend/src/queries/useBatches.ts` | 40 |
| `parseTicketLine` | Function | `frontend/src/utils/ticketFormatter.ts` | 15 |
| `formatParsedTicket` | Function | `frontend/src/utils/ticketFormatter.ts` | 75 |
| `SalePage` | Function | `frontend/src/pages/Sale.tsx` | 5 |
| `SalesPage` | Function | `frontend/src/pages/Sales.tsx` | 10 |
| `runFormatter` | Function | `frontend/src/pages/Sales.tsx` | 27 |
| `useOffload` | Function | `frontend/src/queries/useOffloaded.ts` | 11 |
| `useDrawRisk` | Function | `frontend/src/queries/useRisk.ts` | 4 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `App → UseDashboardMetrics` | cross_community | 4 |
| `App → UseNextDraw` | cross_community | 4 |
| `App → UseDraws` | cross_community | 3 |
| `App → UseCreateDraw` | cross_community | 3 |
| `App → UseUpdateDraw` | cross_community | 3 |
| `App → UseDeleteDraw` | cross_community | 3 |

## How to Explore

1. `gitnexus_context({name: "useAgents"})` — see callers and callees
2. `gitnexus_query({query: "queries"})` — find related execution flows
3. Read key files listed above for implementation details
