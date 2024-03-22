### Stage 1: Development Stage ###
FROM node:16-alpine as development
WORKDIR /app
COPY package*.json .
COPY prisma ./prisma/
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

### Stage 2: Production Stage ###
FROM node:16-alpine as production
ARG NODE_ENV=production
ARG DATABASE_URL
ARG PORT=8080

ENV NODE_ENV=${NODE_ENV}
ENV DATABASE_URL=${DATABASE_URL}
ENV PORT=${PORT}

WORKDIR /app
COPY package*.json .
RUN npm install --omit=dev
COPY --from=development /app/dist ./dist
COPY --from=development /app/prisma ./prisma
RUN npx prisma migrate dev --name init
EXPOSE 8080
CMD [ "npm", "start" ]