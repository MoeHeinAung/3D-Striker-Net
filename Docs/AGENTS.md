# 🤖 Project Sub-Agents

To maintain high architectural integrity, this project uses specialized **Sub-Agent Personalities**. When delegating work to an AI, invoke the appropriate personality by providing its specific instruction set.

## 👥 Available Agents

| Agent | Icon | Specialty | Core Context |
|---|---|---|---|
| **Frontend Specialist** | 🎨 | UI, React, State Management | `Docs/agents/frontend_specialist.md` |
| **Backend Architect** | 🏛️ | Logic, DB, API, Schemas | `Docs/agents/backend_architect.md` |
| **Incident Responder** | 🚑 | Debugging, Tests, Root Cause | `Docs/agents/incident_responder.md` |

## 🚀 How to Use

### 1. Manual Invocation
When starting a new task, tell the AI which role it should adopt:
> *"Adopt the role of the **Frontend Specialist** from `Docs/agents/frontend_specialist.md` for this task."*

### 2. Sub-Agent Delegation (@generalist)
If you are using a tool that supports sub-agent dispatch (like `@generalist` in Gemini CLI), include the agent file as a reference:
> *"@generalist Implement the user profile form. Reference `Docs/agents/frontend_specialist.md` for standards."*

## 💡 Why use this?
- **Lower Drift:** Prevents the "Generalist" AI from making backend assumptions while writing frontend code.
- **Higher Signal:** Specialized instructions force the AI to use TanStack Query instead of generic `fetch` or `useEffect`.
- **Rigor:** Ensures that an "Incident" fix always results in a new rule and a new test.
