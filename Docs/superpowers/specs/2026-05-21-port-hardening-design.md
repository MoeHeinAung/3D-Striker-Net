# Design Spec: Port Collision Hardening (Desktop Bridge)

## Overview
This design specifies the implementation of a port resolution mechanism for the desktop application to prevent startup collisions on port 8000.

## Architectural Design
- **Resolution Layer:** Implemented in `desktop/main.py`.
- **Probing Logic:** Uses `socket.bind()` to test availability.
- **Port Range:** [8000, 9000].
- **Bridge Injection:** 
    - The resolved port will be stored in a shared state in `desktop/main.py`.
    - Passed to `uvicorn.run()` as a dynamic argument.
    - Injected into `pywebview` frontend context.

## Implementation Steps
1. Add `find_available_port` utility to `desktop/main.py`.
2. Update `desktop/main.py` to resolve port before backend/UI start.
3. Update `uvicorn.run` in `desktop/main.py` to use resolved port.
4. Inject `RESOLVED_PORT` into frontend UI.
5. Add UI error handling to show toast notifications if port resolution fails.

## Risks and Mitigation
- **Risk:** Port exhaustion. **Mitigation:** Fallback to error state and display UI toast.
- **Risk:** Frontend/Backend out of sync. **Mitigation:** Desktop shell acts as single source of truth for the port.
