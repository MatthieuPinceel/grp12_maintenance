const db = require("../db");

// CREATE ITEM
exports.createItem = (req, res) => {
    const { itemImg, itemDescription, tagID, userID } = req.body;
    if (!itemDescription || !userID) {
        return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    db.query(
        "INSERT INTO ItemTable (itemImg, itemDescription, tagID, userID) VALUES (?, ?, ?, ?)",
        [itemImg || null, itemDescription, tagID || null, userID],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Item créé", itemID: result.insertId });
        }
    );
};

// READ ALL ITEMS
exports.getAllItems = (req, res) => {
    const query = `
        SELECT i.itemID, i.itemImg, i.itemDescription, i.tagID, i.userID, t.tagName
        FROM ItemTable i
        LEFT JOIN TagsTable t ON i.tagID = t.tagID
    `;
    db.query(query, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

// READ SINGLE ITEM
exports.getItemById = (req, res) => {
    const itemID = req.params.id;
    db.query(
        "SELECT * FROM ItemTable WHERE itemID = ?",
        [itemID],
        (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.length === 0) return res.status(404).json({ message: "Item non trouvé" });
            res.json(result[0]);
        }
    );
};

// UPDATE ITEM
exports.updateItem = (req, res) => {
    const itemID = req.params.id;
    const { itemImg, itemDescription, tagID, userID } = req.body;

    if (!itemImg && !itemDescription && !tagID && !userID) {
        return res.status(400).json({ message: "Rien à mettre à jour" });
    }

    let query = "UPDATE ItemTable SET ";
    const params = [];
    const updates = [];

    if (itemImg) { updates.push("itemImg = ?"); params.push(itemImg); }
    if (itemDescription) { updates.push("itemDescription = ?"); params.push(itemDescription); }
    if (tagID) { updates.push("tagID = ?"); params.push(tagID); }
    if (userID) { updates.push("userID = ?"); params.push(userID); }

    query += updates.join(", ") + " WHERE itemID = ?";
    params.push(itemID);

    db.query(query, params, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Item mis à jour" });
    });
};

// DELETE ITEM
exports.deleteItem = (req, res) => {
    const itemID = req.params.id;
    db.query("DELETE FROM ItemTable WHERE itemID = ?", [itemID], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Item supprimé" });
    });
};
