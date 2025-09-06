FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# dev stage for local docker-compose
FROM base AS dev
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

# build stage for production
FROM base AS build
ARG VITE_BACKEND_BASE_URL
ARG VITE_GOOGLE_MAPS_API_KEY
ENV VITE_BACKEND_BASE_URL=$VITE_BACKEND_BASE_URL
ENV VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY
COPY . .
RUN npm run build

# nginx stage serving built assets
FROM nginx:alpine AS prod
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist ./
RUN printf 'server { listen 8080; server_name _; root /usr/share/nginx/html; index index.html; try_files $uri /index.html; }' > /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]