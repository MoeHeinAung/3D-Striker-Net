from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_read_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["status"] == "ACTIVE"
    assert "message" in data
