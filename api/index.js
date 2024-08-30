const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

const Task = require('./models/Task')

const taskRoutes = require('./routes/taskRoutes')

app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use('/tasks', taskRoutes)

app.get('/', async (req,res) => {
    const tasks = await Task.findAll({raw:true})
    res.render('index', {tasks: tasks})
})


conn    
    .sync()
    // .sync({force: true})
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => console.log(err))
