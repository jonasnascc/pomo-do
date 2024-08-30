const express = require('express')
const router = express.Router()

const TaskController = require("../controllers/TaskController")

router.post('/add', TaskController.createTaskSave)
router.post('/remove', TaskController.removeTask)
router.get('/edit/:id', TaskController.updateTask)
router.post('/edit', TaskController.updateTaskPost)
router.post('/done', TaskController.toggleTaskDone)
router.post('/inProgress', TaskController.toggleTaskInProgress)

module.exports = router