const {DataTypes} = require("sequelize")

const db = require("../db/conn")

const TaskGroup = require("./TaskGroup")

const Task = db.define("Task", {
    description : {
        type: DataTypes.STRING,
        require: true
    },
    pomodoros: {
        type: DataTypes.INTEGER,
        required: true
    }
})


TaskGroup.hasMany(Task)
Task.belongsTo(TaskGroup)

module.exports = Task