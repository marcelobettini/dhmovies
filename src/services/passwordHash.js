const bcrypt = require("bcrypt");
const saltRounds = 10;
const passwordHash = {
  async hide(plainPassword) {
    try {
      return await bcrypt.hash(plainPassword, saltRounds);
    } catch (err) {
      console.error("Failed hashing password: " + err.message);
    }
  },
  async show(plainPassword, hashedPassword) {
    try {
      console.log(plainPassword);
      console.log(hashedPassword);
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (err) {
      console.error("Password comparison failed: " + err.message);
    }
  },
};
module.exports = passwordHash;
