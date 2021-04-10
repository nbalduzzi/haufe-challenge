FROM node:12-slim

RUN mkdir /haufe-challenge-api
COPY . /haufe-challenge-api

WORKDIR /haufe-challenge-api

RUN npm install --only-prod
RUN npm run build

CMD ["npm", "start"]
