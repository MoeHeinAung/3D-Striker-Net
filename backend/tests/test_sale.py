import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.db.database import engine, Base

@pytest.fixture(scope="module", autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

@pytest.fixture(autouse=True)
def clean_db():
    with engine.connect() as conn:
        for table in Base.metadata.sorted_tables:
            conn.execute(table.delete())
        conn.commit()

client = TestClient(app)

def test_create_sale_with_invalid_ticket_format():
    # Setup: create draw
    draw = client.post("/api/draws/", json={"open_date": "2026-05-20T10:00:00", "cutoff_time": "18:00"}).json()["data"]
    
    # Test invalid ticket
    response = client.post("/api/sales/", json={
        "draw_id": draw["id"],
        "agent_id": "AGT",
        "ticket": "12A", # Invalid
        "amount": 100.0
    })
    assert response.status_code == 400 # Validation error

def test_create_sale_for_closed_draw():
    # Setup: create draw and close it
    draw = client.post("/api/draws/", json={"open_date": "2026-05-20T10:00:00", "cutoff_time": "08:00"}).json()["data"]
    
    # Test sale on closed draw
    response = client.post("/api/sales/", json={
        "draw_id": draw["id"],
        "agent_id": "AGT",
        "ticket": "123",
        "amount": 100.0
    })
    # This should fail either by validation or service logic
    assert response.status_code == 400
