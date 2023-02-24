const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "crudhortmais",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
    const { name } = req.body;
    const { cost } = req.body;
    const { quant } = req.body;
    const { total } = req.body;
    let mysql = "INSERT INTO estoque ( name, cost, quant, total) VALUES (?, ?, ?, ?)";
    db.query(mysql, [name, cost, quant, total], (err, result) => {
        res.send(result);
    });
});

app.post("/search", (req, res) => {
    const { name } = req.body;
    const { cost } = req.body;
    const { quant } = req.body;
    const { total } = req.body;
    let mysql = "SELECT * FROM estoque WHERE name = ? AND cost = ? AND quant = ? AND total = ?";
    db.query(mysql, [name, cost, quant, total], (err, result) => {
        if (err) res.send(err);
        res.send(result);
    });
});

app.get("/getCards", (req, res) => {
    let mysql = "SELECT * FROM estoque";
    db.query(mysql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.put("/edit", (req, res) => {
    const { id } = req.body;
    const { name } = req.body;
    const { cost } = req.body;
    const { quant } = req.body;
    const { total } = req.body;
    let mysql = "UPDATE estoque SET name = ?, cost = ?, quant = ?, total = ? WHERE id = ?";
    db.query(mysql, [name, cost, quant, total, id], (err, result) => {
        if (err) {
            res.send(err);
        }
        else{
            res.send(result);
        }
    });
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    let mysql = "DELETE FROM estoque WHERE id = ?";
    db.query(mysql, id, (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("Rodando o Servidor na Porta 3001");
})