const {Sequelize} = require('sequelize')

const sequelize = new Sequelize("seqelizebd","root", "", {
    host: "localhost",
    dialect: "mysql"
})

// try{
//     sequelize.authenticate()
//     console.log("Successfully connected to Database")
// } catch(err) {
//     console.log("Error while connection to Database:" , err)
// }

module.exports = sequelize