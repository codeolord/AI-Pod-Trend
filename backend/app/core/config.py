from pydantic import BaseSettings


class Settings(BaseSettings):
    api_v1_prefix: str = "/api/v1"
    project_name: str = "POD Trend & Design Automation API"

    # Database
    postgres_user: str = "pod_user"
    postgres_password: str = "pod_password"
    postgres_db: str = "pod_db"
    postgres_host: str = "postgres"
    postgres_port: int = 5432

    # Redis / Celery
    redis_url: str = "redis://redis:6379/0"

    # Optional: OpenAI key for embeddings
    openai_api_key: str | None = None

    class Config:
        env_file = ".env"


settings = Settings()
