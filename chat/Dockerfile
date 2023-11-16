FROM node:16.14.2

WORKDIR /usr/src/app

COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["node", "src/index.js"]