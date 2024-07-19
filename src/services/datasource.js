const fs = require("node:fs/promises");
const path = require("node:path");

const datasource = {
  filePath: path.resolve(__dirname, "../models/movies.json"),

  async load() {
    const jsonMovies = await fs.readFile(this.filePath, "");
    const movies = JSON.parse(jsonMovies);
    return movies;
  },
  async save(data) {
    console.log(data);
    const jsonData = JSON.stringify(data);
    await fs.writeFile(this.filePath, jsonData, "utf-8");
  },
};

module.exports = datasource;
