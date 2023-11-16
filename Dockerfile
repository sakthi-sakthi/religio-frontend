FROM node:16.3.0-alpine

WORKDIR /app/frontend

COPY . .

RUN npm install

RUN npm run build

#RUN npm start
EXPOSE 3000
CMD ["npm", "start"]
