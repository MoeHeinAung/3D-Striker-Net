import threading
import uvicorn
import webview
import sys
import os
import socket
from dotenv import load_dotenv
from desktop.window import create_desktop_window

# Ensure we can import backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def find_available_port(start=8000, end=9000):
    for port in range(start, end + 1):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('127.0.0.1', port))
                return port
        except OSError:
            continue
    raise Exception(f"No available port in range {start}-{end}")

def run_backend():
    """Runs the FastAPI server using uvicorn."""
    # Ensure backend is in path
    backend_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "backend")
    sys.path.append(backend_path)
    
    # We use a string reference to avoid issues with threading and reloads
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, log_level="info", reload=False)

def start_app():
    """Bootstraps the backend and starts the desktop GUI."""
    load_dotenv()
    
    # 1. Start Backend Thread
    backend_thread = threading.Thread(target=run_backend, daemon=True)
    backend_thread.start()
    
    # 2. Create Window
    create_desktop_window()
    
    # 3. Start pywebview event loop
    # debug=True allows for Inspect Element (right click) in dev
    webview.start(debug=True)

if __name__ == "__main__":
    start_app()
