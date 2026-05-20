from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.master_dealer import MasterDealer

class MasterDealerRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.execute(select(MasterDealer)).scalars().all()

    def create(self, data: dict) -> MasterDealer:
        item = MasterDealer(**data)
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item

    def get_by_id(self, item_id: str):
        return self.db.query(MasterDealer).filter(MasterDealer.id == item_id).first()

    def update(self, item: MasterDealer):
        self.db.commit()
        self.db.refresh(item)
        return item

    def delete(self, item: MasterDealer):
        self.db.delete(item)
        self.db.commit()
