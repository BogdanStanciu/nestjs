FROM node:14.13.1 AS builder
WORKDIR /app
COPY ./package.json ./package-lock.json ./src ./
RUN npm install

RUN npm run build

FROM node:14.13.1-alpine3.12
WORKDIR /app
COPY --from=builder /app ./
COPY ./docker-entrypoint.sh ./start.sh
CMD ["sh", "./start.sh"]