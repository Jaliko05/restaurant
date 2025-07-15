# 🍽️ Sistema de Gestión de Restaurante

Un sistema completo de gestión para restaurantes desarrollado con React (frontend) y Node.js, Express (backend), utilizando PostgreSQL como base de datos.

## 📋 Tabla de Contenidos

- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Ejecución Local](#ejecución-local)
- [Ejecución con Docker](#ejecución-con-docker)
- [API Endpoints](#api-endpoints)
- [Base de Datos](#base-de-datos)

## 🛠️ Tecnologías Utilizadas

### Backend (Server)

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipado estático
- **Prisma** - ORM para base de datos
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación por tokens
- **bcrypt** - Cifrado de contraseñas
- **cors** - Manejo de CORS
- **dotenv** - Variables de entorno
- **swagger** - Documentación de API

### Frontend (Client)

- **React** - Librería de UI
- **TypeScript** - Tipado estático
- **Vite** - Bundler y dev server
- **React Router** - Enrutamiento
- **Tailwind CSS** - Framework de CSS
- **Axios** - Cliente HTTP

## 📁 Estructura del Proyecto

```
restaurant/
├── client/                    # Frontend (React)
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── pages/           # Páginas principales
│   │   ├── types/           # Tipos de TypeScript
│   │   └── App.tsx          # Componente principal
│   ├── public/              # Archivos estáticos
│   ├── package.json
│   └── vite.config.ts
│
├── server/                   # Backend (Node.js)
│   ├── src/
│   │   ├── controllers/     # Controladores
│   │   ├── services/        # Lógica de negocio
│   │   ├── routes/          # Rutas de API
│   │   ├── middlewares/     # Middlewares
│   │   ├── config/          # Configuración
│   │   ├── types/           # Tipos de TypeScript
│   │   └── server.ts        # Servidor principal
│   ├── prisma/
│   │   ├── schema.prisma    # Schema de base de datos
│   │   └── migrations/      # Migraciones
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml        # Configuración Docker
└── README.md
```

## 📋 Requisitos Previos

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **Git**
- **Docker** y **Docker Compose** (opcional)

## 🐳 Ejecución con Docker Compose

### Prerrequisitos

- Docker
- Docker Compose

### Ejecución

1. **Construir e iniciar todos los servicios**:

   ```bash
   docker-compose up -d --build
   ```

2. **Verificar logs**:

   ```bash
   docker-compose logs -f
   ```

3. **Parar servicios**:

   ```bash
   docker-compose down
   ```

4. **Parar y eliminar volúmenes (opcional)**:
   ```bash
   docker-compose down -v
   ```

### Puertos de Servicio

Una vez ejecutados, los servicios estarán disponibles en los siguientes puertos:

- **Frontend**: http://localhost:4174/login
- **Base de Datos**: localhost:5435
- **API Documentation**: http://localhost:3008/api-docs/

### Comandos Útiles

```bash
# Ver logs de un servicio específico
docker-compose logs -f server
docker-compose logs -f client
docker-compose logs -f postgres

# Reiniciar un servicio específico
docker-compose restart server

# Ejecutar comandos en un contenedor
docker-compose exec server npm run build
docker-compose exec postgres psql -U tkd_desarrollo -d restaurant

# Ver estado de los servicios
docker-compose ps
```

### Configuración de Docker Compose

El archivo `docker-compose.yml` configura tres servicios:

1. **PostgreSQL** (postgres):

   - Imagen: `postgres:15`
   - Puerto: `5435:5432`
   - Base de datos: `restaurant`
   - Usuario: `tkd_desarrollo`
   - Healthcheck incluido

2. **Backend** (server):

   - Construido desde `./server`
   - Puerto: `3008:3000`
   - Dependencias: postgres (con healthcheck)
   - Ejecuta migraciones automáticamente

3. **Frontend** (client):
   - Construido desde `./client`
   - Puerto: `4174:4173`
   - Dependencias: server
   - Configurado para conectarse al backend

### Variables de Entorno en Docker

Las variables de entorno se configuran automáticamente en `docker-compose.yml`:

- `DATABASE_URL`: Conexión a PostgreSQL
- `JWT_SECRET`: Token para autenticación
- `VITE_URL_SERVER`: URL del backend para el frontend

## 🛑️ API Endpoints

para hacer uso de swagger de la api se debe generar el token de autenticación

### Autenticación

- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario

### Usuarios

- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Productos

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener producto por ID
- `POST /api/products` - Crear producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

### Órdenes

- `GET /api/orders` - Obtener todas las órdenes
- `GET /api/orders/:id` - Obtener orden por ID
- `POST /api/orders` - Crear orden
- `PUT /api/orders/:id` - Actualizar orden
- `DELETE /api/orders/:id` - Eliminar orden

## 🗄️ Base de Datos

### Modelos Principales

#### User

- `id`: UUID único
- `name`: Nombre del usuario
- `email`: Email único
- `password`: Contraseña cifrada
- `role`: Rol del usuario (ADMIN, USER)
- `createdAt`: Fecha de creación

#### Product

- `id`: UUID único
- `name`: Nombre del producto
- `price`: Precio del producto
- `category`: Categoría del producto
- `description`: Descripción del producto
- `createdAt`: Fecha de creación

#### Order

- `id`: UUID único
- `userId`: ID del usuario que realiza la orden
- `status`: Estado de la orden (PENDING, COMPLETED, CANCELLED)
- `total`: Total de la orden
- `createdAt`: Fecha de creación

#### ProductOrder

- `id`: UUID único
- `orderId`: ID de la orden
- `productId`: ID del producto
- `quantity`: Cantidad del producto
- `price`: Precio unitario

## 🐳 Despliegue

El aplicativo se encuentra desplegado con un Workflow a un vps las urls son las siguiente

- **Frontend**: http://http://46.202.88.11/:4174/login
- **API Documentation**: http://http://46.202.88.11/:3008/api-docs/
