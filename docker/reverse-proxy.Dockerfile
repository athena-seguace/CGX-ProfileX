FROM nginx:alpine

# Copy the nginx configuration based on environment
ARG REVERSE_PROXY_ENV=dev
COPY docker/reverse-proxy-nginx.$REVERSE_PROXY_ENV.conf /etc/nginx/nginx.conf

# Start reverse proxy
EXPOSE 80 443
CMD [ "nginx", "-g", "daemon off;" ]
