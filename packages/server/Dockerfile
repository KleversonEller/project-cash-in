FROM node:16

WORKDIR /app-server

COPY package.json .

RUN npm install

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "dev"]
