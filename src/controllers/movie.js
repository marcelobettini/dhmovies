const dataSource = require("../services/datasource.js");

const movieController = {
  movies: null,
  async getAll(req, res) {
    this.movies = await dataSource.load();
    res.render("movies", { movies });
  },
  async getById(req, res) {
    this.movies = await dataSource.load();
    const { id } = req.params;
    const movie = this.movies.find((movie) => movie.id === id);
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
  async updateOne(req, res) {
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
    await dataSource.save(updatedMovies);
    res.redirect(`/movies/${id}`);
  },
  async deleteOne(req, res) {
    const { id } = req.params;
    const filteredMovies = this.movies.filter((movie) => {
      return movie.id !== id;
    });
    await dataSource.save(filteredMovies);
    res.redirect("/movies");
  },
};
module.exports = movieController;
