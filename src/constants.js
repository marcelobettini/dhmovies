const path = require("node:path");
const constants = {
  movies: path.resolve(__dirname, "./models/movies.json"),
  users: path.resolve(__dirname, "./models/users.json"),
};
module.exports = constants;
