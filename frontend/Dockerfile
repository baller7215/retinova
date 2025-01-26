FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

# production mode
CMD ["npm", "run", "start"]
