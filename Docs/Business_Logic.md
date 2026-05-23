# Business Logic Documentation

This document captures the core business rules and calculations implemented in the 3D-Striker-Net project.

## Risk Management

### 1. Risk Holding Calculation
- **Rule:** The house holds a portion of the risk for each ticket in a draw, up to a certain limit defined per draw.
- **Formula:** `Holding = min(house_holding_amount, total_amount)`
- **Components:**
  - `house_holding_amount`: Defined in the `Draw` model for each specific draw.
  - `total_amount`: The sum of all sales for a specific `ticket` in a specific `draw`.

### 2. Offloaded Sales
- **Rule:** Sales can be offloaded from the house to Master Dealers. This reduces the house's exposure.
- **Components:**
  - `Offloaded Amount`: The sum of all `amount` entries in the `offloaded` table for a specific `draw_id` and `ticket`.
  - Records include `draw_id`, `master_dealer_id`, `page_no`, `ticket`, `amount`, and `note`.

### 3. Net Risk Exposure (Implicit)
- **Rule:** The house's net risk is influenced by the total sales, the holding limit, and the offloaded amounts.
- **Visualization:** The Risk view displays `Total Amount`, `Holding`, and `Offloaded` per ticket.

## Database Aggregations

### 1. Sales Aggregation (`sales_by_ticket_per_draw`)
- **Type:** Database View
- **Logic:** `SELECT draw_id, ticket, SUM(amount) FROM sales GROUP BY draw_id, ticket`

### 2. Offloaded Aggregation (`offloaded_amount_by_ticket_per_draw`)
- **Type:** Database View
- **Logic:** `SELECT draw_id, ticket, SUM(amount) FROM offloaded GROUP BY draw_id, ticket`
