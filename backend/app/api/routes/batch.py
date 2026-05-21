from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.base import SuccessEnvelope
from app.schemas.batch import BatchCreate, BatchResponse
from app.services.batch import BatchService
from app.db.database import get_db
from typing import List

router = APIRouter()

@router.get("/", response_model=SuccessEnvelope[List[BatchResponse]])
def list_batches(db: Session = Depends(get_db)):
    return SuccessEnvelope(data=BatchService(db).list())

@router.post("/", response_model=SuccessEnvelope[BatchResponse])
def create_batch(batch_in: BatchCreate, sales_in: List[dict], db: Session = Depends(get_db)):
    # This expects a body with batch info and a list of sales
    return SuccessEnvelope(data=BatchService(db).create_batch_with_sales(batch_in, sales_in))

@router.patch("/{batch_id}", response_model=SuccessEnvelope[BatchResponse])
def update_batch(batch_id: int, note: str, db: Session = Depends(get_db)):
    return SuccessEnvelope(data=BatchService(db).update_batch(batch_id, note))

@router.delete("/{batch_id}", response_model=SuccessEnvelope[bool])
def delete_batch(batch_id: int, db: Session = Depends(get_db)):
    BatchService(db).delete_batch(batch_id)
    return SuccessEnvelope(data=True)
