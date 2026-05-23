from sqlalchemy.orm import Session
from app.models.offloaded import Offloaded

class OffloadedRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, data: dict) -> Offloaded:
        offloaded = Offloaded(**data)
        self.db.add(offloaded)
        self.db.commit()
        self.db.refresh(offloaded)
        return offloaded

    def get_all(self):
        return self.db.query(Offloaded).all()
