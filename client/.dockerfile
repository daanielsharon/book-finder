FROM node:18.16.0-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build


FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=builder /app/dist .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]