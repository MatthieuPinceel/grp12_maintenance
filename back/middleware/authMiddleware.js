import jwt from "jsonwebtoken";

// Secret JWT (même secret que dans userController)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

/**
 * Middleware pour vérifier le token JWT
 * Extrait le token du header Authorization et valide sa signature
 */
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token manquant" });
    }

    // Extrait le token du format "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token invalide" });
    }

    try {
        // Vérifie et décode le token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Ajoute l'utilisateur au request pour l'utiliser dans les routes
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token expiré ou invalide" });
    }
};
