FROM node:12.14-alpine

WORKDIR /code

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn start
