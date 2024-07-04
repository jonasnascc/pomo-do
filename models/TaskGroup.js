const {DataTypes} = require('sequelize')

const db = require("../db/conn")


const TaskGroup = db.define('taskgroup', {
    name : {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },
    maxTasks : {
        type: DataTypes.INTEGER
    },
})


module.exports = TaskGroup