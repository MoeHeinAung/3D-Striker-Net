from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "3D-Striker-Net"
    DEBUG: bool = True
    DATABASE_URL: str = "sqlite:///./app.db"
    PORT: int = 8000
    HOST: str = "127.0.0.1"
    VITE_DEV_URL: str = "http://localhost:5173"
    VITE_API_URL: str = "http://127.0.0.1:8000/api"

    class Config:
        env_file = ".env"

settings = Settings()
