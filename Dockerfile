FROM httpd:2.4-alpine

RUN apk add \
    bash \
    curl \
    openssl \
    php \
    php-openssl \
    php-json \
    php-mbstring \
    php-phar

RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer

RUN rm -f /var/cache/apk/*

COPY ./src/* /usr/local/apache2/htdocs/

EXPOSE 80
