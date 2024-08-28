const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('pomododb', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
})

try{
    sequelize.authenticate()
    console.log("Connected to MySQL")
} catch(error) {
    console.log("Connnection Error:", error)
}

module.exports = sequelize