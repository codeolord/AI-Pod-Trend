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

## Publishing to your GitHub account

If you pulled this code from a template or a zip download, you can publish it to
your own GitHub account with the following steps:

1. Create a new empty repository on GitHub (do not add a README or license).
2. Point this local checkout at the new repository:

   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   ```

3. Push the current branch to GitHub so the updates are available in your
   account:

   ```bash
   git push -u origin work
   ```

Replace `<your-username>` and `<repo-name>` with your GitHub details. After
pushing, you should see the updated code in your account.

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

TypeScript is pinned to **5.4.5**, the latest version officially supported by
this Next.js release.

### Frontend API Base URL

The dashboard reads `NEXT_PUBLIC_API_BASE_URL` (if unset it falls back to relative
`/api/v1` calls against the same origin). Set this to `http://backend:8000` when
running via Docker Compose so the frontend container can reach the backend service.

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
