from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.schemas.base import SuccessEnvelope
from backend.app.schemas.draw import DrawCreate, DrawResponse, DrawUpdate
from backend.app.services.draw import DrawService
from backend.app.db.database import get_db

router = APIRouter()

@router.post("/", response_model=SuccessEnvelope[DrawResponse])
def create_draw(draw_in: DrawCreate, db: Session = Depends(get_db)):
    service = DrawService(db)
    draw = service.create_draw(draw_in)
    return SuccessEnvelope(data=draw)

@router.patch("/{draw_id}", response_model=SuccessEnvelope[DrawResponse])
def update_draw(draw_id: int, draw_update: DrawUpdate, db: Session = Depends(get_db)):
    service = DrawService(db)
    draw = service.update_draw(draw_id, draw_update)
    return SuccessEnvelope(data=draw)

@router.get("/", response_model=SuccessEnvelope[list[DrawResponse]])
def get_draws(db: Session = Depends(get_db)):
    service = DrawService(db)
    draws = service.list_draws()
    return SuccessEnvelope(data=draws)
