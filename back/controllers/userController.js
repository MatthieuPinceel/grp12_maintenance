import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Secret for JWT token
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// LOGIN USER - Checks the credentials and generates a JWT token.
export const loginUser = async (req, res) => {
    const { userName, userPWD } = req.body;
    
    if (!userName || !userPWD) {
        return res.status(400).json({ message: "Missing credentials" });
    }

    try {
        db.query(
            "SELECT * FROM UserTable WHERE userName = ?",
            [userName],
            async (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }

                if (result.length ===0) {
                    return res.status(401).json({ message: "Can't find user."});
                }

                const user = result[0];

                const isMatch = await bcrypt.compare(userPWD, user.userPWD);
                console.log()

                if (!isMatch) {
                    return res.status(401).json({ message: "Password incorrect" });
                }


                // Generates a JWT token that lasts for 24 hours
                const token = jwt.sign(
                    { userID: user.userID, userName: user.userName },
                    JWT_SECRET,
                    { expiresIn: "24h" }
                );
                
                // Returns the user and the previously generated token
                res.json({ 
                    success: true, 
                    message: "Connection successful",
                    user: user,
                    token: token
                });
            }
        )
    } catch (err) {
        res.status(500).json({ message: "An error has occured", err});
    }
};

// CREATE USER - Checks if a user doesn't already exist with the provided username and hashes the password before storing it in the database.
export const createUser = async (req, res) => {
    const { userName, userPWD } = req.body;

    db.query(
        "SELECT * FROM UserTable WHERE userName = ?", [userName], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            if (result.length != 0) {
                return res.status(400).json({ message: "User with same username already exists" })
            }
        }
    )
    if (!userName || !userPWD) {
        return res.status(400).json({ message: "Mandatory field(s) missing" });
    }

    try {
        const hash = await bcrypt.hash(userPWD, 12);

        db.query(
            "INSERT INTO UserTable (userName, userPWD) VALUES (?, ?)",
            [userName, hash],
            (err, result) => {
                if (err) return res.status(500).json(err);

                res.json({
                    message: "Utilisateur créé",
                    userID: result.insertId
                });
            }
        );
    } catch (err) {
        res.status(500).json({ message: "An error has occured", err });
    }
};

// READ ALL USERS
export const getAllUsers = (req, res) => {
    db.query("SELECT * FROM UserTable", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

// READ ONE USER
export const getUserById = (req, res) => {
    const userID = req.params.id;
    db.query("SELECT * FROM UserTable WHERE userID = ?", [userID], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: "User not found" });
        res.json(result[0]);
    });
};

// UPDATE USER
export const updateUser = (req, res) => {
    const userID = req.params.id;
    const { userName, userPWD } = req.body;

    const updates = [];
    const params = [];

    if (userName) { updates.push("userName = ?"); params.push(userName); }
    if (userPWD) { updates.push("userPWD = ?"); params.push(userPWD); }

    if (updates.length === 0) return res.status(400).json({ message: "Nothing to update" });

    const query = `UPDATE UserTable SET ${updates.join(", ")} WHERE userID = ?`;
    params.push(userID);

    db.query(query, params, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "User updated" });
    });
};

// DELETE USER
export const deleteUser = (req, res) => {
    const userID = req.params.id;
    db.query("DELETE FROM UserTable WHERE userID = ?", [userID], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "User deleted" });
    });
};