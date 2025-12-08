from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel, ConfigDict
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import Trend as TrendORM
from app.db.session import get_session

router = APIRouter()


class Trend(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    marketplace: str
    product_title: str
    niche: str
    score: float
    demand_level: str
    competition_level: str
    price: float
    currency: str = "USD"
    sample_image_url: Optional[str] = None
    last_seen: datetime


def _demo_trends() -> List[Trend]:
    now = datetime.utcnow()
    return [
        Trend(
            id=1,
            marketplace="Amazon",
            product_title="Vintage Retro Cat Lover T-Shirt",
            niche="Pets / Cats / Retro",
            score=0.87,
            demand_level="high",
            competition_level="medium",
            price=19.99,
            sample_image_url="https://placehold.co/400x400?text=Cat+Tee",
            last_seen=now,
        ),
        Trend(
            id=2,
            marketplace="Etsy",
            product_title="Custom Minimalist Line Art Couple Poster",
            niche="Home Decor / Couples / Minimalist",
            score=0.81,
            demand_level="medium",
            competition_level="low",
            price=24.0,
            sample_image_url="https://placehold.co/400x400?text=Line+Art+Poster",
            last_seen=now,
        ),
    ]


@router.get("/", response_model=List[Trend])
async def list_trends(
    limit: int = 20,
    marketplace: Optional[str] = None,
    demand_level: Optional[str] = None,
    db: AsyncSession = Depends(get_session),
):
    stmt = select(TrendORM).order_by(TrendORM.score.desc()).limit(limit)

    if marketplace:
        stmt = stmt.filter(TrendORM.marketplace == marketplace)
    if demand_level:
        stmt = stmt.filter(TrendORM.demand_level == demand_level)

    result = await db.execute(stmt)
    rows = result.scalars().all()

    if rows:
        return rows

    return _demo_trends()
