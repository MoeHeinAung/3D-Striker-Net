from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "3D-Striker-Net"
    DEBUG: bool = True
    DATABASE_URL: str = "sqlite:///./app.db"

    class Config:
        env_file = ".env"

settings = Settings()
