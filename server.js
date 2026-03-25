const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// ✅ Must parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL connection
const mysql = require("mysql2"); // use mysql2 for better support
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydatabase",
    port: 3307
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// API
app.post("/add", (req, res) => {
    console.log(req.body); // 👈 debug what is coming
    const name = req.body.name;

    if (!name) {
        return res.status(400).send("No name provided");
    }

    db.query("INSERT INTO users (name) VALUES (?)", [name], (err, result) => {
        if (err) return res.status(500).send("DB error");
        res.send("Data Saved!");
    });
});

app.listen(5000, () => console.log("Server running on 5000"));
