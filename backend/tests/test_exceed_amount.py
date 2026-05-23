import pytest
from unittest.mock import MagicMock
from app.repositories.sale import SaleRepository
from app.models.risk import SalesByTicketPerDraw

def test_get_sales_by_ticket_exceed_amount():
    # Mocking the database session and results
    mock_db = MagicMock()
    
    # Create a mock view object
    mock_view = MagicMock(spec=SalesByTicketPerDraw)
    mock_view.draw_id = 1
    mock_view.ticket = "123"
    mock_view.total_amount = 100
    
    # row = (view, house_holding, total_offloaded)
    # house_holding = 50, total_offloaded = 20
    # Expected: holding = 50, offloaded = 20, exceed_amount = 100 - (50 + 20) = 30
    mock_result = [(mock_view, 50, 20)]
    
    mock_db.query.return_value.join.return_value.outerjoin.return_value.filter.return_value.all.return_value = mock_result
    
    repo = SaleRepository(db=mock_db)
    results = repo.get_sales_by_ticket(draw_id=1)
    
    assert len(results) == 1
    assert results[0]["exceed_amount"] == 30
    assert results[0]["holding"] == 50
    assert results[0]["offloaded"] == 20
