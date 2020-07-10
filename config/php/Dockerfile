FROM ubuntu:18.04

# Update package
RUN apt-get update \
    && apt-get full-upgrade -y \
    && apt-get autoremove -y \ 
    && apt-get clean all

# Installing apache2
RUN apt-get install apache2 -y

# Enable apache2 rewrite module
RUN a2enmod rewrite

# Suppressing apache 2 warning:
# 
# Could not reliably determine the server's fully qualified domain name, 
# using 172.17.0.2. Set the 'ServerName' directive globally to suppress this message
RUN { \
    echo ''; \
    echo 'ServerName localhost'; \
    echo ''; \
} | tee -a /etc/apache2/apache2.conf

# Install php 7.2
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y \
    php \
    php-pgsql \
    php-curl \
    php-mbstring \
    php-odbc \
    php-pgsql \
    php-xml \
    php-zip \
    php-xdebug

# Make document root /var/www/html/public
# COPY 000-default.conf /etc/apache2/sites-available/

WORKDIR /var/www/html

EXPOSE 80

CMD ["apachectl", "-D", "FOREGROUND"]