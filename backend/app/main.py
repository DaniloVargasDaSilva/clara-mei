import os

from fastapi import FastAPI

is_production = (
    os.getenv("ENVIRONMENT", "development").lower() == "production"
)

app = FastAPI(
    title="Clara API",
    description="API de gestão financeira para microempreendedoras brasileiras (MEIs).",
    version="0.1.0",
    docs_url=None if is_production else "/docs",
    redoc_url=None if is_production else "/redoc",
    openapi_url=None if is_production else "/openapi.json",
)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "application": "Clara API",
    }
