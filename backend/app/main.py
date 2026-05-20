from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api.router import api_router
from backend.app.db.database import init_db
from backend.app.schemas.base import ErrorEnvelope, ErrorDetail

app = FastAPI(title="3D-Striker-Net API")

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content=ErrorEnvelope(
            success=False,
            error=ErrorDetail(
                code="INTERNAL_SERVER_ERROR",
                message=str(exc)
            )
        ).dict()
    )

@app.on_event("startup")
def startup_event():
    init_db()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to 3D-Striker-Net API"}
