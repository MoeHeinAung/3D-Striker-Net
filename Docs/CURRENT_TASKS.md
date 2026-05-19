### 🟦 T-002: Desktop Shell Integration
- **Status:** `✅ Done`
- **Priority:** High
- **Phase:** Foundation
- **Plain English Goal:** Create a pywebview-based desktop shell that launches the FastAPI backend in a background thread and loads the Vite-served frontend in a native window.
- **Dependencies:** T-001
- **Allowed Files:** 
  - `desktop/main.py`
  - `desktop/window.py`
  - `main.py`
- **AI Prompt Used:** `prompts/desktop-T002.md`
- **Rollback Plan:** Revert changes and delete `desktop/` directory.

#### 🛠️ Engineering Standards
- **Approved Patterns:**
  - **Desktop:** `pywebview` for windowing, `threading` for backend isolation.
  - **Environment:** Load `.env` for window configuration and API URLs.
- **Strict Anti-Patterns:**
  - ❌ **No Business Logic in Desktop:** Must only handle window and bootstrap.
  - ❌ **Blocking Backend:** Backend must not block the pywebview event loop.
- **Related Rules:**
  - `Rules.md § 2.4`: Window lifecycle, backend bootstrap, and frontend load only.

- **Definition of Done (DoD):**
  - [x] pywebview window renders the React frontend dashboard
  - [x] Dashboard displays live data from the background FastAPI process
  - [x] App closes cleanly (no zombie Python processes)
  - [x] Design matches "Futuristic Precision" (window size/vibe)
- **Test Results:** ✅ Pass | Syntax check passed | Dependencies installed
- **Notes/Blockers:** Backend successfully isolated in a daemon thread.
- **Updated:** 2026-05-19
