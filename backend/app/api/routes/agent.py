from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.base import SuccessEnvelope
from app.schemas.agent import AgentCreate, AgentResponse, AgentBase
from app.services.agent import AgentService
from app.db.database import get_db

router = APIRouter()

@router.get("/", response_model=SuccessEnvelope[list[AgentResponse]])
def list_agents(db: Session = Depends(get_db)):
    return SuccessEnvelope(data=AgentService(db).list_agents())

@router.post("/", response_model=SuccessEnvelope[AgentResponse])
def create_agent(agent_in: AgentCreate, db: Session = Depends(get_db)):
    return SuccessEnvelope(data=AgentService(db).create_agent(agent_in))

@router.patch("/{agent_id}", response_model=SuccessEnvelope[AgentResponse])
def update_agent(agent_id: str, agent_update: AgentBase, db: Session = Depends(get_db)):
    return SuccessEnvelope(data=AgentService(db).update_agent(agent_id, agent_update))

@router.delete("/{agent_id}", response_model=SuccessEnvelope[bool])
def delete_agent(agent_id: str, db: Session = Depends(get_db)):
    AgentService(db).delete_agent(agent_id)
    return SuccessEnvelope(data=True)
