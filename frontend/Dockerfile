# Stage 1: Build Angular app
FROM node:lts-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build  # or ng build if globally installed

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
