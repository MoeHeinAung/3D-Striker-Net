# 💼 Business Logic: Sales Processing

## 1. Active Draw Validation
- **Requirement:** Sales can only be processed for draws with an `OPEN` status.
- **Enforcement:** The system must verify the `Draw` status before creating any `Sale`.
- **Cutoff Restriction:** Once the `cutoff_time` of an active draw has passed, all sales functionality (Create, Update, Delete) for that draw must be disabled.

## 2. Ticket Formatting
- **Ticket Format:** Tickets must be 3-digit numeric strings (`000`-`999`).
- **Validation:** No alphabetic characters or special symbols permitted.

## 3. Bulk Entry Parsing
- **Input:** Text area supporting multi-line input.
- **Format:** `[ticket] - [amount]` (e.g., `123 - 10000`).
- **Processing:** The system must parse each valid line and create individual database records per entry.

## 4. Multi-entry Rules
- **Duplicate Tickets:** A single agent is permitted to sell the same ticket number multiple times. Each entry is treated as an independent sale.

## 5. Permutation Logic
- **Single Mapping:** Ticket ABC = 1000 generates all permutations of ABC at 1000.
- **Dual Mapping:** Ticket ABC = 2000 / 1000 maps ABC to 2000 and all other permutations to 1000.
- **R Indicator:** Tickets containing 'R' or '®' followed by an amount are parsed using permutation logic.
- **Dual Amount:** Tickets containing a separator (`/`, `=`, `-`, `+`, `~`) between two amounts are treated as Dual Mapping.
- **Standard Formatting:** Standard tickets format to `[ticket] = [amount]`.
