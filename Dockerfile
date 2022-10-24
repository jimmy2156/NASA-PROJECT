FROM node:lts-alpine
WORKDIR /app
COPY package.json ./

COPY nasa-front-end/package.json nasa-front-end/
RUN npm run start --prefix nasa-front-end --omit=dev

COPY server/package*.json server/
RUN npm run start --prefix server --omit=dev

USER node
CMD ["npm", "start", "--prefix", "server"]
EXPOSE 8000