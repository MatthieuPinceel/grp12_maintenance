import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
    loginUser,
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/userController.js";

const router = express.Router();

// LOGIN
router.post("/login", loginUser);
router.post("/create", createUser);

// READ ALL (protégé)
router.get("/", authMiddleware, getAllUsers);

// READ ONE (protégé)
router.get("/:id", authMiddleware, getUserById);

// UPDATE (protégé)
router.put("/:id", authMiddleware, updateUser);

// DELETE (protégé)
router.delete("/:id", authMiddleware, deleteUser);
export default router; // 🔑 export default pour ES Modules
