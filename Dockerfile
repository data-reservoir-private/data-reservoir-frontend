# Image dari mana
FROM node:lts-alpine AS deps

# 1. Install deps dulu biar nga mabuk
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /temp-deps
COPY pnpm-lock.yaml package.json ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# 2. Build aplikasi. Kita perlu folder .next nya doang
FROM node:lts-alpine AS builder
WORKDIR /temp-build
COPY --from=deps /temp-deps/node_modules ./node_modules
COPY . .

# ENV HERE

RUN corepack enable pnpm && pnpm run build

# 3. Buat image yang paling final
FROM node:lts-alpine AS final
WORKDIR /app

# ENV HERE

COPY --from=builder /temp-build/.next/standalone ./.next
COPY --from=builder /temp-build/.next/static ./.next

CMD ["pnpm", "run", "start"]

