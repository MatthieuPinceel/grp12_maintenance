const db = require("../db");

// CREATE TAG
exports.createTag = (req, res) => {
    const { tagName } = req.body;
    if (!tagName) return res.status(400).json({ message: "Nom du tag obligatoire" });

    db.query(
        "INSERT INTO TagsTable (tagName) VALUES (?)",
        [tagName],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Tag créé", tagID: result.insertId });
        }
    );
};

// READ ALL TAGS
exports.getAllTags = (req, res) => {
    db.query("SELECT * FROM TagsTable", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

// READ SINGLE TAG
exports.getTagById = (req, res) => {
    const tagID = req.params.id;
    db.query(
        "SELECT * FROM TagsTable WHERE tagID = ?",
        [tagID],
        (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.length === 0) return res.status(404).json({ message: "Tag non trouvé" });
            res.json(result[0]);
        }
    );
};

// UPDATE TAG
exports.updateTag = (req, res) => {
    const tagID = req.params.id;
    const { tagName } = req.body;
    if (!tagName) return res.status(400).json({ message: "Nom du tag obligatoire" });

    db.query(
        "UPDATE TagsTable SET tagName = ? WHERE tagID = ?",
        [tagName, tagID],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Tag mis à jour" });
        }
    );
};

// DELETE TAG
exports.deleteTag = (req, res) => {
    const tagID = req.params.id;
    db.query(
        "DELETE FROM TagsTable WHERE tagID = ?",
        [tagID],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Tag supprimé" });
        }
    );
};
