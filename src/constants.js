const path = require("node:path");
const constants = {
  movies: path.resolve(__dirname, "./models/movies.json"),
  users: path.resolve(__dirname, "./models/users.json"),
  genres: [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sport",
    "Thriller",
    "War",
    "Western",
  ],
};
module.exports = constants;
