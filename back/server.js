import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

// DEBUG: Vérifie que les variables sont chargées
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

async function startServer() {
  // Import DYNAMIQUE après dotenv.config()
  const { default: userRoutes } = await import("./routes/userRoutes.js");
  const { default: itemRoutes } = await import("./routes/itemRoutes.js");
  const { default: tagRoutes } = await import("./routes/tagRoutes.js");

  const app = express();

  // Middleware
  app.use(express.json());
  app.use(cors({
      origin: "http://localhost:5173",
  }));

  // Routes
  app.use("/api/users", userRoutes);
  app.use("/api/items", itemRoutes);
  app.use("/api/tags", tagRoutes);

  // Gestion simple des erreurs pour debug
  app.use((err, req, res, next) => {
      console.error("Erreur back :", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Serveur lancé sur http://localhost:${port}`));
}

startServer().catch(err => {
  console.error('Erreur au démarrage:', err);
  process.exit(1);
});

// Gestion des erreurs non capturées
process.on('uncaughtException', (err) => {
    console.error('Erreur non capturée:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promise rejetée non gérée:', reason);
});
