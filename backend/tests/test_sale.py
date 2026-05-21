import pytest
from app.services.sale import SaleService

def test_generate_permutations_single_mapping():
    service = SaleService(db=None) 
    
    ticket = "123"
    amount = 1000
    expected_tickets = {"123", "132", "213", "231", "312", "321"}
    
    result = service.generate_permutations(ticket, amount)
    
    assert len(result) == 6
    for item in result:
        assert item['ticket'] in expected_tickets
        assert item['amount'] == amount

def test_generate_permutations_dual_mapping():
    service = SaleService(db=None)
    
    ticket = "123"
    amt_original = 2000
    amt_perms = 1000
    
    result = service.generate_permutations(ticket, amt_original, amt_perms)
    
    assert len(result) == 6
    original_item = next(item for item in result if item['ticket'] == ticket)
    assert original_item['amount'] == amt_original
    
    for item in result:
        if item['ticket'] != ticket:
            assert item['amount'] == amt_perms

