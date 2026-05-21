from app.repositories.offloaded import OffloadedRepository
from app.schemas.offloaded import Offloaded

class RiskService:
    def __init__(self, offloaded_repo: OffloadedRepository):
        self.offloaded_repo = offloaded_repo

    def calculate_ticket_risk(self, ticket: str, sum_of_sales_amount: float, admin_max_hold: float) -> dict:
        offloaded_records = self.offloaded_repo.get_by_ticket(ticket)
        offloaded_amount = sum(record.amount for record in offloaded_records)
        
        house_holding_amount = min(sum_of_sales_amount, admin_max_hold)
        
        pending_amount = max(0.0, sum_of_sales_amount - (admin_max_hold + offloaded_amount))
        
        return {
            "ticket": ticket,
            "sum_of_sales_amount": sum_of_sales_amount,
            "house_holding_amount": house_holding_amount,
            "offloaded_amount": offloaded_amount,
            "pending_amount": pending_amount
        }

    def get_risk_summary(self, aggregated_sales: list, admin_max_hold: float) -> list:
        summary = []
        for ticket, total_sales in aggregated_sales:
            summary.append(self.calculate_ticket_risk(ticket, float(total_sales), admin_max_hold))
        return summary
