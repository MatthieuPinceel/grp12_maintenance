# Maintenance Application

A full-stack web application for managing maintenance tasks, items, and user accounts. Built with Vue 3 on the frontend and Express.js with MySQL on the backend.

## Project Overview

This is a comprehensive maintenance management system designed for efficient tracking and organization of maintenance operations. The application provides a user-friendly interface for managing users, maintenance items, and tagging systems.

### Developers

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

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Axios** - HTTP client library
- **CSS3** - Styling and responsive design

## Project Structure

```
├── back/                          # Backend application
│   ├── controllers/              # Request handlers for business logic
│   │   ├── userController.js
│   │   ├── itemController.js
│   │   └── tagController.js
│   ├── routes/                   # API route definitions
│   │   ├── userRoutes.js
│   │   ├── itemRoutes.js
│   │   └── tagRoutes.js
│   ├── server.js                 # Express server configuration
│   ├── db.js                     # MySQL connection pool setup
│   └── .env                      # Environment variables (not in version control)
│
├── src/                           # Frontend source code
│   ├── components/               # Vue components
│   │   ├── components/          # Feature components
│   │   │   ├── gallery/
│   │   │   └── imageViewer/
│   │   ├── essentials/          # Layout components
│   │   │   ├── header/
│   │   │   └── footer/
│   │   ├── pages/               # Page components
│   │   │   ├── gallery/
│   │   │   ├── home/
│   │   │   └── login/
│   │   └── icons/               # Icon components
│   ├── assets/                  # Static assets
│   │   ├── base.css
│   │   └── main.css
│   ├── App.vue                  # Root component
│   └── main.js                  # Application entry point
│
├── public/                        # Public static files
│   └── Images/
│
├── package.json                   # Project dependencies and scripts
├── vite.config.js                # Vite configuration
├── jsconfig.json                 # JavaScript configuration
├── BDD.sql                       # Database schema and initial data
└── README.md                     # This file
```

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

#### Create a `.env` file in the `back/` directory:

```env
DB_HOST=localhost
DB_USER=miniuser
DB_PASSWORD=r606maintenance
DB_NAME=maintenance
DB_PORT=3306
PORT=3000
```

**Note:** The credentials above should be created in MySQL. Adjust them based on your actual MySQL setup.

### 4. Create MySQL user (if needed)

If the MySQL user doesn't exist, create it:

```sql
CREATE USER 'miniuser'@'localhost' IDENTIFIED BY 'r606maintenance';
GRANT ALL PRIVILEGES ON maintenance.* TO 'miniuser'@'localhost';
FLUSH PRIVILEGES;
```

## Running the Application

### Development Mode (Frontend + Backend)

```sh
npm run dev
```

This command runs both services concurrently:
- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:5173

### Backend Only

```sh
node back/server.js
```

Runs only the Express server on http://localhost:3000

### Frontend Only

```sh
npm run preview
```

Runs only the Vite development server on http://localhost:5173

## Building for Production

```sh
npm run build
```

This creates an optimized production build in the `dist/` directory.

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users/create` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Items
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get item by ID
- `POST /api/items/create` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

### Tags
- `GET /api/tags` - Get all tags
- `GET /api/tags/:id` - Get tag by ID
- `POST /api/tags/create` - Create new tag
- `PUT /api/tags/:id` - Update tag
- `DELETE /api/tags/:id` - Delete tag

## Features

- **User Management** - Create, read, update, and delete user accounts
- **Item Tracking** - Manage maintenance items with detailed information
- **Tagging System** - Organize items with custom tags and categories
- **Image Gallery** - View maintenance-related images
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **RESTful API** - Clean and standard API endpoints
- **Database Persistence** - Reliable MySQL backend storage

## Development Workflow

### Adding a New Feature

1. **Create the database schema** (if needed)
2. **Create the API endpoint** in `back/routes/`
3. **Create the controller logic** in `back/controllers/`
4. **Create the Vue component** in `src/components/`
5. **Add navigation links** in the header/pages
6. **Test thoroughly** with both Postman (API) and browser (UI)

### Common Issues and Solutions

#### Database Connection Error
- Ensure MySQL server is running
- Verify credentials in `.env` match your MySQL setup
- Check that the `maintenance` database exists
- Ensure the MySQL user has proper permissions

#### CORS Error
- Backend must be running on http://localhost:3000
- Frontend must be running on http://localhost:5173
- Both must be started for full functionality

#### Port Already in Use
- Check if another process is using port 3000 or 5173
- Kill the process: `taskkill /PID <process_id> /F` (Windows)
- Or change the port in `.env` (backend) or `vite.config.js` (frontend)

## Environment Variables

The backend uses a `.env` file for configuration. Key variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | MySQL server hostname | localhost |
| `DB_USER` | MySQL username | miniuser |
| `DB_PASSWORD` | MySQL password | r606maintenance |
| `DB_NAME` | Database name | maintenance |
| `DB_PORT` | MySQL port | 3306 |
| `PORT` | Express server port | 3000 |

## Recommended IDE Setup

- **[VS Code](https://code.visualstudio.com/)** with extensions:
  - [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
  - [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) (for API testing)
  - [MySQL](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2)

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

### Recommended Browser Extensions

- [Vue.js DevTools](https://devtools.vuejs.org/)
- [Postman](https://www.postman.com/) (for API testing)

## Testing

### API Testing with Postman

1. Import the API endpoints listed above into Postman
2. Ensure the backend is running on http://localhost:3000
3. Test each endpoint with sample data

### Frontend Testing

1. Run the development server: `npm run dev`
2. Open http://localhost:5173 in your browser
3. Use browser DevTools to debug
4. Check Vue.js DevTools for component inspection

## Troubleshooting

### Server won't start
- Check for error messages in the console
- Verify all dependencies are installed: `npm install`
- Ensure Node.js version is compatible

### Database errors
- Verify MySQL server is running
- Check `.env` file exists and has correct credentials
- Ensure database `maintenance` is created from `BDD.sql`

### CORS issues
- Both frontend and backend must be running
- Frontend must access backend on `http://localhost:3000`
- Backend must have CORS enabled for `http://localhost:5173`

## Contributing

When contributing to this project:

1. Follow existing code style and naming conventions
2. Add comments for complex logic
3. Test changes thoroughly before committing
4. Keep commit messages clear and descriptive

## License

This project is part of the IUT R6.06 Maintenance course.

## Contact

- **Backend Issues**: Aurélien Fontaine
- **Frontend Issues**: Léothen Dusannier

---

**Last Updated**: January 2026
