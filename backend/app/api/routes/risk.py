from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.repositories.offloaded import OffloadedRepository
from app.repositories.sale import SaleRepository
from app.services.risk_service import RiskService
from app.schemas.offloaded import OffloadedCreate, Offloaded
from app.schemas.base import SuccessEnvelope
from typing import Any

router = APIRouter(tags=["risk"])


@router.get("/summary", response_model=SuccessEnvelope[list[dict[str, Any]]])
def get_risk_summary(admin_max_hold: float, db: Session = Depends(get_db)):
    sale_repo = SaleRepository(db)
    offload_repo = OffloadedRepository(db)
    service = RiskService(offload_repo)

    aggregated_sales = sale_repo.get_aggregated_sales_by_ticket()
    return SuccessEnvelope(
        data=service.get_risk_summary(aggregated_sales, admin_max_hold)
    )


@router.get("/calculate", response_model=SuccessEnvelope[dict[str, Any]])
def calculate_risk(
    ticket: str,
    sum_of_sales_amount: float,
    admin_max_hold: float,
    db: Session = Depends(get_db),
):
    repo = OffloadedRepository(db)
    service = RiskService(repo)
    return SuccessEnvelope(
        data=service.calculate_ticket_risk(ticket, sum_of_sales_amount, admin_max_hold)
    )


@router.post("/offload", response_model=SuccessEnvelope[Offloaded])
def create_offload(offload: OffloadedCreate, db: Session = Depends(get_db)):
    repo = OffloadedRepository(db)
    return SuccessEnvelope(data=repo.create(offload))
