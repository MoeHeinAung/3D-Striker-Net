CREATE VIEW sales_by_ticket_per_draw AS
SELECT draw_id, ticket, SUM(amount) as total_amount
FROM sales
GROUP BY draw_id, ticket;

CREATE TABLE offloaded (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    draw_id INTEGER NOT NULL,
    master_dealer_id VARCHAR(3) NOT NULL,
    page_no INTEGER,
    ticket VARCHAR(3) NOT NULL,
    amount FLOAT NOT NULL,
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(draw_id) REFERENCES draws(id),
    FOREIGN KEY(master_dealer_id) REFERENCES master_dealers(id)
);

CREATE VIEW offloaded_amount_by_ticket_per_draw AS
SELECT draw_id, ticket, SUM(amount) as total_offloaded
FROM offloaded
GROUP BY draw_id, ticket;
