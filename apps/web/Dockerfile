FROM node:24-alpine AS base

FROM base AS builder

ARG NEXT_PUBLIC_API_URL
ARG BUILD_STANDALONE=true

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV BUILD_STANDALONE=$BUILD_STANDALONE

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

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

WORKDIR /runner

COPY --from=builder --chown=node:node /builder/apps/web/.next/standalone/ ./
COPY --from=builder --chown=node:node /builder/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=node:node /builder/apps/web/public ./apps/web/public

WORKDIR /runner/apps/web

USER node

EXPOSE 3000

CMD ["node", "server.js"]
