from sqlalchemy.orm import Session
from fastapi import HTTPException
from typing import List
from app.repositories.batch import BatchRepository
from app.repositories.sale import SaleRepository
from app.services.sale import SaleService
from app.schemas.batch import BatchCreate
from app.schemas.sale import SaleCreate

class BatchService:
    def __init__(self, db: Session):
        self.db = db
        self.repository = BatchRepository(db)
        self.sale_repository = SaleRepository(db)
        self.sale_service = SaleService(db)

    def list(self):
        return self.repository.get_all()

    def create_batch_with_sales(self, batch_in: BatchCreate, sales_in: List[dict]):
        # 1. Validate Draw status/cutoff (using SaleService logic)
        self.sale_service.validate_draw(batch_in.draw_id)

        # 2. Create Batch Record
        # Calculate total amount if not provided
        total = sum(s['amount'] for s in sales_in)
        batch_data = batch_in.model_dump()
        batch_data['total_amount'] = total
        batch = self.repository.create(batch_data)

        # 3. Create Individual Sale Records
        for s_data in sales_in:
            sale_data = {
                **s_data,
                "draw_id": batch.draw_id,
                "agent_id": batch.agent_id,
                "batch_id": batch.id
            }
            self.sale_repository.create(sale_data)

        self.db.refresh(batch)
        return batch

    def update_batch(self, batch_id: int, note: str):
        batch = self.repository.get_by_id(batch_id)
        if not batch:
            raise HTTPException(status_code=404, detail="Batch not found.")
        batch.note = note
        return self.repository.update(batch)

    def delete_batch(self, batch_id: int):
        batch = self.repository.get_by_id(batch_id)
        if not batch:
            raise HTTPException(status_code=404, detail="Batch not found.")
        self.repository.delete(batch)
