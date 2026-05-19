# 🛰️ Desktop Shell Integration (T-002)

**Role:** Backend Architect (`Docs/agents/backend_architect.md`) with a focus on Desktop Shell integration.

## 🎯 Objective
Integrate the existing FastAPI backend and Vite-served React frontend into a unified desktop application using **pywebview**. The backend must run in a separate thread to allow the pywebview window to remain responsive.

## 📂 Allowed Files & Folders
- `desktop/main.py`
- `desktop/window.py`
- `main.py` (Root entry point)
- `.env` (Update if necessary for desktop config)

## 🏗️ Approved Patterns (Mandatory)
- **Bootstrap:** Launch the FastAPI server (`uvicorn`) in a `threading.Thread` with `daemon=True`.
- **Window Management:** Use `webview.create_window` to initialize the native shell.
- **Environment Aware:** Load the frontend URL (`http://localhost:5173`) from environment variables or default to development mode.
- **Clean Exit:** Ensure that closing the window terminates the entire application.

## 🚫 Strict Anti-Patterns (Forbidden)
- ❌ **No Logic in Desktop:** Do not add business logic or database access to the `desktop/` folder.
- ❌ **Blocking Calls:** Do not run the backend in a way that blocks the GUI thread.
- ❌ **Hardcoded UI Settings:** Window title and dimensions should ideally be configurable or match `SSOT.md`.

## ✅ Definition of Done (Verification Checklist)
1. [ ] **Execution:** Running `python main.py` successfully opens a native window.
2. [ ] **Content:** The window displays the "3D-Striker-Net // Foundation" dashboard.
3. [ ] **Connectivity:** The dashboard shows `SYS_STATUS: ACTIVE`, proving the background backend is reachable.
4. [ ] **Stability:** Closing the window stops the Python process entirely.
5. [ ] **Architecture:** Code is modularized into `desktop/main.py` and `desktop/window.py`.
6. [ ] **Vibe:** Window title and initial size reflect the "Futuristic Precision" design system.
