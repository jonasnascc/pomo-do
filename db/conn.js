const pg = require('pg')
const {Sequelize} = require('sequelize')

const DATABASE_URL = process.env?.DATABASE_URL ?? "" 

let sequelize = null;

if(DATABASE_URL) {
    sequelize = new Sequelize(DATABASE_URL, {dialect: "postgres", dialectModule: pg})
} else {
    sequelize = new Sequelize('pomododb', 'root', '', {
        host: 'localhost',
        dialect: "mysql"
    })
}

try{
    sequelize.authenticate()
    console.log("Connected to Database")
} catch(error) {
    console.log("Connnection Error:", error)
}


module.exports = sequelize