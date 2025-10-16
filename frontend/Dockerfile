# Etap 1: Budowanie aplikacji
FROM node:18-alpine as build

WORKDIR /app

# Kopiowanie plików zależności
COPY package*.json ./

# Instalacja zależności
RUN npm install

# Kopiowanie kodu źródłowego
COPY . .

# Zmienne środowiskowe
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Budowanie aplikacji
RUN npm run build

# Etap 2: Serwowanie aplikacji
FROM nginx:alpine

# Kopiowanie zbudowanej aplikacji
COPY --from=build /app/build /usr/share/nginx/html

# Kopiowanie konfiguracji nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Eksponowanie portu
EXPOSE 80

# Uruchomienie nginx
CMD ["nginx", "-g", "daemon off;"]
