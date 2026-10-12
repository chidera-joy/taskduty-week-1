# TaskDuty — Personal Task Manager

TaskDuty is a personal task management application built to help users organize their daily activities, manage their tasks, and keep track of their progress.

The application allows users to create accounts, log in securely, create and manage tasks, search for specific tasks, and organize their tasks using categories and completion status.

## Features

* **User Authentication:** Users can create accounts and log in to access their tasks.
* **Task Management:** Create, view, edit, and delete tasks.
* **Task Search:** Search for tasks by title, description, or category.
* **Task Categories:** Organize tasks into categories such as Urgent and Important.
* **Task Filtering:** Filter tasks according to their category and completion status.
* **Task Completion:** Mark tasks as completed or incomplete.
* **Protected Routes:** Only authenticated users can access task management pages.
* **User Data Protection:** Users can access and manage only their own tasks.
* **Responsive Interface:** A simple interface for managing daily tasks.

## Technologies Used

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JSON Web Tokens (JWT)
* Zod

## Task Search Implementation

The task search feature allows users to find tasks without manually going through their entire task list.

Users can search using:

* Task titles
* Task descriptions
* Task categories

### How It Works

1. The user enters a search term in the search bar.
2. React manages the search input using state.
3. A debounce mechanism waits 300 milliseconds after the user stops typing before updating the search query. This helps reduce unnecessary API requests.
4. The frontend sends the search term to the backend through the `/tasks` endpoint.
5. The backend uses MongoDB queries with regular expressions to search the task title, description, and category without distinguishing between uppercase and lowercase letters.
6. The backend filters the results by the authenticated user's ID to ensure users can access only their own tasks.
7. The matching tasks are returned and displayed on the frontend.

The search feature also supports clearing the search input and displaying an appropriate message when no matching tasks are found.

### Example Request

`GET /tasks?search=React`

This request searches the authenticated user's tasks for the term `React`.

## Authentication and Security

TaskDuty uses JWT-based authentication to protect task management endpoints.

After logging in, the frontend stores the authentication token and includes it in requests to protected backend routes.

The backend uses the authenticated user's ID to restrict task access, helping prevent users from viewing or modifying another user's tasks.

Sensitive environment variables, including database connection strings and authentication secrets, should be stored in a `.env` file and must not be committed to the repository.

## Project Structure

The project is organized into separate frontend and backend applications.

```text
taskduty-week-1/
├── web/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── pages/
│       └── ...
├── api/
│   └── src/
│       └── ...
├── .gitignore
└── README.md
```

*Note: This is a simplified overview of the project structure.*

## Getting Started

### Prerequisites

Before running the application, ensure you have installed:

* Node.js
* npm
* MongoDB or access to a MongoDB Atlas database
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/chidera-joy/taskduty-week-1.git
```

### 2. Navigate to the Project

```bash
cd taskduty-week-1
```

### 3. Set Up the Backend

Open a terminal and run:

```bash
cd api
npm install
```

Create a `.env` file in the backend directory and configure the environment variables required by your backend, including your MongoDB connection string and JWT secret.

Use the variable names expected by your existing backend configuration.

Start the backend using the appropriate development script defined in `api/package.json`.

### 4. Set Up the Frontend

Open another terminal and run:

```bash
cd web
npm install
```

Start the frontend using the appropriate development script defined in `web/package.json`.

Open the local address displayed in the terminal, usually:

`http://localhost:5173`

**Important:** The backend and frontend must both be running for the application to work correctly.

## Testing

The following functionality can be tested manually:

* Register a new user account.
* Log in with valid credentials.
* Create, edit, and delete tasks.
* Mark tasks as completed or incomplete.
* Search for tasks by title.
* Search for terms contained in task descriptions.
* Search using task categories.
* Clear the search input.
* Confirm that an unmatched search displays an appropriate message.
* Verify that users cannot access another user's tasks.
* Confirm that protected pages redirect unauthenticated users to the login page.

## Learning Outcomes

Working on TaskDuty provided practical experience with:

* Building a React application using TypeScript.
* Connecting a frontend to a backend API.
* Managing authentication and protected routes.
* Working with Express.js and MongoDB.
* Implementing search functionality using backend database queries.
* Using React state and effects to manage search input and debounce requests.
* Testing API endpoints and debugging application issues.
* Using Git and GitHub for version control and feature development.

## Author

**Chidera Madu Joy**

TaskDuty was developed as part of my technical internship work to practise full-stack web development and build practical application features.
