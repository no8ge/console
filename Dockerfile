FROM node:17.9.1-slim

WORKDIR /app

COPY . /app

RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn install && yarn build



FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf


EXPOSE 80