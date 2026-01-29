# Stage 1: Build
FROM node:23-slim AS builder

WORKDIR /app

# Copy root workspace files
COPY package*.json ./

# Copy backend workspace package.json
COPY backend/package*.json ./backend/

# Install dependencies for backend workspace only
RUN npm ci --workspace=backend --include-workspace-root

# Copy backend application files
COPY backend ./backend

# Set working directory to backend
WORKDIR /app/backend

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]