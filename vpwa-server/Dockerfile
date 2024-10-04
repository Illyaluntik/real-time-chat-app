FROM node:16

WORKDIR /usr/src/app/vpwa-server

COPY . .

RUN npm install

RUN chmod -R 777 ./node_modules

EXPOSE 3000

CMD ["npm", "run", "dev"]
