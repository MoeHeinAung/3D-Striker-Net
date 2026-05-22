from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import datetime
from itertools import permutations
import re
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

    def parse_line(self, line: str):
        """
        Parses a single line of ticket input according to Business_Logic.md:
        - Dual Mapping: 123 = 2000/1000
        - R Indicator: 123 R 1000
        - Standard: 123 = 1000
        """
        line = line.strip()
        if not line:
            return None
        
        prefix = line[:3]
        body = re.sub(r'[/\~\+\.\=\s]+$', '', line[3:])
        
        # Dual Mapping
        dual_match = re.search(r'(\d+)[Rr\/\s\=\-\.\+\~]+(\d+)', body)
        if dual_match:
            return self.generate_permutations(prefix, int(dual_match.group(1)), int(dual_match.group(2)))
            
        # R Indicator / Standard
        amt = int(re.sub(r'[^0-9]', '', body))
        return self.generate_permutations(prefix, amt)

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
        
        # Combine draw date with cutoff time
        try:
            cutoff_h, cutoff_m = map(int, draw.cutoff_time.split(':'))
            # draw.open_date is expected to be a datetime object from SQLAlchemy
            cutoff_datetime = draw.open_date.replace(hour=cutoff_h, minute=cutoff_m, second=0, microsecond=0)
            
            if datetime.now() > cutoff_datetime:
                raise HTTPException(status_code=400, detail=f"Sales cutoff time ({draw.cutoff_time}) for draw date {draw.open_date.date()} has passed.")
        except (ValueError, AttributeError) as e:
            # Fallback or error handling if date/time format is invalid
            raise HTTPException(status_code=500, detail=f"Internal error validating cutoff time: {str(e)}")
            
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

    def get_draw_risk_summary(self, draw_id: int):
        return self.repository.get_sales_by_ticket(draw_id)
