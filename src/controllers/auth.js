const crypto = require("node:crypto");
const passwordHash = require("../services/passwordHash.js");
const datasource = require("../services/datasource.js");
const constants = require("../constants.js");

const authController = {
  users: null,
  getLoginForm(req, res) {
    res.render("auth/login");
  },
  getRegisterForm(req, res) {
    res.render("auth/register");
  },

  async register(req, res) {
    this.users = await datasource.load(constants.users);
    const { fullName, email, password } = req.body;

    const userFound = this.users.find((user) => user.email === email);
    if (userFound)
      return res
        .status(409)
        .json({ success: false, message: "Email already in use" });

    const hashedPass = await passwordHash.hide(password);

    const newUser = {
      id: crypto.randomUUID(),
      fullName,
      email,
      password: hashedPass,
    };
    this.users = await datasource.load(constants.users);
    this.users.push(newUser);
    await datasource.save(constants.users, this.users);
    res.send(newUser);
  },
  async login(req, res) {
    const isPasswordOk = await passwordHash.show(
      req.body.password,
      hardcodedPass
    );
    res.send(isPasswordOk);
  },
};

module.exports = authController;
