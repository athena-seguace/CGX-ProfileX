## Building stage
FROM node:20-alpine as builder
WORKDIR /client

# Install dependencies
COPY client/package*.json ./
RUN npm install

# Set env variables for build stage
ARG VITE_SERVER_API_BASE_URL
ENV VITE_SERVER_API_BASE_URL=$VITE_SERVER_API_BASE_URL

# Build the static files
COPY client/ ./
RUN npm run build


## Serving stage
FROM nginx:alpine

# Copy the nginx configuration
COPY docker/client-nginx.conf /etc/nginx/nginx.conf

# Copy the static files
COPY --from=builder /client/dist /usr/share/nginx/html

# Serve the files
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
