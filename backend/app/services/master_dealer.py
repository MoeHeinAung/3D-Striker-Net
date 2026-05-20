from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.repositories.master_dealer import MasterDealerRepository
from app.schemas.master_dealer import MasterDealerCreate, MasterDealerBase

class MasterDealerService:
    def __init__(self, db: Session):
        self.repository = MasterDealerRepository(db)

    def list(self):
        return self.repository.get_all()

    def create(self, in_data: MasterDealerCreate):
        if self.repository.get_by_id(in_data.id):
            raise HTTPException(status_code=400, detail="ID already exists.")
        return self.repository.create(in_data.model_dump())

    def update(self, item_id: str, update_data: MasterDealerBase):
        item = self.repository.get_by_id(item_id)
        if not item:
            raise HTTPException(status_code=404, detail="Not found.")
        
        data = update_data.model_dump(exclude_unset=True)
        for key, value in data.items():
            setattr(item, key, value)
            
        return self.repository.update(item)

    def delete(self, item_id: str):
        item = self.repository.get_by_id(item_id)
        if not item:
            raise HTTPException(status_code=404, detail="Not found.")
        self.repository.delete(item)
