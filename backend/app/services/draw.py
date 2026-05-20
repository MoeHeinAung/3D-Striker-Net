from sqlalchemy.orm import Session
from fastapi import HTTPException
from backend.app.repositories.draw import DrawRepository
from backend.app.schemas.draw import DrawCreate, DrawUpdate

class DrawService:
    def __init__(self, db: Session):
        self.repository = DrawRepository(db)

    def create_draw(self, draw_in: DrawCreate):
        if self.repository.get_open_draw():
            raise HTTPException(status_code=400, detail="An active draw already exists.")
        return self.repository.create(draw_in.model_dump())

    def list_draws(self):
        return self.repository.get_all()

    def update_draw(self, draw_id: int, draw_update: DrawUpdate):
        draw = self.repository.get_by_id(draw_id)
        if not draw:
            raise HTTPException(status_code=404, detail="Draw not found.")
        
        # Check if changing status to OPEN and another OPEN draw exists
        if draw_update.status == "OPEN" and draw.status != "OPEN":
            if self.repository.get_open_draw():
                raise HTTPException(status_code=400, detail="An active draw already exists.")

        update_data = draw_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(draw, key, value)
            
        return self.repository.update(draw)

    def delete_draw(self, draw_id: int):
        draw = self.repository.get_by_id(draw_id)
        if not draw:
            raise HTTPException(status_code=404, detail="Draw not found.")
        self.repository.delete(draw)
