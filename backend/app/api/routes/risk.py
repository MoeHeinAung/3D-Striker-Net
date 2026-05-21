from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.repositories.offloaded import OffloadedRepository
from app.repositories.sale import SaleRepository
from app.services.risk_service import RiskService
from app.schemas.offloaded import OffloadedCreate, Offloaded

router = APIRouter(tags=["risk"])

@router.get("/summary")
def get_risk_summary(admin_max_hold: float, db: Session = Depends(get_db)):
    sale_repo = SaleRepository(db)
    offload_repo = OffloadedRepository(db)
    service = RiskService(offload_repo)
    
    aggregated_sales = sale_repo.get_aggregated_sales_by_ticket()
    return service.get_risk_summary(aggregated_sales, admin_max_hold)

@router.get("/calculate")
def calculate_risk(
    ticket: str, 
    sum_of_sales_amount: float, 
    admin_max_hold: float,
    db: Session = Depends(get_db)
):
    repo = OffloadedRepository(db)
    service = RiskService(repo)
    return service.calculate_ticket_risk(ticket, sum_of_sales_amount, admin_max_hold)

@router.post("/offload", response_model=Offloaded)
def create_offload(offload: OffloadedCreate, db: Session = Depends(get_db)):
    repo = OffloadedRepository(db)
    return repo.create(offload)
