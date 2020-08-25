FROM node:12

WORKDIR /usr/src/bgs

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 3000
CMD [ "nodemon", "index.js" ]
