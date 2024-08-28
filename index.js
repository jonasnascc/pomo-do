const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

const Task = require('./models/Task')

const taskRoutes = require('./routes/taskRoutes')

app.set("views", path.join(__dirname, "views"))
app.use(express.static('public'))


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())


app.use('/tasks', taskRoutes)

conn    
    .sync()
    // .sync({force: true})
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => console.log(err))
