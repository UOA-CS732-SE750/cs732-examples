# Stage 1: Build
FROM node:23-slim AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application files
COPY . .

# Stage 2: Run
FROM node:23-slim

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]