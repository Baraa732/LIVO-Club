FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json package-lock.json tsconfig.json ./
COPY libs ./libs
# Install all deps first (so tsc is available in node_modules/.bin)
RUN npm ci --ignore-scripts
# Compile @livo/common into libs/common/dist
RUN ./node_modules/.bin/tsc -p libs/common/tsconfig.json
COPY apps/api-gateway ./apps/api-gateway
RUN ./node_modules/.bin/tsc -p apps/api-gateway/tsconfig.app.json

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/libs/common/dist ./libs/common/dist
COPY --from=builder /app/libs/common/package.json ./libs/common/package.json
COPY --from=builder /app/dist ./dist
EXPOSE 4000
CMD ["node", "dist/apps/api-gateway/apps/api-gateway/src/main.js"]
