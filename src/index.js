const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");
const { console } = require("inspector");

const tempelatePath = path.join(__dirname, '../tempelates');
app.set("views", tempelatePath);

// Sửa lỗi trong cấu hình view
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", tempelatePath);
console.log("Template Path: ",tempelatePath);

// Sửa đường dẫn các route
app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/sigup", (req, res) => {
    res.render("sigup");
});

app.post("/login", (req, res) => {
    res.render("sigup");
});

app.post("/sigup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };

    await collection.insertMany([data]);

    res.render("home");
});

app.listen(3000, () => {
    console.log("Port connected on 3000");
});
