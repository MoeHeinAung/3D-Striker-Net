from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.batch import Batch

class BatchRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.execute(select(Batch)).scalars().all()

    def create(self, data: dict) -> Batch:
        batch = Batch(**data)
        self.db.add(batch)
        self.db.commit()
        self.db.refresh(batch)
        return batch

    def get_by_id(self, batch_id: int):
        return self.db.query(Batch).filter(Batch.id == batch_id).first()

    def update(self, batch: Batch):
        self.db.commit()
        self.db.refresh(batch)
        return batch

    def delete(self, batch: Batch):
        self.db.delete(batch)
        self.db.commit()
