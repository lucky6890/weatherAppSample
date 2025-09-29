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

3. Obtain an OpenWeatherMap API key (see instructions below) and add it to your `.env` as `OPENWEATHERMAP_API_KEY`.

4. Build TypeScript and start the server

```bash
npx tsc
node dist/main.js
```

Visit http://localhost:3000 (or the port set in your `.env`)

docker compose up --build

## Quick start (Docker Compose)

This project includes a `docker-compose.yml` that brings up the API, Postgres and Redis and pgAdmin on port 8888.

Before starting, create a local `.env` file (copy from `.env.example`) and set `OPENWEATHERMAP_API_KEY` there.

```bash
# Build and start containers
docker compose up --build
```

The API will be available at http://localhost:3000 and Postgres on port 5432.

Notes about Docker setup

- The `weatherApp` service mounts the project directory for development convenience. In production you should use a multi-stage Dockerfile and avoid mounting the host directory.
- The Compose file exposes Postgres on port 5432 and Redis on 6379 for local development and pgAdmin on 8888.

## Environment variables

See `.env.example`. Important variables:

- `PORT` - app port (default: 3000)
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` - Postgres connection
- `REDIS_HOST` - Redis host
- `OPENWEATHERMAP_API_KEY` - API key used to fetch weather data from OpenWeatherMap (required for endpoints that fetch external data)

Keep secrets out of source control — add `.env` to your `.gitignore` (already included).

How to get an OpenWeatherMap API key

1. Visit https://openweathermap.org/ and sign up for a free account (or log in if you already have one).
2. From your account dashboard go to the "API keys" section.
3. Create a new API key (give it a name like `weatherapp-local`).
4. Copy the generated key and paste it into your `.env` as:

```env
OPENWEATHERMAP_API_KEY=your_generated_api_key_here
```

The free tier has rate limits — check your account for details.

for production set environment to `production` and for development mode set it to `development`

## Project structure

```plaintext
.
├─ src/
│  ├─ controllers/        # Route handlers (controllers)
│  ├─ database/           # DB + Redis clients
│  ├─ routes/             # Express route definitions
│  ├─ entities/           # TypeORM entities (to be added)
│  ├─ dtos/               # Data Transfer Objects (DTOs)
│  ├─ externalServices/   # External API integrations
│  ├─ middlewares/        # Express middlewares
│  ├─ repositories/       # Data access layer (repositories)
│  ├─ main.ts             # App entry
├─ .env.example           # Example environment variables
├─ Dockerfile
├─ docker-compose.yml
├─ tsconfig.json
├─ package.json
└─ README.md
```

## Notes & next steps

- For production builds, add a proper build step and a multi-stage Dockerfile that copies only `dist/` and `package.json` into the final image.

---

## Sample API requests

Assuming the server runs at http://localhost:3000

- Get all weather records

```bash
curl -s http://localhost:3000/weather | jq
```

- Get weather by id

```bash
curl -s http://localhost:3000/weather/<id> | jq
```

- Fetch and store weather by city (POST)

```bash
curl -s -X POST http://localhost:3000/weather \
	-H "Content-Type: application/json" \
	-d '{"cityName":"London","country":"GB"}' | jq
```

- Update weather (PUT)

```bash
curl -s -X PUT http://localhost:3000/weather/<id> \
	-H "Content-Type: application/json" \
	-d '{"temperature":290.15, "description":"clear sky"}' | jq
```

- Delete weather (DELETE)

```bash
curl -s -X DELETE http://localhost:3000/weather/<id> | jq
```
