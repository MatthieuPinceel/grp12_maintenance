const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

// Routes User
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Routes Item
const itemRoutes = require("./routes/itemRoutes");
app.use("/api/items", itemRoutes);

// Routes Tag
const tagRoutes = require("./routes/tagRoutes");
app.use("/api/tags", tagRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
