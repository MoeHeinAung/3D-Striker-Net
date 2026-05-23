import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), 'app.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Check tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = [row[0] for row in cursor.fetchall()]
print(f"Tables: {tables}")

assert 'winning_tickets' in tables
assert 'blacklist_tickets' in tables

# Check columns
cursor.execute("PRAGMA table_info(winning_tickets);")
columns = [row[1] for row in cursor.fetchall()]
print(f"Winning Tickets columns: {columns}")
assert 'draw_id' in columns
assert 'ticket' in columns
assert 'type' in columns

conn.close()
