import { db } from "../db.js";

// CREATE ITEM
export const createItem = (req, res) => {
    const { itemImg, itemDescription, tagID, userID } = req.body;
    if (!itemDescription || !tagID || !userID) {
        return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    db.query(
        "INSERT INTO ItemTable (itemImg, itemDescription, tagID, userID) VALUES (?, ?, ?, ?)",
        [itemImg || null, itemDescription, tagID, userID],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Item créé", itemID: result.insertId });
        }
    );
};

// READ ALL ITEMS
export const getAllItems = (req, res) => {
    db.query(
        `SELECT i.itemID, i.itemImg, i.itemDescription, u.userName, t.tagName 
         FROM ItemTable as i 
         INNER JOIN userTable as u ON i.userID = u.userID
         INNER JOIN TagsTable AS t ON i.tagID = t.tagID`,
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );
};

// READ SINGLE ITEM
export const getItemById = (req, res) => {
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
export const updateItem = (req, res) => {
    const itemID = req.params.id;
    const { itemImg, itemDescription, tagID, userID } = req.body;

    const updates = [];
    const params = [];

    if (itemImg !== undefined) { updates.push("itemImg = ?"); params.push(itemImg); }
    if (itemDescription) { updates.push("itemDescription = ?"); params.push(itemDescription); }
    if (tagID) { updates.push("tagID = ?"); params.push(tagID); }
    if (userID) { updates.push("userID = ?"); params.push(userID); }

    if (updates.length === 0) return res.status(400).json({ message: "Rien à mettre à jour" });

    const query = `UPDATE ItemTable SET ${updates.join(", ")} WHERE itemID = ?`;
    params.push(itemID);

    db.query(query, params, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Item mis à jour" });
    });
};

// DELETE ITEM
export const deleteItem = (req, res) => {
    const itemID = req.params.id;
    db.query(
        "DELETE FROM ItemTable WHERE itemID = ?",
        [itemID],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Item supprimé" });
        }
    );
};
