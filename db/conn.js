const pg = require('pg')
const {Sequelize} = require('sequelize')

const DATABASE_URL = process.env?.DATABASE_URL ?? "postgresql://pomododb_owner:kfzJGDEmn0W5@ep-dark-breeze-a5bt0lt2.us-east-2.aws.neon.tech/pomododb?sslmode=require" 

console.log()

const sequelize = new Sequelize(DATABASE_URL, {dialect: "postgres", dialectModule: pg})

try{
    sequelize.authenticate()
    console.log("Connected to Database")
} catch(error) {
    console.log("Connnection Error:", error)
}

module.exports = sequelize