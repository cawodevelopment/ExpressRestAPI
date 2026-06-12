# Dockerised Express API

A production-minded Express 5 REST API using Prisma + PostgreSQL, JWT auth (access/refresh tokens), cookie-based session flow, request validation with Zod, and common security middleware.

## Features

- Express 5 API structure (controllers, services, repositories)
- Prisma ORM with PostgreSQL
- JWT access and refresh token flow
- Cookie-based authentication
- Zod request validation
- Security middleware: Helmet, CORS, rate limiting, compression
- Docker support with multi-stage build

## Tech Stack

- Node.js 20
- Express
- Prisma
- PostgreSQL
- Zod
- JWT (jsonwebtoken)
- Docker

## Project Structure

```text
Dockerised-Express-API/
	prisma/
		schema.prisma
		migrations/
	src/
		controllers/
		middlewares/
		repositories/
		routes/
		schemas/
		services/
		utils/
		app.js
		server.js
	Dockerfile
	package.json
	prisma.config.ts
	.envtemplate
```

## Prerequisites

- Node.js 20+
- npm
- PostgreSQL database
- Docker (optional)

## Environment Variables

Create a `.env` file in the project root. You can copy from `.envtemplate`:

```env
NODE_ENV=development
PORT=3000

DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public

ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret

ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
```

Notes:
- `DATABASE_URL` must point to PostgreSQL.
- Use strong random values for token secrets.
- Keep token expiry values in common JWT formats (`15m`, `7d`, etc).

## Local Development

Install dependencies:

```bash
npm install
```

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations in development:

```bash
npx prisma migrate dev
```

Start dev server:

```bash
npm run dev
```

Start production mode locally:

```bash
npm start
```

Server runs on the port from `PORT`.

## Docker

Build image:

```bash
docker build -t dockerised-express-api .
```

Run container:

```bash
docker run --env-file .env -p 3000:3000 dockerised-express-api
```

Container startup runs Prisma migrations (`prisma migrate deploy`) before launching the server.

## API Base URL

```text
http://localhost:3000/api/v1
```

## Authentication Flow

1. Register a user.
2. Login to receive access and refresh tokens (also set as cookies).
3. Access protected routes using the `accessToken` cookie.
4. Refresh tokens when needed.
5. Logout to clear and invalidate session tokens.

Important implementation detail:
- Protected routes read the token from cookies (`accessToken`), not from an Authorization header.

## Endpoints

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`

### Tasks

- `GET /tasks`
- `POST /tasks`
- `GET /tasks/:id`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

## Example Requests

Register:

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
	-H "Content-Type: application/json" \
	-d '{"name":"user","email":"user@example.com","password":"password123"}'
```

Login (store cookies in `cookies.txt`):

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
	-H "Content-Type: application/json" \
	-c cookies.txt \
	-d '{"email":"user@example.com","password":"password123"}'
```

Create task (send stored cookies):

```bash
curl -X POST http://localhost:3000/api/v1/tasks \
	-H "Content-Type: application/json" \
	-b cookies.txt \
	-d '{"title":"Write docs","description":"Finish README"}'
```

Get tasks:

```bash
curl http://localhost:3000/api/v1/tasks -b cookies.txt
```

Refresh token:

```bash
curl -X POST http://localhost:3000/api/v1/auth/refresh -b cookies.txt -c cookies.txt
```

Logout:

```bash
curl -X POST http://localhost:3000/api/v1/auth/logout -b cookies.txt
```

## Validation Rules

Auth:
- Register: `name` (2-100 chars), valid `email`, `password` min 6 chars
- Login: valid `email`, `password` min 6 chars

Task:
- Create: `title` required (1-255 chars), optional `description` max 1000 chars
- Update: optional `title`, `description`, `completed` (boolean)

## Error Format

Application errors return JSON in this format:

```json
{
	"success": false,
	"error": {
		"code": 401,
		"message": "Unauthorized"
	}
}
```

## Security Notes

- In production, set `NODE_ENV=production` so auth cookies become `httpOnly` and `secure` where configured.
- Restrict CORS origin from `*` to your frontend domain for production use.
- Rotate token secrets periodically.

## Useful Prisma Commands

```bash
npx prisma studio
npx prisma migrate status
npx prisma migrate deploy
```

## License

ISC

A production-oriented REST API built with Express 5 and Prisma, featuring:

- JWT authentication with access and refresh tokens
- HttpOnly cookie-based session handling
- Task CRUD scoped to authenticated users
- Zod request validation
- Security middleware (Helmet, CORS, rate limiting, compression)
- PostgreSQL persistence via Prisma
- Docker support with migration deploy on container startup

## Tech Stack

- Node.js 20
- Express 5
- Prisma ORM
- PostgreSQL
- JWT (`jsonwebtoken`)
- Zod
- Docker

## Project Structure

```text
src/
	app.js
	server.js
	controllers/
	middlewares/
	repositories/
	routes/
	schemas/
	services/
	utils/
prisma/
	schema.prisma
	migrations/
```

## Prerequisites

- Node.js 20+
- npm
- PostgreSQL database (local or hosted)
- Docker (optional)

## Environment Variables

Create a `.env` file in the project root (you can copy from `.envtemplate`):

```env
NODE_ENV=development
PORT=3000

DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"

ACCESS_TOKEN_SECRET=replace_with_strong_secret
REFRESH_TOKEN_SECRET=replace_with_strong_secret

ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
```

Notes:

- `ACCESS_TOKEN_EXPIRES_IN` is expected in minutes (for cookie maxAge parsing).
- `REFRESH_TOKEN_EXPIRES_IN` is expected in days.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client:

```bash
npx prisma generate
```

3. Apply existing migrations:

```bash
npx prisma migrate deploy
```

4. Start the API in development mode:

```bash
npm run dev
```

Server runs on the `PORT` from your `.env`.

## Run With Docker

Build image:

```bash
docker build -t dockerised-express-api .
```

Run container:

```bash
docker run --env-file .env -p 3000:3000 dockerised-express-api
```

The container startup command runs `prisma migrate deploy` before starting the server.

## API Base URL

```text
http://localhost:3000/api/v1
```

## Authentication Flow

1. Register a user.
2. Login to receive `accessToken` and `refreshToken` (also set as cookies).
3. Use authenticated routes for tasks.
4. Refresh token when access token expires.
5. Logout to revoke current refresh token.

## Endpoints

### Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`

### Tasks

- `GET /api/v1/tasks`
- `POST /api/v1/tasks`
- `GET /api/v1/tasks/:id`
- `PUT /api/v1/tasks/:id`
- `DELETE /api/v1/tasks/:id`

## Example Requests

### Register

```http
POST /api/v1/auth/register
Content-Type: application/json

{
	"name": "callum",
	"email": "callum@example.com",
	"password": "password123"
}
```

### Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
	"email": "callum@example.com",
	"password": "password123"
}
```

### Create Task

```http
POST /api/v1/tasks
Content-Type: application/json
Cookie: accessToken=<jwt>

{
	"title": "Finish README",
	"description": "Write complete project documentation"
}
```

### Update Task

```http
PUT /api/v1/tasks/:id
Content-Type: application/json
Cookie: accessToken=<jwt>

{
	"title": "Finish README",
	"description": "Updated details",
	"completed": true
}
```

## Validation Rules

- Register:
	- `name`: 2-100 chars
	- `email`: valid email
	- `password`: minimum 6 chars
- Login:
	- `email`: valid email
	- `password`: minimum 6 chars
- Create task:
	- `title`: 1-255 chars
	- `description`: optional, max 1000 chars
- Update task:
	- `title`: optional, 1-255 chars
	- `description`: optional, max 1000 chars
	- `completed`: optional boolean

## Security and Middleware

- `helmet` for secure headers
- `compression` for response compression
- `cors` enabled (currently `origin: '*'`)
- `express-rate-limit` (100 requests per 15 min window)
- Cookie parsing for auth token handling

## Common Commands

```bash
npm run dev                 # Start with nodemon
npm run start               # Start with node
npx prisma generate         # Generate Prisma client
npx prisma migrate deploy   # Apply migrations in deployment mode
```

## Notes

- This API currently expects auth primarily via cookies (`accessToken`, `refreshToken`).
- Prisma client is generated to `src/generated`.
- Task titles are unique at database level.
