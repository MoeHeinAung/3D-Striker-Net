from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

def init_db(engine):
    # Register models here by importing them locally to avoid circular dependencies
    from app.models.agent import Agent
    from app.models.batch import Batch
    from app.models.draw import Draw
    from app.models.master_dealer import MasterDealer
    from app.models.sale import Sale
    from app.models.winning_ticket import WinningTicket
    from app.models.blacklist_ticket import BlacklistTicket
    from app.models.offloaded import Offloaded
    from app.models.risk import SalesByTicketPerDraw, OffloadedAmountByTicketPerDraw
    Base.metadata.create_all(bind=engine)
