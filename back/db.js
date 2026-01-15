/**
 * MySQL Database Connection Pool
 * 
 * This module creates and exports a connection pool to the MySQL database.
 * The pool manages multiple connections for improved performance and reliability.
 * 
 * Environment variables (from .env):
 * - DB_HOST: Database server hostname (e.g., localhost)
 * - DB_USER: MySQL username for authentication
 * - DB_PASSWORD: MySQL user password
 * - DB_NAME: Database name to connect to
 * - DB_PORT: MySQL server port (default: 3306)
 * 
 * Note: This module should only be imported after environment variables are loaded
 * in the main server file to ensure database credentials are available.
 */

import mysql from "mysql2";

/**
 * MySQL Connection Pool
 * 
 * Creates a pool of MySQL connections using credentials from environment variables.
 * This connection pool is reused across all API route handlers for database operations.
 * 
 * @type {mysql.Pool}
 */
export const db = mysql.createPool({
    host: process.env.DB_HOST,        // Database server address
    user: process.env.DB_USER,        // Database user for authentication
    password: process.env.DB_PASSWORD, // User password
    database: process.env.DB_NAME,    // Target database name
    port: process.env.DB_PORT         // MySQL server port
});
