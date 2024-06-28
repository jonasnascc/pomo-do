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

const port = 3000

app.get("/", (req, res) => {
    const tasks = [
        {
            description: "Add timer to the system",
            pomodoros : 1
        },
        {
            description: "Implement the persistence",
            pomodoros : 2
        },
        {
            description: "Style the home page",
            pomodoros : 2
        },
    ]

    res.render("home", {tasks})
})

app.listen(port, () => {
    console.log("Application started on port:",port)
})