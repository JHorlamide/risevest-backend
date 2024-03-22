# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Generate prisma client
RUN npx prisma generate

# Build the TypeScript code
RUN npm run build

EXPOSE 8080

# Set the command to run the app
CMD ["npm", "start"]

### Stage 1: Development Stage ###
# FROM node:16-alpine as development
# WORKDIR /app
# COPY package*.json .
# COPY prisma ./prisma/
# RUN npm install
# COPY . .
# RUN npx prisma generate
# RUN npm run build

# ### Stage 2: Production Stage ###
# FROM node:16-alpine as production
# ARG NODE_ENV=production
# ARG DATABASE_URL
# ARG PORT=8080

# ENV NODE_ENV=${NODE_ENV}
# ENV DATABASE_URL=${DATABASE_URL}
# ENV PORT=${PORT}

# WORKDIR /app
# COPY package*.json .
# RUN npm install --omit=dev
# COPY --from=development /app/dist ./dist
# COPY --from=development /app/prisma ./prisma
# RUN npx prisma migrate dev --name init
# EXPOSE 8080
# CMD [ "npm", "start" ]
