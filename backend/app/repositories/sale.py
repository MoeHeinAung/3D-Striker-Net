from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.sale import Sale

class SaleRepository:
    def __init__(self, db: Session):
        self.db = db

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
