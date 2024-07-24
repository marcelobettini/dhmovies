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
    res.render("movieAdd");
  },
  async createOne(req, res) {
    const posterFilePath = req.file
      ? `/poster/${req.file.filename}`
      : "/poster/default.png";
    const { title, year, duration, director, genre, rate, synopsis } = req.body;
    const newMovie = {
      id: crypto.randomUUID(),
      title,
      year,
      duration,
      director,
      poster: posterFilePath,
      genre,
      rate,
      synopsis,
    };
    this.movies = await dataSource.load();
    this.movies.push(newMovie);
    await dataSource.save(movies);
    res.redirect(`/movies`);
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
    const { poster } = this.movies.find((movie) => movie.id === id);

    const filteredMovies = this.movies.filter((movie) => {
      return movie.id !== id;
    });
    await dataSource.save(filteredMovies);
    await dataSource.removeFile(poster);
    res.redirect("/movies");
  },
};
module.exports = movieController;
