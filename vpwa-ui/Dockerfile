FROM node:16

WORKDIR /usr/src/app/vpwa-ui

COPY . .

RUN npm install

RUN chmod -R 777 ./node_modules

EXPOSE 8080

CMD ["npm", "run", "dev"]
