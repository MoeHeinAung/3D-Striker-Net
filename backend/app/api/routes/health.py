from fastapi import APIRouter
from backend.app.schemas.base import SuccessEnvelope
from backend.app.schemas.health import HealthStatus
from backend.app.services.health_service import HealthService

router = APIRouter()

@router.get("/", response_model=SuccessEnvelope[HealthStatus])
async def check_health():
    health_data = await HealthService.get_health()
    return SuccessEnvelope(data=health_data, message="System healthy")
