### STAGE 1: Build ###
FROM node:12-alpine as build
WORKDIR /app
ARG BACKEND_API
ENV BACKEND_API=$BACKEND_API
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci --quiet
COPY . /app
RUN npm run build
RUN npm run generate

### STAGE 2: NGINX ###
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
