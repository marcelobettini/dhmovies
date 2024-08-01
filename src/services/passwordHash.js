const bcrypt = require("bcrypt");
const saltRounds = 10;
const passwordHash = {
  async encrypt(plainPassword) {
    try {
      return await bcrypt.hash(plainPassword, saltRounds);
    } catch (err) {
      console.error("Failed hashing password: " + err.message);
    }
  },
  async decrypt(plainPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (err) {
      console.error("Password comparison failed: " + err.message);
    }
  },
};
module.exports = passwordHash;
