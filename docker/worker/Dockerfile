FROM node:24.13-alpine3.23 AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json turbo.json ./
COPY packages/config-eslint/package.json ./packages/config-eslint/
COPY packages/config-typescript/package.json ./packages/config-typescript/
COPY packages/store-sql/package.json ./packages/store-sql/
COPY packages/yt-server/package.json ./packages/yt-server/
RUN npm ci

FROM deps AS builder
WORKDIR /app
COPY . .
ENV YTOBS_STORE_PG=" "
RUN npm run build -w @yt-obs/store-sql
RUN npx -w @yt-obs/yt-server nest build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache python3 py3-pip ffmpeg
RUN python3 -m pip install --no-cache-dir --break-system-packages yt-dlp yt-dlp-ejs
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/store-sql/dist ./packages/store-sql/dist
COPY --from=builder /app/packages/store-sql/package.json ./packages/store-sql/
COPY --from=builder /app/packages/yt-server/dist ./packages/yt-server/dist
COPY --from=builder /app/packages/yt-server/package.json ./packages/yt-server/
COPY --from=builder /app/package.json ./

CMD ["node", "packages/yt-server/dist/worker" ]
