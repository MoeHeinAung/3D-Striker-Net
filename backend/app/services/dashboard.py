from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.sale import Sale
from app.models.offloaded import Offloaded
from app.models.draw import Draw

class DashboardService:
    def __init__(self, db: Session):
        self.db = db

    def get_metrics(self):
        total_sales = self.db.query(func.sum(Sale.amount)).scalar() or 0.0
        total_offloaded = self.db.query(func.sum(Offloaded.amount)).scalar() or 0.0
        # For simplicity, house_holding_amount is tracked per draw, assume sum of all open draws
        total_house_holding = self.db.query(func.sum(Draw.house_holding_amount)).scalar() or 0.0
        pending = total_sales - total_offloaded
        
        return {
            "totalSaleAmount": total_sales,
            "totalHouseHoldingAmount": total_house_holding,
            "pendingAmount": pending,
            "offloadedAmount": total_offloaded
        }

    def get_active_draw(self):
        draw = self.db.query(Draw).filter(Draw.status == 'OPEN').first()
        if not draw:
            return None
        return {
            "id": draw.id,
            "cutoff_time": draw.cutoff_time,
            "status": draw.status,
            "note": draw.note
        }
