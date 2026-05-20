from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import select
from backend.app.models.draw import Draw, DrawStatus

class DrawRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_open_draw(self) -> Optional[Draw]:
        stmt = select(Draw).where(Draw.status == DrawStatus.OPEN.value)
        return self.db.execute(stmt).scalar_one_or_none()

    def get_by_id(self, draw_id: int):
        return self.db.query(Draw).filter(Draw.id == draw_id).first()

    def update(self, draw: Draw):
        self.db.commit()
        self.db.refresh(draw)
        return draw

    def create(self, draw_data: dict) -> Draw:
        draw = Draw(**draw_data)
        self.db.add(draw)
        self.db.commit()
        self.db.refresh(draw)
        return draw

    def get_all(self):
        return self.db.execute(select(Draw)).scalars().all()
