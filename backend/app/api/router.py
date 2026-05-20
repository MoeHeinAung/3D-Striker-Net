from fastapi import APIRouter
from app.api.routes import health, draw, agent, master_dealer, sale

api_router = APIRouter()
api_router.include_router(health.router, prefix="/health", tags=["Health"])
api_router.include_router(draw.router, prefix="/draws", tags=["Draws"])
api_router.include_router(agent.router, prefix="/agents", tags=["Agents"])
api_router.include_router(master_dealer.router, prefix="/master-dealers", tags=["MasterDealers"])
api_router.include_router(sale.router, prefix="/sales", tags=["Sales"])
