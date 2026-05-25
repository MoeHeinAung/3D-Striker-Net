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

---

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **3D-Striker-Net** (1431 symbols, 2048 relationships, 8 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/3D-Striker-Net/context` | Codebase overview, check index freshness |
| `gitnexus://repo/3D-Striker-Net/clusters` | All functional areas |
| `gitnexus://repo/3D-Striker-Net/processes` | All execution flows |
| `gitnexus://repo/3D-Striker-Net/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
