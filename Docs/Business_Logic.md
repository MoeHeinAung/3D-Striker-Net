# Business Logic

This document outlines the core business rules and calculations for the 3D-Striker-Net system.

## 1. Sales and Risk Management

### 1.1 Ticket Parsing Rules
- **Standard Entry**: `123 = 1000` (Ticket 123, Amount 1000)
- **Dual Mapping**: `123 = 2000/1000` (Ticket 123 gets 2000, all other permutations of 123 get 1000)
- **R Indicator**: `123 R 1000` (Ticket 123 and all its permutations get 1000)

### 1.2 Risk Calculations
- **Total Sale Amount**: The sum of all sales for a specific ticket in a specific draw.
- **House Holding Limit**: Each draw has a `house_holding_amount`. This is the maximum amount the house will keep for any single ticket.
- **House Holding Amount**: `min(house_holding_amount, Total Sale Amount)`.
- **Offloaded Amount**: The sum of amounts for a specific ticket that have been offloaded to another dealer.
- **Pending Amount (Exceed Amount)**: `Total Sale Amount - (House Holding Amount + Offloaded Amount)`. This is the amount that exceeds the house limit and has not yet been offloaded.

## 2. Draw Lifecycle

### 2.1 Cutoff Time
- Each draw has an `open_date` and a `cutoff_time`.
- Sales are strictly prohibited after the `cutoff_datetime` (Draw Date + Cutoff Time).
- The system must prevent creating or updating sales for a draw once the current time exceeds the cutoff.

## 3. Dashboard Metrics

### 3.1 Nightingale Chart Data
The chart visualizes the distribution of total volume for the active/latest draw:
- **Total Sale Amount**: Aggregate of all tickets.
- **Total House Holding Amount**: Aggregate of held portions across all tickets.
- **Pending Amount**: Aggregate of exceed portions across all tickets.
- **Offloaded Amount**: Aggregate of offloaded portions across all tickets.

### 3.2 Countdown Timer
- Displays the time remaining until the next draw's `cutoff_datetime`.
- Should handle states where no active draw is found or when the cutoff has passed.
