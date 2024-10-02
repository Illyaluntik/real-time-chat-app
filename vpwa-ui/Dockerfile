FROM node:16

WORKDIR /usr/src/app/vpwa-ui

COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]
