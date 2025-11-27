FROM node:18
WORKDIR /app
RUN npm install -g nodemon
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["nodemon", "index.js"]