from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.base import SuccessEnvelope
from app.schemas.offloaded import OffloadedCreate, OffloadedResponse
from app.repositories.offloaded import OffloadedRepository
from app.db.database import get_db

router = APIRouter()

@router.post("/", response_model=SuccessEnvelope[OffloadedResponse])
def create_offloaded(in_data: OffloadedCreate, db: Session = Depends(get_db)):
    repo = OffloadedRepository(db)
    offloaded = repo.create(in_data.model_dump())
    return SuccessEnvelope(data=offloaded)

@router.get("/", response_model=SuccessEnvelope[list[OffloadedResponse]])
def get_all_offloaded(db: Session = Depends(get_db)):
    repo = OffloadedRepository(db)
    return SuccessEnvelope(data=repo.get_all())
