const {DataTypes} = require('sequelize')

const db = require('../db/conn')

const Task = db.define('Task', {
    title: {
        type: DataTypes.STRING,
        required: true,
    },
    description: {
        type: DataTypes.STRING,
        required: true,
    },
    pomodoros: {
        type: DataTypes.INTEGER,
        required: true
    },
    done: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: false,
    },
    inProgress: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: false
    }
})

module.exports = Task