# Dockerfile cho backend PHP
FROM php:7.4-apache

# Cài đặt các extensions cần thiết cho PHP
RUN docker-php-ext-install pdo pdo_mysql

# Copy mã nguồn vào container
COPY . /var/www/html/

# Chỉnh sửa quyền sở hữu để Apache có quyền truy cập vào các file
RUN chown -R www-data:www-data /var/www/html

# Mở port 80 cho container
EXPOSE 80

# Chạy Apache
CMD ["apache2-foreground"]
