const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// 🔹 MySQL CONNECTION
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",   // VERY IMPORTANT
    database: "mydatabase",
    port: 3307      // if you changed port
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// 🔹 API to insert data
app.post("/add", (req, res) => {
    const name = req.body.name;

    const sql = "INSERT INTO users (name) VALUES (?)";
    db.query(sql, [name], (err, result) => {
        if (err) throw err;
        res.send("Data Saved!");
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running");
});