FROM node:20-alpine

WORKDIR /usr/app

COPY package* .

RUN npm install 

COPY . . 

EXPOSE 3000

CMD ["yarn", "dev"]