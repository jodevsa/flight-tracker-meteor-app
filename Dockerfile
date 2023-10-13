FROM node:14

ENV METEOR_ALLOW_SUPERUSER=true


RUN curl "https://install.meteor.com/" | sh

WORKDIR /app
copy . /app

RUN npm install

RUN ls ./node_modules

EXPOSE 3069

CMD ["npm", "start"]


