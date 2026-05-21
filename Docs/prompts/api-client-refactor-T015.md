# 🚀 API Client Refactoring Prompt (T-015)

**Role:** Frontend Specialist (`Docs/agents/frontend_specialist.md`)

**Task:** 
Refactor the frontend API client design in `frontend/src/services/api.ts` to eliminate fragile response unwrapping. The Axios interceptor must return the full response object, and all service functions/hooks must explicitly unwrap the standard `SuccessEnvelope`.

**Context:**
- Double-unwrapping bugs were occurring because the interceptor was returning `response.data.data` or `response.data`.
- We are standardising on explicit unwrapping in the caller layer.

**Allowed Files:**
- `frontend/src/services/api.ts`
- `frontend/src/services/drawService.ts`
- `frontend/src/queries/use*.ts`

**Approved Patterns:**
1. **Interceptor Logic**:
   ```typescript
   api.interceptors.response.use(
     (response) => response, // Return full AxiosResponse
     (error) => ... // Normalize error
   );
   ```
2. **Standard Envelope Type**:
   ```typescript
   export type SuccessEnvelope<T> = { success: boolean; data: T; message: string };
   ```
3. **Usage in Services/Hooks**:
   ```typescript
   const res = await api.get<SuccessEnvelope<T>>('/path');
   return res.data.data;
   ```

**Strict Anti-Patterns:**
- ❌ Do NOT unwrap `data` or `data.data` in the interceptor success handler.
- ❌ Do NOT mix old and new unwrapping conventions in the same file.
- ❌ Do NOT return `undefined` from query functions; always return the payload or throw on error.

**Definition of Done (DoD):**
- [ ] `api.ts` interceptor returns the full Axios response object.
- [ ] `SuccessEnvelope<T>` is defined and exported from `api.ts`.
- [ ] All functions in `drawService.ts` explicitly unwrap `res.data.data`.
- [ ] All hooks in `frontend/src/queries/` explicitly unwrap `res.data.data`.
- [ ] `npm run typecheck` passes in the `frontend` directory.
- [ ] No regression in error handling (errors still normalized to `Error` objects).
