from sqlalchemy.orm import Session
from app.models.offloaded import Offloaded
from app.schemas.offloaded import OffloadedCreate

class OffloadedRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, offloaded: OffloadedCreate) -> Offloaded:
        db_offloaded = Offloaded(**offloaded.model_dump())
        self.db.add(db_offloaded)
        self.db.commit()
        self.db.refresh(db_offloaded)
        return db_offloaded

    def get_by_ticket(self, ticket: str) -> list[Offloaded]:
        return self.db.query(Offloaded).filter(Offloaded.ticket == ticket).all()
