# Business Logic for Risk Calculation

## Definition of Holding Amount
The `Holding` column in the `Risk` table represents the amount held by the Admin/House for each ticket.

### Logic
The `Holding` value for a ticket is calculated as:
`Holding = min(House Holding Amount, Total Amount)`

Where:
- `House Holding Amount` is retrieved from the `draw` table for the corresponding draw.
- `Total Amount` is retrieved from the `sales_by_ticket_per_draw` view for the corresponding ticket and draw.
