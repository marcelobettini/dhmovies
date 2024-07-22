const crypto = require("node:crypto");
const passwordHash = require("../services/passwordHash.js");
const authController = {
  getLoginForm(req, res) {
    res.render("auth/login");
  },
  getRegisterForm(req, res) {
    res.render("auth/register");
  },
  async register(req, res) {
    const { fullName, email, password } = req.body;
    const hashedPass = await passwordHash.hide(password);

    const newUser = {
      id: crypto.randomUUID(),
      fullName,
      email,
      password: hashedPass,
    };
    res.send(newUser);
  },
  async login(req, res) {
    const hardcodedPass =
      "$2b$10$gjISHqOXVw14mbblJ0HpuOli3atWYI9GxJZ9NFjXuSQcBaMFRJQJS";
    const isPasswordOk = await passwordHash.show(
      req.body.password,
      hardcodedPass
    );
    res.send(isPasswordOk);
  },
};

module.exports = authController;
