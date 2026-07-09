FROM node:24-alpine AS base

FROM base AS builder

RUN corepack enable

WORKDIR /builder

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/web/package.json ./apps/web/

COPY packages/shared-schemas/package.json ./packages/shared-schemas/

RUN pnpm install --frozen-lockfile

COPY packages/shared-schemas/ ./packages/shared-schemas

COPY apps/web/ ./apps/web

RUN pnpm --filter web... run build

FROM base AS runner

WORKDIR /runner

COPY --from=builder /builder/apps/web/.next/standalone/ ./
COPY --from=builder /builder/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /builder/apps/web/public ./apps/web/public

WORKDIR /runner/apps/web

EXPOSE 3000

CMD [ "node", "server.js" ]




