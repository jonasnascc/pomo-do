const express = require("express")
const router = express.Router()

const AuthController = require('../controllers/AuthController')

router.get('/login', AuthController.showLogin)
router.post('/login', AuthController.login)

module.exports = router