const Task = require('../models/Task')

module.exports = class TaskController {
    static showTasks(req, res) {
        res.render('index')
    }
    static async createTaskSave(req, res) {
        const task = {
            title: req.body.title,
            description: req.body.description,
            pomodoros: req.body.pomodoros,
            done: false
        }

        await Task.create(task)

        res.redirect('/')
    }

    static async removeTask(req,res) {
        const id = req.body.id

        await Task.destroy({where: {id:id}})

        res.redirect("/")
    }

    static async updateTask(req, res) {
        const id = req.params.id

        const task = await Task.findOne({where: {id:id}, raw: true})

        res.render('tasks/edit', {task})
    }

    static async updateTaskPost(req,res) {
        const {id, title, description} = req.body

        const task = {title, description}

        await Task.update(task, {where: {id:id}})

        res.redirect('/')
    }

    static async toggleTaskDone(req, res) {
        const id = req.body.id
        const task = await Task.findOne({where:{id : id}, raw: true})

        console.log(task)

        task.done = !Boolean(task.done)
        task.inProgress = false

        await Task.update(task, {where: {id: id}})

        res.redirect("/")
    }

    static async toggleTaskInProgress(req, res){
        const id = req.body.id
        const task = await Task.findOne({where:{id : id}, raw: true})

        task.inProgress = !Boolean(task.inProgress)
        task.done = false

        await Task.update(task, {where: {id: id}})

        res.redirect("/")
    }

}