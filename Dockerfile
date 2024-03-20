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

# Install PostgreSQL client
RUN apk --no-cache add postgresql-client

# Install Prisma globally
RUN npm install -g prisma

# Generate Prisma client
RUN npx prisma generate

# Run Prisma migration
RUN npx prisma migrate dev --name init

# Build the TypeScript code
RUN npm run build

EXPOSE 8080

# Set the command to run the app
CMD ["npm", "start"]
