# Sử dụng Node.js 18 Alpine làm base image cho development
FROM node:18-alpine AS development

# Thiết lập working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Cài đặt dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Expose port
EXPOSE 3001

# Command để chạy development
CMD ["yarn", "dev"]

# Production stage
FROM node:18-alpine AS production

# Cài đặt dumb-init để xử lý signals đúng cách
RUN apk add --no-cache dumb-init

# Tạo user non-root để chạy ứng dụng
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Thiết lập working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Cài đặt dependencies chỉ cho production
RUN yarn install --frozen-lockfile --production && yarn cache clean

# Copy source code
COPY . .

# Tạo thư mục cache nếu chưa có
RUN mkdir -p cache/assets cache/media && chown -R nodejs:nodejs cache

# Chuyển ownership cho user nodejs
RUN chown -R nodejs:nodejs /app

# Chuyển sang user nodejs
USER nodejs

# Expose port
EXPOSE 3001

# Sử dụng dumb-init để xử lý signals
ENTRYPOINT ["dumb-init", "--"]

# Command để chạy production
CMD ["yarn", "start"] 