from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.dashboard import DashboardService
from app.schemas.base import SuccessEnvelope
from app.schemas.dashboard import RiskMetrics, NextDraw
from app.models.draw import Draw, DrawStatus

router = APIRouter()

@router.get("/metrics/{draw_id}", response_model=SuccessEnvelope[RiskMetrics])
def get_metrics(draw_id: int, db: Session = Depends(get_db)):
    service = DashboardService(db)
    return SuccessEnvelope(data=service.get_dashboard_metrics(draw_id))

@router.get("/next-draw", response_model=SuccessEnvelope[NextDraw | None])
def get_next_draw(db: Session = Depends(get_db)):
    service = DashboardService(db)
    cutoff = service.get_next_cutoff_time()
    return SuccessEnvelope(data=NextDraw(cutoffDatetime=cutoff) if cutoff else None)
