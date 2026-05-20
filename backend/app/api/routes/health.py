from fastapi import APIRouter
from app.schemas.base import SuccessEnvelope
from app.schemas.health import HealthStatus
from app.services.health_service import HealthService

router = APIRouter()

@router.get("/", response_model=SuccessEnvelope[HealthStatus])
async def check_health():
    health_data = await HealthService.get_health()
    return SuccessEnvelope(data=health_data, message="System healthy")
