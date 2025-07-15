FROM node:22.6.0-bullseye-slim AS builder

WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:22.6.0-bullseye-slim AS production

WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]
