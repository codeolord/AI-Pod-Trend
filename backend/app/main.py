from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import trends, products, designs

app = FastAPI(
    title="POD Trend & Design Automation API",
    version="0.2.0",
    description="API for AI-driven print-on-demand trend discovery, scoring, and design generation.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(trends.router, prefix="/api/v1/trends", tags=["trends"])
app.include_router(products.router, prefix="/api/v1/products", tags=["products"])
app.include_router(designs.router, prefix="/api/v1/designs", tags=["designs"])


@app.get("/health")
async def health():
    return {"status": "ok"}
