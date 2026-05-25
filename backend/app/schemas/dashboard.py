from pydantic import BaseModel
from typing import Optional

class DashboardMetrics(BaseModel):
    totalSaleAmount: float
    totalHouseHoldingAmount: float
    pendingAmount: float
    offloadedAmount: float

class ActiveDrawResponse(BaseModel):
    id: int
    cutoff_time: str
    status: str
    note: Optional[str] = None
