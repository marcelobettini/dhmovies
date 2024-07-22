const authController = {
  getLoginForm(req, res) {
    res.render("auth/login");
  },
  getRegisterForm(req, res) {
    res.render("auth/register");
  },
  register() {
    const { fullName, email, password, confirmPassword } = req.body;

    res.send("Creates a new user");
  },
  login() {
    res.send("Log in a user");
  },
};

module.exports = authController;
