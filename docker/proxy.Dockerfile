FROM nginx:1.16-alpine
COPY proxy.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
