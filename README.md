# Todo API Backend

A simple CRUD API for managing **Todo** tasks, built with:

* **Node.js** & **TypeScript**
* **Express** framework
* **Sequelize** ORM with **MySQL**
* **OpenAPI (Swagger UI)** for documentation

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation & Setup](#installation--setup)
4. [Database Configuration](#database-configuration)
5. [Running the Application](#running-the-application)
6. [API Endpoints](#api-endpoints)
7. [Swagger / OpenAPI Documentation](#swagger--openapi-documentation)
8. [Folder Structure](#folder-structure)
9. [Contributing](#contributing)
10. [License](#license)

---

## Project Overview

This backend service exposes RESTful endpoints to create, read, update, and delete Todo tasks. It persists data in a MySQL database using Sequelize models and provides interactive API docs via Swagger UI.

## Prerequisites

* **Node.js** v18+ and **npm**
* **MySQL** server (e.g., running on `localhost:3306`)
* **Git** (for cloning the repo)

---

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repo-url> todo-backend
   cd todo-backend
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Configure environment variables**
   Create a `.env` file in the root:

   ```ini
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=todo_app
   ```
4. **Initialize the database**
   Log into MySQL and run:

   ```sql
   CREATE DATABASE IF NOT EXISTS todo_app;
   ```

---

## Database Configuration

The app uses Sequelize to connect to MySQL. On startup, it reads connection details from `.env` and auto-syncs models (creating the `tasks` table if it doesn't exist). For production, consider using Sequelize migrations instead of `sync()`.

---

## Running the Application

1. **Start in development**

   ```bash
   npm run dev
   ```
2. **Build & start** (production style)

   ```bash
   npm run build
   npm start
   ```

The server listens on **`http://localhost:3000`** by default.

---

## API Endpoints

| Method | Path         | Description                   |
| ------ | ------------ | ----------------------------- |
| GET    | `/task`      | Retrieve all tasks            |
| GET    | `/task/{id}` | Retrieve a single task by ID  |
| POST   | `/task`      | Create a new task             |
| PUT    | `/task/{id}` | Update an existing task by ID |
| DELETE | `/task/{id}` | Delete a task by ID           |

**Request/Response JSON**

* **POST/PUT** body:

  ```json
  {
    "title": "string",
    "description": "string",
    "status": "PENDING|IN_PROGRESS|COMPLETED"
  }
  ```
* **Responses** include a `message` and, for GET/POST/PUT, a `todo` or `todos` payload.

---

## Swagger / OpenAPI Documentation

1. **Install** Swagger UI middleware:

   ```bash
   npm install swagger-ui-express yamljs
   ```
2. **Add to** `app.ts`:

   ```ts
   import swaggerUi from 'swagger-ui-express';
   import YAML from 'yamljs';
   import path from 'path';

   const swaggerDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
   ```
3. **Open** `http://localhost:3000/api-docs` in your browser to explore and test all endpoints.

---

## Folder Structure

```
backend/
├── src/
│   ├── app.ts           # Express app initialization
│   ├── controllers/     # Request handlers
│   ├── models/          # Sequelize model definitions
│   ├── routes/          # Express route definitions
│   ├── lib/ConnectToDB.ts  # DB connection logic
│   └── openapi.yaml     # OpenAPI specification
├── .env                 # Environment variables
├── package.json
├── tsconfig.json
└── README.md            # This file
```

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push to origin: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute.
