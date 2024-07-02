const {DataTypes} = require("sequelize")

const db = require("../db/conn")

const Task = db.define("User", {
    description : {
        type: DataTypes.STRING,
        require: true
    },
    pomodoros: {
        type: DataTypes.INTEGER,
        required: true
    }
})

module.exports = Task