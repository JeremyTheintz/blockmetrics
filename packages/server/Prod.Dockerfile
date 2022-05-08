FROM node:16.9.1-alpine

WORKDIR /app

COPY . .

RUN ls

RUN npm install

EXPOSE $PORT

CMD ["npm", "run", "start"]