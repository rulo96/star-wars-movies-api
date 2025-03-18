# Backend NestJS - Star Wars API

Este proyecto es una API RESTful desarrollada con NestJS que utiliza la [API pública de Star Wars](https://swapi.dev/) para gestionar películas. La aplicación incluye autenticación JWT, roles de usuario, y endpoints protegidos según el rol.

## Características Principales

- 🔒 Sistema de autenticación y autorización con JWT
- 👤 Gestión de usuarios (registro e inicio de sesión)
- 🎬 Gestión de películas (CRUD completo)
- 🔄 Sincronización automática con la API de Star Wars mediante un cron job
- 📝 Documentación completa con Swagger
- ✅ Pruebas unitarias
- 🐳 Configuración Docker lista para despliegue

## Requisitos Previos

- Node.js (v14 o superior)
- MySQL
- npm o yarn

## Instalación y Configuración

### Método 1: Instalación Local

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/star-wars-movies-api.git
   cd star-wars-movies-api
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Copiar el archivo de ejemplo de variables de entorno:

   ```bash
   cp .env.example .env
   ```

4. Editar el archivo `.env` con tus propias configuraciones:

   ```
   PORT=3000
   NODE_ENV=development
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   DATABASE_USER=root
   DATABASE_PASSWORD=root
   DATABASE_NAME=star_wars_db
   JWT_SECRET=mySuperSecretKey
   JWT_EXPIRES_IN=24h
   ```

5. Ejecutar la aplicación:

   ```bash
   # Modo desarrollo
   npm run start:dev

   # Modo producción
   npm run build
   npm run start:prod
   ```

### Método 2: Usando Docker

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/star-wars-movies-api.git
   cd star-wars-movies-api
   ```

2. Iniciar con Docker Compose:
   ```bash
   docker-compose up -d
   ```

## Estructura de la API

### Autenticación

- **POST /api/auth/register**: Registrar un nuevo usuario
- **POST /api/auth/login**: Iniciar sesión y obtener token JWT

### Películas

- **GET /api/movies**: Obtener todas las películas (público)
- **GET /api/movies/:id**: Obtener detalles de una película (requiere rol USER o ADMIN)
- **POST /api/movies**: Crear una nueva película (requiere rol ADMIN)
- **PATCH /api/movies/:id**: Actualizar una película existente (requiere rol ADMIN)
- **DELETE /api/movies/:id**: Eliminar una película (requiere rol ADMIN)
- **POST /api/movies/sync**: Sincronizar películas desde SWAPI (requiere rol ADMIN)

## Documentación

La documentación completa de la API está disponible a través de Swagger en:

```
http://localhost:3000/api/docs
```

## Pruebas

Para ejecutar las pruebas unitarias:

```bash
# Pruebas unitarias
npm run test

# Pruebas con cobertura
npm run test:cov
```

## Despliegue

El proyecto puede ser fácilmente desplegado en plataformas como:

- Railway.app
- Heroku
- Render
- DigitalOcean App Platform

## Tecnologías Utilizadas

- NestJS
- TypeORM
- MySQL
- JWT
- Swagger
- Jest
- Docker

## Contribución

Las contribuciones son bienvenidas. Por favor, crea un issue o envía un pull request para proponer cambios o mejoras.

## Licencia

Este proyecto está bajo la Licencia MIT.
