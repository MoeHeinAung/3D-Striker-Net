# 🏛️ Backend Implementation Prompt: Risk API Standardisation (T-014)
**Role:** Backend Architect (`Docs/agents/backend_architect.md`)

**Instructions:**
1. Adopt the Backend Architect persona.
2. Read `SSOT.md` and `Rules.md` to confirm architectural boundaries.
3. Task: Standardize API responses for `backend/app/api/routes/risk.py` by wrapping all responses in `SuccessEnvelope` to match the system-wide standard.

**Requirements:**
- Update `GET /risk/summary`, `GET /risk/calculate`, and `POST /risk/offload`.
- Update FastAPI route definitions to include explicit `response_model=SuccessEnvelope[...]`.
- Ensure the original business logic data is passed into the `data` field.
- No changes to service layer logic or repository queries.
- All business logic remains in `backend/app/services/`.
- All Request/Response validation remains in `backend/app/schemas/`.
- Output must include file headers and match allowed paths: `backend/app/`.

**Validation:**
- [ ] Run `ruff check .` and `black .` in `backend/`.
- [ ] Ensure unit tests for risk routes in `backend/tests/test_risk.py` are updated if needed.
- [ ] Verify routes are "thin" and only delegate to services, now with standardized envelope.

**Definition of Done (Verification Checklist):**
1. [ ] Risk API endpoints successfully wrapped in `SuccessEnvelope`.
2. [ ] Pydantic `response_model` correctly set for all updated routes.
3. [ ] All existing Risk functionality passes existing tests.
4. [ ] No business logic changes occurred.
5. [ ] Lint, format, and typecheck gates green.
