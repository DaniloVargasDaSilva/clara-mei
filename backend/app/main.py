
from fastapi import FastAPI

app = FastAPI(
    title="Clara API",
    description="API de gestão financeira para microempreendedoras brasileiras (MEIs).",
    version="0.1.0",
)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "application": "Clara API",
    }
