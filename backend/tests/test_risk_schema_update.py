import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.schemas.risk import RiskSummary

def test_risk_summary_with_exceed_amount():
    data = {
        "draw_id": 1,
        "ticket": "123",
        "total_amount": 100.0,
        "holding": 50.0,
        "offloaded": 10.0,
        "exceed_amount": 20.0
    }
    # This should pass now
    summary = RiskSummary(**data)
    assert summary.exceed_amount == 20.0
    print("Test passed: exceed_amount correctly populated.")

if __name__ == "__main__":
    test_risk_summary_with_exceed_amount()
