import pytest
from fastapi import HTTPException
from app.db.base import Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import date, datetime
from app.models.batch import Batch
from app.models.sale import Sale
from app.models.draw import Draw, DrawStatus
from app.models.agent import Agent
from app.services.batch import BatchService
from app.schemas.batch import BatchCreate

# Setup in-memory SQLite for testing
engine = create_engine("sqlite:///:memory:")
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture
def db():
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    
    # Create required entities
    draw = Draw(id=1, status=DrawStatus.OPEN.value, cutoff_time="23:59", open_date=date(2026, 5, 21))
    agent = Agent(id="ABC", name="Agent ABC", commission=0.1, jp_factor=1.0, sp_factor=1.0)
    session.add(draw)
    session.add(agent)
    session.commit()
    
    yield session
    session.close()
    Base.metadata.drop_all(bind=engine)

def test_create_batch_with_sales(db):
    service = BatchService(db)
    
    batch_in = BatchCreate(
        draw_id=1,
        agent_id="ABC",
        note="Test batch"
    )
    
    sales_in = [
        {"ticket": "123", "amount": 1000},
        {"ticket": "456", "amount": 500}
    ]
    
    batch = service.create_batch_with_sales(batch_in, [s for s in sales_in])
    
    assert batch.id is not None
    assert batch.total_amount == 1500
    assert len(batch.sales) == 2
    assert batch.sales[0].batch_id == batch.id
    assert batch.sales[1].batch_id == batch.id

def test_delete_batch_cascades_to_sales(db):
    service = BatchService(db)
    
    batch_in = BatchCreate(draw_id=1, agent_id="ABC")
    sales_in = [{"ticket": "123", "amount": 1000}]
    
    batch = service.create_batch_with_sales(batch_in, sales_in)
    batch_id = batch.id
    
    # Verify sales exist
    sales = db.query(Sale).filter(Sale.batch_id == batch_id).all()
    assert len(sales) == 1
    
    service.delete_batch(batch_id)
    
    # Verify batch is deleted
    assert db.query(Batch).filter(Batch.id == batch_id).first() is None
    # Verify sales are deleted (cascade)
    assert len(db.query(Sale).filter(Sale.batch_id == batch_id).all()) == 0

def test_cutoff_time_validation_date_aware(db):
    service = BatchService(db)
    
    # Create a draw in the past
    past_draw = Draw(id=2, status=DrawStatus.OPEN.value, cutoff_time="23:59", open_date=date(2000, 1, 1))
    db.add(past_draw)
    db.commit()
    
    batch_in = BatchCreate(draw_id=2, agent_id="ABC")
    sales_in = [{"ticket": "123", "amount": 1000}]
    
    with pytest.raises(HTTPException) as excinfo:
        service.create_batch_with_sales(batch_in, sales_in)
    
    assert excinfo.value.status_code == 400
    assert "cutoff time" in excinfo.value.detail.lower()
    assert "2000-01-01" in excinfo.value.detail
