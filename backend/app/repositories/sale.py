from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.sale import Sale

class SaleRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.execute(select(Sale)).scalars().all()

    def get_aggregated_sales_by_ticket(self):
        from sqlalchemy import func
        return self.db.query(Sale.ticket, func.sum(Sale.amount).label("total_sales")).group_by(Sale.ticket).all()

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
