const express = require("express")
const app = express()

const exphbs = require("express-handlebars")
const pool = require("./db/conn")

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

//read
app.get("/", (req, res) => {
    const sql = "SELECT * FROM tasks"
    pool.query(sql, (err, data) => {
        if(err) {
            console.log(err)
        }
        const tasks = data ?? []

        res.render("home", {tasks})
    }) 
})

//read by id
app.get("/tasks", (req, res) => {
    const id = req.query.id
    if(!id) {
        res.redirect("/")
        return
    }

    const query = `SELECT * FROM tasks WHERE ?? = ?`
    const data = ["id", id]
    pool.query(query, data, (err, data) => {
        if(err) {
            console.log(err)
        }

        res.render('home', {tasks:data??[]})
    })
})

//create
app.post("/tasks", (req,res) => {
    const description = req.body.description
    const pomodoros = req.body.pomodoros

    const query = `INSERT INTO tasks (??, ??) VALUES (?, ?)` 
    const data  = ["description", "pomodoros", description, pomodoros]

    pool.query(query, data, (err) => {
        if(err) console.log(err)

        res.redirect("/")
    })
})

//edit view
app.get("/tasks/edit/:id", (req, res) => {
    const id = req.params.id
    
    const sql = `SELECT * FROM tasks WHERE ?? = ?`
    const data = ["id", id]

    pool.query(sql, data, (err, data) => {
        if(err){
            console.log(err)
            return
        }
        
        res.render("edit_task", {task: data[0]})
    })
})

//update
app.post("/tasks/updatetask", (req, res) => {
    const {id, description, pomodoros} = req.body

    const sql = `UPDATE tasks SET ?? = ?, ?? = ? WHERE ?? = ?`
    const data  = ["description", description, "pomodoros",pomodoros,  "id", id]

    pool.query(sql, data, (err) => {
        if(err) {
            console.log(err)
            return;
        }
        res.redirect("/")
    })
})

//delete
app.post("/tasks/delete/:id", (req, res) => {
    const id = req.params.id

    const sql = `DELETE FROM tasks WHERE ??=?`
    const data = ["id", id]

    pool.query(sql, data, (err) => {
        if(err) {
            console.log(err)
            return
        }
        res.redirect("/")
    })
})

app.listen(port, () => {
    console.log("Application started on port:",port)
})