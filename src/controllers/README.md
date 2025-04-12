# API de Gestión de Tareas con Node.js y Express

Una API REST para gestión de tareas personales construida con Node.js, Express y MongoDB. Desarrollada por Álvaro Ley.

## Características

- Autenticación de usuarios mediante JWT
- CRUD completo de tareas
- Filtrado de tareas por estado (completadas/pendientes)
- Validación de datos
- Manejo centralizado de errores

## Requisitos previos

- Node.js (v14 o superior)
- MongoDB (local o en la nube)

## Estructura del proyecto

    task-manager-api/
    ├── src/
    │   ├── config/          # Configuración de la aplicación
    │   ├── controllers/     # Lógica de los endpoints
    │   ├── middlewares/     # Middlewares personalizados
    │   ├── models/          # Modelos de datos
    │   ├── routes/          # Definición de rutas
    │   └── index.js         # Punto de entrada de la aplicación
    ├── .env                 # Variables de entorno
    ├── .env.example         # Ejemplo de variables de entorno
    ├── .gitignore           # Archivos ignorados por git
    ├── package.json         # Dependencias y scripts
    └── README.md            # Este archivo

## Instalación

1. Clonar el repositorio

```bash
git clone <url-de-tu-repositorio>
cd task-manager-api
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno
- Crea un archivo `.env` basado en `.env.example`
- Configura tus variables (MongoDB URI, JWT Secret, etc.)

4. Iniciar el servidor

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

## Endpoints

### Autenticación

- `POST /api/auth/register` - Registrar un nuevo usuario

```json
{
 "name": "Nombre Usuario",
 "email": "usuario@example.com",
 "password": "contraseña123"
}
```

- `POST /api/auth/login` - Iniciar sesión

```json
{
  "email": "usuario@example.com",
  "password": "contraseña123"
}
```

### Tareas (requieren previa autenticación)

Para acceder a estos endpoints, incluye el token JWT en el header:

```header
Authorization: Bearer tu_token_jwt
```

- `GET /api/tasks` - Obtener todas las tareas del usuario
  - Query params opcionales:
    - `completed=true|false` - Filtrar por estado
    - `search=texto` - Buscar en título y descripción
    - `page=1` - Página a consultar
    - `limit=10` - Número de resultados por página

- `GET /api/tasks/:id` - Obtener una tarea específica

- `POST /api/tasks` - Crear una nueva tarea

  ```json
  {
    "title": "Completar proyecto",
    "description": "Finalizar API de tareas",
    "completed": false
  }
  ```

- `PUT /api/tasks/:id` - Actualizar una tarea

  ```json
  {
    "title": "Proyecto completado",
    "description": "API finalizada",
    "completed": true
  }
  ```

- `DELETE /api/tasks/:id` - Eliminar una tarea

## Ejemplos de uso

### Registro de usuario

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Usuario Prueba","email":"test@example.com","password":"password123"}'
```

### Creación de tarea (con token JWT)

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tu_token_jwt" \
  -d '{"title":"Nueva tarea","description":"Descripción de la tarea"}'
```

## Licencia

MIT