/**
 * Express Backend Server
 * Maintenance Application API
 * 
 * This module initializes and configures the Express server with CORS, routing,
 * and error handling. Environment variables are loaded before route imports to ensure
 * proper database configuration.
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module for .env file resolution
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables from .env file
// Must be called before importing modules that use these variables
dotenv.config({ path: path.join(__dirname, '.env') });

/**
 * Initialize and start the Express server
 * 
 * This async function:
 * - Dynamically imports all route modules after environment variables are loaded
 * - Configures middleware (JSON parsing, CORS)
 * - Sets up all API routes
 * - Starts listening on the configured port
 */
async function startServer() {
  // Dynamically import routes after dotenv.config() to ensure environment variables are available
  // This prevents the database connection pool from being created with undefined credentials
  const { default: userRoutes } = await import("./routes/userRoutes.js");
  const { default: itemRoutes } = await import("./routes/itemRoutes.js");
  const { default: tagRoutes } = await import("./routes/tagRoutes.js");

  const app = express();

  // Middleware Configuration
  // Parse incoming JSON requests
  app.use(express.json());
  
  // Enable Cross-Origin Resource Sharing (CORS) to allow requests from the Vue frontend
  // The frontend runs on localhost:5173 while the backend runs on localhost:3000
  app.use(cors({
      origin: "http://localhost:5173",
  }));

  // API Routes Registration
  // Mount route handlers for specific resource endpoints
  app.use("/api/users", userRoutes);
  app.use("/api/items", itemRoutes);
  app.use("/api/tags", tagRoutes);

  // Global Error Handler
  // Catches all errors from route handlers and returns proper error response
  app.use((err, req, res, next) => {
      console.error("Backend error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
  });

  // Start the server on the specified port (default: 3000)
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}

// Start the server and handle initialization errors
startServer().catch(err => {
  console.error('Startup error:', err);
  process.exit(1);
});

// Global Error Handlers
// Handle uncaught exceptions that weren't caught by try-catch blocks
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled promise rejection:', reason);
});
