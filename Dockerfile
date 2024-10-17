FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

#CMD ["npm", "run", "start"]

# For deployment:
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
