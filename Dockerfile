FROM node:15

ENV PORT=8080

WORKDIR /usr/app

COPY . .

RUN yarn
RUN yarn build

EXPOSE 8080

CMD [ "yarn", "serve" ]