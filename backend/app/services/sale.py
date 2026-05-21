from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import datetime
from app.repositories.sale import SaleRepository
from app.repositories.draw import DrawRepository
from app.schemas.sale import SaleCreate, SaleBase
from app.models.draw import DrawStatus

class SaleService:
    def __init__(self, db: Session):
        self.repository = SaleRepository(db)
        self.draw_repository = DrawRepository(db)

    def validate_draw(self, draw_id: int):
        draw = self.draw_repository.get_by_id(draw_id)
        if not draw:
            raise HTTPException(status_code=404, detail="Draw not found.")
        if draw.status != DrawStatus.OPEN.value:
            raise HTTPException(status_code=400, detail="Sale not allowed for non-active draw.")
        
        # Simple string time comparison for HH:mm
        now = datetime.now().strftime("%H:%M")
        if now > draw.cutoff_time:
            raise HTTPException(status_code=400, detail="Sales cutoff time has passed.")
        return draw

    def list(self):
        return self.repository.get_all()

    def create(self, in_data: SaleCreate):
        self.validate_draw(in_data.draw_id)
        return self.repository.create(in_data.model_dump())

    def update(self, item_id: int, update_data: SaleBase):
        sale = self.repository.get_by_id(item_id)
        if not sale:
            raise HTTPException(status_code=404, detail="Sale not found.")
        self.validate_draw(sale.draw_id)
        
        data = update_data.model_dump(exclude_unset=True)
        for key, value in data.items():
            setattr(sale, key, value)
            
        return self.repository.update(sale)

    def delete(self, item_id: int):
        sale = self.repository.get_by_id(item_id)
        if not sale:
            raise HTTPException(status_code=404, detail="Sale not found.")
        self.validate_draw(sale.draw_id)
        self.repository.delete(sale)
