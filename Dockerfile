# Use an official Node.js runtime as a parent image
FROM node:16-alpine as development

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

### Stage 2: Production Stage ###
FROM node:16-alpine as production

# Set environment to production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install only development packages
RUN npm install --omit=dev
# RUN npm install --only=production

# Copy the built app from the development stage to the production stage
COPY --from=development /app/dist ./dist
COPY --from=development /app/prisma ./prisma

# Generate prisma client
RUN npx prisma generate

EXPOSE 8080

# Set the command to run the app
CMD ["node", "dist/server.js", "8080"]
