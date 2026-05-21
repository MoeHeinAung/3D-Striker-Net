# Business Logic Documentation

This document records the business rules and logic extracted from project requirements and specifications.

## API Response Handling

### Success Envelope Standard
All successful API responses must follow the standard envelope structure:
- `success`: boolean (true for success)
- `data`: The actual payload of the response
- `message`: A string containing information about the operation

### Frontend API Client Design
The frontend API client (Axios instance) must follow these design rules:
1. **No Fragile Unwrapping**: The Axios response interceptor must NOT automatically unwrap `response.data`. It must return the full Axios response object.
2. **Explicit Unwrapping**: Service functions and query hooks are responsible for explicitly unwrapping the standard envelope to access the payload.
3. **Consistent Pattern**: The standard pattern for data fetching is:
   ```typescript
   const res = await api.get<SuccessEnvelope<T>>('/path');
   return res.data.data;
   ```
4. **Error Normalization**: The response interceptor must normalize error messages from the backend `SuccessEnvelope` (error variant) or fallback to a default error message.

## Architectural Constraints
- **Layered Design**: Maintain strict separation between Frontend (React), Backend API (FastAPI), and Backend Core (Services/Repositories).
- **No Direct DB Access**: Frontend must never access the database directly.
- **Thin Components**: UI components must remain thin, delegating logic to services and hooks.
