# 🎨 Frontend Implementation Prompt
**Role:** Frontend Specialist (`Docs/agents/frontend_specialist.md`)

**Instructions:**
1. Adopt the Frontend Specialist persona.
2. Read `SSOT.md` and `Rules.md` to confirm architectural boundaries.
3. Task: [DESCRIBE UI TASK HERE]

**Requirements:**
- Use TanStack Query for all server state.
- Use Zustand for local UI state.
- Styles must be in SCSS Modules.
- Components must be "thin" (no business logic).
- Output must include file headers and match allowed paths: `frontend/src/`.

**Validation:**
- [ ] Run `npm run lint` and `npm run typecheck` in `frontend/`.
- [ ] Ensure no `fetch()` or `useEffect` fetching.
- [ ] Verify UI context banner is present.
