FROM nginx:alpine

# Copy the nginx configuration
COPY docker/reverse-proxy-nginx.conf /etc/nginx/nginx.conf

# Start reverse proxy
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
