# TaskDuty

TaskDuty is a personal task management application built with React, TypeScript, Tailwind CSS, Express, and MongoDB.

It allows users to create, view, edit, delete, complete, and filter tasks.

## Features

* Create a new task
* View all tasks
* Edit existing tasks
* Delete tasks with confirmation
* Mark tasks as completed or incomplete
* Filter tasks by category
* Filter tasks by completion status
* Form validation
* Responsive design

## Task Categories

Tasks can be assigned one of two tags:

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

## Project Structure

```text
week-1/
├── client/
│   └── React frontend
│
├── server/
│   └── Express backend
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
cd client
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

### 4. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 5. Configure environment variables

Create a `.env` file inside the `server` folder:

```env
MONGO_URL=your_mongodb_connection_string
PORT=3000
```

### 6. Start the backend

```bash
npm run dev
```

The frontend runs on the Vite development server and communicates with the Express backend.

## Validation

The application validates task information before it is submitted. The backend also validates incoming task data before saving it to the database.

## Known Issues

* Due dates are automatically assigned when a task is created because the provided Figma design does not contain a due-date input field.
* The application currently runs locally and requires the backend server and MongoDB connection to be available.

## Author

Madu Chidera Joy
