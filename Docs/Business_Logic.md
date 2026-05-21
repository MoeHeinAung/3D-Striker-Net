# Business Rules — 3D-Striker-Net

This document aggregates business logic and rules across the application layers.

## 1. Risk Management
- **Risk Calculation:**
  - Risk is calculated based on `admin_max_hold`, which defines the threshold for flagging excessive exposure.
  - Exposure is defined as `house_holding_amount`.
- **Offloading:**
  - When exposure exceeds `admin_max_hold`, it must be offloaded.
  - Offloading creates an "offloaded_amount".
- **Summary:**
  - The risk summary provides real-time tracking of sales, holding, and offloading per ticket.

## 2. Sales
- Sales must be associated with valid agents.
- Sales amounts are tracked to calculate overall risk exposure.

## 3. Draws
- Draws have specific timeframes and states.
- Draws impact risk and sales volume.

## 4. Master Dealer
- Controls configuration parameters, such as `admin_max_hold`.

---
*Refer to `Docs/SSOT.md` for architectural facts.*
