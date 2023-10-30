FROM node:20-alpine as build

WORKDIR /usr/src/app

COPY package* .

RUN npm install && npm install yarn

COPY . . 

CMD ["yarn", "dev"]