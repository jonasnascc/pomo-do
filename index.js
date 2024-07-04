const express = require("express")
const app = express()

const exphbs = require("express-handlebars")
const conn = require("./db/conn")

const Task = require("./models/Task")
const TaskGroup = require("./models/TaskGroup")

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
app.get("/", async (req, res) => {
    try{
        const tasks = await Task.findAll({include: TaskGroup})
        const taskgroups = await TaskGroup.findAll({raw:true})
        res.render("home", {
            tasks : tasks.map(task => task.get({plain: true})),
            taskgroups
        })
    } catch(err) {
        console.log(err)
    }
})

//read by id
app.get("/tasks", async (req, res) => {
    const id = req.query.id
    if(!id) {
        res.redirect("/")
        return
    }
    const task = await Task.findOne({ raw:true, where: {id: id} })

    res.render("home", {tasks: [{id:id, ...task}]})
})

//create
app.post("/tasks", async (req,res) => {
    const description = req.body.description
    const pomodoros = req.body.pomodoros
    const taskgroupName = req.body.taskgroup
    const newTg = req.body.newTaskgroup

    const task = {
        description, 
        pomodoros
    }

    if(newTg && newTg.trim() !== "none"){
        const tgExists = await TaskGroup.findOne({raw: true, where: {name: newTg.trim()}})
        if(!tgExists){
            const saved = await TaskGroup.create({
                name: newTg.trim()
            })
            task.taskgroupId = saved.id
        }
        else task.taskgroupId = tgExists.id
    } else if(taskgroupName) {
        const tgExists = await TaskGroup.findOne({raw: true, where: {name: taskgroupName}})
        if(tgExists) task.taskgroupId = tgExists.id
    }
    
    
    await Task.create(task)

    res.redirect("/")
})

//edit view
app.get("/tasks/edit/:id", async (req, res) => {
    const id = req.params.id
    
    const task = await Task.findOne({raw:true, where: {id:id}})

    res.render("edit_task", {task})

})

//update
app.post("/tasks/updatetask", async (req, res) => {
    const {id, description, pomodoros} = req.body

    const taskData = {
        id,
        description,
        pomodoros
    }

    await Task.update(taskData, {where: {id:id}})
    res.redirect("/")
})

//delete
app.post("/tasks/delete/:id", async (req, res) => {
    const id = req.params.id

    await Task.destroy({where: {id: id}})

    res.redirect("/")
})

conn
    .sync()
    // .sync({force: true})
    .then(() => {
        app.listen(port, () => {
            console.log("Application started on port:", port)
        })
    })
    .catch((err) => {
        console.log(err)
    })

