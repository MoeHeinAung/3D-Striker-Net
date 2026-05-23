from sqlalchemy import Column, Integer, String, Float
from app.db.base import Base

class SalesByTicketPerDraw(Base):
    __tablename__ = "sales_by_ticket_per_draw"
    __table_args__ = {'info': {'is_view': True}}

    draw_id = Column(Integer, primary_key=True)
    ticket = Column(String(3), primary_key=True)
    total_amount = Column(Float)

class OffloadedAmountByTicketPerDraw(Base):
    __tablename__ = "offloaded_amount_by_ticket_per_draw"
    __table_args__ = {'info': {'is_view': True}}

    draw_id = Column(Integer, primary_key=True)
    ticket = Column(String(3), primary_key=True)
    total_offloaded = Column(Float)
