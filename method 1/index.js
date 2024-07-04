const express = require("express")
const app = express()

const exphbs = require("express-handlebars")
const conn = require("./db/conn")

const {Op} = require("sequelize")

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

//read by id and/or group
app.get("/tasks", async (req, res) => {
    const id = req.query.id
    const taskgroupId = req.query.taskgroupId
    if(!id && !taskgroupId) {
        res.redirect("/")
        return
    }

    const idCond = id ? {id : id} : {}
    const tgCond = taskgroupId ? {taskgroupId: taskgroupId} : {}

    const tasks = await Task.findAll({ where: {
    [Op.or]: [idCond, tgCond],
    }, })
    const taskgroups = await TaskGroup.findAll({raw:true})

    res.render("home", {
        tasks: tasks.map(tsk => tsk.get({plain:true})),
        taskgroups
    })
})

//create
app.post("/tasks", async (req,res) => {
    const description = req.body.description
    const pomodoros = req.body.pomodoros
    const taskgroupId = req.body.taskgroupId

    const task = {
        description, 
        pomodoros,
        taskgroupId
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

//delete task group
app.post("/tasks/groups/delete/:id", async (req, res) => {
    const id = req.body.id
    await TaskGroup.destroy({
        where: {id : id}
    })

    redirect("/")
})

app.get("/tasks/groups/create", (req,res) => {
    res.render("create_taskgroup")
})

//create task group
app.post("/tasks/groups", async (req, res) => {
    const {
        name,
        maxTasks
    } = req.body

    if(name && name.trim() !== "none"){
        const tgExists = await TaskGroup.findOne({raw: true, where: {name: name.trim()}})
        if(!tgExists){
            await TaskGroup.create({
                name: name.trim(),
                maxTasks : maxTasks ? maxTasks : 100
            })
        }
    }

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

