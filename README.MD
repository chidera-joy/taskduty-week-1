# TaskDuty

TaskDuty is a personal task management application built with React, TypeScript, Tailwind CSS, Express, and MongoDB.

It allows authenticated users to create, view, edit, delete, complete, and manage their own tasks.

## Features

### Task Management

* Create a new task
* View personal tasks
* View a single task
* Edit existing tasks
* Delete tasks
* Mark tasks as completed or incomplete
* Filter tasks by category
* Filter tasks by completion status
* Form validation

### Authentication & Authorization

* User registration
* User login
* Password hashing with bcrypt
* JWT-based authentication
* Protected task routes
* User-owned tasks
* Users can only access and manage their own tasks

## Task Categories

Tasks can be assigned to one of two categories:

* Urgent
* Important

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* Zod
* JSON Web Token (JWT)
* bcryptjs

## Project Structure

```text
week-1/
├── api/
│   └── Express backend
│       ├── src/
│       │   ├── auth/
│       │   ├── config/
│       │   ├── middleware/
│       │   ├── models/
│       │   ├── types/
│       │   ├── validation/
│       │   └── server.ts
│       └── package.json
│
├── web/
│   └── React frontend
│
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Install frontend dependencies

```bash
cd web
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

### 4. Install backend dependencies

Open another terminal:

```bash
cd api
npm install
```

### 5. Configure environment variables

Create a `.env` file inside the `api` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

Do not commit your `.env` file or expose your MongoDB connection string or JWT secret.

### 6. Start the backend

```bash
npm run dev
```

The frontend runs on the Vite development server and communicates with the Express backend.

## API Authentication

TaskDuty uses JWT authentication to protect task-related endpoints.

### Authentication Endpoints

```text
POST /auth/register
POST /auth/login
```

### Task Endpoints

```text
POST   /tasks
GET    /tasks
GET    /tasks/:id
PUT    /tasks/:id
DELETE /tasks/:id
```

Task endpoints require a valid JWT access token.

The token is sent using the Authorization header:

```text
Authorization: Bearer YOUR_TOKEN
```

## Validation

The application validates task and authentication data before processing requests.

Zod is used to validate incoming request data, while the backend also performs authentication and database-level checks.

## Security

* Passwords are hashed before being stored in the database.
* JWT tokens are used to authenticate protected requests.
* Task ownership is linked to the authenticated user's ID.
* Users cannot access, update, or delete tasks belonging to another user.
* Environment variables are used for sensitive configuration.

## Known Issues

* The application currently runs locally and requires the backend server and MongoDB connection to be available.
* Due-date handling may still depend on the current frontend form implementation.

## Author

**Madu Chidera Joy**

