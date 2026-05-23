"""create_views

Revision ID: 8754d41eb20a
Revises: 89cd421d6566
Create Date: 2026-05-23 20:27:04.784818

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8754d41eb20a'
down_revision: Union[str, Sequence[str], None] = '89cd421d6566'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute("""
        CREATE VIEW IF NOT EXISTS sales_by_ticket_per_draw AS
        SELECT draw_id, ticket, SUM(amount) as total_amount
        FROM sales
        GROUP BY draw_id, ticket;
    """)
    op.execute("""
        CREATE VIEW IF NOT EXISTS offloaded_amount_by_ticket_per_draw AS
        SELECT draw_id, ticket, SUM(amount) as total_offloaded
        FROM offloaded
        GROUP BY draw_id, ticket;
    """)


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("DROP VIEW IF EXISTS sales_by_ticket_per_draw")
    op.execute("DROP VIEW IF EXISTS offloaded_amount_by_ticket_per_draw")
