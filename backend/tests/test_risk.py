import pytest
from unittest.mock import MagicMock
from app.services.risk_service import RiskService
from app.repositories.offloaded import OffloadedRepository

def test_risk_calculations():
    mock_offloaded_repo = MagicMock(spec=OffloadedRepository)
    # Return 100 as total offloaded for ticket '123'
    mock_offloaded_repo.get_by_ticket.return_value = [
        MagicMock(amount=60),
        MagicMock(amount=40)
    ]
    
    risk_service = RiskService(offloaded_repo=mock_offloaded_repo)
    
    # scenario: sales=250, max_hold=200
    # house_holding = min(250, 200) = 200
    # offloaded_amount = 100
    # pending_amount = 250 - (200 + 100) = -50 -> 0
    # wait, formula: pending_amount = max(0, sales - (max_hold + offloaded))
    # pending_amount = max(0, 250 - (200 + 100)) = max(0, -50) = 0
    
    results = risk_service.calculate_ticket_risk(
        ticket='123',
        sum_of_sales_amount=250.0,
        admin_max_hold=200.0
    )
    
    assert results['house_holding_amount'] == 200.0
    assert results['offloaded_amount'] == 100.0
    assert results['pending_amount'] == 0.0

    # scenario: sales=400, max_hold=200
    # house_holding = min(400, 200) = 200
    # offloaded_amount = 100
    # pending_amount = 400 - (200 + 100) = 100
    
    results = risk_service.calculate_ticket_risk(
        ticket='123',
        sum_of_sales_amount=400.0,
        admin_max_hold=200.0
    )
    
    assert results['house_holding_amount'] == 200.0
    assert results['offloaded_amount'] == 100.0
    assert results['pending_amount'] == 100.0
