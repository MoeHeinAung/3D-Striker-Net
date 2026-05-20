from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.base import SuccessEnvelope
from app.schemas.sale import SaleCreate, SaleResponse, SaleBase
from app.services.sale import SaleService
from app.db.database import get_db

router = APIRouter()

@router.get("/", response_model=SuccessEnvelope[list[SaleResponse]])
def list_items(db: Session = Depends(get_db)):
    return SuccessEnvelope(data=SaleService(db).list())

@router.post("/", response_model=SuccessEnvelope[SaleResponse])
def create_item(in_data: SaleCreate, db: Session = Depends(get_db)):
    return SuccessEnvelope(data=SaleService(db).create(in_data))

@router.patch("/{item_id}", response_model=SuccessEnvelope[SaleResponse])
def update_item(item_id: int, update_data: SaleBase, db: Session = Depends(get_db)):
    return SuccessEnvelope(data=SaleService(db).update(item_id, update_data))

@router.delete("/{item_id}", response_model=SuccessEnvelope[bool])
def delete_item(item_id: int, db: Session = Depends(get_db)):
    SaleService(db).delete(item_id)
    return SuccessEnvelope(data=True)
