from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.agent import Agent

class AgentRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.execute(select(Agent)).scalars().all()

    def create(self, agent_data: dict) -> Agent:
        agent = Agent(**agent_data)
        self.db.add(agent)
        self.db.commit()
        self.db.refresh(agent)
        return agent

    def get_by_id(self, agent_id: str):
        return self.db.query(Agent).filter(Agent.id == agent_id).first()

    def update(self, agent: Agent):
        self.db.commit()
        self.db.refresh(agent)
        return agent

    def delete(self, agent: Agent):
        self.db.delete(agent)
        self.db.commit()
