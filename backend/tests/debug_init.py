from sqlalchemy import create_engine
from app.db.base import Base
from app.models.agent import Agent
from app.models.batch import Batch
from app.models.draw import Draw
from app.models.sale import Sale

engine = create_engine("sqlite:///:memory:")
Base.metadata.create_all(bind=engine)
print("Tables created successfully")
