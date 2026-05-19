from typing import Generic, TypeVar, Optional, Any
from pydantic import BaseModel

T = TypeVar("T")

class ErrorDetail(BaseModel):
    code: str
    message: str
    details: Optional[dict[str, Any]] = None

class SuccessEnvelope(BaseModel, Generic[T]):
    success: bool = True
    data: T
    message: str = ""

class ErrorEnvelope(BaseModel):
    success: bool = False
    error: ErrorDetail
