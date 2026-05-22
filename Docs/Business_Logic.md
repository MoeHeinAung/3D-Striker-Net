# Business Logic

This document captures the core business rules and logic definitions for the 3D-Striker-Net application. All business logic must be implemented according to these rules to maintain architectural integrity.

## 1. Core Principles

- All business logic is centralized in `backend/app/services/`.
- No business logic in API routes, React components, or data models.
- Data consistency is enforced through service-layer validation.

## 2. Draws (Drawing System)

### 2.1 Drawing Definition
- A drawing consists of an event that records sales.
- Each draw has a name, status, and associated parameters.

### 2.2 House Holding Amount
- The 'House Holding Amount' represents the amount the house holds or retains for a specific draw.
- This is a numeric value stored in the `draws` table.
- It must be specified when creating or updating a draw.

## 3. Sales Logic

- Sales are processed against a specific draw.
- ... (Additional rules to be added as documented)
