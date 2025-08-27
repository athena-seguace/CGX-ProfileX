FROM node:20-alpine
WORKDIR /server

# Install dependencies
RUN apk add --no-cache ca-certificates && update-ca-certificates

COPY server/package*.json ./
RUN npm install

# Build the server
COPY server/ ./
RUN npm run compile

# Run the server
EXPOSE 5500
CMD ["npm", "start"]
