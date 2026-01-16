import express from "express";
import multer from "multer";
import { createItem, getAllItems, getItemById, updateItem, deleteItem, createItemWithUpload } from "../controllers/itemController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Configuration multer pour les uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Seules les images sont autorisées"));
    }
  }
});

router.post("/create", createItem);
router.post("/upload", authMiddleware, upload.single("image"), createItemWithUpload);
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
