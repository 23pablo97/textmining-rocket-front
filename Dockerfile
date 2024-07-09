# Etapa de construcción
FROM node:20.4.0-alpine AS builder
WORKDIR /temp

# Instalamos las dependencias necesarias para sharp y curl
RUN apk add --no-cache python3 make g++ vips-dev curl

# Configuración de npm
RUN npm config set strict-ssl false
RUN npm config set registry http://registry.npmjs.org/

# Copiamos los archivos del proyecto
COPY . .

# Instalamos las dependencias, incluyendo sharp
RUN npm install
RUN npm install sharp

# Construimos la aplicación
RUN npm run build

# Etapa de servidor
FROM node:20.4.0-alpine AS server
WORKDIR /app

# Instalamos las dependencias de runtime para sharp y curl
RUN apk add --no-cache vips-dev curl

# Copiamos los archivos necesarios desde la etapa de construcción
COPY --from=builder /temp/next.config.mjs ./
COPY --from=builder /temp/public ./public
COPY --from=builder /temp/.next ./.next
COPY --from=builder /temp/node_modules ./node_modules
COPY --from=builder /temp/package.json ./package.json

# Comando para iniciar la aplicación
CMD [ "npm", "run", "start" ]