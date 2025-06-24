FROM node:18

WORKDIR /app

COPY server/package*.json ./
RUN npm install

COPY server .

RUN npm run compile

ENV NODE_ENV=production

EXPOSE 5500

CMD ["node", "dist/index.js"]
