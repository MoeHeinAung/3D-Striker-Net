import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import func
from app.db.base import Base
from app.repositories.ticket import TicketRepository
from app.models.winning_ticket import WinningTicket
from app.models.blacklist_ticket import BlacklistTicket

@pytest.fixture
def db_session():
    engine = create_engine("sqlite:///:memory:")
    from app.models.agent import Agent
    from app.models.batch import Batch
    from app.models.draw import Draw
    from app.models.master_dealer import MasterDealer
    from app.models.sale import Sale
    from app.models.winning_ticket import WinningTicket
    from app.models.blacklist_ticket import BlacklistTicket
    from app.models.offloaded import Offloaded
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    
    # Create a draw to satisfy FK constraint
    draw = Draw(open_date=func.now(), cutoff_time="12:00")
    session.add(draw)
    session.commit()
    session.refresh(draw)
    
    yield session, draw
    session.close()

def test_create_winning_ticket(db_session):
    session, draw = db_session
    repo = TicketRepository(session)
    data = {"ticket": "123", "type": "JACKPOT", "draw_id": draw.id}
    repo.create_winning(data)
    
    tickets = repo.get_all_winning()
    assert len(tickets) == 1
    assert tickets[0].ticket == "123"
    assert tickets[0].type == "JACKPOT"
    assert tickets[0].draw_id == draw.id

def test_delete_winning_ticket(db_session):
    session, draw = db_session
    repo = TicketRepository(session)
    data = {"ticket": "123", "type": "JACKPOT", "draw_id": draw.id}
    ticket = repo.create_winning(data)
    
    assert repo.delete_winning(ticket.id) is True
    assert len(repo.get_all_winning()) == 0

def test_create_blacklist_ticket(db_session):
    session, draw = db_session
    repo = TicketRepository(session)
    data = {"ticket": "999", "type": "BLOCK", "draw_id": draw.id}
    repo.create_blacklist(data)
    
    tickets = repo.get_all_blacklist()
    assert len(tickets) == 1
    assert tickets[0].ticket == "999"

def test_delete_blacklist_ticket(db_session):
    session, draw = db_session
    repo = TicketRepository(session)
    data = {"ticket": "999", "type": "BLOCK", "draw_id": draw.id}
    ticket = repo.create_blacklist(data)
    
def test_get_winning_by_draw(db_session):
    session, draw = db_session
    repo = TicketRepository(session)
    repo.create_winning({"ticket": "123", "type": "JACKPOT", "draw_id": draw.id})
    repo.create_winning({"ticket": "456", "type": "MINOR", "draw_id": draw.id})
    
    tickets = repo.get_all_winning_by_draw(draw.id)
    assert len(tickets) == 2
    
def test_get_blacklist_by_draw(db_session):
    session, draw = db_session
    repo = TicketRepository(session)
    repo.create_blacklist({"ticket": "111", "type": "BLOCK", "draw_id": draw.id})
    repo.create_blacklist({"ticket": "222", "type": "HALF", "draw_id": draw.id})
    
    tickets = repo.get_all_blacklist_by_draw(draw.id)
    assert len(tickets) == 2
