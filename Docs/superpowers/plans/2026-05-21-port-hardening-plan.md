# Port Collision Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement dynamic port resolution (8000-9000) in the desktop shell to prevent startup collisions, and synchronize the resolved port across the backend and frontend.

**Architecture:** The desktop shell (`desktop/main.py`) performs synchronous port probing using `socket.bind()` before spawning the backend thread or initializing the GUI window. The resolved port is passed to `uvicorn` and injected into the frontend `pywebview` environment.

**Tech Stack:** Python (socket, threading, uvicorn, pywebview), React (Frontend Environment).

---

### Task 1: Add Port Probing Utility

**Files:**
- Modify: `desktop/main.py`

- [ ] **Step 1: Implement `find_available_port`**

```python
import socket

def find_available_port(start=8000, end=9000):
    for port in range(start, end + 1):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('127.0.0.1', port))
                return port
        except OSError:
            continue
    raise Exception(f"No available port in range {start}-{end}")
```

- [ ] **Step 2: Commit**

```bash
git add desktop/main.py
git commit -m "feat: add port probing utility"
```

### Task 2: Integrate Port Resolution into Startup

**Files:**
- Modify: `desktop/main.py`

- [ ] **Step 1: Update `start_app` to resolve port before thread launch**

```python
def start_app():
    load_dotenv()
    
    # Resolve port
    resolved_port = find_available_port()
    
    # 1. Start Backend Thread with resolved port
    # Note: Need to update run_backend to accept port
    backend_thread = threading.Thread(target=run_backend, args=(resolved_port,), daemon=True)
    backend_thread.start()
    
    # ... rest of start_app
```

- [ ] **Step 2: Update `run_backend` to receive port**

```python
def run_backend(port):
    # ...
    uvicorn.run("app.main:app", host="127.0.0.1", port=port, log_level="info", reload=False)
```

- [ ] **Step 3: Commit**

```bash
git add desktop/main.py
git commit -m "feat: integrate dynamic port resolution into desktop startup"
```

### Task 3: Inject Port into Frontend

**Files:**
- Modify: `desktop/window.py` (assuming `create_desktop_window` logic)
- Modify: `desktop/main.py`

- [ ] **Step 1: Pass resolved port to `create_desktop_window`**

```python
# In desktop/main.py
create_desktop_window(port=resolved_port)
```

- [ ] **Step 2: Update `create_desktop_window` to inject port via JS**

```python
# In desktop/window.py
def create_desktop_window(port):
    window = webview.create_window("3D-Striker-Net", url="index.html")
    # Inject API URL context
    window.evaluate_js(f"window.VITE_API_URL = 'http://127.0.0.1:{port}'")
    return window
```

- [ ] **Step 3: Commit**

```bash
git add desktop/main.py desktop/window.py
git commit -m "feat: inject resolved port into frontend"
```

### Task 4: Implement UI Error Handling

**Files:**
- Modify: `frontend/src/app/App.tsx` (or where UI bootstrap occurs)

- [ ] **Step 1: Add listener for backend connection health**

If the backend fails to bind, we need to show a UI error.

```typescript
// In App.tsx
useEffect(() => {
    // Check if window.VITE_API_URL is set and test connection
    const checkConnection = async () => {
        try {
            await fetch(`${window.VITE_API_URL}/health`);
        } catch (e) {
            alert("Failed to connect to backend on resolved port.");
        }
    };
    checkConnection();
}, []);
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/app/App.tsx
git commit -m "feat: add frontend connection health check"
```
