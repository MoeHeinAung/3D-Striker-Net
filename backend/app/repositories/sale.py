from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.sale import Sale
from app.models.draw import Draw
from app.models.risk import SalesByTicketPerDraw

class SaleRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_sales_by_ticket(self, draw_id: int):
        # Join view with Draws model to get house_holding_amount
        results = self.db.query(
            SalesByTicketPerDraw,
            Draw.house_holding_amount
        ).join(
            Draw, SalesByTicketPerDraw.draw_id == Draw.id
        ).filter(
            SalesByTicketPerDraw.draw_id == draw_id
        ).all()

        formatted_results = []
        for row in results:
            view, house_holding = row
            holding = min(house_holding, view.total_amount)
            formatted_results.append({
                "draw_id": view.draw_id,
                "ticket": view.ticket,
                "total_amount": view.total_amount,
                "holding": holding
            })
        return formatted_results

    def get_all(self):
        return self.db.execute(select(Sale)).scalars().all()

    def create(self, data: dict) -> Sale:
        sale = Sale(**data)
        self.db.add(sale)
        self.db.commit()
        self.db.refresh(sale)
        return sale

    def get_by_id(self, sale_id: int):
        return self.db.query(Sale).filter(Sale.id == sale_id).first()

    def update(self, sale: Sale):
        self.db.commit()
        self.db.refresh(sale)
        return sale

    def delete(self, sale: Sale):
        self.db.delete(sale)
        self.db.commit()
