FROM node:12.0.0 AS compile-image
COPY .npmrc package.json ./
RUN npm install
COPY . ./ RUN ng build --prod

FROM nginx
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /opt/ng/dist /usr/share/nginx/html