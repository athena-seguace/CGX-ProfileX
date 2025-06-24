FROM node:18 as build

WORKDIR /app

COPY client/package*.json ./
RUN npm install
COPY client .
ARG VITE_SERVER_API_BASE_URL
RUN if [ -z "$VITE_SERVER_API_BASE_URL" ]; then echo "FATAL ERROR: VITE_SERVER_API_BASE_URL build arg not set" && exit 1; fi
ENV VITE_SERVER_API_BASE_URL=${VITE_SERVER_API_BASE_URL}
RUN npm run build

FROM nginx:alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

