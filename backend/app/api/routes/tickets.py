from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.base import SuccessEnvelope
from app.schemas.winning_ticket import WinningTicketCreate, WinningTicketResponse
from app.schemas.blacklist_ticket import BlacklistTicketCreate, BlacklistTicketResponse
from app.services.ticket import TicketService
from app.db.database import get_db

router = APIRouter()

# Winning Tickets (under draws)
@router.get("/draws/{draw_id}/winning-tickets", response_model=SuccessEnvelope[list[WinningTicketResponse]])
def list_winning_tickets(draw_id: int, db: Session = Depends(get_db)):
    return SuccessEnvelope(data=TicketService(db).list_winning(draw_id=draw_id))

@router.post("/draws/{draw_id}/winning-tickets", response_model=SuccessEnvelope[WinningTicketResponse])
def create_winning_ticket(draw_id: int, in_data: WinningTicketCreate, db: Session = Depends(get_db)):
    in_data.draw_id = draw_id
    return SuccessEnvelope(data=TicketService(db).create_winning(in_data))

@router.delete("/draws/{draw_id}/winning-tickets/{ticket_id}", response_model=SuccessEnvelope[bool])
def delete_winning_ticket(draw_id: int, ticket_id: int, db: Session = Depends(get_db)):
    return SuccessEnvelope(data=TicketService(db).delete_winning(ticket_id))

# Blacklist Tickets (under draws)
@router.get("/draws/{draw_id}/blacklist-tickets", response_model=SuccessEnvelope[list[BlacklistTicketResponse]])
def list_blacklist_tickets(draw_id: int, db: Session = Depends(get_db)):
    return SuccessEnvelope(data=TicketService(db).list_blacklist(draw_id=draw_id))

@router.post("/draws/{draw_id}/blacklist-tickets", response_model=SuccessEnvelope[BlacklistTicketResponse])
def create_blacklist_ticket(draw_id: int, in_data: BlacklistTicketCreate, db: Session = Depends(get_db)):
    in_data.draw_id = draw_id
    return SuccessEnvelope(data=TicketService(db).create_blacklist(in_data))

@router.delete("/draws/{draw_id}/blacklist-tickets/{ticket_id}", response_model=SuccessEnvelope[bool])
def delete_blacklist_ticket(draw_id: int, ticket_id: int, db: Session = Depends(get_db)):
    return SuccessEnvelope(data=TicketService(db).delete_blacklist(ticket_id))
