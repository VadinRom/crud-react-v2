const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "students",
});

app.post("/create", (req, res) => {
    const name = req.body.name;
    const dateOfBirth = req.body.dateOfBirth;
    const town = req.body.town;
    const specialty = req.body.specialty;
    const averageScore = req.body.averageScore;

    db.query(
        "INSERT INTO studentsinfo (name, dateOfBirth, town, specialty, averageScore) VALUES (?,?,?,?,?)",
        [name, dateOfBirth, town, specialty, averageScore],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

app.get("/students", (req, res) => {
    db.query("SELECT * FROM studentsinfo", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/update", (req, res) => {
    const id = req.body.id;
    const averageScore = req.body.averageScore;
    db.query(
        "UPDATE studentsinfo SET averageScore = ? WHERE id = ?",
        [averageScore, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM studentsinfo WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Yey, your server is running on port ${PORT}`);
});
