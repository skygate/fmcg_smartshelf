FROM node:12.14-alpine

WORKDIR /code

COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "start"]
