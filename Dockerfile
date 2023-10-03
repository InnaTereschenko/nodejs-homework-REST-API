FROM node

EXPOSE 5000

WORKDIR /app

COPY . .

RUN npm install

CMD ["node", "app.js"]