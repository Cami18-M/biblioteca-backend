# Rutas y Endpoints - Biblioteca Backend

## Descripción General

Este documento detalla todas las rutas y endpoints disponibles y funcionales del backend de Biblioteca. La aplicación está construida con **Node.js**, **Express v5**, **Mongoose** y **MongoDB Atlas**, utilizando autenticación basada en **JWT (JSON Web Tokens)**.

---

## Estado de las Pruebas

| Herramienta | Tipo de prueba | Estado | Cobertura |
|-------------|---------------|--------|-----------|
| Postman + Newman | Funcional + Seguridad | ✅ 54/54 assertions passing (100%) | Todas las rutas |
| Jest | Unitarias + Integración | ✅ 68/72 tests passing (94.4%) | Backend completo |
| JMeter | Pruebas de carga | ✅ GET /api/books 91% éxito | Endpoint de lectura |

---

## 1. Autenticación (Auth)

### POST `/api/auth/register`
- **Descripción**: Registra un nuevo usuario en el sistema
- **Acceso**: Público
- **Cuerpo de la solicitud**:
  ```json
  {
    "name": "string (obligatorio)",
    "email": "string (obligatorio, único)",
    "password": "string (obligatorio, mínimo 6 caracteres)"
  }
  ```
- **Respuesta exitosa**: 201 Created
- **Respuesta de error**:
  - 400 Bad Request: Faltan campos obligatorios
  - 409 Conflict: El correo electrónico ya está registrado

### POST `/api/auth/login`
- **Descripción**: Autentica al usuario y genera un token JWT
- **Acceso**: Público
- **Cuerpo de la solicitud**:
  ```json
  {
    "email": "string (obligatorio)",
    "password": "string (obligatorio)"
  }
  ```
- **Respuesta exitosa**: 200 OK con token JWT en el body
- **Respuesta de error**:
  - 400 Bad Request: Faltan credenciales
  - 401 Unauthorized: Credenciales inválidas

### GET `/api/auth/me`
- **Descripción**: Obtiene el perfil del usuario autenticado actualmente
- **Acceso**: Privado (requiere Token JWT)
- **Header requerido**:
  ```
  Authorization: Bearer <token_jwt>
  ```
- **Respuesta exitosa**: 200 OK con datos del usuario
- **Respuesta de error**: 401 Unauthorized (sin token o token inválido)

---

## 2. Usuarios (Users)

### POST `/api/users`
- **Descripción**: Crea un nuevo usuario en el sistema
- **Acceso**: Público
- **Cuerpo de la solicitud**: Igual al endpoint de registro
- **Respuesta exitosa**: 201 Created
- **Respuesta de error**:
  - 400 Bad Request: Faltan campos obligatorios
  - 409 Conflict: Email duplicado

### GET `/api/users/:id`
- **Descripción**: Obtiene un usuario por su ID de MongoDB
- **Acceso**: Privado (requiere Token JWT)
- **Header requerido**:
  ```
  Authorization: Bearer <token_jwt>
  ```
- **Respuesta exitosa**: 200 OK con datos del usuario
- **Respuesta de error**:
  - 404 Not Found: Usuario no encontrado
  - 500 Error interno: ID inválido

### PUT `/api/users/:id`
- **Descripción**: Actualiza los datos de un usuario existente
- **Acceso**: Privado (requiere Token JWT)
- **Header requerido**:
  ```
  Authorization: Bearer <token_jwt>
  ```
- **Cuerpo de la solicitud**:
  ```json
  {
    "name": "string",
    "email": "string"
  }
  ```
- **Respuesta exitosa**: 200 OK con usuario actualizado
- **Respuesta de error**:
  - 404 Not Found: Usuario no encontrado
  - 500 Error interno

### GET `/api/users/email/:email`
- **Descripción**: Busca un usuario por su correo electrónico
- **Acceso**: Público
- **Respuesta exitosa**: 200 OK con datos del usuario
- **Respuesta de error**: 404 Not Found

---

## 3. Libros (Books)

### GET `/api/books`
- **Descripción**: Lista todos los libros disponibles en el catálogo
- **Acceso**: Público
- **Respuesta exitosa**: 200 OK con array de libros
- **Nota**: Endpoint probado con JMeter (pruebas de carga)

### POST `/api/books`
- **Descripción**: Crea un nuevo libro en el catálogo
- **Acceso**: Privado (requiere Token JWT, rol Admin)
- **Header requerido**:
  ```
  Authorization: Bearer <token_jwt>
  ```
- **Cuerpo de la solicitud**:
  ```json
  {
    "title": "string (obligatorio)",
    "author": "string (obligatorio)",
    "isbn": "string (obligatorio)",
    "total_copies": "number (obligatorio)"
  }
  ```
- **Respuesta exitosa**: 201 Created
- **Respuesta de error**: 400 Bad Request, 401 Unauthorized

### GET `/api/books/:id`
- **Descripción**: Obtiene un libro específico por su ID
- **Acceso**: Público
- **Respuesta exitosa**: 200 OK con datos del libro
- **Respuesta de error**: 404 Not Found

### PUT `/api/books/:id`
- **Descripción**: Actualiza los datos de un libro existente
- **Acceso**: Privado (requiere Token JWT, rol Admin)
- **Header requerido**:
  ```
  Authorization: Bearer <token_jwt>
  ```
- **Respuesta exitosa**: 200 OK con libro actualizado
- **Respuesta de error**: 404 Not Found, 401 Unauthorized

### DELETE `/api/books/:id`
- **Descripción**: Elimina un libro del catálogo
- **Acceso**: Privado (requiere Token JWT, rol Admin)
- **Header requerido**:
  ```
  Authorization: Bearer <token_jwt>
  ```
- **Respuesta exitosa**: 200 OK
- **Respuesta de error**: 404 Not Found, 401 Unauthorized

---

## 4. Préstamos / Transacciones (Transactions)

### GET `/api/transactions`
- **Descripción**: Lista las transacciones (préstamos) del usuario autenticado
- **Acceso**: Privado (requiere Token JWT)
- **Header requerido**:
  ```
  Authorization: Bearer <token_jwt>
  ```
- **Respuesta exitosa**: 200 OK con array de transacciones

### GET `/api/transactions/me`
- **Descripción**: Obtiene los préstamos activos del usuario actual
- **Acceso**: Privado (requiere Token JWT)
- **Header requerido**:
  ```
  Authorization: Bearer <token_jwt>
  ```
- **Respuesta exitosa**: 200 OK

### POST `/api/transactions`
- **Descripción**: Crea un nuevo préstamo de libro
- **Acceso**: Privado (requiere Token JWT)
- **Header requerido**:
  ```
  Authorization: Bearer <token_jwt>
  ```
- **Cuerpo de la solicitud**:
  ```json
  {
    "bookId": "string (obligatorio, ObjectId de MongoDB)"
  }
  ```
- **Respuesta exitosa**: 201 Created
- **Respuesta de error**:
  - 400 Bad Request: Faltan campos o libro no disponible
  - 401 Unauthorized: Sin token válido

### GET `/api/transactions/:id`
- **Descripción**: Obtiene una transacción específica por ID
- **Acceso**: Privado (requiere Token JWT)
- **Header requerido**:
  ```
  Authorization: Bearer <token_jwt>
  ```
- **Respuesta exitosa**: 200 OK con detalles del préstamo
- **Respuesta de error**: 404 Not Found

### PATCH `/api/transactions/:id/return`
- **Descripción**: Marca un préstamo como devuelto
- **Acceso**: Privado (requiere Token JWT)
- **Header requerido**:
  ```
  Authorization: Bearer <token_jwt>
  ```
- **Respuesta exitosa**: 200 OK con estado actualizado a 'returned'
- **Respuesta de error**:
  - 404 Not Found: Préstamo no encontrado
  - 409 Conflict: El préstamo ya fue devuelto
  - 500 Error interno

---

## 5. Resumen de Rutas por Nivel de Acceso

### Rutas Públicas (Sin Autenticación)
| Método | Endpoint |
|--------|----------|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |
| GET | `/api/auth/me` * |
| GET | `/api/users/email/:email` |
| GET | `/api/books` |
| GET | `/api/books/:id` |

*Nota: `/api/auth/me` requiere token JWT aunque esté listada entre las principales de auth.

### Rutas Privadas (Con Token JWT Requerido)
| Método | Endpoint | Rol Adicional |
|--------|----------|---------------|
| GET | `/api/auth/me` | - |
| POST | `/api/users` | - |
| GET | `/api/users/:id` | - |
| PUT | `/api/users/:id` | - |
| POST | `/api/books` | Admin |
| PUT | `/api/books/:id` | Admin |
| DELETE | `/api/books/:id` | Admin |
| GET | `/api/transactions` | - |
| GET | `/api/transactions/me` | - |
| POST | `/api/transactions` | - |
| GET | `/api/transactions/:id` | - |
| PATCH | `/api/transactions/:id/return` | - |

---

## 6. Ejemplo de Uso con Postman/Newman

### Login y obtención de token
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "Password123"
}
```

### Acceso a ruta privada con token
```
GET http://localhost:5000/api/auth/me
Authorization: Bearer <TOKEN_OBTENIDO_EN_EL_LOGIN>
```

### Ejecución de la colección Postman con Newman
```bash
newman run postman\Biblioteca_Backend.postman_collection.json -e postman\Biblioteca_Backend.postman_environment.json
```

---

## 7. Estado de Funcionalidad por Endpoint

| Endpoint | Método | Estado | Probado con |
|----------|--------|--------|-------------|
| `/api/auth/register` | POST | ✅ Funcional | Jest, Postman/Newman |
| `/api/auth/login` | POST | ✅ Funcional | Jest, Postman/Newman |
| `/api/auth/me` | GET | ✅ Funcional | Jest, Postman/Newman |
| `/api/users` | POST | ✅ Funcional | Jest, Postman/Newman |
| `/api/users/:id` | GET | ✅ Funcional | Jest, Postman/Newman |
| `/api/users/:id` | PUT | ✅ Funcional | Jest, Postman/Newman |
| `/api/users/email/:email` | GET | ✅ Funcional | Jest, Postman/Newman |
| `/api/books` | GET | ✅ Funcional | Jest, Postman/Newman, JMeter |
| `/api/books` | POST | ✅ Funcional | Jest, Postman/Newman |
| `/api/books/:id` | GET | ✅ Funcional | Jest, Postman/Newman |
| `/api/books/:id` | PUT | ✅ Funcional | Jest, Postman/Newman |
| `/api/books/:id` | DELETE | ✅ Funcional | Jest, Postman/Newman |
| `/api/transactions` | GET | ✅ Funcional | Jest, Postman/Newman |
| `/api/transactions/me` | GET | ✅ Funcional | Jest, Postman/Newman |
| `/api/transactions` | POST | ✅ Funcional | Jest, Postman/Newman |
| `/api/transactions/:id` | GET | ✅ Funcional | Jest, Postman/Newman |
| `/api/transactions/:id/return` | PATCH | ✅ Funcional | Jest, Postman/Newman |

---

**Total de endpoints documentados**: 16 rutas  
**Todos funcionando**: 16/16 (100%)  
**Última actualización**: Sprint 2 - Sesión de pruebas completa