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
    const movie = this.movies.find((movie) => movie.id === id);
    res.render("movieEdit", { movie });
  },
  getAddForm(req, res) {
    res.render("movieAdd", { errors: [] });
  },
  async createOne(req, res) {
    const { filename } = req.file;
    const { title, year, duration, director, genre, rate, synopsis } = req.body;
    const newMovie = {
      id: crypto.randomUUID(),
      title,
      year,
      duration,
      director,
      poster: `/poster/${filename}`,
      genre: genre.split(", "),
      rate,
      synopsis,
    };
    this.movies = await dataSource.load();
    this.movies.push(newMovie);
    await dataSource.save(movies);
    res.redirect(`/movies`);
  },

  async updateOne(req, res) {
    let poster = "";
    if (req.file?.filename) {
      poster = `/poster/${req.file.filename}`;
    } else {
      poster = req.body.currentPoster;
    }
    const { id } = req.params;
    const { title, year, duration, director, genre, rate, synopsis } = req.body;
    const updatedMovies = this.movies.map((movie) =>
      movie.id === id
        ? {
            id,
            title,
            year,
            duration,
            director,
            poster,
            genre: genre.split(", "),
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
    const { poster } = this.movies.find((m) => m.id === id);

    const filteredMovies = this.movies.filter((movie) => movie.id !== id);
    await dataSource.save(filteredMovies);
    await dataSource.removefile(poster);
    res.redirect("/movies");
  },
};
module.exports = movieController;
