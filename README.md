# 🔄 Siklo

> A management tool for your **paluwagan** — a Filipino community-based savings and rotation system.

Siklo is a full-stack monorepo application that helps organizers and members manage paluwagan groups, track billing cycles, handle payouts, and coordinate memberships.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
- [Available Scripts](#-available-scripts)
- [Docker](#-docker)
- [Database](#-database)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **Group management** — organizers create paluwagan groups with configurable billing cycles (daily, weekly, biweekly, monthly, quarterly)
- **Membership handling** — members join groups, with position tracking for payout order
- **Payout rounds** — automatic round generation with `RANDOM`, `MANUAL`, or `FREECHOOSING` payout sequencing, and per-round status tracking (`PENDING` / `PAID`)
- **Real-time synchronization** — instant updates on the frontend for group activities and schedules powered by WebSockets (Socket.io)
- **Activity tracking** — automated feed logs for major actions (`PAYMENT`, `PENALTY_APPLIED`, `CYCLE_STARTED`, `ROTATED`, etc.) displayed dynamically in the UI
- **Authentication** — secure signup/signin with JWT access + refresh token pairs, hashed passwords (bcrypt)
- **Shared validation** — a single set of Zod schemas used by both frontend and backend, so client and server can never drift out of sync
- **Modern stack** — Next.js App Router + React Server Components on the frontend, NestJS + Prisma on the backend

<!-- Add 2–3 screenshots here once available, e.g.:
![Dashboard](docs/screenshots/dashboard.png)
![Group creation](docs/screenshots/create-group.png)
-->

---

## 🛠 Tech Stack

**Monorepo:** pnpm workspaces, Node.js ≥22.13, TypeScript 5.x

**Frontend (`apps/web`):** Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui, React Hook Form + Zod, TanStack Query, Axios, Socket.io-client

**Backend (`apps/api`):** NestJS 11, Prisma 7 (with `@prisma/adapter-pg`), PostgreSQL, Passport JWT, bcrypt, Jest + Supertest, Socket.io (WebSocket gateway)

**Shared:** `@siklo/shared-schemas` — Zod v4 validation schemas shared across both apps

<details>
<summary>Full dependency list with exact versions</summary>

See each workspace's `package.json` for the authoritative list:

- Root: [`package.json`](./package.json)
- Web: [`apps/web/package.json`](./apps/web/package.json)
- API: [`apps/api/package.json`](./apps/api/package.json)
- Shared schemas: [`packages/shared-schemas/package.json`](./packages/shared-schemas/package.json)

</details>

---

## 📁 Project Structure

```
Siklo/
├── apps/
│   ├── web/                        # Next.js 16 frontend
│   │   ├── src/
│   │   │   ├── app/                # App Router pages & layouts
│   │   │   │   ├── (protected)/    # Auth-guarded routes (dashboard, group, settings)
│   │   │   │   ├── signin/ signup/ about/ features/ help/ how-it-works/ policy/
│   │   │   ├── features/           # Feature modules (auth, dashboard, groups, etc.)
│   │   │   │   ├── groups/
│   │   │   │   │   ├── api/ hooks/ types/ utils/ constants/ components/
│   │   │   └── shared/             # Shared components, lib, providers, utils
│   │   └── Dockerfile
│   │
│   └── api/                        # NestJS backend
│       ├── src/
│       │   ├── modules/            # auth, users, groups, round, token, settings, activity, websocket
│       │   ├── commons/            # Shared guards, pipes, decorators
│       │   ├── configs/
│       │   └── database/           # Prisma service & module
│       ├── prisma/                 # schema.prisma + migrations
│       └── test/                   # E2E tests
│
├── packages/
│   └── shared-schemas/             # Shared Zod schemas (auth, groups, enums)
│
├── docker-compose.yaml
├── pnpm-workspace.yaml
└── AGENTS.md                       # Rules for AI coding agents working in this repo
```

---

## ✅ Prerequisites

| Prerequisite   | Minimum Version | Installation                                                     |
| -------------- | --------------- | ---------------------------------------------------------------- |
| **Node.js**    | `22.13+`        | [nodejs.org](https://nodejs.org/) or `nvm`                       |
| **pnpm**       | `11.5.1`        | `corepack enable` (recommended)                                  |
| **PostgreSQL** | `15+`           | [postgresql.org](https://www.postgresql.org/download/) or Docker |
| **Docker**     | _optional_      | [docker.com](https://www.docker.com/get-started/)                |
| **Git**        | latest          | [git-scm.com](https://git-scm.com/)                              |

---

## 🚀 Installation & Setup

```bash
# 1. Clone
git clone https://github.com/your-username/Siklo.git
cd Siklo

# 2. Enable corepack (uses the pnpm version pinned in package.json)
corepack enable

# 3. Install dependencies for all workspaces
pnpm install

# 4. Build the shared schemas package (required before running either app)
pnpm shared:build
```

### Database setup

```bash
# Create the database
createdb siklo

# Configure apps/api/.env (see Environment Variables below), then:
pnpm --filter api exec prisma generate
pnpm --filter api exec prisma migrate dev
```

---

## 🔐 Environment Variables

### `apps/api/.env`

| Variable            | Description                       | Example                                               |
| ------------------- | --------------------------------- | ----------------------------------------------------- |
| `DATABASE_URL`      | PostgreSQL connection string      | `postgresql://postgres:password@localhost:5432/siklo` |
| `JWT_ACCESS_TOKEN`  | Secret for signing access tokens  | generate with `openssl rand -hex 32`                  |
| `JWT_REFRESH_TOKEN` | Secret for signing refresh tokens | generate with `openssl rand -hex 32`                  |

> ⚠️ Never commit `.env` or real secrets to version control. `.gitignore` already excludes it — keep it that way.

### `apps/web`

No `.env` required for local dev by default; the web app calls the API at `http://localhost:3001` (see `src/shared/lib/axios.ts`).

---

## ▶️ Running the Project

Open two terminals from the project root:

```bash
# Terminal 1 — API (http://localhost:3001)
pnpm api:dev

# Terminal 2 — Web (http://localhost:3000)
pnpm web:dev
```

---

## 📜 Available Scripts

| Script              | Description                        |
| ------------------- | ---------------------------------- |
| `pnpm web:dev`      | Start web in development mode      |
| `pnpm web:build`    | Build web for production           |
| `pnpm web:lint`     | Lint the web app                   |
| `pnpm api:dev`      | Start API in dev mode (hot reload) |
| `pnpm api:build`    | Build the API for production       |
| `pnpm api:lint`     | Lint and auto-fix the API          |
| `pnpm shared:build` | Build the shared-schemas package   |

<details>
<summary>API-specific scripts (run inside <code>apps/api</code>)</summary>

| Script             | Description                       |
| ------------------ | --------------------------------- |
| `pnpm start:dev`   | Start with file watching          |
| `pnpm start:debug` | Start in debug mode with watching |
| `pnpm test`        | Run unit tests (Jest)             |
| `pnpm test:watch`  | Run tests in watch mode           |
| `pnpm test:cov`    | Run tests with coverage           |
| `pnpm test:e2e`    | Run end-to-end tests              |
| `pnpm format`      | Format with Prettier              |

</details>

---

## 🐳 Docker

```bash
# Build & run the web app via Docker Compose
docker-compose up --build

# Or build/run manually
docker build -f apps/web/Dockerfile -t siklo-web .
docker run -p 3000:3000 siklo-web
```

The Dockerfile uses a multi-stage build (`node:24-alpine`): a builder stage that installs deps and builds `shared-schemas` + `web`, and a runner stage that serves the Next.js standalone output.

---

## 🗄 Database

**Models:** `User`, `Group`, `Membership`, `Round`, `Activity`

**Enums:** `BillingCycle` (`DAILY`, `WEEKLY`, `BIMONTHLY`, `MONTHLY`, `QUARTERLY`) · `RoundStatus` (`PENDING`, `PAID`) · `PayoutSequence` (`RANDOM`, `MANUAL`, `FREECHOOSING`) · `ActivityType` (`PAYMENT`, `PAYMENT_OVERDUE`, `PAYMENT_VERIFIED`, `PAYOUT_DISBURSED`, `PENALTY_APPLIED`, `CYCLE_STARTED`, `CYCLE_CLOSED`, `ROTATED`)

```bash
# Generate Prisma client after schema changes
pnpm --filter api exec prisma generate

# Create & apply a migration
pnpm --filter api exec prisma migrate dev --name your_migration_name

# Apply migrations in production
pnpm --filter api exec prisma migrate deploy

# Open Prisma Studio
pnpm --filter api exec prisma studio
```

> The Prisma client generates to `apps/api/src/generated/prisma/` (git-ignored) — always run `prisma generate` after cloning or pulling schema changes.

---

## 🧪 Testing

```bash
cd apps/api
pnpm test          # unit tests (Jest)
pnpm test:watch    # watch mode
pnpm test:cov      # with coverage
pnpm test:e2e      # end-to-end (Supertest)
```

---

## 🩹 Troubleshooting

**Prisma v7 "Cannot find module" / ESM import errors**
Prisma v7's generated client uses `.js`-suffixed ESM imports internally. If you hit module resolution errors, confirm `apps/api/tsconfig.json` module settings match the generated client's format, and re-run `pnpm --filter api exec prisma generate` after any Prisma or Node version change.

**Jest can't resolve TypeScript path aliases (`@/...`)**
Jest doesn't read `tsconfig.json` path mappings automatically. Make sure `moduleNameMapper` in the Jest config mirrors the `paths` block in `tsconfig.json` exactly — a common cause of "Cannot find module" errors in tests that pass in dev but fail under Jest.

**`shared-schemas` changes not reflected in web/api**
Run `pnpm shared:build` after any edit to `packages/shared-schemas` — both apps consume the compiled output, not the source directly.

---

## 🤝 Contributing

- See [`AGENTS.md`](./AGENTS.md) for repo conventions if you're an AI coding agent working in this codebase.
- Work on feature branches (`feature/<description>`), never commit directly to `main`.
- Commit messages follow Conventional Commits (`type(scope): summary`).
- Run `pnpm --filter api test` and `pnpm lint` before opening a PR.

---

## 📄 License

ISC
