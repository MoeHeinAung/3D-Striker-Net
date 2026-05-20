from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.base import SuccessEnvelope
from app.schemas.master_dealer import MasterDealerCreate, MasterDealerResponse, MasterDealerBase
from app.services.master_dealer import MasterDealerService
from app.db.database import get_db

router = APIRouter()

@router.get("/", response_model=SuccessEnvelope[list[MasterDealerResponse]])
def list_items(db: Session = Depends(get_db)):
    return SuccessEnvelope(data=MasterDealerService(db).list())

@router.post("/", response_model=SuccessEnvelope[MasterDealerResponse])
def create_item(in_data: MasterDealerCreate, db: Session = Depends(get_db)):
    return SuccessEnvelope(data=MasterDealerService(db).create(in_data))

@router.patch("/{item_id}", response_model=SuccessEnvelope[MasterDealerResponse])
def update_item(item_id: str, update_data: MasterDealerBase, db: Session = Depends(get_db)):
    return SuccessEnvelope(data=MasterDealerService(db).update(item_id, update_data))

@router.delete("/{item_id}", response_model=SuccessEnvelope[bool])
def delete_item(item_id: str, db: Session = Depends(get_db)):
    MasterDealerService(db).delete(item_id)
    return SuccessEnvelope(data=True)
