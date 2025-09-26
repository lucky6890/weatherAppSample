# WeatherApp

Small Express + TypeScript API for working with weather-related data. This project demonstrates a minimal server, PostgreSQL and Redis services, and a TypeScript code organization using controllers and a database layer.

## Features
- Express.js server written in TypeScript
- TypeORM setup placeholder for PostgreSQL
- Redis client singleton
- Docker + Docker Compose setup for local development (app, Postgres, Redis)

## Prerequisites
- Node.js (18+ recommended)
- npm
- Docker & Docker Compose (for containerized development)

## Quick start (local)
1. Install dependencies

```bash
npm install
```

2. Create a `.env` file (you can copy `.env.example`)

```bash
cp .env.example .env
```

3. Build TypeScript and start the server

```bash
npx tsc
node dist/main.js
```

Visit http://localhost:3000

## Quick start (Docker Compose)
This project includes a `docker-compose.yml` that brings up the API, Postgres and Redis.

```bash
# Build and start containers
docker compose up --build
```

The API will be available at http://localhost:3000 and Postgres on port 5432.

## Environment variables
See `.env.example`. Important variables:
- `PORT` - app port
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` - Postgres connection
- `REDIS_HOST` - Redis host

## Project structure
```
.
├─ src/
│  ├─ controllers/        # Route handlers (controllers)
│  ├─ database/           # DB + Redis clients
│  ├─ routes/             # Express route definitions
│  └─ main.ts             # App entry
├─ Dockerfile
├─ docker-compose.yml
├─ tsconfig.json
├─ package.json
└─ README.md
```

## Notes & next steps
- TypeORM entities, migrations, and repository layer are not included — add them under `src/entities` and `src/migrations` when needed.
- For production builds, add a proper build step and a multi-stage Dockerfile that copies only `dist/` and `package.json` into the final image.
- Add unit tests and CI workflows for quality and safety.

---

If you'd like, I can also:
- Add TypeORM entity examples and a migration
- Add health checks and graceful shutdown handling
- Create Docker multi-stage production Dockerfile
