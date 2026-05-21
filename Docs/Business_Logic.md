# Business Logic: Port Collision Hardening

## Overview
To prevent startup failures (WinError 10048) caused by hardcoded port assignments, the desktop application startup sequence must implement a dynamic port resolution mechanism.

## Port Fallback Strategy
1. **Primary Default:** The application must attempt to bind to port 8000 first to maintain backward compatibility.
2. **Fallback Mechanism:** If port 8000 is occupied, the application will probe subsequent ports (8001, 8002, ...) sequentially.
3. **Arbitrary Ceiling:** The search process will continue until an available port is found or an arbitrary ceiling of 9000 is reached.
4. **Failure Handling:** If no port is available in the range [8000, 9000], the application must cease the boot process and display a user-friendly error notification (e.g., via UI toast).

## Architectural Constraints
- **Shell-First Resolution:** The desktop shell (`desktop/main.py`) is responsible for resolving the available port before launching any backend or frontend processes.
- **Dynamic Configuration:** Once a port is resolved, it must be synchronized across both the backend (API) and the frontend (UI).
- **Communication Pattern:** The desktop shell will act as the bridge, injecting the resolved port into the frontend environment and passing it as an argument to the backend start command.
