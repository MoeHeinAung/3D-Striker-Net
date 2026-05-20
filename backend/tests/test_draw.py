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
    # Clear tables before each test
    with engine.connect() as conn:
        for table in Base.metadata.sorted_tables:
            conn.execute(table.delete())
        conn.commit()

client = TestClient(app)

def test_create_draw():
    response = client.post("/api/draws/", json={"open_date": "2026-05-20T10:00:00", "cutoff_time": "18:00"})
    assert response.status_code == 200
    assert response.json()["data"]["status"] == "OPEN"

def test_prevent_multiple_open_draws():
    # First draw
    client.post("/api/draws/", json={"open_date": "2026-05-21T10:00:00", "cutoff_time": "18:00"})
    # Second draw
    response = client.post("/api/draws/", json={"open_date": "2026-05-22T10:00:00", "cutoff_time": "18:00"})
    assert response.status_code == 400

def test_update_draw_status():
    # First create a draw
    response = client.post("/api/draws/", json={"open_date": "2026-05-23T10:00:00", "cutoff_time": "18:00"})
    draw_id = response.json()["data"]["id"]
    
    # Update status to CLOSED
    response = client.patch(f"/api/draws/{draw_id}", json={"status": "CLOSED"})
    assert response.status_code == 200
    assert response.json()["data"]["status"] == "CLOSED"
