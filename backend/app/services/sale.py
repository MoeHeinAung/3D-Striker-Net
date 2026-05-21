from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import datetime
from itertools import permutations
from app.repositories.sale import SaleRepository
from app.repositories.draw import DrawRepository
from app.schemas.sale import SaleCreate, SaleBase
from app.models.draw import DrawStatus

class SaleService:
    def __init__(self, db: Session):
        self.repository = SaleRepository(db)
        self.draw_repository = DrawRepository(db)

    def generate_permutations(self, ticket: str, amount_original: int, amount_perms: int = None):
        """
        Generates permutations for a ticket.
        If amount_perms is None (Single Mapping), all permutations get amount_original.
        If amount_perms is provided (Dual Mapping), original ticket gets amount_original, others get amount_perms.
        """
        perms = set([''.join(p) for p in permutations(ticket)])
        results = []
        
        for p in perms:
            amt = amount_original if amount_perms is None or p == ticket else amount_perms
            results.append({"ticket": p, "amount": amt})
            
        return results

    def create_batch(self, sales: list[SaleCreate]):
        self.validate_draw(sales[0].draw_id)
        created_sales = []
        for sale_in in sales:
            created_sales.append(self.repository.create(sale_in.model_dump()))
        return created_sales

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
