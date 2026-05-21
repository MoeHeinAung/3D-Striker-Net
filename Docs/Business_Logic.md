# Business_Logic.md

## Overview
This document centralizes business logic requirements derived from project specifications to ensure consistency across layers.

## Risk Management (Admin/House Max Hold)
- **Constraint:** The Admin/House Max Hold Amount must allow user input.
- **Validation:** 
    - The value must be a non-negative integer or float (as supported by `InputNumber`).
    - **Business Rule for 0:** The system treats 0 as a valid input. The input must allow `0` to be entered, and this value must be correctly passed to the state and subsequently to the backend.
- **Handling:** UI components must use null-safe checks (`val !== null`) instead of truthy checks (`val && ...`) to distinguish between `0` and `undefined`/`null` states.

## General Rules
- UI components (Frontend) are strictly prohibited from containing business logic. They must delegate to the service/API layer.
- All backend business logic is centralized in the service layer (`backend/app/services/`).
- Database access is restricted to the repository layer (`backend/app/repositories/`).
