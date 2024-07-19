const movies = require("../models/movies.json");
const path = require("node:path");
const fs = require("node:fs");

const movieController = {
  getAll(req, res) {
    res.render("movies", { movies });
  },
  getById(req, res) {
    const { id } = req.params;
    const movie = movies.find((movie) => movie.id === id);
    res.render("movieDetail", { movie });
  },
  getByTitle(req, res) {
    const { title } = req.query;
    res.send(`Get movie by title: ${title}`);
  },
  getUpdateForm(req, res) {
    const { id } = req.params;
    const movie = movies.find((movie) => movie.id === id);
    res.render("movieEdit", { movie });
  },
  createOne(req, res) {
    const { title } = req.body;
    res.send(`Create movie with this data: ${title}`);
  },
  updateOne(req, res) {
    const { id } = req.params;
    const { title, year, duration, director, poster, genre, rate, synopsis } =
      req.body;
    const updatedMovies = movies.map((movie) =>
      movie.id === id
        ? {
            id,
            title,
            year,
            duration,
            director,
            poster,
            genre: genre.split(" - "),
            rate,
            synopsis,
          }
        : movie
    );

    // Data to write to the file
    const data = JSON.stringify(updatedMovies);

    // file path
    const filePath = path.resolve(__dirname, "../models/movies.json");

    fs.writeFile(filePath, data, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        const movie = updatedMovies.find((m) => m.id === id);
        res.render("movieDetail", { movie });
      }
    });
  },
  deleteOne(req, res) {
    const { id } = req.params;
    const filteredMovies = movies.filter((movie) => {
      movie.id !== id;
    });
    res.send(`Delete the movie with id: #${id}`);
  },
};
module.exports = movieController;
