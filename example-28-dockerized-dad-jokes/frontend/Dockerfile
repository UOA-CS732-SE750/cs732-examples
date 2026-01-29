# Stage 1: Build the project
FROM node:23-slim AS builder

# Set working directory
WORKDIR /app

# Copy root workspace files
COPY package*.json ./

# Copy frontend workspace package.json
COPY frontend/package*.json ./frontend/

# Install dependencies for frontend workspace only
RUN npm ci --workspace=frontend --include-workspace-root

# Copy the frontend application code
COPY frontend ./frontend

# Set working directory to frontend
WORKDIR /app/frontend

# Accept build argument and allow it to be used as an environment variable
ARG VITE_API_BASE_URL

# Set the environment variable for the build process
# ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build the project
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy built files from the first stage
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]