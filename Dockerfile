FROM node:20

WORKDIR /usr/app

COPY package* .

RUN npm install 

COPY . . 

EXPOSE 3000

CMD ["yarn", "dev"]