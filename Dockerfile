FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

# Only for deployment:
RUN npx prisma migrate deploy

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
