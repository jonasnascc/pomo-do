const express = require("express")
const app = express()

const exphbs = require("express-handlebars")
const mysql = require("mysql")

const hbs = exphbs.create({
    partialsDir: ["views/partials"]
})

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

app.use(express.static("public"))

app.use(
    express.urlencoded({
        extended:true
    })
)

app.use(express.json())

const port = 3000

app.get("/", (req, res) => {
    const sql = "SELECT * FROM tasks"
    conn.query(sql, (err, data) => {
        if(err) {
            console.log(err)
            return;
        }
        const tasks = data ?? []

        res.render("home", {tasks})
    }) 
})

app.post("/tasks", (req,res) => {
    const description = req.body.description
    const pomodoros = req.body.pomodoros

    const query = `INSERT INTO tasks (description, pomodoros) VALUES ('${description}', '${pomodoros}')` 

    conn.query(query, (err) => {
        if(err) console.log(err)

        res.redirect("/")
    })
})

const conn = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database: "test"
})

conn.connect((err) => {
    if(err) console.log(err)

    console.log("Connected to MySQL Database")

    app.listen(port, () => {
        console.log("Application started on port:",port)
    })
})
