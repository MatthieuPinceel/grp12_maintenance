const db = require("../db");
const bcrypt = require("bcrypt");

// CREATE USER
exports.createUser = async (req, res) => {
    const { userName, userPWD } = req.body;
    if (!userName || !userPWD) return res.status(400).json({ message: "Champs manquants" });

    try {
        const hash = await bcrypt.hash(userPWD, 10);
        db.query(
            "INSERT INTO UserTable (userName, userPWD) VALUES (?, ?)",
            [userName, hash],
            (err, result) => {
                if (err) return res.status(500).json(err);
                res.json({ message: "Utilisateur créé", userID: result.insertId });
            }
        );
    } catch (err) {
        res.status(500).json(err);
    }
};

// READ ALL USERS
exports.getAllUsers = (req, res) => {
    db.query("SELECT userID, userName FROM UserTable", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

// READ SINGLE USER
exports.getUserById = (req, res) => {
    const userID = req.params.id;
    db.query(
        "SELECT userID, userName FROM UserTable WHERE userID = ?",
        [userID],
        (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.length === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });
            res.json(result[0]);
        }
    );
};

// UPDATE USER
exports.updateUser = async (req, res) => {
    const userID = req.params.id;
    const { userName, userPWD } = req.body;
    if (!userName && !userPWD) return res.status(400).json({ message: "Rien à mettre à jour" });

    let query = "UPDATE UserTable SET ";
    let params = [];
    if (userName) {
        query += "userName = ?";
        params.push(userName);
    }
    if (userPWD) {
        if (userName) query += ", ";
        const hash = await bcrypt.hash(userPWD, 10);
        query += "userPWD = ?";
        params.push(hash);
    }
    query += " WHERE userID = ?";
    params.push(userID);

    db.query(query, params, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Utilisateur mis à jour" });
    });
};

// DELETE USER
exports.deleteUser = (req, res) => {
    const userID = req.params.id;
    db.query("DELETE FROM UserTable WHERE userID = ?", [userID], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Utilisateur supprimé" });
    });
};
