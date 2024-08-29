# Imagen base de Node.js específica y ligera node:18-alpine
FROM node:18-alpine

# Crear un directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar solo las dependencias de producción
RUN npm ci --only=production && \
    npm cache clean --force

# Copiar el resto de la aplicación al contenedor
COPY . .

# Crear un usuario no root para ejecutar la aplicación
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Exponer el puerto en el que la aplicación escuchará
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]
