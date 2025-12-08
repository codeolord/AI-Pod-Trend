# AI-Driven POD Trend & Design Automation Platform

This repository contains a **working full-stack project** for an AI-assisted
print-on-demand (POD) trend discovery and design automation platform.

It includes:

- **Backend (FastAPI)** – scraping stubs, data models, trend scoring, AI design hooks, integrations.
- **Frontend (Next.js + Tailwind)** – dashboard to browse trends and products.
- **Postgres models** – trends, products, snapshots, embeddings, audiences, prices, designs.
- **CI / CD (GitHub Actions)** – basic checks for backend & frontend.
- **Infra (Docker Compose)** – backend, frontend, Postgres, Redis.

You can push this repo straight to GitHub and run it locally or with Docker.

## Monorepo Layout

```text
backend/   # FastAPI app, models, services, scrapers, integrations
frontend/  # Next.js dashboard (App Router, TS, Tailwind)
infra/     # Docker compose for local dev
.github/   # CI pipeline
```

## Backend Overview

- `app/main.py` – FastAPI app setup and router mounting.
- `app/core/config.py` – environment-driven settings.
- `app/db/session.py` – async SQLAlchemy engine + session.
- `app/db/models.py` – `Trend`, `MarketplaceProduct`, `ProductSnapshot`,
  `ProductEmbedding`, `TrendScore`, `AudienceProfile`, `PriceRecommendation`, `DesignAsset`.
- `app/scrapers/` – `AmazonScraper`, `EtsyScraper` stubs returning demo data.
- `app/services/` – ingestion, heuristic scoring, embeddings client, audience & pricing intelligence, AI design generation stub.
- `app/integrations/` – Printful + Shopify clients.
- `app/routers/` – REST endpoints for trends, products, and designs.

## Frontend Overview

- Next.js 14 App Router (`frontend/app/`).
- Single-page dashboard that calls the backend:
  - `/api/v1/trends` for quick trend view.
  - Uses filters and search on the client.

You can easily extend it to call `/api/v1/products` and `/api/v1/designs` if desired.

## CI

GitHub Actions workflow at `.github/workflows/ci.yml`:

- Lints backend Python files (compilation).
- Builds Next.js frontend.

## Docker

`infra/docker-compose.yml` runs:

- backend (FastAPI, port 8000)
- frontend (Next.js, port 3000)
- postgres (port 5432)
- redis (port 6379)

This is the Base
