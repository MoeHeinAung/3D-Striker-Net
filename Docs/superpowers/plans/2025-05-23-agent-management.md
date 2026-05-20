# Agent Management Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create an `Agents` database table and implement full CRUD operations (Create, Read, Update, Delete) accessible via the `Network` page.

**Architecture:**
- **Model/Repository/Service/Schema/Router:** Standard pattern as seen in `Draws`.
- **Validation:** 3-letter, no-number ID validation in Pydantic schema using regex `^[a-zA-Z]{3}$`.
- **UI:** TanStack Query + Ant Design components on `Network.tsx`.

**Tech Stack:** FastAPI, SQLAlchemy, React, TanStack Query, Ant Design, SCSS Modules.

---

### Task 1: Backend Setup - Models and Schemas

**Files:**
- Create: `backend/app/models/agent.py`
- Create: `backend/app/schemas/agent.py`

- [ ] **Step 1: Create Model `Agent`**
```python
from sqlalchemy import Column, String, Float, DateTime
from sqlalchemy.sql import func
from app.db.base import Base

class Agent(Base):
    __tablename__ = "agents"

    id = Column(String(3), primary_key=True, index=True)
    name = Column(String, nullable=False)
    commission = Column(Float, nullable=False)
    jp_factor = Column(Float, nullable=False)
    sp_factor = Column(Float, nullable=False)
    note = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
```

- [ ] **Step 2: Create Pydantic Schema `AgentCreate` and `AgentResponse`**
```python
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class AgentBase(BaseModel):
    name: str
    commission: float
    jp_factor: float
    sp_factor: float
    note: Optional[str] = None

class AgentCreate(AgentBase):
    id: str = Field(..., min_length=3, max_length=3, pattern="^[a-zA-Z]{3}$")

class AgentResponse(AgentBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
```

- [ ] **Step 3: Commit**
```bash
git add backend/app/models/agent.py backend/app/schemas/agent.py
git commit -m "feat: add agent model and schema"
```

### Task 2: Backend Repository and Service

**Files:**
- Create: `backend/app/repositories/agent.py`
- Create: `backend/app/services/agent.py`

- [ ] **Step 1: Create Repository `AgentRepository`**
```python
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
```

- [ ] **Step 2: Create Service `AgentService`**
```python
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
```

- [ ] **Step 3: Commit**
```bash
git add backend/app/repositories/agent.py backend/app/services/agent.py
git commit -m "feat: add agent repository and service"
```

### Task 3: Backend API Router

**Files:**
- Create: `backend/app/api/routes/agent.py`
- Modify: `backend/app/api/router.py`

- [ ] **Step 1: Create Route `agent.py`**
```python
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
```

- [ ] **Step 2: Register in `router.py`**
```python
from fastapi import APIRouter
from app.api.routes import health, draw, agent

api_router = APIRouter()
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(draw.router, prefix="/draws", tags=["draws"])
api_router.include_router(agent.router, prefix="/agents", tags=["agents"])
```

- [ ] **Step 3: Commit**
```bash
git add backend/app/api/routes/agent.py backend/app/api/router.py
git commit -m "feat: add agent api router and register it"
```

### Task 4: Frontend Implementation

**Files:**
- Create: `frontend/src/queries/useAgents.ts`
- Modify: `frontend/src/pages/Network.tsx`

- [ ] **Step 1: Create Query `useAgents.ts`**
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

export interface Agent {
  id: string;
  name: string;
  commission: number;
  jp_factor: number;
  sp_factor: number;
  note?: string;
  created_at: string;
}

export const useAgents = () => {
  return useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const res = await api.get('/agents');
      return res.data.data;
    },
  });
};

export const useCreateAgent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Agent, 'created_at'>) => api.post('/agents', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['agents'] }),
  });
};
```

- [ ] **Step 2: Implement UI in `Network.tsx`** (Using Ant Design components: `Table`, `Form`, `Input`, `Button`, `Modal`)
*(Developer Note: Implementation details for Antd usage go here, ensuring it lists agents and has a create button/modal)*

- [ ] **Step 3: Commit**
```bash
git add frontend/src/queries/useAgents.ts frontend/src/pages/Network.tsx
git commit -m "feat: add agent management UI and queries"
```
