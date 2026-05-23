from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import api_router
from app.db.database import init_db
from app.schemas.base import ErrorEnvelope, ErrorDetail

app = FastAPI(title="3D-Striker-Net API")

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    import logging
    logging.error(f"Global exception: {exc}", exc_info=True)
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

from fastapi.exceptions import RequestValidationError
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    import logging
    logging.error(f"Validation error: {exc.errors()}")
    return JSONResponse(
        status_code=400,
        content=ErrorEnvelope(
            success=False,
            error=ErrorDetail(
                code="VALIDATION_ERROR",
                message="Input validation failed",
                details={"errors": exc.errors()}
            )
        ).dict()
    )

@app.on_event("startup")
def startup_event():
    import os
    from alembic.config import Config
    from alembic import command
    
    # Path to alembic.ini (it is in the project root, backend is a child)
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    alembic_ini_path = os.path.join(base_dir, "alembic.ini")
    
    # Run the migrations
    try:
        alembic_cfg = Config(alembic_ini_path)
        command.upgrade(alembic_cfg, "head")
    except Exception as e:
        import logging
        logging.error(f"Failed to run alembic migrations on startup: {e}")
    
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
