FROM node:20-alpine as build

WORKDIR /usr/src/app

COPY package* .

RUN npm install && npm install yarn

COPY . . 

RUN yarn run build

FROM node:20-alpine

COPY --from=build /usr/src/app/.next /usr/src/app/.next

WORKDIR /usr/src/app

CMD ["yarn", "start"]