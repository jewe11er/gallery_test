FROM node:16-alpine as build

RUN npm install -g pnpm

WORKDIR /app

COPY ./package.json .
COPY ./pnpm-lock.yaml .
RUN pnpm i

COPY . .
RUN pnpm build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
