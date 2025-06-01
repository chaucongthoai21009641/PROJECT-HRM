# Sử dụng Node.js làm base image cho việc build
FROM node:22 AS build

# Đặt thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy mã nguồn frontend vào container
COPY . .

# Build ứng dụng React
RUN npm run build

# Cấu hình Nginx để phục vụ ứng dụng React
FROM nginx:alpine

# Copy build folder từ container build vào thư mục Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Mở cổng 80 cho frontend
EXPOSE 80

# Khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]
