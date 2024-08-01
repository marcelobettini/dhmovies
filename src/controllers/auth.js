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

    const hashedPass = await passwordHash.encrypt(password);

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
    this.users = await datasource.load(constants.users);
    const { email, password } = req.body;
    const userFound = this.users.find((user) => user.email === email);
    //check if email exists in DB
    if (!userFound)
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });

    //check if password is correct
    const isPasswordOk = await passwordHash.decrypt(
      password,
      userFound.password
    );
    if (!isPasswordOk)
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });

    req.session.user = { name: userFound.fullName, email: userFound.email };

    // Guarda la sesión y luego imprime los datos del usuario
    req.session.save((err) => {
      if (err) {
        console.error('Error saving session:', err);
        return res.status(500).json({ success: false, message: "Internal server error" });
      }
      res.redirect("/")
    });
  },

  logout(req, res) {
    req.session.destroy(err => {
      if (err) {
        console.error(err.message)
      } else {
        res.clearCookie('connect.sid')
        res.redirect("/")
      }
    })
  }
};

module.exports = authController;
