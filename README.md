# 🍽️ Sistema de Gestión de Restaurante

Un sistema completo de gestión para restaurantes desarrollado con React (frontend) y Node.js (backend), utilizando PostgreSQL como base de datos.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Ejecución Local](#ejecución-local)
- [Ejecución con Docker](#ejecución-con-docker)
- [API Endpoints](#api-endpoints)
- [Base de Datos](#base-de-datos)
- [Contribución](#contribución)

## ✨ Características

- 🔐 **Autenticación y Autorización**: Sistema de login con JWT y roles de usuario
- 👤 **Gestión de Usuarios**: Registro, login y administración de usuarios
- 🍕 **Gestión de Productos**: CRUD completo para productos del menú
- 🛒 **Sistema de Órdenes**: Creación y gestión de órdenes de clientes
- 📊 **Dashboard**: Interfaz intuitiva para administración
- 🔒 **Seguridad**: Validación de datos, rate limiting y CORS
- 📱 **Responsive**: Interfaz adaptable a diferentes dispositivos

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
│   │   ├── hooks/           # Custom hooks
│   │   ├── utils/           # Utilidades
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
- **PostgreSQL** (versión 12 o superior)
- **Git**
- **Docker** y **Docker Compose** (opcional)

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd restaurant
```

### 2. Configurar el Backend

```bash
cd server
npm install
```

Crear archivo `.env` en la carpeta `server/`:
```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/restaurant"
JWT_SECRET="tu_jwt_secret_super_secreto"
JWT_EXPIRE="7d"
PORT=3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### 3. Configurar la Base de Datos

```bash
# Ejecutar migraciones
npx prisma migrate dev

# Generar cliente Prisma
npx prisma generate

# (Opcional) Poblar base de datos
npx prisma db seed
```

### 4. Configurar el Frontend

```bash
cd ../client
npm install
```

Crear archivo `.env` en la carpeta `client/`:
```env
VITE_URL_SERVER=http://localhost:3000
```

## 🏃‍♂️ Ejecución Local

### Opción 1: Desarrollo Individual

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Opción 2: Desarrollo con Base de Datos Local

**1. Iniciar PostgreSQL:**
```bash
sudo systemctl start postgresql
```

**2. Crear base de datos:**
```bash
createdb restaurant
```

**3. Ejecutar migraciones:**
```bash
cd server
npx prisma migrate dev
```

**4. Iniciar aplicaciones:**
```bash
# Backend
cd server
npm run dev

# Frontend (en otra terminal)
cd client
npm run dev
```

## 🐳 Ejecución con Docker

### Prerrequisitos
- Docker
- Docker Compose

### Comandos

```bash
# Construir e iniciar todos los servicios
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Parar servicios
docker-compose down

# Parar y eliminar volúmenes
docker-compose down -v
```

### Servicios Docker

Una vez ejecutado, los servicios estarán disponibles en:
- **Frontend**: http://localhost:4174
- **Backend**: http://localhost:3001
- **Base de Datos**: localhost:5432

## 🛣️ API Endpoints

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

## 🔧 Scripts Disponibles

### Backend
```bash
npm run dev          # Ejecutar en modo desarrollo
npm run build        # Construir para producción
npm run start        # Ejecutar versión de producción
npm run migrate      # Ejecutar migraciones
npm run generate     # Generar cliente Prisma
```

### Frontend
```bash
npm run dev          # Ejecutar en modo desarrollo
npm run build        # Construir para producción
npm run preview      # Previsualizar build de producción
npm run lint         # Ejecutar linter
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Notas Importantes

- Asegúrate de que PostgreSQL esté ejecutándose antes de iniciar el backend
- Las migraciones se ejecutan automáticamente en Docker
- El frontend se conecta al backend a través de la variable `VITE_URL_SERVER`
- Para producción, asegúrate de usar variables de entorno seguras

## 🐛 Troubleshooting

### Problemas Comunes

1. **Puerto en uso**: Cambiar puertos en archivos de configuración
2. **Error de conexión a BD**: Verificar credenciales en `.env`
3. **Módulos no encontrados**: Ejecutar `npm install` en ambas carpetas
4. **Error de tipos**: Ejecutar `npx prisma generate`

### Logs Útiles

```bash
# Ver logs del servidor
docker-compose logs server

# Ver logs de la base de datos
docker-compose logs postgres

# Ver logs del cliente
docker-compose logs client
```

---

¡Disfruta desarrollando con el Sistema de Gestión de Restaurante! 🍽️
