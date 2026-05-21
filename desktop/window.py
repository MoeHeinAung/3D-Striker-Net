import webview
import os

def create_desktop_window(port):
    """
    Creates and configures the main desktop window for 3D-Striker-Net.
    Settings are derived from SSOT.md and design-system.md.
    """
    url = os.getenv("VITE_DEV_URL", "http://localhost:5173")
    title = os.getenv("APP_NAME", "3D-Striker-Net // COMMAND_CENTER")
    
    # Futuristic Precision: Deep background color
    # Note: background_color in create_window accepts hex or (R, G, B)
    window = webview.create_window(
        title=title,
        url=url,
        maximized=True,
        min_size=(1024, 768),
        background_color='#0A0B0E',
        text_select=False,
        confirm_close=True
    )
    
    # Inject API URL context
    window.evaluate_js(f"window.VITE_API_URL = 'http://127.0.0.1:{port}'")
    
    return window
