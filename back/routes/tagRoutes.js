const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");

// CREATE
router.post("/create", tagController.createTag);

// READ ALL
router.get("/", tagController.getAllTags);

// READ ONE
router.get("/:id", tagController.getTagById);

// UPDATE
router.put("/:id", tagController.updateTag);

// DELETE
router.delete("/:id", tagController.deleteTag);

module.exports = router;
