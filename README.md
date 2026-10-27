# biblioteca-backend

API REST de biblioteca construida con Node.js, Express y MongoDB (Mongoose), organizada en capas (rutas → controladores → servicios → modelos).

## Requisitos

- Node.js 18+
- MongoDB (local o Atlas)

## Puesta en marcha

```bash
npm install
cp .env.example .env   # completar MONGODB_URI y JWT_SECRET
npm run dev            # http://localhost:5000
```

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `PORT` | Puerto del servidor (default `5000`) |
| `NODE_ENV` | `development` / `production` |
| `MONGODB_URI` | Cadena de conexión de MongoDB |
| `JWT_SECRET` | Secreto para firmar los tokens JWT |
| `JWT_EXPIRES_IN` | Vigencia del token (default `1d`) |
| `LOAN_PERIOD_DAYS` | Días de préstamo por defecto (default `14`) |

## Endpoints

### Autenticación — `/api/auth`

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| POST | `/register` | Público | Registrar usuario (`role: client`) |
| POST | `/login` | Público | Iniciar sesión y obtener token |
| GET | `/me` | Bearer token | Perfil del usuario autenticado |

### Usuarios — `/api/users`

| Método | Ruta | Descripción |
| --- | --- | --- |
| POST | `/` | Crear usuario |
| GET | `/` | Listar usuarios |
| GET | `/:id` | Obtener usuario por ID |
| GET | `/email/:email` | Obtener usuario por email |
| PUT | `/:id` | Actualizar usuario |
| DELETE | `/:id` | Eliminar usuario |

### Catálogo de libros — `/api/books`

| Método | Ruta | Descripción |
| --- | --- | --- |
| POST | `/` | Registrar libro |
| GET | `/` | Listar catálogo |
| GET | `/:id` | Obtener libro por ID |
| PUT | `/:id` | Actualizar libro |
| DELETE | `/:id` | Eliminar libro (bloqueado si tiene préstamos activos) |

Filtros de `GET /api/books`: `category`, `author`, `title`, `search` (título/autor/ISBN) y `available=true`.

Cuerpo para crear un libro:

```json
{
  "title": "Cien años de soledad",
  "author": "Gabriel García Márquez",
  "isbn": "978-0307474728",
  "publishedYear": 1967,
  "stock": 3,
  "category": "Novela"
}
```

`stock` representa los **ejemplares disponibles**: baja al prestar y sube al devolver.

### Préstamos — `/api/transactions` (requieren `Authorization: Bearer <token>`)

| Método | Ruta | Descripción |
| --- | --- | --- |
| POST | `/` | Registrar préstamo (`{ "book": "<id>", "dueDate": "<opcional>" }`) |
| GET | `/` | Listar transacciones (cliente: solo las propias) |
| GET | `/me` | Préstamos del usuario autenticado |
| GET | `/:id` | Obtener transacción por ID |
| PATCH | `/:id/return` | Registrar devolución y reponer stock |

Estados: `active`, `returned`, `overdue` (se marca automáticamente al consultar si venció el plazo).
Un `admin` puede prestar a nombre de otro usuario enviando `user` en el cuerpo.

## Pruebas

### Unitarias e integración (Jest + Supertest)

```bash
npm test          # ejecuta todas las suites de tests/ con NODE_ENV=test
npm run test:watch
```

Las suites viven en `tests/unit/` y `tests/integration/`. Las de integración usan
Supertest contra la app de Express y mocks de los modelos, por lo que no
necesitan una base de datos real.

### Funcionales (Newman)

Con el servidor levantado (`npm run dev` o `npm start`):

```bash
npm run test:newman
```

La colección y el entorno están en `postman/`. Para un reporte JUnit adicional:

```bash
npm run test:newman -- --reporters cli,junit --reporter-junit-export newman-report.xml
```

### Integración continua

El workflow `.github/workflows/ci.yml` se ejecuta en cada `push` y
`pull_request` sobre `main`. Levanta un servicio MongoDB 7, instala las
dependencias con `npm ci`, ejecuta Jest y después Newman contra el servidor
local, publicando el reporte JUnit como artefacto.

## Estructura

```
src/
├── config/        # Conexión a MongoDB
├── controllers/   # Manejo de peticiones HTTP
├── middlewares/   # Autenticación JWT y manejo de errores
├── models/        # Esquemas de Mongoose
├── routes/        # Definición de endpoints
├── services/      # Lógica de negocio
├── app.js         # Configuración de Express
└── server.js      # Arranque del servidor
```
