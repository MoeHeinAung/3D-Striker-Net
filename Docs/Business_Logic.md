# Business Rules

## Risk Assessment
1. **Total Amount:** The sum of all sales for a given ticket in a specific draw.
2. **Holding Amount:** The amount the house holds for a ticket, calculated as `min(house_holding_amount, total_amount)` where `house_holding_amount` is defined in the `Draw` configuration.
3. **Offloaded:** The amount of a ticket already transferred to a master dealer.
4. **Exceed Amount (Pending):** Calculated as `Total Amount - (Holding + Offloaded)`. This represents the amount available to be offloaded to a master dealer.
