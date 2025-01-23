FROM node:23-alpine

WORKDIR /app

COPY package*.json /
RUN npm install
COPY . .

RUN npm run build

CMD ["node", "--env-file=.env", "build"]