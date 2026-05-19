# 🚑 Incident Fix Prompt
**Role:** Incident Responder (`Docs/agents/incident_responder.md`)

**Instructions:**
1. Adopt the Incident Responder persona.
2. Read `INCIDENT_LOG.md` for Incident ID: [I-XXX].
3. Analyze Root Cause using `Rules.md`.

**Workflow:**
- Step 1: Create a reproduction test in `tests/` that fails.
- Step 2: Implement a permanent fix satisfying `Rules.md`.
- Step 3: Run the test to verify the fix.
- Step 4: Update `Rules.md` or `SSOT.md` if an architectural gap was found.
- Step 5: Update [I-XXX] status to `🔧 Fixed` or `✅ Verified`.

**Goal:** No incident closes without a test and a rule update.
