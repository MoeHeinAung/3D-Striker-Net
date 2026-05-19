from backend.app.schemas.health import HealthStatus

class HealthService:
    @staticmethod
    async def get_health() -> HealthStatus:
        # In a real app, this would check DB connection, etc.
        return HealthStatus(
            status="ACTIVE",
            version="0.1.0",
            database="CONNECTED"
        )
