FROM node:latest as builder

WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build

FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/build ./
EXPOSE 8080
CMD ["node", "index.js"]
