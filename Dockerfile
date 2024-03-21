FROM postgres:latest as database
ENV POSTGRES_USER=olamide
ENV POSTGRES_PASSWORD=admin

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
ENV NODE_ENV=${NODE_ENV}
ENV DATABASE_URL=postgres://olamide:admin@database:5432/risevest_db

WORKDIR /app
COPY package*.json .
RUN npm install --omit=dev
COPY --from=development /app/dist ./dist
COPY --from=development /app/prisma ./prisma
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
EXPOSE 8080
ENTRYPOINT [ "./entrypoint.sh" ]


# # Use an official Node.js runtime as a parent image
# FROM node:16-alpine

# # Set the working directory to /app
# WORKDIR /app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code to the working directory
# COPY . .

# # Generate prisma client
# RUN npx prisma generate

# # Build the TypeScript code
# RUN npm run build

# EXPOSE 8080

# # Set the command to run the app
# CMD ["npm", "start"]