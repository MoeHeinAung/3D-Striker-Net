# 🏛️ Backend Implementation Prompt
**Role:** Backend Architect (`Docs/agents/backend_architect.md`)

**Instructions:**
1. Adopt the Backend Architect persona.
2. Read `SSOT.md` and `Rules.md` to confirm architectural boundaries.
3. Task: [DESCRIBE BACKEND TASK HERE]

**Requirements:**
- All business logic in `backend/app/services/`.
- All DB access in `backend/app/repositories/`.
- All Request/Response validation in `backend/app/schemas/` (Pydantic).
- Use HTTPX for external calls in `backend/app/external/`.
- Output must include file headers and match allowed paths: `backend/app/`.

**Validation:**
- [ ] Run `ruff check .` and `black .` in `backend/`.
- [ ] Ensure unit tests are created/updated in `backend/tests/`.
- [ ] Verify routes are "thin" and only delegate to services.
