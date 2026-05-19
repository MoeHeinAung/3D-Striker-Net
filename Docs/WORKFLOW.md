# 🔄 workflow.md: AI Execution Protocol
> **Purpose:** Defines the exact step-by-step cycle the AI MUST follow for every task, even if the user prompt is incomplete. Ensures consistency, safety, and automatic state tracking.
> **Enforcement:** Gemini CLI reads this FIRST. Violations block completion.
> **Last Updated:** [DATE]

---

## 🎯 Core Directives
- W-01: **Always read** `/SSOT.md`, `/Rules.md`, `/current-tasks.md`, `/incident-log.md` before any output.
- W-02: **Never guess.** If context is missing, apply fallback rules (see Section 3) or ask exactly ONE clarifying question.
- W-03: **Append-only.** Never delete, rewrite, or reorder existing tracker/log entries.
- W-04: **Gate-first.** Tests + DoD checklist must pass before any task moves to `✅ Done`.
- W-05: **Scope lock.** If a change touches >3 files or alters dependencies, STOP and propose a split.

---

## 🔄 Standard Execution Cycle (5 Steps)

### Step 1: Context Load & State Check
- Read `SSOT.md` + `Rules.md` for constraints.
- Read `current-tasks.md` → identify next `🟡 In Progress` or `⬜ Not Started` task.
- Read `incident-log.md` → check for open `🔍 Investigating` or `🚫 Blocked` items that intersect with current task.
- If user provided a custom prompt → merge it with the next task in queue.

### Step 2: Scope Definition & Auto-Detect
- Generate `Allowed Files` using project structure (skip `node_modules`, `.venv`, `.git`, `dist`, `build`).
- Map task to SSOT data flow rules.
- Lock patterns: TanStack Query (frontend), Pydantic/FastAPI (backend), Alembic (DB).
- **Output:** Exact file list + 1-sentence scope summary.

### Step 3: Generation (Code + Tests)
- Write ONLY files in `Allowed Files`.
- Follow `Rules.md` DO/NEVER tables strictly.
- Include:
  - Frontend: Component + query hook + shared loading/error + SCSS
  - Backend: Route + Pydantic model + validation + error envelope
  - Tests: Backend unit test + Frontend render/test + Idempotency/edge case
- Add file path headers: `📁 backend/routes/orders.py`

### Step 4: Validation & Gate Check
- Run: `pytest backend/tests/ -q && npm test -- --run`
- If `>0 failed` → auto-fix within scope → retest (max 3 cycles). If still failing → mark task `🚫 Blocked`, log to `incident-log.md`, stop.
- If `0 failed` → run manual smoke checks:
  - UI shows context banner
  - Errors match SSOT format
  - No duplicate submissions
  - Loading/error states use shared components
- Mark DoD checkboxes accordingly.

### Step 5: State Sync & Handoff
- Update `current-tasks.md`: status, DoD, test result, date.
- If bug/incident occurred → update `incident-log.md` with root cause + permanent fix + rule update.
- Commit with message: `[T-XXX] feat: <plain english> | tests: pass | rules: enforced`
- Output: Next recommended task + 1-click command to start it.

---

## 🔍 Fallback & Missing Info Protocol
*Used when user prompt is vague, incomplete, or skips details.*

| Missing Info | AI Fallback Action |
|--------------|-------------------|
| No task specified | Pick next `⬜ Not Started` from `current-tasks.md`. If none, propose `T-Next: [Feature]` with plain-English goal. |
| No `Allowed Files` provided | Auto-scan project root. Filter by feature keywords. Max 5 files. Output list for confirmation. |
| No test requirement stated | Generate minimal safe tests per `Rules.md` R-50 to R-53. Never skip. |
| No rollback plan mentioned | Auto-generate: "Revert last commit, restore DB from `backups/`, disable new route temporarily." |
| User says "just fix it" | Treat as incident. Log as `I-Next` in `incident-log.md`. Run Step 1-5 with incident protocol. |
| Ambiguous feature name | Ask ONE question: `"Do you mean [Option A] or [Option B]? Reply 1 or 2."` Then proceed. |

---

## 📊 File State & Sync Rules
| File | AI Action | Rule |
|------|-----------|------|
| `current-tasks.md` | APPEND or UPDATE status/DoD. NEVER delete rows. | W-03 |
| `incident-log.md` | APPEND new blocks. Update status only after verification. | W-03 |
| `SSOT.md` | READ-ONLY unless architecture change approved. | W-01 |
| `Rules.md` | READ-ONLY unless adding guardrail from incident. | W-01 |
| `prompts/` | SAVE prompt template after each cycle for reuse. | W-05 |

**Status Transition Flow:**
`⬜ Not Started` → `🟡 In Progress` → `🧪 Testing` → `✅ Done`  
`🔴 Critical Bug` → `🔍 Investigating` → `🔧 Fixed` → `✅ Verified` → `📦 Closed`

---

## 🛡️ Safety Gates & Rollback
- **Hard Stop Triggers:** 
  - AI edits files outside `Allowed Files`
  - Adds unapproved dependencies (`package.json` / `requirements.txt`)
  - Uses raw `fetch()` instead of TanStack Query
  - Skips idempotency on write operations
  - Tests fail after 3 auto-fix cycles
- **Rollback Protocol:**
  1. `git revert HEAD` (or restore last known good commit)
  2. `sqlite3 pos.db ".dump" > backup_YYYYMMDD.sql` (if DB altered)
  3. Disable new route in FastAPI
  4. Log incident, update rules, restart cycle
- **Auto-Backup:** Before ANY DB migration or route change, output exact backup command for user to run.

---

## 📝 Quick Reference Commands
| Phase | Command |
|-------|---------|
| **Start Cycle** | `cat current-tasks.md \| grep "⬜ Not Started" \| head -1` |
| **Generate Scope** | `python prompt_generator.py` (or manual file scan) |
| **Run Tests** | `pytest backend/tests/ -q && npm test -- --run` |
| **Check Lint** | `pre-commit run --all-files` |
| **Backup DB** | `sqlite3 pos.db ".backup backup_$(date +%F).db"` |
| **Commit** | `git add . && git commit -m "[T-XXX] <feat> | tests: pass | rules: enforced"` |
| **Next Step** | AI outputs: `"Run: pytest ... | Update status to ✅ Done | Next: T-XXX+1"` |

---