# Business Logic: API Migration Strategy

This document tracks the business rules and requirements for migrating to a canonical API namespace.

## 1. API Prefix Strategy
- Canonical namespace: `/api` (or `/api/v1`)
- Current state: Root mount (e.g., `/health`, `/draws`) and API mount (e.g., `/api/health`, `/api/draws`) exist simultaneously.
- Goal: Single canonical path, eliminate double-mounting.

## 2. Migration Phases
- Phase A: Compatibility & Transition
    - Maintain dual mounts (zero downtime).
    - Log warnings for root-mount access.
    - Frontend transition to `/api`.
- Phase B: Cleanup
    - Remove root mount.
    - Standardize all traffic to `/api`.

## 3. Risk Mitigation & Verification
- Telemetry/Log monitoring of root-mount traffic.
- Success Metrics: Zero traffic to root-mount endpoints in logs for X period.
- No client-side breakage.
