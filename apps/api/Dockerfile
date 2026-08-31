FROM node:24-alpine AS builder

RUN corepack enable

WORKDIR /builder

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared-schemas/package.json ./packages/shared-schemas/

RUN pnpm install --frozen-lockfile

COPY apps/api ./apps/api
COPY packages/shared-schemas ./packages/shared-schemas

RUN pnpm shared:build
RUN pnpm --filter api exec prisma generate
RUN pnpm api:build
RUN pnpm --filter api deploy --prod /production/api

FROM node:24-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder --chown=node:node /production/api ./

USER node

EXPOSE 3001

CMD ["node", "dist/src/main.js"]
