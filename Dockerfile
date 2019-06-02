FROM node:10

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app/

RUN npm install -g concurrently nodemon

RUN npm install

EXPOSE 4000
EXPOSE 3000

CMD npm run dev