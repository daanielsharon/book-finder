FROM node:18.16.0-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build

FROM node:18.16.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/build ./
EXPOSE 8080
CMD ["node", "index.js"]
