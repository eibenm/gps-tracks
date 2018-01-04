FROM php:7.1-apache

# copying ini file to image
COPY php.ini /usr/local/etc/php/

# installing apt-utils
RUN apt-get update && apt-get install -y --no-install-recommends apt-utils

# Setting local ini location and installing xdebug
RUN pear config-set php_ini /usr/local/etc/php/php.ini \
  && pecl install xdebug

# apache conf
# COPY 000-default.conf /etc/apache2/sites-available/000-default.conf




# apt-get install software-properties-common python-software-properties
# add-apt-repository ppa:ondrej/php
# apt-get update
# apt-get install php7.1-pgsql

