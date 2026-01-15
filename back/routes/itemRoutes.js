const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

// CREATE
router.post("/create", itemController.createItem);

// READ ALL
router.get("/", itemController.getAllItems);

// READ ONE
router.get("/:id", itemController.getItemById);

// UPDATE
router.put("/:id", itemController.updateItem);

// DELETE
router.delete("/:id", itemController.deleteItem);

module.exports = router;
