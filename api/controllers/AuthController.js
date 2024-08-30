module.exports = class AuthController{
    static showLogin(req ,res) {
        res.render("auth/login")
    }

    static async login(req, res) {
        const {login, password} = req.body

        res.redirect("/")
    }
}