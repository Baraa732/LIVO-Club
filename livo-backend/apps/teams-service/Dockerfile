FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json package-lock.json tsconfig.json ./
COPY libs ./libs
RUN npm ci --ignore-scripts
RUN ./node_modules/.bin/tsc -p libs/common/tsconfig.json
COPY apps/teams-service ./apps/teams-service
RUN ./node_modules/.bin/tsc -p apps/teams-service/tsconfig.app.json

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/libs/common/dist ./libs/common/dist
COPY --from=builder /app/libs/common/package.json ./libs/common/package.json
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/apps/teams-service/apps/teams-service/src/main.js"]
