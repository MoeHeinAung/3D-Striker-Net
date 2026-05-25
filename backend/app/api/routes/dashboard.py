from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.dashboard import DashboardService
from app.schemas.dashboard import DashboardMetrics, ActiveDrawResponse

router = APIRouter()

@router.get("/metrics", response_model=DashboardMetrics)
def get_metrics(db: Session = Depends(get_db)):
    service = DashboardService(db)
    return service.get_metrics()

@router.get("/active-draw", response_model=ActiveDrawResponse)
def get_active_draw(db: Session = Depends(get_db)):
    service = DashboardService(db)
    return service.get_active_draw()
