const {Sequelize} = require('sequelize')

const DATABASE_URL = process.env?.DATABASE_URL ?? "" 

console.log()

const sequelize = new Sequelize(DATABASE_URL, {dialect: "postgres"})

try{
    sequelize.authenticate()
    console.log("Connected to Database")
} catch(error) {
    console.log("Connnection Error:", error)
}

module.exports = sequelize