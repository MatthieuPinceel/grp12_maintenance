# Maintenance Application

A full-stack web application for managing maintenance tasks, items, and user accounts. Built with Vue 3 on the frontend and Express.js with MySQL on the backend.

## Project Overview

This is a comprehensive maintenance management system designed for efficient tracking and organization of maintenance operations. The application provides a user-friendly interface for managing users, maintenance items, and tagging systems.

### Developers
- **Groupe** - 12
- **Aurélien Fontaine** - Backend Development (Express.js, MySQL)
- **Léothen Dusannier** - Frontend Development (Vue 3, Vite)

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web server framework
- **MySQL** - Relational database
- **mysql2** - MySQL client library
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management
- **jsonwebtoken** - JWT authentication

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Axios** - HTTP client library
- **Pinia** - State management
- **vue-router** - Client-side routing
- **CSS3** - Styling and responsive design

## Prerequisites

- **Node.js** - v20.19.0 or higher (v22.12.0+ recommended)
- **npm** - v10 or higher
- **MySQL Server** - v5.7 or higher running on localhost:3306

## Installation

### 1. Clone or extract the project

```sh
cd https://github.com/Aurelienxx/R6.06.git
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure the database

#### Create the database and schema:

1. Open your MySQL client (MySQL Workbench, phpMyAdmin, or command line)
2. Execute the SQL script:
   ```sql
   SOURCE BDD.sql;
   ```

3. This will create the `maintenance` database with the following tables:
   - `UserTable` - User accounts and credentials
   - `ItemTable` - Maintenance items
   - `TagTable` - Item tags/categories
   - `ItemTagTable` - Association table for items and tags

## Running the Application

### Development Mode (Frontend + Backend)

```sh
npm run dev
```

This command runs both services concurrently:
- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:5173


## API Endpoints

All Item and Tag endpoints require JWT authentication (Bearer token).

### Users
- `POST /api/users/login` - Authenticate user and get JWT token
- `POST /api/users/create` - Create new user
- `GET /api/users` - Get all users (protected)
- `GET /api/users/:id` - Get user by ID (protected)
- `PUT /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Delete user (protected)

### Items (Protected)
- `GET /api/items` - Get all items with tags and user info
- `GET /api/items/:id` - Get item by ID
- `POST /api/items/create` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

### Tags (Protected)
- `GET /api/tags` - Get all tags
- `GET /api/tags/:id` - Get tag by ID
- `POST /api/tags/create` - Create new tag
- `PUT /api/tags/:id` - Update tag
- `DELETE /api/tags/:id` - Delete tag

## Features

- **User Management** - Create, read, update, and delete user accounts
- **JWT Authentication** - Secure token-based authentication with 24-hour expiry
- **Item Tracking** - Manage maintenance items with detailed information
- **Tagging System** - Organize items with custom tags and categories
- **Image Gallery** - View maintenance images with filtering by tag and user
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **RESTful API** - Clean and standard API endpoints with authentication
- **Database Persistence** - Reliable MySQL backend storage
- **Protected Routes** - Frontend routes protected by token verification

## Development Workflow

### Adding a New Feature

1. **Create the database schema** (if needed)
2. **Create the API endpoint** in `back/routes/`
3. **Create the controller logic** in `back/controllers/`
4. **Create the Vue component** in `src/components/`
5. **Add navigation links** in the header/pages
6. **Test thoroughly** with both Postman (API) and browser (UI)

