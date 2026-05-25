from sqlalchemy.orm import Session
from app.models.draw import Draw, DrawStatus
from app.repositories.sale import SaleRepository
from app.models.risk import SalesByTicketPerDraw, OffloadedAmountByTicketPerDraw
from sqlalchemy import func

class DashboardService:
    def __init__(self, db: Session):
        self.db = db
        self.sale_repo = SaleRepository(db)

    def get_dashboard_metrics(self, draw_id: int):
        # Fetch the detailed risk data
        risk_data = self.sale_repo.get_sales_by_ticket(draw_id)
        
        total_sales = 0.0
        total_holding = 0.0
        total_pending = 0.0
        total_offloaded = 0.0
        
        for item in risk_data:
            total_sales += item['total_amount']
            total_holding += item['holding']
            total_pending += item['exceed_amount']
            total_offloaded += item['offloaded']
            
        return {
            "totalSaleAmount": total_sales,
            "totalHouseHoldingAmount": total_holding,
            "pendingAmount": total_pending,
            "offloadedAmount": total_offloaded
        }

    def get_next_cutoff_time(self):
        draw = self.db.query(Draw).filter(Draw.status == DrawStatus.OPEN.value).first()
        if not draw:
            return None
            
        # Assuming cutoff_time is 'HH:MM'
        h, m = map(int, draw.cutoff_time.split(':'))
        cutoff_dt = draw.open_date.replace(hour=h, minute=m, second=0, microsecond=0)
        return cutoff_dt.isoformat()
