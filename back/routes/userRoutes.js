const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// CREATE
router.post("/create", userController.createUser);

// READ ALL
router.get("/", userController.getAllUsers);

// READ ONE
router.get("/:id", userController.getUserById);

// UPDATE
router.put("/:id", userController.updateUser);

// DELETE
router.delete("/:id", userController.deleteUser);

module.exports = router;
