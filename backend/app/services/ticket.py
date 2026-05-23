from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.repositories.ticket import TicketRepository
from app.schemas.winning_ticket import WinningTicketCreate
from app.schemas.blacklist_ticket import BlacklistTicketCreate

class TicketService:
    def __init__(self, db: Session):
        self.repository = TicketRepository(db)

    # Winning Ticket
    def list_winning(self):
        return self.repository.get_all_winning()

    def create_winning(self, in_data: WinningTicketCreate):
        return self.repository.create_winning(in_data.model_dump())

    def delete_winning(self, ticket_id: int):
        if not self.repository.delete_winning(ticket_id):
            raise HTTPException(status_code=404, detail="Winning ticket not found.")
        return True

    # Blacklist Ticket
    def list_blacklist(self):
        return self.repository.get_all_blacklist()

    def create_blacklist(self, in_data: BlacklistTicketCreate):
        return self.repository.create_blacklist(in_data.model_dump())

    def delete_blacklist(self, ticket_id: int):
        if not self.repository.delete_blacklist(ticket_id):
            raise HTTPException(status_code=404, detail="Blacklist ticket not found.")
        return True
