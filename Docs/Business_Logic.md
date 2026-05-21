# Business Logic: Risk Management

## Overview
The system allows Administrators to manage their risk exposure by setting a maximum holding amount per ticket. Any sales amount exceeding this threshold must be offloaded to master dealers.

## Core Rules

### 1. Admin/House Max Hold Amount
- **Definition:** The maximum amount the House is willing to hold for a single ticket.
- **Persistence:** This value must persist across sessions and only update via manual administrative input.

### 2. Offloaded Data (Table: `Offloaded`)
- Records individual offload transactions.
- Columns: `id`, `draw_id`, `master_dealer_id`, `batch_id`, `ticket`, `amount`, `note`, `created_at`.

### 3. Risk Calculation Formulas (Per Ticket)

- **`house_holding_amount`**:
  - `min(sum_of_sales_amount, Admin_House_Max_Hold_Amount)`

- **`offloaded_amount`**:
  - `sum(amount)` for all records in the `Offloaded` table associated with the specific ticket.

- **`pending_amount`**:
  - If `sum_of_sales_amount > Admin_House_Max_Hold_Amount`:
    - `sum_of_sales_amount - (Admin_House_Max_Hold_Amount + offloaded_amount)`
  - Otherwise:
    - `0`
