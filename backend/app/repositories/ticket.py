from sqlalchemy.orm import Session
from app.models.winning_ticket import WinningTicket
from app.models.blacklist_ticket import BlacklistTicket
from app.schemas.winning_ticket import WinningTicketCreate
from app.schemas.blacklist_ticket import BlacklistTicketCreate

class TicketRepository:
    def __init__(self, db: Session):
        self.db = db

    # Winning Ticket methods
    def get_all_winning(self):
        return self.db.query(WinningTicket).all()

    def get_all_winning_by_draw(self, draw_id: int):
        return self.db.query(WinningTicket).filter(WinningTicket.draw_id == draw_id).all()

    def create_winning(self, data: dict):
        ticket = WinningTicket(**data)
        self.db.add(ticket)
        self.db.commit()
        self.db.refresh(ticket)
        return ticket

    def delete_winning(self, ticket_id: int):
        ticket = self.db.query(WinningTicket).filter(WinningTicket.id == ticket_id).first()
        if ticket:
            self.db.delete(ticket)
            self.db.commit()
            return True
        return False

    # Blacklist Ticket methods
    def get_all_blacklist(self):
        return self.db.query(BlacklistTicket).all()

    def get_all_blacklist_by_draw(self, draw_id: int):
        return self.db.query(BlacklistTicket).filter(BlacklistTicket.draw_id == draw_id).all()

    def create_blacklist(self, data: dict):
        ticket = BlacklistTicket(**data)
        self.db.add(ticket)
        self.db.commit()
        self.db.refresh(ticket)
        return ticket

    def delete_blacklist(self, ticket_id: int):
        ticket = self.db.query(BlacklistTicket).filter(BlacklistTicket.id == ticket_id).first()
        if ticket:
            self.db.delete(ticket)
            self.db.commit()
            return True
        return False
