from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.base import SuccessEnvelope
from app.schemas.winning_ticket import WinningTicketCreate, WinningTicketResponse
from app.schemas.blacklist_ticket import BlacklistTicketCreate, BlacklistTicketResponse
from app.services.ticket import TicketService
from app.db.database import get_db

router = APIRouter()

# Winning Tickets
@router.get("/winning", response_model=SuccessEnvelope[list[WinningTicketResponse]])
def list_winning_tickets(db: Session = Depends(get_db)):
    return SuccessEnvelope(data=TicketService(db).list_winning())

@router.post("/winning", response_model=SuccessEnvelope[WinningTicketResponse])
def create_winning_ticket(in_data: WinningTicketCreate, db: Session = Depends(get_db)):
    return SuccessEnvelope(data=TicketService(db).create_winning(in_data))

@router.delete("/winning/{ticket_id}", response_model=SuccessEnvelope[bool])
def delete_winning_ticket(ticket_id: int, db: Session = Depends(get_db)):
    return SuccessEnvelope(data=TicketService(db).delete_winning(ticket_id))

# Blacklist Tickets
@router.get("/blacklist", response_model=SuccessEnvelope[list[BlacklistTicketResponse]])
def list_blacklist_tickets(db: Session = Depends(get_db)):
    return SuccessEnvelope(data=TicketService(db).list_blacklist())

@router.post("/blacklist", response_model=SuccessEnvelope[BlacklistTicketResponse])
def create_blacklist_ticket(in_data: BlacklistTicketCreate, db: Session = Depends(get_db)):
    return SuccessEnvelope(data=TicketService(db).create_blacklist(in_data))

@router.delete("/blacklist/{ticket_id}", response_model=SuccessEnvelope[bool])
def delete_blacklist_ticket(ticket_id: int, db: Session = Depends(get_db)):
    return SuccessEnvelope(data=TicketService(db).delete_blacklist(ticket_id))
