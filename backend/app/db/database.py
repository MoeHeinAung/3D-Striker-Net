import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.app.models.draw import Draw # Import models to register with Base
from backend.app.db.base import Base
from backend.app.core.config import settings

engine = create_engine(settings.DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    # Only remove if using the default test db path and it exists
    if settings.DATABASE_URL == "sqlite:///./test.db" and os.path.exists("./test.db"):
        os.remove("./test.db")
    Base.metadata.create_all(bind=engine)
