"""create_ticket_tables

Revision ID: 59c025d4895f
Revises: 8754d41eb20a
Create Date: 2026-05-23 21:05:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '59c025d4895f'
down_revision: Union[str, Sequence[str], None] = '8754d41eb20a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('winning_tickets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('draw_id', sa.Integer(), nullable=False),
    sa.Column('ticket', sa.String(length=3), nullable=False),
    sa.Column('type', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['draw_id'], ['draws.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_winning_tickets_id'), 'winning_tickets', ['id'], unique=False)

    op.create_table('blacklist_tickets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('draw_id', sa.Integer(), nullable=False),
    sa.Column('ticket', sa.String(length=3), nullable=False),
    sa.Column('type', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['draw_id'], ['draws.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_blacklist_tickets_id'), 'blacklist_tickets', ['id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_blacklist_tickets_id'), table_name='blacklist_tickets')
    op.drop_table('blacklist_tickets')
    op.drop_index(op.f('ix_winning_tickets_id'), table_name='winning_tickets')
    op.drop_table('winning_tickets')
