from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.repositories.agent import AgentRepository
from app.schemas.agent import AgentCreate, AgentBase

class AgentService:
    def __init__(self, db: Session):
        self.repository = AgentRepository(db)

    def list_agents(self):
        return self.repository.get_all()

    def create_agent(self, agent_in: AgentCreate):
        if self.repository.get_by_id(agent_in.id):
            raise HTTPException(status_code=400, detail="Agent with this ID already exists.")
        return self.repository.create(agent_in.model_dump())

    def update_agent(self, agent_id: str, agent_update: AgentBase):
        agent = self.repository.get_by_id(agent_id)
        if not agent:
            raise HTTPException(status_code=404, detail="Agent not found.")
        
        update_data = agent_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(agent, key, value)
            
        return self.repository.update(agent)

    def delete_agent(self, agent_id: str):
        agent = self.repository.get_by_id(agent_id)
        if not agent:
            raise HTTPException(status_code=404, detail="Agent not found.")
        self.repository.delete(agent)
