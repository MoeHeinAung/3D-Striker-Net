CREATE VIEW sales_by_ticket_per_draw AS
SELECT draw_id, ticket, SUM(amount) as total_amount
FROM sales
GROUP BY draw_id, ticket;
