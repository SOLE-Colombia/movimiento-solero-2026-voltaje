# Dockerfile para SOLE Voltaje - Quartz v4
# Build multi-stage para optimizar tamaño de imagen

# Stage 1: Dependencias
FROM node:20-alpine AS deps
WORKDIR /app
COPY quartz/package*.json ./
RUN npm ci --only=production

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY quartz/ .
RUN npx quartz build

# Stage 3: Servidor de producción
FROM nginx:alpine
COPY --from=builder /app/public /usr/share/nginx/html

# Configuración de nginx
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    # Compresión gzip \
    gzip on; \
    gzip_vary on; \
    gzip_min_length 256; \
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript; \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



